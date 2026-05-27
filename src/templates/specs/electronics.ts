/** 전자기기 5종 — 레퍼런스 단일 연속 상세페이지 재현. */
import type { Template } from '../types.ts';
import { P } from '../kit.ts';

const W = 860;

/* 아이콘 그리드 (rows×cols, 아이콘 placeholder + 캡션). 커서 전진. */
function iconGrid(p: P, items: [string, string?][], cols: number, o: { iconBg?: 'circle' | 'square'; d?: number; gapX?: number; gapY?: number; capColor?: string; subColor?: string; capSize?: number } = {}) {
  const d = o.d ?? 96, gapX = o.gapX ?? 24, gapY = o.gapY ?? 70;
  const colW = (p.cw() - gapX * (cols - 1)) / cols;
  const rowH = d + (o.subColor ? 88 : 60) + gapY;
  const top = p.at();
  items.forEach((it, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = 64 + c * (colW + gapX), y = top + r * rowH;
    p.aphoto(x + (colW - d) / 2, y, d, d, '', { shape: o.iconBg === 'square' ? 'rect' : 'circle', radius: 20 });
    p.atext(x - 4, y + d + 14, colW + 8, it[0], o.capSize ?? 17, { weight: 700, color: o.capColor ?? '#2b2b2b', align: 'center', lineH: 1.35 });
    if (it[1]) p.atext(x - 4, y + d + 14 + (o.capSize ?? 17) * 1.5, colW + 8, it[1], 14, { color: o.subColor ?? '#8a8a8a', align: 'center' });
  });
  const rows = Math.ceil(items.length / cols);
  p.to(top + rows * rowH);
}

