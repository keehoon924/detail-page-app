import type { Template } from '../types.ts';
import { Flow } from '../flow.ts';

const NAVY = '#2b3147', INK = '#2b2b2b', SUB = '#8a8580', PINK = '#dcb6c6', CREAM = '#f3efe9', LG = '#f4f2ee', W = '#ffffff';

/* 프리미엄A — WEDGWOOD 페스티비티 4인 홈세트 17P (939×39597 → 640 단일세로) */
function premiumA(): Template {
  const f = new Flow(640, 48);
  // 정품 배너
  f.text('WEDGWOOD  EST 1759', 16, { align: 'center', weight: 800, color: INK, ls: 1 });
  f.gap(10);
  let s = f.at(); f.band(110, NAVY);
  f.gap(24);
  f.text('웨지우드 한국 공식 수입원', 17, { align: 'center', weight: 800, color: W });
  f.text('본 상품은 한국 공식수입원을 통해 유통되는 정품입니다.', 12, { align: 'center', color: '#c9cdd8' });
  f.set(s + 110); f.gap(20);
  // 키비주얼
  s = f.at(); f.band(420, '#e9dfe2');
  f.gap(40);
  f.text('Festivity', 36, { align: 'center', weight: 700, color: NAVY, font: 'serif' });
  f.text('페스티비티', 14, { align: 'center', color: '#7a6b70' });
  f.photo(260, '테이블 세팅 (핑크 식기 + 와인) 키비주얼', { x: 60, w: 520 });
  f.set(s + 420); f.gap(24);
  // 구성
  f.text('웨지우드', 13, { align: 'center', color: SUB, ls: 2 });
  f.text('페스티비티 4인 홈세트 17P', 26, { align: 'center', weight: 800, color: INK });
  f.text('구성  빵접시 4P · 국대접시 4P · 대접시 1P · 중접시 2P\n종지 2P · 소대접시 2P · 텀블러(머스타드) 2P', 13, { align: 'center', color: SUB, lineH: 1.7 });
  f.photo(220, '17P 홈세트 전체 구성컷', { x: 90, w: 460 });
  // 상세 구성
  f.text('상세 구성', 20, { align: 'center', weight: 800, color: INK });
  const items = ['빵접시 4P', '국접시 4P', '대접시 1P', '중접시 2P', '종지 2P', '소대접시 2P', '텀블러 2P', '머스타드 2P'];
  const gx = f.at();
  items.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const cw = (f.w - 96 - 20) / 2, x = 48 + col * (cw + 20), y = gx + row * 150;
    f.add({ t: 'photo', x, y, w: cw, h: 120, shape: 'rect', radius: 8, label: t });
  });
  f.set(gx + 4 * 150);
  // 클래식과 모던
  f.text('클래식과 모던의 조화, 페스티비티', 22, { align: 'center', weight: 800, color: INK });
  f.text('1759년 전통의 웨지우드가 현대적 감각으로 재해석한 식기로,\n일상의 식탁부터 특별한 홈파티까지 품격 있게 연출합니다.', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.photo(220, '테이블 세팅 연출컷', { x: 60, w: 520 });
  f.text('테이블로 사용하기에 좋은 아이템', 16, { align: 'center', weight: 700, color: INK });
  f.photo(200, '디저트 플레이팅 (딸기·케이크)', { x: 60, w: 520 });
  // Welcome to Wedgwood
  s = f.at(); f.band(300, CREAM);
  f.gap(30);
  f.text('Welcome to Wedgwood', 26, { align: 'center', weight: 700, color: NAVY, font: 'serif' });
  f.text('웨지우드는 1759년 설립 이래 260여 년간 영국의 프리미엄\n디너웨어 스타일을 이끌어온 헤리티지 테이블웨어입니다.', 13, { align: 'center', color: SUB, lineH: 1.7 });
  f.text('여왕의 도자기, 웨지우드', 18, { align: 'center', weight: 800, color: INK });
  f.text('영국 왕실 인정 도자기 브랜드로 정통성과 품격을 갖춘 식기입니다.', 12, { align: 'center', color: SUB });
  f.set(s + 300); f.gap(24);
  // 본 차이나
  f.text('웨지우드 본 차이나', 22, { align: 'center', weight: 800, color: INK });
  f.text('시각예술로 사랑받는 최고 품질의 본 차이나로 견고하고 정교한\n마감과 은은한 광택, 우아한 색감을 가지고 있습니다.', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.photo(180, '본 차이나 텍스처 클로즈업', { x: 90, w: 460 });
  // 사소한 오해
  s = f.at(); f.band(360, '#eceae6');
  f.gap(24);
  f.text('WEDGWOOD', 16, { align: 'center', weight: 800, color: NAVY });
  f.text('제품에 관한 사소한 오해', 22, { align: 'center', weight: 800, color: INK });
  f.text('Q. 색상이 조금씩 달라 보여요\nQ. 표면에 작은 점이 보여요\nQ. 도자기 굽 부분이 거칠어요\n→ 수작업 공정과 천연 소재 특성상 자연스러운 현상입니다.', 13, { align: 'center', color: INK, lineH: 1.9 });
  f.photo(150, '제품 디테일 컷', { x: 90, w: 460 });
  f.set(Math.max(f.at(), s + 360)); f.gap(20);
  // Tip
  f.text('Tip', 22, { align: 'center', weight: 700, color: NAVY, font: 'serif' });
  f.text('취급 및 관리 주의사항', 18, { align: 'center', weight: 800, color: INK });
  f.text('· 식기세척기·전자레인지 사용 가능 여부를 확인하세요\n· 급격한 온도 변화를 피하세요\n· 금속 수세미·연마제 사용을 피하세요\n· 겹쳐 보관 시 사이에 천을 끼워 보관하세요', 12, { align: 'center', color: SUB, lineH: 1.9 });
  f.photo(160, '식기 + 딸기 연출컷', { x: 120, w: 400 });
  // 푸터
  s = f.at(); f.band(140, NAVY);
  f.gap(40);
  f.text('WEDGWOOD  EST 1759', 16, { align: 'center', weight: 800, color: W });
  f.text('ⓒ WEDGWOOD All rights reserved', 11, { align: 'center', color: '#c9cdd8' });
  f.set(s + 140); f.gap(24);
  f.text('상품고시정보 · 판매자정보 · 배송/교환/반품 안내', 14, { align: 'center', weight: 700, color: INK });
  f.rect(180, LG, { radius: 10, gap: 16 });
  f.add({ t: 'text', x: 70, y: f.at() - 164, w: 500, text: '품명  웨지우드 페스티비티 4인 홈세트 17P\n소재  본차이나      원산지  영국(수입)\n구성  17P      A/S  한국 공식수입원\n※ 마켓컬리 상품 고시정보 / 고객센터 안내 영역', size: 12, weight: 500, color: INK, lineH: 2 });

  return f.done('프리미엄A', '프리미엄', '#ffffff');
}

export const PREMIUM: Template[] = [premiumA()];
