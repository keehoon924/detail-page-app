/**
 * 하이브리드 렌더 — 텍스트 합성 단계(②).
 *
 * OpenAI가 생성한 배경(assets/bg-test.png) 위에 한글 카피를 코드로 올리고
 * Playwright로 860px 폭 1컷을 output/sample-openai.png 로 뽑는다.
 *
 * 핵심: 배경=이미지(글자 없음) / 텍스트=코드(또렷한 한글).
 */
import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';

const WIDTH = 860;
const HEIGHT = 1290; // 배경(1024x1536, 2:3)에 맞춘 비율 → 크롭 없이 꽉 차게
const BG_PATH = 'assets/bg-test.png';

// 샘플 히어로 컷(s01-hero) — 실제로는 03-copy.json 의 text 가 들어온다.
const cut = {
  badge: 'AirPure X · 차량용 공기청정기',
  headline: '운전석 공기,\n이제 의심하지 마세요',
  subcopy: '3단 헤파필터가 미세먼지·냄새를 빨아들이는\n한 손 크기 무선 청정기',
  cta: '오늘만 28% 할인',
};

async function buildHtml() {
  const bg = await readFile(BG_PATH);
  const bgUri = `data:image/png;base64,${bg.toString('base64')}`;
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Pretendard', 'Malgun Gothic', sans-serif; -webkit-font-smoothing: antialiased; }
  .cut { width: ${WIDTH}px; height: ${HEIGHT}px; position: relative; overflow: hidden; background: #0b1f3a; color: #fff; }
  .bg { position: absolute; inset: 0; background-image: url('${bgUri}'); background-size: cover; background-position: center; }
  /* 상단 가독성용 스크림 (배경 위 텍스트 대비 확보) */
  .scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(4,12,24,0.72) 0%, rgba(4,12,24,0.25) 34%, rgba(4,12,24,0) 52%); }
  .content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 76px 64px 64px; }
  .badge { font-size: 21px; font-weight: 600; color: #9fdcff; border: 1px solid rgba(159,220,255,0.5); padding: 9px 20px; border-radius: 999px; }
  .headline { font-size: 60px; font-weight: 800; line-height: 1.24; letter-spacing: -1px; white-space: pre-line; margin-top: 30px; text-shadow: 0 2px 20px rgba(0,0,0,0.35); }
  .subcopy { font-size: 25px; font-weight: 400; line-height: 1.6; color: rgba(255,255,255,0.88); white-space: pre-line; margin-top: 26px; text-shadow: 0 1px 12px rgba(0,0,0,0.3); }
  .spacer { flex: 1; }
  .cta { font-size: 26px; font-weight: 700; background: #ff5a5f; color: #fff; padding: 20px 46px; border-radius: 14px; box-shadow: 0 16px 36px rgba(255,90,95,0.4); }
</style>
</head>
<body>
  <div class="cut" id="cut">
    <div class="bg"></div>
    <div class="scrim"></div>
    <div class="content">
      <div class="badge">${cut.badge}</div>
      <div class="headline">${cut.headline}</div>
      <div class="subcopy">${cut.subcopy}</div>
      <div class="spacer"></div>
      <div class="cta">${cut.cta}</div>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  await mkdir('output', { recursive: true });
  const html = await buildHtml();
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => (document as any).fonts.ready).catch(() => {});
  await page.waitForTimeout(400);
  await page.locator('#cut').screenshot({ path: 'output/sample-openai.png' });
  await browser.close();
  console.log('✅ output/sample-openai.png 생성 완료 (배경=OpenAI / 텍스트=코드 합성)');
}

main().catch((e) => {
  console.error('렌더 실패:', e);
  process.exit(1);
});
