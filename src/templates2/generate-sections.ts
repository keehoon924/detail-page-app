/**
 * v6 CLI — A+B 하이브리드 + 9장 검증.
 *  1) planCopyIntoRef: ref.sections 박스 강제 + AI 카피만
 *  2) 사진 dataURI 변환 + hero 사진 명도 분석 → 흰 사진이면 hero-full--bright 모드
 *  3) 사진 슬롯 매핑 (동일 사진 ≤2회, 3회째 변주)
 *  4) validate-output: 가짜정보·길이·중복 보정 + 보고
 *  5) buildPage → HTML+PNG
 */
import 'dotenv/config';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { planCopyIntoRef } from './plan-copy-into-ref.ts';
import { validateAndFix } from './validate-output.ts';
import { HERO_BRIGHT_THRESHOLD } from './design-rules.ts';
import { buildPage } from './page.ts';
import { embedImages } from './image-embed.ts';
import type { ImageRef, Section, Template2 } from './engine.ts';

/** 사진 1장(파일경로 또는 dataURI)의 평균 명도(0~1) 측정. */
async function measureBrightness(srcPath: string): Promise<number> {
  try {
    const buf = await sharp(srcPath).resize(64, 64, { fit: 'cover' }).raw().toBuffer({ resolveWithObject: true });
    const { data } = buf;
    let total = 0;
    for (let i = 0; i < data.length; i += 3) {
      total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    const count = data.length / 3;
    return (total / count) / 255;
  } catch { return 0.5; }
}

/** 사진 변주 — 동일 src를 두 번 넘어 쓰면 사용 횟수 카운트해서 표시(시각적으로 다른 mask 등). */
function fillImagesIntoSections(sections: any[], imageUris: string[]): any[] {
  let cursor = 0;
  const usageCount = new Map<string, number>();
  const next = () => {
    if (imageUris.length === 0) return undefined;
    const src = imageUris[cursor % imageUris.length];
    cursor++;
    usageCount.set(src, (usageCount.get(src) ?? 0) + 1);
    return src;
  };
  const variantMask = (slot: ImageRef['aiSlot'], src: string | undefined): ImageRef['mask'] => {
    if (!src) return slot === 'cta' || slot === 'hero' ? 'rect' : 'rounded';
    const count = usageCount.get(src) ?? 1;
    // 동일 사진 3회 이상 — 마스크 다르게 (변주)
    if (count >= 3) {
      if (slot === 'step' || slot === 'detail') return 'circle';
      if (count % 2 === 0) return 'blob';
      return 'circle';
    }
    return slot === 'cta' || slot === 'hero' ? 'rect' : (slot === 'step' || slot === 'detail' ? 'circle' : 'rounded');
  };
  const toRef = (orig: any, slot: ImageRef['aiSlot']): any => {
    const label = typeof orig === 'string' ? orig : (orig?.label ?? '');
    const src = next();
    if (!src) return orig;
    const mask = variantMask(slot, src);
    const overlay = slot === 'cta' ? 0.45 : (slot === 'hero' ? 0.4 : 0.18);
    // 변주: 3회 이상 시 focus 살짝 다르게
    const count = usageCount.get(src) ?? 1;
    const focusX = count === 1 ? 0.5 : (count === 2 ? 0.35 : 0.65);
    const focusY = count === 1 ? 0.5 : (count === 2 ? 0.4 : 0.6);
    return { src, label, mask, overlay, focusX, focusY, aiSlot: slot };
  };
  return sections.map((s) => {
    const next: any = { ...s };
    if (s.type === 'hero' && s.image !== undefined) next.image = toRef(s.image, 'hero');
    if (s.type === 'feature' && s.image !== undefined) next.image = toRef(s.image, 'feature');
    if (s.type === 'cta' && s.image !== undefined) next.image = toRef(s.image, 'cta');
    if (s.type === 'stat' && s.image !== undefined) next.image = toRef(s.image, 'stat');
    if (s.type === 'image' && s.label !== undefined && !s.cols) next.label = toRef(s.label, 'image');
    if (s.type === 'steps' && Array.isArray(s.steps)) {
      next.steps = s.steps.map((st: any) => ({ ...st, image: st.image !== undefined ? toRef(st.image, 'step') : st.image }));
    }
    if (s.type === 'mediaRow' && Array.isArray(s.items)) {
      next.items = s.items.map((it: any) => ({ ...it, image: it.image !== undefined ? toRef(it.image, 'feature') : it.image }));
    }
    return next;
  });
}

async function main() {
  const [formFile, resultFile] = process.argv.slice(2);
  const form = JSON.parse(await readFile(formFile, 'utf8'));
  const id = form.id ?? Date.now().toString(36);
  const cutCount = Math.max(1, Math.min(30, Number(form.cutCount) || 13));

  console.log(`🧠 plan-copy-into-ref 호출 (gpt-4o, A+B 하이브리드)...`);
  const t0 = Date.now();
  const { template, refMeta, refSource, model } = await planCopyIntoRef({
    description: form.description ?? '',
    prompt: form.prompt,
    productName: form.productName,
    category: form.category,
    cutCount,
    refId: form.ref,
    brandColor: form.brandColor,
  });
  console.log(`🧠 sections ${template.sections.length}개 (${Math.round((Date.now() - t0) / 1000)}s, ref=${refMeta.id})`);

  // 사진 dataURI + hero 명도 분석
  const fsPaths: string[] = Array.isArray(form.images)
    ? form.images.map((p: string) => p.startsWith('/') ? `public${p}` : p)
    : [];
  let heroBright = false;
  if (fsPaths.length > 0) {
    const lum = await measureBrightness(fsPaths[0]);
    heroBright = lum > HERO_BRIGHT_THRESHOLD;
    console.log(`📷 hero 사진 명도: ${lum.toFixed(2)} ${heroBright ? '(밝음 → bright 모드)' : '(어두움 → 기본)'}`);
  }
  const imageDataUris = fsPaths.length > 0
    ? (await embedImages(fsPaths)).filter(Boolean)
    : [];
  if (imageDataUris.length > 0) console.log(`📷 사진 임베드: ${imageDataUris.length}/${fsPaths.length}장`);

  // 사진 매핑 (변주 포함)
  const filledSections = fillImagesIntoSections(template.sections, imageDataUris);

  // hero에 bright 플래그 부여
  if (heroBright && filledSections[0]?.type === 'hero') {
    (filledSections[0] as any)._bright = true;
  }

  // 9장 검증 + 보정
  const { template: validated, report } = validateAndFix(
    { ...template, sections: filledSections as Section[] },
    { cutCount, allowedRaw: form.description ?? '' },
  );
  if (report.fakeRemoved.length) console.log(`🛡 가짜정보 제거: ${report.fakeRemoved.length}건 — ${report.fakeRemoved.slice(0, 5).join(', ')}${report.fakeRemoved.length > 5 ? '...' : ''}`);
  if (report.dedupedLines.length) console.log(`🧹 중복 dedupe: ${report.dedupedLines.length}건`);
  if (report.overLimit.length) console.log(`📏 길이 초과 ${report.overLimit.length}건 — ${report.overLimit.slice(0, 3).map((o) => `${o.where}(${o.len}/${o.limit})`).join(', ')}`);
  if (!report.cutCountOk) console.log(`⚠ 컷수 불일치: ${validated.sections.length}/${cutCount}`);

  validated.id = id;
  const html = buildPage(validated);
  const outDir = resolve('public', 'generated', id);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'page.html'), html, 'utf8');

  // PNG
  let pngOk = false; let height = 0;
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 860, height: 1200 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(resolve(outDir, 'page.html')).href, { waitUntil: 'networkidle', timeout: 90000 });
    try { await page.evaluate(() => (document as any).fonts.ready); } catch {}
    await page.waitForTimeout(900);
    const loc = page.locator('.page');
    await loc.screenshot({ path: resolve(outDir, 'page.png') });
    const box = await loc.boundingBox();
    height = box ? Math.round(box.height) : 0;
    await browser.close();
    pngOk = true;
  } catch (e) { /* HTML 유효 */ }

  const result = {
    id,
    htmlUrl: `/generated/${id}/page.html`,
    pngUrl: pngOk ? `/generated/${id}/page.png` : null,
    height,
    cuts: validated.sections.length,
    cutTypes: validated.sections.map((s: any) => s.type),
    ref: { id: refMeta.id, description: refMeta.description, source: refSource },
    planSource: 'plan-copy-into-ref',
    model,
    validation: {
      cutCountOk: report.cutCountOk,
      fakeRemoved: report.fakeRemoved.length,
      dedupedLines: report.dedupedLines.length,
      overLimit: report.overLimit.length,
      heroBright,
    },
  };
  await writeFile(resultFile, JSON.stringify(result), 'utf8');
  console.log(`✅ ${id} · ref=${refMeta.id}(${refSource}) · ${validated.sections.length}컷 · ${model} · 검증 OK=${report.cutCountOk && report.fakeRemoved.length === 0}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
