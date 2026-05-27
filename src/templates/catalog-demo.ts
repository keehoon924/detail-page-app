/**
 * 섹션 카탈로그 데모 — sections.ts의 모든 섹션을 한 페이지에 예시로 쌓아 시각 검증/메뉴로 사용.
 * 실행: npx tsx src/templates/catalog-demo.ts  → output/templates/_카탈로그.png
 * (16종 빌드와 분리. figma code.js 오염 없음)
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { P } from './kit.ts';
import { templateHTML } from './preview.ts';
import * as S from './sections.ts';
import type { Template } from './specs/types.ts';

function divider(p: P, t: string) {
  const y = p.at();
  p.bg(44, '#222', { x: 0, w: 860, y });
  p.atext(0, y + 12, 860, t, 16, { weight: 800, color: '#fff', align: 'center', ls: 1 });
  p.to(y + 44 + 30);
}

function demo(): Template {
  const p = new P(860, 64);

  divider(p, '히어로 ① 엠블럼형 (heroEmblem)');
  S.heroEmblem(p, { emblem: 'BRAND', script: '매일 아침이 든든한', title: '제품명\n두 줄까지', sub: 'ENGLISH TAGLINE', photoLabel: '메인 비주얼', chips: ['특징 A', '특징 B', '특징 C'] });

  divider(p, '히어로 ② 컬러밴드형 (heroBand)');
  S.heroBand(p, { bg: '#1c1c1c', eyebrow: '차원이 다른', title: '브랜드 제목', titleColor: '#ff5a3c', sub: '서브 카피', photoLabel: '메인 비주얼', photoH: 240, pill: '당일 생산, 당일 소진!', pillBg: '#ff5a3c', body: '두 줄짜리 핵심 메시지를\n여기에 담습니다', bodyColor: '#fff' });

  divider(p, '히어로 ③ 미니멀 빅타이포 (heroBigType)');
  S.heroBigType(p, { brand: 'MILAS', brandSub: 'MINIMAL LIFE STYLE', title: '듀얼 바스켓\n글라스 에어프라이어', divider: true, body: '이전까지 없던 주방의 혁신\n조리부터 보관까지 한번에', photoLabel: '제품 히어로' });

  divider(p, '번호 스텝 (stepsRow) + 섹션제목 (sectionLabel)');
  S.sectionLabel(p, 'WHEN TO EAT?', '언제 먹어도 완벽한 한 끼');
  S.stepsRow(p, [['01', '아침 대용', '우유에 부어 3분'], ['02', '간식·야식', '가볍게 즐기는'], ['03', '요거트와', '상큼한 한 그릇']]);
  p.gap(40);

  divider(p, '원형 캡션 그리드 (circleCaptionGrid)');
  S.circleCaptionGrid(p, ['국산 통귀리', '견과류', '건과일', '비정제원당'], 4);
  p.gap(40);

  divider(p, '아이콘 그리드 3×3 (iconGrid)');
  S.iconGrid(p, [['BLDC 모터', '조용한'], ['초소형', '한 손에'], ['100g', '가벼운'], ['USB-C', '호환 OK'], ['3단 풍량', ''], ['5엽 날개', '자체제작'], ['튼튼', '일체형'], ['스트랩', '낙상 NO'], ['안전인증', '안심']], 3, { iconBg: 'square', d: 90, gapY: 50, subColor: '#8a8a8a' });
  p.gap(20);

  divider(p, '약속 밴드 (promiseBand)');
  S.promiseBand(p, { bg: '#c43a2f', eyebrow: 'OUR PROMISE', pill: 'CHECK POINT', items: ['국내산 원료만 사용합니다', '매일 소량씩 직접 만듭니다', '불필요한 첨가물은 넣지 않습니다'] });

  divider(p, '후기 알약 (reviewPills)');
  S.reviewPills(p, ['믿고 먹는 최고의 맛!', '재구매 의사 100%', '선물로도 완벽해요']);
  p.gap(20);

  divider(p, '후기 카드 + 형광 (reviewCards)');
  S.reviewCards(p, [['isil***  ·  24.06.03', '받자마자 만족, 강력 추천합니다 👍'], ['skyg****  ·  24.06.14', '두 번째 구매예요. 품질이 한결같아 좋습니다!']], { highlight: '#ffe89a' });
  p.gap(20);

  divider(p, '평점 카드 (ratingCard)');
  S.ratingCard(p, { brand: '브랜드 1세대', score: '4.9 / 5', reviews: '전체리뷰수  7,721개', satisfaction: '고객만족도  98.6%', note: '(네이버스토어 리뷰기준)' });

  divider(p, '비교 카드 (compareCard)');
  S.compareCard(p, { left: { title: '일반 제품', lines: '여러 단계 필요\n번거로운 관리\n일관성 부족' }, right: { title: '우리 제품', lines: '하나로 끝\n간편한 관리\n일관된 품질' } });

  divider(p, '체크리스트 (checklist)');
  S.checklist(p, ['핵심 장점 첫 번째', '핵심 장점 두 번째', '핵심 장점 세 번째', '핵심 장점 네 번째']);
  p.gap(20);

  divider(p, '좌우 특징 (featureLR)');
  S.featureLR(p, { title: 'Easy.', body: '1초 분리형\n2pcs 쉬운 세척\n자동 세척 모드', photoSide: 'left' });

  divider(p, '스택 특징 (featureStack)');
  S.featureStack(p, { eyebrow: '기름 없이도 바삭하게', title: '강력한 열풍 순환 기술', pill: '컨벡션 기술', pillBg: '#3a3a3a', body: '내부 열을 빠르게 순환시켜\n완벽한 조리 결과를 만듭니다', photoLabel: '열풍 순환 연출' });

  divider(p, '2열 포인트 카드 (pointCards)');
  S.pointCards(p, [['POINT 1', '천연 재료', '국내산 원료'], ['POINT 2', '당일 배송', '신선하게'], ['POINT 3', '수제 공정', '정성껏'], ['POINT 4', '비법 노하우', '깊은 풍미']]);
  p.gap(20);

  divider(p, '추천 대상 카드 (recommendCards)');
  S.recommendCards(p, [['출퇴근·야외가 많은 직장인', '가방에 쏙, 휴대 부담 없이'], ['아웃도어족', '최대 5시간, 야외에서도 OK']]);
  p.gap(20);

  divider(p, '스펙 표 (specRows) / 정보 알약 (infoPillRows)');
  S.specRows(p, [['제품명', '예시 제품'], ['모델명', 'AB-123'], ['용량', '300g'], ['제조국', '대한민국']]);
  S.infoPillRows(p, [['원재료', '국산 원료 100%'], ['보관방법', '직사광선 피해 실온']]);
  p.gap(20);

  divider(p, '최종 CTA 밴드 (ctaBand)');
  S.ctaBand(p, { bg: '#c43a2f', eyebrow: 'ORDER NOW', title: '지금 만나보세요', sub: '오늘 주문하면 오늘 발송', chips: ['첫 구매 10%', '무료배송', '정기배송'], chipBg: '#a82e25', button: '지금 주문하기' });

  return p.done('_카탈로그', '카탈로그', '#f4f1ec');
}

async function main() {
  await mkdir('output/templates', { recursive: true });
  const tpl = demo();
  const html = `<!doctype html><meta charset="utf-8"><style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Serif+KR:wght@400;700&display=swap');
  *{margin:0;box-sizing:border-box}body{font-family:Pretendard;background:#ccc;padding:20px}</style>
  ${templateHTML(tpl)}`;
  const hp = resolve('output/templates/_카탈로그.html');
  await writeFile(hp, html, 'utf8');
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(hp).href, { waitUntil: 'networkidle' });
  try { await page.evaluate(() => (document as any).fonts.ready); } catch {}
  await page.waitForTimeout(800);
  await page.locator('.tpl').screenshot({ path: resolve('output/templates/_카탈로그.png') });
  await browser.close();
  console.log('✅ 카탈로그 데모 → output/templates/_카탈로그.png (높이', tpl.h, ')');
}
main().catch((e) => { console.error(e); process.exit(1); });