/* ══════════ 밥솥 — CUCKOO 에그밥솥 (화이트 미니멀) ══════════ */
function ricecooker(): Template {
  const BG = '#f3f1ee', W2 = '#fff', INK = '#2b2b2b', SUB = '#8a8a8a',
    GR = '#5e9a4e', GRD = '#4a7d3e', RDB = '#8a2c2c';
  const p = new P(W, 64);

  // 01 HERO
  p.bg(620, '#efece7');
  p.gap(52);
  p.ctext('CUCKOO', 20, { weight: 800, color: INK, ls: 2, gap: 50 });
  p.ctext('EGG RICE COOKER', 38, { weight: 800, color: INK, ls: 1, gap: 18 });
  p.ctext('깨끗하고 세련된 디자인을 담다', 18, { color: SUB, gap: 36 });
  p.pill('쿠쿠 에그밥솥', { cx: true, bg: '#3a3a3a', color: '#fff', size: 16, advance: true, gap: 44 });
  p.photo(330, '주방 선반 위 제품 (히어로)', { radius: 0, gap: 60 });

  // 02 DESIGN STORY
  p.gap(20);
  p.text('CR-0675FW', 14, { weight: 600, color: SUB, ls: 1, gap: 26 });
  p.text('DESIGN STORY', 30, { weight: 800, color: INK, gap: 40 });
  p.cols(2, 30, (i, x, cw) => p.aphoto(x, p.at(), cw, 170, ['디자인 스케치', '에그 홀더 연출'][i], { radius: 12 }));
  p.gap(186);
  p.text('심플하고 깨끗한 디자인', 24, { weight: 800, color: INK, gap: 34 });
  p.text('무광의 매트한 질감이 깨끗한 주방부터 특색있는 주방까지\n모두 잘 어울릴 수 있게 디자인 되었습니다.', 17, { color: SUB, lineH: 1.7, gap: 60 });

  // 03 라이프 그리드
  p.cols(2, 16, (i, x, cw) => { p.aphoto(x, p.at(), cw, 160, '', { radius: 8 }); p.aphoto(x, p.at() + 172, cw, 160, '', { radius: 8 }); });
  p.gap(348);

  // 04 맞춤 밥맛
  p.ctext('아이와 부모님까지 만족', 32, { weight: 800, color: INK, gap: 18 });
  p.pill('맞춤 밥맛 기능', { cx: true, bg: '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 40 });
  {
    const it = [['찰진밥', '쫀득쫀득하고 차진 식감'], ['부드러운밥', '촉촉하고 부드러운 밥맛'], ['구수한밥', '겉과 속이 골고루 익어']];
    const top = p.at();
    p.cols(3, 24, (i, x, cw) => {
      p.aphoto(x, top, cw, 120, '', { radius: 10 });
      p.atext(x, top + 134, cw, it[i][0], 19, { weight: 800, color: GRD, align: 'center' });
      p.atext(x - 4, top + 168, cw + 8, it[i][1], 14, { color: SUB, align: 'center', lineH: 1.4 });
    });
    p.to(top + 240);
  }
  p.gap(50);

  // 05 다양한 음식
  p.bg(560, BG);
  p.gap(56);
  p.ctext('다양한 음식까지', 32, { weight: 800, color: INK, gap: 18 });
  p.pill('다양한 요리 기능', { cx: true, bg: '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 30 });
  p.ctext('쿠쿠와 함께 다양한 요리기능을 응용하여 맛있는 요리를 만들어보세요.', 16, { color: SUB, gap: 40 });
  p.photo(280, '요리 콜라주 (갈비찜·백미·이유식·잡곡밥·볶음밥·건강죽)', { radius: 12, gap: 56 });

  // 06 디스플레이
  p.photo(300, '디스플레이 클로즈업', { radius: 0, gap: 40 });
  p.ctext('조작이 쉽고 편리한 디스플레이', 26, { weight: 800, color: INK, gap: 32 });
  p.pill('터치 방식 디스플레이', { cx: true, bg: '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 26 });
  p.ctext('터치 방식으로 간편하게 다양한 기능을 사용하실 수 있습니다.', 16, { color: SUB, gap: 70 });

  // 07 원터치 오픈
  p.photo(280, '버튼 누르는 손', { radius: 0, gap: 40 });
  p.ctext('가볍게 누르면 가볍게 오픈', 26, { weight: 800, color: INK, gap: 32 });
  p.pill('원터치 오픈 버튼', { cx: true, bg: '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 26 });
  p.ctext('원터치로 간편하게 뚜껑을 오픈하여 맛있는 요리를 시작해보세요.', 16, { color: SUB, gap: 70 });

  // 08 분리 세척
  p.ctext('간편하게 분리 세척이 가능한', 26, { weight: 800, color: INK, gap: 32 });
  p.pill('단순 분리형 커버', { cx: true, bg: '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 26 });
  p.ctext('분리형 커버와 물받이가 탈부착이 가능하여 세척과 관리가\n더욱 용이해 위생적인 사용이 가능합니다.', 16, { color: SUB, gap: 40 });
  p.photo(320, '분리 구조 도해 (분리형커버·내솥·증기배관·증기배출구·물받이)', { radius: 10, gap: 70 });

  // 09 코팅
  p.ctext('위생적으로 안심하고 사용', 26, { weight: 800, color: INK, gap: 32 });
  p.pill('논스틱코팅 내솥', { cx: true, bg: '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 26 });
  p.ctext('쉽게 코팅이 벗겨지거나, 음식물이 눌어붙지 않아\n더욱 편리하고 맛있게 요리를 할 수 있습니다.', 16, { color: SUB, gap: 40 });
  p.photo(300, '내솥에 손 (안전한 코팅)', { radius: 0, gap: 60 });

  // 10 배수로 + 살균
  p.ctext('신선한 밥맛의 비밀 · 밥물고임 방지배수로', 22, { weight: 800, color: INK, gap: 30 });
  p.photo(240, '배수로 디테일', { radius: 0, gap: 50 });
  p.ctext('스스로 알아서 깨끗하게 · 자동 살균세척', 22, { weight: 800, color: INK, gap: 30 });
  p.photo(240, '자동 살균세척', { radius: 0, gap: 50 });
  p.ctext('이동도 편리하게 · 분리형 파워코드', 22, { weight: 800, color: INK, gap: 30 });
  p.photo(220, '분리형 파워코드', { radius: 0, gap: 64 });

  // 11 에너지 효율
  p.bg(360, '#eef0ec');
  p.gap(60);
  p.cols(2, 30, (i, x, cw) => {
    if (i === 0) p.aphoto(x, p.at(), cw, 180, '에너지효율 1등급 라벨', { radius: 10 });
    else {
      p.atext(x, p.at() + 30, cw, '전기료 부담 없이', 18, { weight: 600, color: SUB });
      p.atext(x, p.at() + 62, cw, '에너지 효율 1등급', 30, { weight: 800, color: GRD });
      p.atext(x, p.at() + 112, cw, '전기요금 걱정까지 덜어드려 맛있는 식사를 준비해보세요.', 15, { color: SUB, lineH: 1.6 });
    }
  });
  p.gap(220);

  // 12 상세정보 + SPEC
  p.bg(36, BG);
  p.text('CUCKOO', 18, { weight: 800, color: INK, gap: 8 });
  p.hr({ color: '#ddd', gap: 30 });
  p.ctext('쿠쿠 에그밥솥', 26, { weight: 800, color: INK, gap: 40 });
  {
    const rows = [['제품명', '전기보온밥솥'], ['모델명', 'CR-0675FW'], ['용량', '6인용'], ['중량', '3.5kg'], ['크기', '323(길이)x238(폭)x215(높이)mm'], ['출시년월', '2019년 11월'], ['제조국', '한국 / 중국'], ['정격전압', '교류 220V / 60Hz'], ['소비전력', '취사 580W, 보온 80W'], ['A/S', '1588-8899']];
    rows.forEach((r) => {
      const y = p.at();
      p.atext(64, y, 150, r[0], 15, { weight: 700, color: INK });
      p.atext(220, y, p.cw() - 156, r[1], 15, { color: SUB });
      p.hr({ color: '#eee', gap: 18, x: 64 });
      p.to(y + 50);
    });
  }
  p.gap(40);

  // 13 에너지 환급 (green) + 주의
  {
    const y = p.at();
    p.bg(360, GR, { x: 64, w: p.cw(), radius: 16 });
    p.atext(64, y + 30, p.cw(), '고효율가전 10% 환급 이벤트', 26, { weight: 800, color: '#fff', align: 'center' });
    p.atext(64, y + 76, p.cw(), '3자녀 이상/대가족/출산가구 등 한전복지할인 가구 대상', 15, { color: '#eaffe0', align: 'center' });
    p.aphoto(120, y + 120, W - 240, 200, '지원대상·환급금액·환급품목 안내표', { radius: 10 });
    p.to(y + 360 + 40);
  }
  {
    const y = p.at();
    p.bg(56, RDB, { x: 64, w: p.cw(), radius: 8 });
    p.atext(64, y + 16, p.cw(), '사용 시 주의사항', 20, { weight: 800, color: '#fff', align: 'center' });
    p.to(y + 56 + 24);
  }
  p.text('▷ 이물질이 있는 상태로 사용하지 않도록 해주세요\n▷ 정격 전압, 전류 기준에 맞게 사용해주세요\n▷ 전원 플러그 및 콘센트에 이물질이 없도록 해주세요', 15, { color: SUB, lineH: 2, gap: 30 });

  return p.done('밥솥', '전자기기', BG);
}

/* ══════════ 선풍기 — ANNLUCY BLDC 핸디 선풍기 (스카이블루+네이비) ══════════ */
function fan(): Template {
  const SKY = '#cfe7f4', SKY2 = '#bfe0f2', NAVY = '#1f2d52', BLU = '#2f6fd0', W2 = '#fff',
    INK = '#2b3340', SUB = '#7c8694', BG = '#eef4f8';
  const p = new P(W, 64);

  // 01 HERO (sky)
  p.bg(900, SKY);
  p.gap(56);
  p.ctext('ANNLUCY', 30, { weight: 800, color: NAVY, ls: 2, gap: 50 });
  p.ctext('일상의 모든 순간을 Cool 하게', 18, { color: NAVY, gap: 34 });
  p.ctext('앤루시 BLDC\n쿨버디 핸디 선풍기', 44, { weight: 800, color: NAVY, lineH: 1.2, gap: 124 });
  p.ctext('BLDC Cool Buddy Hand Fan', 18, { color: SUB, ls: 1, gap: 40 });
  p.chips(['ANN-0811D', 'ANN-0811E', 'ANN-0811F'], { bg: NAVY, color: '#fff', size: 15, advanceGap: 36 });
  p.photo(360, '제품 트리오 (연단 위 화이트·크림·네이비)', { radius: 16, gap: 60 });

  // 02 브랜드
  p.bg(420, BG);
  p.gap(60);
  p.ctext('ANNLUCY', 26, { weight: 800, color: NAVY, ls: 2, gap: 40 });
  p.ctext('"일상의 모든 순간을 빛나게"', 24, { weight: 700, color: INK, gap: 26 });
  p.ctext('앤루시 ANNLUCY', 15, { color: SUB, gap: 50 });
  p.ctext('앤루시는 단순한 제품을 넘어 삶에 가치를 더하는 경험을 제공합니다.\n고객의 삶 속에서 의미 있는 변화를 만들어가는 고객 친화적인 브랜드입니다.', 16, { color: SUB, lineH: 1.8, gap: 60 });

  // 03 플랫레이
  p.photo(300, '제품 플랫레이 (3color)', { radius: 16, gap: 60 });

  // 04 9가지 핵심 포인트 (blue card)
  p.bg(900, SKY2);
  p.gap(56);
  p.ctext('시원한 여름 나기에 필요한', 19, { weight: 600, color: NAVY, gap: 30 });
  p.ctext('9가지 핵심 포인트', 38, { weight: 800, color: NAVY, gap: 44 });
  {
    const y = p.at();
    p.bg(640, W2, { x: 64, w: p.cw(), radius: 24 });
    p.to(y + 40);
    const items: [string, string?][] = [
      ['BLDC 모터', '조용하고 강력한'], ['초소형 사이즈', '한 손에 들어오는'], ['100g 무게', '가벼운'],
      ['USB-C 타입', '호환 걱정 NO'], ['3단계 풍량 조절', ''], ['5엽 날개', '자체 제작'],
      ['튼튼한 내구성', '일체형 디자인'], ['핸드 스트랩', '낙상 걱정 NO'], ['안전 인증', '안심할 수 있는'],
    ];
    iconGrid(p, items, 3, { iconBg: 'square', d: 90, gapY: 56, capColor: INK, subColor: SUB });
    p.to(y + 640 + 50);
  }

  // 05~11 #01~#07
  const pts: [string, string, string, string][] = [
    ['#01', 'BLDC Motor', '최적의 소비전력 BrushLess DC', '저소음, 저발열을 실현한 프리미엄 BLDC 모터를 사용하여 조용하고 강력한 바람을 만듭니다.'],
    ['#02', 'Light weight', '100g의 가벼운 무게, 초소형 사이즈로 휴대성 Up!', '가벼운 무게와 콤팩트한 디자인으로 언제 어디서나 휴대가 가능합니다.'],
    ['#03', 'Strong wind strength', '작지만 강력한 바람 세기! 최대 5시간 사용 가능', '1,200mAh 배터리로 약 5시간을 사용할 수 있습니다. (1단 사용 시간 기준)'],
    ['#04', 'USB Type C Charging', '호환성이 좋은 C타입의 충전 단자, 배터리 걱정 없이!', '충전 중에도 지속적으로 사용할 수 있습니다. C타입 케이블로 필요할 때 언제든지 충전 가능!'],
    ['#05', 'Five-leaf wing', '자체 개발 5엽 날개로 더욱 시원한 바람!', '제조 공장과의 협업으로 탄생한 앤루시만의 자체 개발 유선형 날개로 부드럽고 강력한 바람을.'],
    ['#06', 'Convenient operation', '단 하나의 버튼으로, 설명서가 필요 없는 편리한 조작', '버튼 1회 전원ON+1단계 / 2회 2단계 / 3회 3단계 / 4회 전원OFF.'],
    ['#07', 'Convenience', '앤루시는 사용 중의 편의성을 지향합니다', '핸디 선풍기를 사용 중에도 낙상의 위험을 줄일 수 있도록 핸드 스트랩을 동봉하여 드립니다.'],
  ];
  pts.forEach((pt, idx) => {
    p.gap(56);
    p.text(pt[0], 26, { weight: 800, color: '#9fb4cf', gap: 36 });
    p.pill(pt[1], { x: 64, bg: BLU, color: '#fff', size: 16, advance: true, gap: 30 });
    p.text(pt[2], 28, { weight: 800, color: INK, lineH: 1.3, gap: 34 });
    p.text(pt[3], 16, { color: SUB, lineH: 1.7, gap: 36 });
    p.photo(idx === 5 ? 240 : 300, ['모터 비주얼', '토트백 속 제품', '바람 세기 + 1단/2단/3단', '충전 단자', '5엽 날개 클로즈업', '버튼 작동 다이어그램', '핸드 스트랩'][idx], { radius: 14, gap: 10 });
  });
  p.gap(40);

  // 12 KC 인증
  p.bg(420, BG);
  p.gap(56);
  p.ctext('국내 전파인증 통과로 안전성이 확보된 제품', 24, { weight: 800, color: INK, gap: 18 });
  p.ctext('국립전파연구원의 KC 전파인증은 물론, 전기용품에 대한 안전 인정을 받은 제품입니다.', 15, { color: SUB, gap: 40 });
  p.cols(2, 30, (i, x, cw) => {
    p.aphoto(x, p.at(), cw, 200, ['KC 전파인증', '전자파 적합성'][i], { radius: 8 });
  });
  p.gap(252);

  // 13 추천
  p.ctext('이런 분들께 추천드려요', 32, { weight: 800, color: INK, gap: 48 });
  {
    const rec = [['출퇴근&야외 활동이 많은 직장인', '가방에 쏙! 100g 초경량으로 휴대 부담 없이'], ['캠핑, 등산, 스포츠를 즐기는 아웃도어족', '최대 5시간 사용! 야외에서도 OK'], ['활동이 많은 아이들', '버튼 하나로 초간편 조작, 핸드 스트랩으로 안전하게']];
    rec.forEach((r) => {
      const y = p.at();
      p.bg(110, W2, { x: 64, w: p.cw(), radius: 14 });
      p.aphoto(84, y + 20, 130, 70, '', { radius: 8 });
      p.atext(240, y + 22, p.cw() - 200, r[0], 18, { weight: 800, color: INK });
      p.atext(240, y + 56, p.cw() - 200, r[1], 14, { color: SUB });
      p.to(y + 110 + 18);
    });
  }
  p.gap(50);

  // 14 사이즈
  p.ctext('· 제품 사이즈 안내 ·', 22, { weight: 800, color: NAVY, gap: 40 });
  p.photo(280, '치수 도해 (총길이 140 · 헤드두께 65 · 헤드지름 50)', { x: 160, w: W - 320, radius: 10, gap: 20 });
  p.ctext('총길이 140mm | 헤드두께 65mm | 헤드지름 50mm', 15, { color: SUB, gap: 60 });

  // 15 SPEC
  p.ctext('· 앤루시 BLDC 쿨버디 핸디 선풍기 ·', 22, { weight: 800, color: NAVY, gap: 40 });
  {
    const rows = [['제품명', '앤루시 BLDC 쿨버디 핸디 선풍기'], ['모델명', 'ANN-0811D(화이트) / E(크림) / F(다크네이비)'], ['구성', '선풍기 본품, 충전 케이블, 스트랩'], ['원산지', '중국'], ['재질', '리튬이온전지, ABS'], ['사이즈', '140*50*65mm'], ['용량', '1,200mAh'], ['정격전압', '5V/1A, 5W']];
    rows.forEach((r) => {
      const y = p.at();
      p.atext(80, y, 150, r[0], 15, { weight: 700, color: INK });
      p.atext(240, y, p.cw() - 176, r[1], 15, { color: SUB });
      p.hr({ color: '#e6edf2', gap: 18, x: 80, w: p.cw() - 32 });
      p.to(y + 48);
    });
  }
  p.gap(30);

  return p.done('선풍기', '전자기기', BG);
}

/* ══════════ 에어프라이기 — MILAS 듀얼바스켓 글라스 (화이트+블랙) ══════════ */
function airfryer(): Template {
  const BG = '#f4f4f5', W2 = '#fff', INK = '#2b2b2b', SUB = '#888', BEI = '#efe2cf';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(56);
  p.ctext('MILAS', 26, { weight: 800, color: INK, ls: 4, gap: 12 });
  p.ctext('MINIMAL LIFE STYLE', 12, { color: SUB, ls: 3, gap: 36 });
  p.ctext('듀얼 바스켓\n글라스 에어프라이어', 38, { weight: 800, color: INK, lineH: 1.25, gap: 116 });
  p.hr({ color: '#ddd', x: 360, w: 140, gap: 26 });
  p.ctext('이전까지 없던 주방의 혁신\n조리부터 보관까지 한번에 해결', 18, { color: SUB, lineH: 1.6, gap: 56 });
  p.photo(340, '제품 (조리 연출)', { radius: 0, gap: 70 });

  // 02 핵심 변화
  p.ctext('미라스가 만든 주방의 핵심 변화', 32, { weight: 800, color: INK, gap: 48 });
  p.photo(300, '유리 바스켓 조리', { radius: 0, gap: 30 });
  p.ctext('열지 않아도 보이는 유리 바스켓으로 완벽한 굽기 조절', 18, { weight: 600, color: INK, gap: 60 });
  p.photo(280, '냉장고 보관 장면', { radius: 0, gap: 30 });
  p.ctext('옮길 필요 없이 뚜껑만 덮어 그대로 보관하고 재가열까지 한 번에!', 18, { weight: 600, color: INK, gap: 60 });
  p.photo(260, '식기세척기 장면', { radius: 0, gap: 30 });
  p.pill('설거짓거리는 유리용기뿐, 식기세척기도 OK', { cx: true, bg: BEI, color: '#6a5a3e', size: 16, advance: true, gap: 70 });

  // 03 한눈에 보기 (3x3 gray icon)
  p.bg(900, BG);
  p.gap(56);
  p.ctext('미라스 에어프라이어\n한눈에 보기', 32, { weight: 800, color: INK, lineH: 1.3, gap: 80 });
  {
    const items: [string, string?][] = [
      ['원스톱 조리/식사/보관'], ['4가지 조리모드'], ['전면 투명유리'],
      ['쉬운 조작패널'], ['2사이즈 용기구성'], ['강력한 열풍순환'],
      ['안심 안전설계'], ['국가 인증제품'], ['완벽 분리세척'],
    ];
    iconGrid(p, items, 3, { iconBg: 'square', d: 110, gapY: 60, capColor: INK });
  }
  p.gap(30);

  // 04 Cook-Eat-Keep
  p.ctext('Cook - Eat - Keep', 18, { color: SUB, ls: 1, gap: 30 });
  p.ctext('원스톱 조리/보관', 36, { weight: 800, color: INK, gap: 38 });
  p.ctext('조리부터 식사, 보관까지 그릇 이동 없이 한번에.\n번거로운 설거지 시간을 획기적으로 줄여줍니다', 17, { color: SUB, lineH: 1.7, gap: 50 });
  p.photo(320, '온 가족 요리 연출', { radius: 0, gap: 24 });
  p.ctext('올려놓기만 하면 끝나는 초고속 조리과정', 16, { color: SUB, gap: 64 });

  // 05 2사이즈
  p.ctext('1.2L와 4.5L 활용도 높은', 19, { weight: 600, color: SUB, gap: 30 });
  p.ctext('2가지 사이즈 조리용기', 34, { weight: 800, color: INK, gap: 36 });
  p.ctext('활용도 높은 두가지 조리용기로 음식 양에 따라 다르게.\n혼자 먹는 간편식부터 온가족 음식까지 조리', 17, { color: SUB, lineH: 1.7, gap: 50 });
  p.photo(220, '2가지 용기', { radius: 0, gap: 18 });
  p.photo(280, '사이즈 조절 연출', { radius: 0, gap: 64 });

  // 06 보관용기
  p.ctext('뚜껑만 덮으면 끝', 19, { weight: 600, color: SUB, gap: 30 });
  p.ctext('보관용기로 탈바꿈', 34, { weight: 800, color: INK, gap: 36 });
  p.ctext('남은 음식 번거롭게 옮겨담지 마세요\n뚜껑만 덮으면 쉽게 보관할 수 있습니다', 17, { color: SUB, lineH: 1.7, gap: 50 });
  p.photo(300, '뚜껑 덮어 보관', { radius: 0, gap: 64 });

  // 07 열풍순환
  p.bg(560, BG);
  p.gap(56);
  p.ctext('기름 없이도 바삭하게', 19, { weight: 600, color: SUB, gap: 30 });
  p.ctext('강력한 열풍 순환 기술', 34, { weight: 800, color: INK, gap: 36 });
  p.ctext('내부의 열을 빠르고 강하게 순환시키는\n컨벡션 효과로 완벽한 조리 결과를 만듭니다', 17, { color: SUB, lineH: 1.7, gap: 50 });
  p.photo(320, '컨벡션 열풍 순환 (오렌지 궤적)', { x: 200, w: W - 400, radius: 12, gap: 56 });

  // 08 조작패널
  p.ctext('조리모드로 누구나 간편하게', 19, { weight: 600, color: SUB, gap: 30 });
  p.ctext('직관적인 조작 패널', 34, { weight: 800, color: INK, gap: 36 });
  p.ctext('버튼 하나로 끝내는 직관적인 패널과\n메뉴에 맞는 4가지 조리모드(AIRFRY·ROAST·BAKE·DEHY)로', 17, { color: SUB, lineH: 1.7, gap: 50 });
  p.photo(300, '터치 패널 클로즈업', { radius: 0, gap: 64 });

  // 09 안전
  p.ctext('편리한 사용 만큼\n안전도 중요하니까!', 30, { weight: 800, color: INK, lineH: 1.35, gap: 80 });
  p.ctext('국내 인증 기관의 필수 안전 인증을 모두 통과했습니다.\n믿고 사용할 수 있는 검증된 제품입니다.', 17, { color: SUB, lineH: 1.7, gap: 44 });
  p.photo(260, '후면 열 배출구', { x: 180, w: W - 360, radius: 8, gap: 24 });
  p.ctext('후면 열 배출구로 제품의 과열을 방지하고 일정한 성능을 유지합니다', 15, { color: SUB, gap: 40 });
  p.photo(260, '본체 분리 (자동 전원 차단)', { x: 180, w: W - 360, radius: 8, gap: 24 });
  p.ctext('본체를 분리하면 자동 전원 차단 센서가 즉시 전원을 차단합니다', 15, { color: SUB, gap: 70 });

  // 10 SPEC
  p.bg(40, BG);
  p.text('상세 SPEC', 22, { weight: 800, color: INK, gap: 36 });
  {
    const rows = [['제품명', '미라스 듀얼바스켓 디지털 에어프라이어'], ['모델명', 'MS-4015PC'], ['정격전압', '220-240V, 50-60Hz'], ['소비전력', '1,500W'], ['재질', '무착색유리제(오븐용), 스테인리스, PP, 고무제'], ['제품중량', '약 4.9kg'], ['제품크기', '295X232X300(mm)'], ['제품용량', '4.5L / 1.2L'], ['안전인증', 'SU073029-25001'], ['제조국', '중국']];
    const y0 = p.at();
    p.bg(rows.length * 50 + 32, W2, { x: 64, w: p.cw(), radius: 14 });
    p.to(y0 + 24);
    rows.forEach((r) => {
      const y = p.at();
      p.atext(96, y, 150, r[0], 15, { weight: 700, color: INK });
      p.atext(250, y, p.cw() - 220, r[1], 14, { color: SUB });
      p.to(y + 50);
    });
  }
  p.gap(40);

  return p.done('에어프라이기', '전자기기', '#ffffff');
}

/* ══════════ 전자기기1 — 킹스파 스팀 족욕기 (베이지+브라운 프리미엄) ══════════ */
function footspa(): Template {
  const CR = '#efe7da', BEI = '#e6dccd', BR = '#6b5642', GOLD = '#b89150', W2 = '#fff',
    INK = '#3a3026', SUB = '#8a7e6e', RED = '#b94a3a', DK = '#4a3f33';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(52);
  p.pill('편백나무 + 맥반석 스팀', { cx: true, bg: BR, color: '#fff', size: 14, advance: true, gap: 30 });
  p.ctext('정통 핀란드식\n약초 스팀 족욕기', 42, { weight: 800, color: BR, lineH: 1.25, gap: 130 });
  p.ctext('족욕은 기본, 약초 좌훈까지, 이제 피부건조 걱정없이\n정통 핀란드식 스팀으로 즐기세요', 17, { color: SUB, lineH: 1.7, gap: 44 });
  p.photo(340, '인물 + 족욕기 라이프스타일', { radius: 12, gap: 64 });

  // 02 공식 판매처
  p.bg(360, CR);
  p.gap(54);
  {
    const d = 100, y = p.at();
    p.circle((W - d) / 2, y, d, GOLD, { label: 'OFFICIAL', color: '#fff', size: 14 });
    p.to(y + d + 24);
  }
  p.ctext('킹스파 온라인 공식 판매처', 24, { weight: 800, color: INK, gap: 36 });
  p.ctext('킹스파의 모든 제품은 엄격한 품질 관리를 위해\n공식 판매처를 통해서만 유통되고 있습니다.', 16, { color: SUB, lineH: 1.7, gap: 60 });

  // 03 브랜드 신뢰 + 어워드
  p.ctext('최고의 제품력으로\n신뢰할 수 있는 브랜드', 32, { weight: 800, color: INK, lineH: 1.3, gap: 80 });
  {
    const aw = [['2019-2020', '2년 연속\n소비자만족지수 1위'], ['2021', 'KCAI 한국\n소비자평가 1위']];
    const top = p.at();
    p.cols(2, 40, (i, x, cw) => {
      const d = 90;
      p.circle(x + (cw - d) / 2, top, d, BEI, { label: '1위', color: BR, size: 28 });
      p.atext(x, top + d + 16, cw, aw[i][0], 15, { weight: 700, color: GOLD, align: 'center' });
      p.atext(x, top + d + 44, cw, aw[i][1], 15, { color: INK, align: 'center', lineH: 1.4 });
    });
    p.to(top + 90 + 100);
  }
  p.cols(2, 30, (i, x, cw) => {
    p.aphoto(x, p.at(), cw, 170, ['특허 등록증', '디자인 특허증'][i], { radius: 8 });
    p.atext(x, p.at() + 182, cw, ['대한민국 특허 등록', '인체공학 디자인'][i], 14, { color: SUB, align: 'center' });
  });
  p.gap(230);

  // 04 리얼 스팀
  p.ctext('Real 맥반석 스팀 + 천연 편백수', 22, { font: 'script', color: GOLD, gap: 36 });
  p.ctext('촉촉한 핀란드식 특대형 스팀 족욕기', 30, { weight: 800, color: INK, gap: 44 });
  p.photo(320, '스팀 피어오르는 족욕기 (최고급)', { radius: 12, gap: 64 });

  // 05 POINT 01
  p.bg(540, CR);
  p.gap(54);
  p.ctext('POINT 01', 16, { weight: 700, color: GOLD, ls: 3, gap: 26 });
  p.ctext('맥반석 스팀', 34, { weight: 800, color: INK, gap: 44 });
  p.photo(280, '발 + 스팀 클로즈업', { x: 160, w: W - 320, radius: 12, gap: 36 });
  p.ctext('천연 맥반석이 만드는 건강한 스팀,\n킹스파의 3세대 스팀 족욕기는 다릅니다', 17, { color: SUB, lineH: 1.7, gap: 60 });

  // 06 비교
  p.ctext('기존 족욕기, 만족스러우셨나요?', 28, { weight: 800, color: INK, gap: 30 });
  p.ctext('뜨거운 복사열, 건조한 공기, 피부 자극은 더해져만 간다', 16, { color: SUB, gap: 44 });
  p.cols(2, 24, (i, x, cw) => {
    const isR = i === 0;
    p.aphoto(x, p.at(), cw, 180, '', { radius: 10 });
    p.abs({ t: 'rect', x, y: p.at() + 192, w: cw, h: 36, fill: isR ? RED : BR, radius: 18 });
    p.atext(x, p.at() + 200, cw, isR ? '건식 족욕기' : '킹스파 스팀 족욕기', 15, { weight: 700, color: '#fff', align: 'center' });
  });
  p.gap(248);

  // 07 인물 (right)
  p.photo(320, '인물 라이프스타일 (의자 족욕)', { radius: 12, gap: 36 });
  p.ctext('건강을 위한 족욕·좌훈, 피부까지 케어하는\n정통 스팀 족욕기가 정답입니다', 22, { weight: 700, color: INK, lineH: 1.5, gap: 64 });

  // 08 후기 하이라이트
  p.bg(560, CR);
  p.gap(54);
  p.ctext('가슴 깊은 족욕', 18, { font: 'script', color: GOLD, gap: 28 });
  p.ctext('고객 여러분의 목소리에 귀 기울였습니다', 28, { weight: 800, color: INK, gap: 44 });
  {
    const rv = ['건식 족욕기 사용하고 나면 발 통증이 줄어드는 것 같아요', '땀 흘릴 때는 좋은데 몸의 수분이 다 빠져나가는 느낌이에요', '겨울철에는 더 가려워요', '보습크림을 바르고 수면양말까지 신고 사용해야 해서 번거로워요'];
    rv.forEach((t) => {
      const y = p.at();
      p.bg(64, W2, { x: 90, w: W - 180, radius: 12 });
      p.atext(110, y + 20, W - 220, t, 15, { color: INK, align: 'center' });
      p.gap(80);
    });
  }
  p.gap(20);

  // 09 특허 가열 방식
  p.ctext('그래서 개발한,', 18, { color: SUB, gap: 30 });
  p.ctext('대한민국 특허 인증\n3세대 리얼 맥반석 스팀 가열 방식!', 28, { weight: 800, color: BR, lineH: 1.4, gap: 80 });
  p.photo(300, '스팀 가열 / 사우나 디테일', { radius: 12, gap: 60 });

  // 10 closing (dark)
  p.bg(220, DK);
  p.gap(74);
  p.ctext('피부가 먼저 느끼는,\n차원이 다른 촉촉한 열감을 느껴 보세요', 22, { weight: 700, color: '#f0e8da', lineH: 1.5, gap: 80 });

  return p.done('전자기기1', '전자기기', CR);
}

/* ══════════ 전자기기2 — 스팔라 가열식 가습기 (화이트 클린) ══════════ */
function humidifier(): Template {
  const W2 = '#fff', BG = '#eef1f4', INK = '#28303a', SUB = '#8a9099', BLU = '#3b6fb0',
    DK = '#28323c', LT = '#f4f6f8';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(56);
  p.ctext('가습기는 어려울 필요가 없습니다', 18, { weight: 600, color: SUB, gap: 50 });
  p.ctext('혁신적으로 간편한', 30, { weight: 700, color: INK, gap: 16 });
  p.ctext('간편한', 50, { weight: 800, color: INK, gap: 64 });
  p.ctext('그무엇보다 안전한', 30, { weight: 700, color: INK, gap: 16 });
  p.ctext('안전한', 50, { weight: 800, color: INK, gap: 70 });
  p.pill('100℃ 완벽살균 · 스팔라 Easy-Pot 가열식 가습기', { cx: true, bg: LT, color: INK, size: 15, stroke: '#dde3e9', strokeW: 1, advance: true, gap: 44 });
  p.photo(360, '제품 (히어로)', { radius: 14, gap: 70 });

  // 02~06 Easy/Power/Pure/Function/Safety
  const feats: [string, string][] = [
    ['Easy.', '1초 다이렉트 분리형\n2pcs 쉬운 세척\n자동 세척 모드'],
    ['Power.', '450ml/h 강력 가습\n12H 사용 3L 대용량\n100℃ 완벽 가열'],
    ['Pure.', '의료용 SUS316\n820℃ 내열 붕규산 유리\nBPA, BPS, BPF FREE'],
    ['Function.', 'AI 자동가습\n6가지 핵심기능\n원터치 디스플레이'],
    ['Safety.', '3중 안전장치'],
  ];
  feats.forEach((f) => {
    p.gap(40);
    p.cols(2, 30, (col, x, cw) => {
      if (col === 0) p.aphoto(x, p.at(), cw, 200, '', { radius: 12 });
      else {
        p.atext(x, p.at() + 20, cw, f[0], 34, { weight: 800, color: INK });
        p.atext(x, p.at() + 70, cw, f[1], 16, { color: SUB, lineH: 1.7 });
      }
    });
    p.gap(220);
  });

  // 07 불편함
  p.ctext('가습기,', 30, { weight: 700, color: SUB, gap: 16 });
  p.ctext('불편함에 더 집중했습니다', 36, { weight: 800, color: INK, gap: 44 });
  p.photo(300, '제품 디테일', { x: 200, w: W - 400, radius: 14, gap: 64 });

  // 08 간소화 (gray)
  p.bg(620, BG);
  p.gap(56);
  {
    const y = p.at();
    p.bg(120, W2, { x: 120, w: W - 240, radius: 16 });
    p.atext(150, y + 24, W - 300, '환기가 어려운 겨울에도 공기청정기와 동시에 사용할 수 있습니다', 16, { weight: 600, color: INK, lineH: 1.5 });
    p.to(y + 120 + 50);
  }
  p.ctext('귀찮음, 감수하지 마세요', 30, { weight: 800, color: INK, gap: 30 });
  p.ctext('"간소화"', 26, { weight: 700, color: BLU, gap: 26 });
  p.ctext('최소한의 노력으로 최대한의 편리함을', 16, { color: SUB, gap: 70 });

  // 09 Easy 1초
  p.ctext('Easy.', 40, { weight: 800, color: INK, gap: 50 });
  p.ctext('수조 분리, 단 1초', 24, { weight: 700, color: INK, gap: 36 });
  p.photo(280, '손으로 수조 분리', { radius: 14, gap: 24 });
  {
    const y = p.at();
    p.bg(90, DK, { x: 120, w: W - 240, radius: 12 });
    p.atext(120, y + 30, W - 240, '편리함의 극대화, 건강한 세척 습관의 시작입니다', 16, { weight: 600, color: '#fff', align: 'center' });
    p.to(y + 90 + 60);
  }

  // 10 Simple
  p.ctext('Simple.', 40, { weight: 800, color: INK, gap: 50 });
  p.ctext('세척 할 부품, 수조와 뚜껑 단 2개', 24, { weight: 700, color: INK, gap: 36 });
  p.pill('전기부품 걱정 없이, 통만 쏙 빼서 세척하세요', { cx: true, bg: LT, color: INK, size: 15, stroke: '#dde3e9', strokeW: 1, advance: true, gap: 30 });
  p.photo(260, '수조·뚜껑 분리', { radius: 14, gap: 50 });
  {
    const y = p.at();
    p.bg(80, LT, { x: 120, w: W - 240, radius: 12 });
    p.atext(120, y + 16, W - 240, '원터치 자동세척모드', 18, { weight: 800, color: INK, align: 'center' });
    p.atext(120, y + 46, W - 240, '끓이지 않고 안전하게 버튼 하나로 자동세척', 14, { color: SUB, align: 'center' });
    p.to(y + 80 + 40);
  }
  p.photo(280, '자동세척 (물 채움)', { radius: 14, gap: 50 });

  return p.done('전자기기2', '전자기기', W2);
}

export const ELECTRONICS: Template[] = [ricecooker(), fan(), airfryer(), footspa(), humidifier()];
