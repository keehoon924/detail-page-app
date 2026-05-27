/**
 * v2 레이아웃 엔진 데모 (무과금) — AirPure X 콘텐츠로 7컷.
 * 솔리드 컬러 섹션 + 웨이브/대각선 divider + 뱃지/손글씨/블롭 + 다단·비교·리뷰·FAQ·GIF.
 * 제품 사진은 기존 assets/ 이미지를 재사용(배경 아님, 합성 슬롯).
 */
import { mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { buildCutV2, type CutRender } from './lib/layout-v2.ts';

async function dataUri(path: string): Promise<string | undefined> {
  if (!existsSync(path)) return undefined;
  const b = await readFile(path);
  return `data:image/png;base64,${b.toString('base64')}`;
}

async function main() {
  const heroImg = await dataUri('assets/bg-01.png');
  const filterImg = await dataUri('assets/bg-05.png');

  const cuts: CutRender[] = [
    {
      id: 's01', layout: 'hero', bg: '#FFF3E0', next: '#2563EB', divider: 'wave', accent: '#2563EB',
      handwrite: '무선 차량용 공기청정기', badge: { text: '누적 판매 1위', kind: 'pill' },
      headline: '운전석 공기,\n이제 의심하지 마세요',
      subcopy: 'H13 헤파 3단 필터로 미세먼지·냄새까지', imageDataUri: heroImg,
    },
    {
      id: 's02', layout: 'feature-split', bg: '#2563EB', next: '#FFFFFF', divider: 'diagonal', accent: '#FFD166',
      badge: { text: 'POINT 01', kind: 'pill' }, headline: '초미세먼지\n99.95% 포집',
      body: '프리필터·활성탄·H13 헤파 3단 구조가 미세먼지·냄새·유해가스를 잡아냅니다.',
      stat: [{ value: '99.95%', label: '0.3㎛ 미세먼지 포집' }, { value: '3단', label: '필터 구조' }],
      imageDataUri: filterImg, imageRight: true,
    },
    {
      id: 's03', layout: 'columns', bg: '#FFFFFF', next: '#EEF6FF', divider: 'wave', accent: '#2563EB',
      badge: { text: 'FEATURES', kind: 'pill' }, headline: 'AirPure X, 3가지 핵심',
      columns: [
        { emoji: '🌀', title: 'H13 헤파 3단', caption: '미세먼지·냄새·유해가스 정화' },
        { emoji: '🔋', title: 'USB-C 무선', caption: '완충 8시간, 컵홀더에 쏙' },
        { emoji: '🔇', title: '60dB 저소음', caption: '운전 중에도 조용하게' },
      ],
    },
    {
      id: 's04', layout: 'gif', bg: '#EEF6FF', next: '#F8FAFC', divider: 'wave', accent: '#2563EB',
      handwrite: '작동 모습 미리보기', headline: '공기질 LED, 실시간으로 바뀝니다',
      subcopy: '움짤로 작동 장면을 보여주세요', gifLabel: 'GIF',
    },
    {
      id: 's05', layout: 'comparison', bg: '#F8FAFC', next: '#FCE7F0', divider: 'diagonal', accent: '#2563EB',
      headline: '일반 청정기 vs AirPure X',
      comparison: {
        headers: ['', '일반 청정기', 'AirPure X'], highlightCol: 2,
        rows: [
          { label: '필터 등급', cells: ['저급 필터', 'H13 헤파'] },
          { label: '소음', cells: ['크다', '60dB 이하'] },
          { label: '전원', cells: ['유선', 'USB-C 무선'] },
          { label: '크기', cells: [false, true] },
        ],
      },
    },
    {
      id: 's06', layout: 'review', bg: '#FCE7F0', next: '#F1F5F9', divider: 'wave', accent: '#E8467C',
      badge: { text: 'REAL REVIEW', kind: 'pill' }, headline: '리얼 고객 리뷰',
      reviews: [
        { rating: 5, text: '차에서 음식 냄새가 정말 안 나요. 출퇴근이 쾌적해졌습니다.', user: 'kim2***' },
        { rating: 5, text: '생각보다 조용하고, LED로 공기질 보는 재미가 있어요.', user: '@drive***' },
        { rating: 4, text: '크기가 작아 컵홀더에 딱 맞아요. 필터 교체도 간편합니다.', user: 'hye0***' },
      ],
    },
    {
      id: 's07', layout: 'faq', bg: '#F1F5F9', divider: 'none', accent: '#2563EB',
      headline: '자주 묻는 질문',
      faqs: [
        { q: '필터는 얼마나 자주 교체하나요?', a: '사용 환경에 따라 3~4개월마다 교체를 권장합니다.' },
        { q: '충전은 어떻게 하나요?', a: 'USB-C 케이블로 충전하며, 완충 시 약 8시간 작동합니다.' },
        { q: '소음이 심하지 않나요?', a: '60dB 이하 저소음 설계로 운전 중에도 거슬리지 않습니다.' },
        { q: '차량 외에도 쓸 수 있나요?', a: '책상·유모차 등 5㎡ 이내 공간이면 어디서나 사용 가능합니다.' },
      ],
    },
  ];

  await mkdir('output/v2', { recursive: true });
  const browser = await chromium.launch();
  let i = 0;
  for (const c of cuts) {
    i++;
    const html = buildCutV2(c);
    const page = await browser.newPage({ viewport: { width: 860, height: 1500 }, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => (document as any).fonts.ready).catch(() => {});
    await page.waitForTimeout(450);
    const file = `output/v2/${String(i).padStart(2, '0')}-${c.layout}.png`;
    await page.locator('#cut').screenshot({ path: file });
    await page.close();
    console.log('✓', file);
  }
  await browser.close();
  console.log('\n✅ v2 데모 7컷 완료 → output/v2/');
}

main().catch((e) => {
  console.error('데모 실패:', e);
  process.exit(1);
});
