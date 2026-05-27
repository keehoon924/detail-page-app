/**
 * 템플릿 빌드 — 모든 스펙(specs/index.ts) →
 *  ① figma-templates/code.js + manifest.json  (Figma 편집 레이어)
 *  ② output/templates/preview.html + <id>.png  (내 검증용)
 * 사용: npx tsx src/templates/build.ts        (플러그인 + HTML)
 *       npx tsx src/templates/build.ts --png   (+ PNG 스크린샷)
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ALL } from './specs/index.ts';
import { RUNTIME } from './figma-runtime.ts';
import { pageHTML } from './preview.ts';

function mimeOf(p: string): string {
  const s = p.toLowerCase();
  if (s.endsWith('.png')) return 'image/png';
  if (s.endsWith('.webp')) return 'image/webp';
  if (s.endsWith('.gif')) return 'image/gif';
  if (s.endsWith('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}

/** 블록의 src 이미지를 읽어 base64로 주입 (Figma·HTML 양쪽이 같은 데이터 사용) */
async function embedImages(): Promise<{ ok: number; miss: string[] }> {
  let ok = 0; const miss: string[] = [];
  for (const t of ALL) for (const b of t.blocks) {
    if (b.src && !b.b64) {
      try { const buf = await readFile(resolve(b.src)); b.b64 = buf.toString('base64'); b.mime = mimeOf(b.src); ok++; }
      catch { miss.push(b.src); }
    }
  }
  return { ok, miss };
}

async function main() {
  const wantPng = process.argv.includes('--png');
  await mkdir('figma-templates', { recursive: true });
  await mkdir('output/templates', { recursive: true });

  const emb = await embedImages();
  if (emb.ok) console.log(`🖼️  이미지 ${emb.ok}개 임베드`);
  if (emb.miss.length) console.warn(`⚠️  이미지 없음(placeholder 유지): ${emb.miss.join(', ')}`);

  // ① Figma 플러그인
  const code = `// 자동 생성됨 (src/templates/build.ts). ${ALL.length}개 템플릿.\nconst TEMPLATES = ${JSON.stringify(ALL)};\n${RUNTIME}`;
  await writeFile('figma-templates/code.js', code, 'utf8');
  await writeFile('figma-templates/manifest.json', JSON.stringify({
    name: '상세페이지 템플릿 (레퍼런스 재현)',
    id: 'detailpage-templates',
    api: '1.0.0',
    main: 'code.js',
    editorType: ['figma'],
  }, null, 2), 'utf8');

  // ② HTML 프리뷰
  const html = pageHTML(ALL);
  const htmlPath = resolve('output/templates/preview.html');
  await writeFile(htmlPath, html, 'utf8');

  console.log(`✅ ${ALL.length}개 템플릿 빌드: figma-templates/code.js, ${htmlPath}`);
  ALL.forEach((t) => console.log(`   - ${t.category}/${t.id} (${t.w}×${t.h}, ${t.blocks.length} blocks)`));

  if (wantPng) {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle', timeout: 60000 });
    try { await page.evaluate(() => (document as any).fonts.ready); } catch {}
    await page.waitForTimeout(1000);
    const tpls = await page.locator('.tpl').all();
    for (let i = 0; i < ALL.length && i < tpls.length; i++) {
      await tpls[i].screenshot({ path: resolve('output/templates', `${ALL[i].id}.png`) });
    }
    await browser.close();
    console.log(`🖼️  PNG ${Math.min(ALL.length, tpls.length)}장 → output/templates/`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
