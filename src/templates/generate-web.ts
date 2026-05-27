/**
 * 웹 생성 CLI — 폼 JSON → 계획(AI/폴백) → Template → HTML + PNG + Figma code.js.
 * Next 라우트가 자식프로세스로 호출(번들링 회피). 결과는 resultFile(JSON)에 기록.
 * 사용: tsx src/templates/generate-web.ts <formFile> <resultFile>
 */
import 'dotenv/config';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { planWithAI } from './planner.ts';
import { assemble } from './web-engine.ts';
import { templateHTML } from './preview.ts';
import { RUNTIME } from './figma-runtime.ts';
import type { Template } from './specs/types.ts';

function mimeOf(p: string): string {
  const s = p.toLowerCase();
  if (s.endsWith('.png')) return 'image/png';
  if (s.endsWith('.webp')) return 'image/webp';
  if (s.endsWith('.gif')) return 'image/gif';
  if (s.endsWith('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}

async function embedImages(t: Template) {
  for (const b of t.blocks) {
    if (b.src && !b.b64) {
      try { const buf = await readFile(resolve(b.src)); b.b64 = buf.toString('base64'); b.mime = mimeOf(b.src); }
      catch { /* 이미지 없으면 placeholder 유지 */ }
    }
  }
}

function fullHTML(t: Template): string {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Serif+KR:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#cfcfcf;display:flex;justify-content:center;font-family:Pretendard}
.tpl{box-shadow:0 4px 24px rgba(0,0,0,.18)}
</style></head><body>${templateHTML(t)}</body></html>`;
}

async function main() {
  const [formFile, resultFile] = process.argv.slice(2);
  const form = JSON.parse(await readFile(formFile, 'utf8'));
  const id: string = form.id ?? Date.now().toString(36);
  const images: string[] = Array.isArray(form.images) ? form.images : [];

  // 1) 계획 (AI 또는 폴백)
  const { plan, source, note } = await planWithAI({
    description: form.description, prompt: form.prompt, cutCount: form.cutCount,
    productName: form.productName, category: form.category,
  });

  // 2) 조립 → Template
  const tpl = assemble(plan, { id, category: form.category, brandColor: form.brandColor, images });

  // 3) 이미지 임베드 (Figma·HTML 동일 데이터)
  await embedImages(tpl);

  // 4) 출력 경로
  const outDir = resolve('public', 'generated', id);
  await mkdir(outDir, { recursive: true });
  const htmlPath = resolve(outDir, 'page.html');
  await writeFile(htmlPath, fullHTML(tpl), 'utf8');

  // Figma: 웹 생성본은 figma-generated/ 로 분리(16종 라이브러리 figma-templates/code.js 보존).
  // 플러그인을 figma-generated/manifest.json 로 한 번 등록해두면 매 생성마다 최신 디자인이 반영됨.
  await mkdir('figma-generated', { recursive: true });
  const code = `// 자동 생성됨 (generate-web). 최신 웹 생성 1개.\nconst TEMPLATES = ${JSON.stringify([tpl])};\n${RUNTIME}`;
  await writeFile('figma-generated/code.js', code, 'utf8');
  await writeFile('figma-generated/manifest.json', JSON.stringify({ name: '상세페이지 생성본 (최신)', id: 'detailpage-generated', api: '1.0.0', main: 'code.js', editorType: ['figma'] }, null, 2), 'utf8');
  await writeFile(resolve(outDir, 'code.js'), code, 'utf8');

  // 5) PNG 스크린샷
  let pngOk = false;
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle', timeout: 60000 });
    try { await page.evaluate(() => (document as any).fonts.ready); } catch {}
    await page.waitForTimeout(700);
    await page.locator('.tpl').screenshot({ path: resolve(outDir, 'page.png') });
    await browser.close();
    pngOk = true;
  } catch (e) { /* PNG 실패해도 HTML/Figma는 유효 */ }

  // 6) 결과 기록
  const result = {
    id,
    htmlUrl: `/generated/${id}/page.html`,
    pngUrl: pngOk ? `/generated/${id}/page.png` : null,
    codeUrl: `/generated/${id}/code.js`,
    height: tpl.h,
    cuts: plan.cuts.length,
    cutTypes: plan.cuts.map((c) => c.type),
    planSource: source,
    note: note ?? null,
  };
  await writeFile(resultFile, JSON.stringify(result), 'utf8');
  console.log(`✅ 생성: ${id} · ${plan.cuts.length}컷 · 계획=${source} · ${tpl.h}px`);
}
main().catch((e) => { console.error(e); process.exit(1); });
