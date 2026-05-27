/**
 * 오트밀리 상세페이지 렌더 — HTML → PNG (Playwright).
 * 출력: output/oatmeally/index.html, full.png (전체), 01.png.. (섹션별)
 * 폭 860px · deviceScaleFactor 2 (고해상도, Figma 임포트용).
 */
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildHTML } from './build-html.ts';

const OUT = 'output/oatmeally';

async function main() {
  await mkdir(OUT, { recursive: true });
  const html = buildHTML();
  const htmlPath = resolve(OUT, 'index.html');
  await writeFile(htmlPath, html, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 860, height: 1200 },
    deviceScaleFactor: 2,
  });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle', timeout: 60000 });
  try { await page.evaluate(() => (document as any).fonts.ready); } catch {}
  await page.waitForTimeout(1200); // 웹폰트/이미지 안정화

  // 전체 1장
  await page.locator('.page').screenshot({ path: resolve(OUT, 'full.png') });

  // 섹션별
  const secs = await page.locator('.sec').all();
  let i = 0;
  for (const s of secs) {
    i++;
    const n = String(i).padStart(2, '0');
    await s.screenshot({ path: resolve(OUT, `${n}.png`) });
  }

  await browser.close();
  console.log(`✅ 렌더 완료 — full.png + ${i}개 섹션 → ${OUT}`);
}
main().catch((e) => { console.error('렌더 실패:', e); process.exit(1); });
