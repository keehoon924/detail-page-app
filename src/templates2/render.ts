/** 템플릿2 렌더 — 각 템플릿 → output/templates2/<id>.png + thumbs/<id>.png(검증용 축소). */
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { ALL2 } from './content/index.ts';
import { buildPage } from './page.ts';

const OUT = 'output/templates2';

async function main() {
  const only = process.argv[2]; // 특정 id만 렌더(옵션)
  const list = only ? ALL2.filter((t) => t.id === only) : ALL2;
  await mkdir(`${OUT}/thumbs`, { recursive: true });
  const browser = await chromium.launch();
  for (const tpl of list) {
    const w = tpl.width ?? 860;
    const html = buildPage(tpl);
    const htmlPath = resolve(OUT, `${tpl.id}.html`);
    await writeFile(htmlPath, html, 'utf8');
    const page = await browser.newPage({ viewport: { width: w, height: 1200 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle', timeout: 60000 });
    try { await page.evaluate(() => (document as any).fonts.ready); } catch {}
    await page.waitForTimeout(800);
    const full = resolve(OUT, `${tpl.id}.png`);
    await page.locator('.page').screenshot({ path: full });
    await page.close();
    // 검증용 축소 썸네일 (높이 1500 이하)
    await sharp(full).resize({ height: 1500 }).toFile(resolve(OUT, 'thumbs', `${tpl.id}.png`));
    const meta = await sharp(full).metadata();
    console.log(`✅ ${tpl.category}/${tpl.id}  (${meta.width}x${meta.height}, ${tpl.sections.length} sections)`);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
