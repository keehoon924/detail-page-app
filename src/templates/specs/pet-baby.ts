/** 반려동물&유아 4종 — 레퍼런스 단일 연속 상세페이지 재현. */
import type { Template } from '../types.ts';
import { P } from '../kit.ts';

const W = 860;

/* ══════════ 유아3 — 씨니 도그 아이스 넥링 (그레이/베이지 미니멀) ══════════ */
function neckring(): Template {
  const BG = '#e6e3de', W2 = '#fff', INK = '#2d2d2d', SUB = '#8a8a8a', BLU = '#7fb4cb',
    CARD = '#f3f1ee', PILL = '#dfe7ea';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(56);
  {
    const y = p.at();
    p.bg(520, W2, { x: 64, w: p.cw(), radius: 24 });
    p.atext(64, y + 50, p.cw(), 'DOG ICE', 36, { weight: 800, color: INK, align: 'center', ls: 1 });
    p.atext(64, y + 96, p.cw(), 'NECK RING', 36, { weight: 800, color: INK, align: 'center', ls: 1 });
    p.atext(64, y + 152, p.cw(), '씨니 도그 아이스 넥링', 17, { color: SUB, align: 'center' });
    p.aphoto(230, y + 200, W - 460, 280, '제품 단독 컷', { radius: 14 });
    p.to(y + 520 + 60);
  }

  // 02 Why
  p.ctext('Why?', 40, { weight: 800, color: INK, gap: 44 });
  p.ctext('왜 우리 아이에게 필요할까요?', 24, { weight: 700, color: INK, gap: 34 });
  p.pill('평균 반려동물 체온 38.5℃', { cx: true, bg: PILL, color: '#3a6b80', size: 15, advance: true, gap: 30 });
  p.ctext('땀샘이 없어 스스로는 어려운 체온 조절,\n무더운 여름철 아이 상태에 맞는 적절한 온도 조절은\n선택이 아닌 필수', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 44 });
  p.photo(300, '강아지 착용 컷', { radius: 16, gap: 70 });

  // 03~ Point 항목
  const pts: [string, string, string, string?][] = [
    ['Point 01', '데일리로 착용하는 쿨링 넥밴드', '가볍게 둘러주는 것만으로 시원함을 더해주는\n반려동물 전용 쿨링 넥밴드입니다.', '제품 디테일'],
    ['Point 02', 'NASA 개발 PCM 냉각 기술', '미국 항공우주 NASA에서 극심한 온도 편차로부터\n개발된 PCM(상변화 물질) 소재로 설정 온도에서\n일정한 온도를 유지합니다. 28℃ 기준 스스로 얼었다 녹았다 반복.', '제품 + NASA 뱃지'],
    ['Point 03', '오래가는 시원함', '차가운 얼음과 달리 저온 화상에 걱정이 없고\n오래도록 시원함이 유지됩니다. (실내 60~80분 / 야외 40~60분)', '얼음 + 제품 연출'],
    ['Point 04', '털이 젖을 걱정 없이', 'PCM 특수 냉매제의 특성상 결로 현상이 적어\n털이나 옷이 젖지 않습니다.', '강아지 클로즈업'],
    ['Point 06', '최적화로 설계된 초경량 무게', '달걀 하나만큼 가벼운 무게(S사이즈 기준)로\n장시간 사용에도 아이들 목에 무리를 주지 않습니다.', '강아지 측면 컷'],
    ['Point 07', '야광 반사 기능', '반려동물과 함께 안전하게 즐길 수 있는 최적의 선택,\n야간 산책 시 야광 반사로 안전하게.', '야간 산책 컷'],
  ];
  pts.forEach((pt) => {
    p.gap(40);
    p.ctext(pt[0], 16, { weight: 700, color: SUB, ls: 2, gap: 26 });
    p.ctext(pt[1], 28, { weight: 800, color: INK, lineH: 1.3, gap: 36 });
    p.ctext(pt[2], 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
    p.photo(300, pt[3] ?? '', { radius: 16, gap: 40 });
  });
  p.gap(20);

  // closing
  p.bg(40, BG);
  p.ctext('무더운 여름,\n우리 아이의 시원한 하루를 선물하세요', 24, { weight: 700, color: INK, lineH: 1.5, gap: 60 });

  return p.done('유아3', '반려동물&유아', BG);
}

/* ══════════ 유아4 — 로옹 극세사 아기 망토 블랭킷 (크림+꽃) ══════════ */
function babycape(): Template {
  const CR = '#f3ece2', BEI = '#e7dccb', INK = '#3a3026', SUB = '#8a7e6e', BR = '#8a6f52',
    W2 = '#fff', PINK = '#e7b8a8';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(48);
  p.ctext('AGA BLANC', 16, { weight: 700, color: BR, ls: 3, gap: 30 });
  p.ctext('엄마처럼 포근한 안심을 입히다', 18, { color: SUB, gap: 30 });
  p.ctext('로옹 극세사\n아기 망토 블랭킷', 40, { weight: 800, color: INK, lineH: 1.25, gap: 120 });
  p.pill('포근함, 안전, 실용성까지 한 번에 담아낸 아기 이불', { cx: true, bg: BEI, color: BR, size: 14, advance: true, gap: 40 });
  p.photo(360, '아기 착용 메인 컷', { radius: 16, gap: 60 });

  // 02 6 in 1
  p.ctext('6 in 1 만능 육아템', 30, { weight: 800, color: INK, gap: 48 });
  {
    const items = ['6 in 1 망토 블랭킷', '차렵이불 10초', '망토 길이감', '무릎담요 신소재', '프리미엄 국내산', '어린이제품 안전인증'];
    const top = p.at(), cols = 3, d = 96, gx = 24, gy = 60;
    const colW = (p.cw() - gx * (cols - 1)) / cols, rowH = d + 50 + gy;
    items.forEach((nm, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = 64 + c * (colW + gx), y = top + r * rowH;
      p.circle(x + (colW - d) / 2, y, d, BEI, { });
      p.atext(x - 4, y + d + 14, colW + 8, nm, 15, { weight: 700, color: INK, align: 'center', lineH: 1.4 });
    });
    p.to(top + 2 * rowH);
  }
  p.gap(40);

  // 03 10초
  p.ctext('단 10초 만에 외출 준비 끝!', 28, { weight: 800, color: BR, gap: 18 });
  p.ctext('겨울철 외출 채비를 번거롭게 하지 마세요', 16, { color: SUB, gap: 40 });
  p.cols(2, 16, (i, x, cw) => { p.aphoto(x, p.at(), cw, 150, '', { radius: 10 }); p.aphoto(x, p.at() + 162, cw, 150, '', { radius: 10 }); });
  p.gap(330);

  // 04 보온성
  p.ctext('길어서 더 따뜻한, 로~옹한 보온성', 26, { weight: 800, color: INK, gap: 32 });
  p.ctext('넉넉한 길이로 아기 발끝까지 포근하게 감싸\n온몸의 온기를 지켜줍니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(320, '망토 길이 연출 컷', { radius: 16, gap: 56 });

  // 05 착용감
  p.ctext('흘러내릴 걱정 없는 안정적인 착용감', 26, { weight: 800, color: INK, gap: 32 });
  p.ctext('어깨와 끈의 단추식 고정으로 움직임이 많은\n아기에게도 흘러내리지 않습니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(280, '착용감 연출 컷', { radius: 16, gap: 56 });

  // 06 극세사
  p.ctext('프리미엄 국내산 극세사', 26, { weight: 800, color: INK, gap: 32 });
  p.ctext('극세사 원단 그대로 안아도 포근하고 부드러워\n예민한 아기 피부에도 자극 없이 사용합니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.cols(2, 16, (i, x, cw) => p.aphoto(x, p.at(), cw, 180, ['원단 클로즈업', '착용 디테일'][i], { radius: 10 }));
  p.gap(200);

  // 07 안전 인증
  p.ctext('안심할 수 있는 안전 인증', 26, { weight: 800, color: INK, gap: 32 });
  p.ctext('소중한 우리 아이들이 안심하고 사용할 수 있도록\n철저한 자체 품질 관리를 시행합니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(260, '안전 인증 디테일', { radius: 16, gap: 56 });

  // 08 디테일
  p.ctext('엄마의 세심함을 담아낸 디테일', 26, { weight: 800, color: INK, gap: 40 });
  ['자수 모티프, 자수로 더했어요', '안심할 수 있는 마감 처리'].forEach((cap) => {
    p.photo(180, '', { radius: 12, gap: 10 });
    p.ctext(cap, 15, { color: SUB, gap: 36 });
  });
  p.gap(20);

  // 09 OPTION PACKAGE (beige)
  p.bg(360, BEI);
  p.gap(54);
  p.ctext('OPTION PACKAGE', 26, { weight: 800, color: INK, gap: 36 });
  p.photo(200, '선물 패키지 박스', { x: 200, w: W - 400, radius: 12, gap: 30 });
  p.ctext('출산/돌 선물로 만족도 높은 선물!\n소중한 사람에게 따뜻한 마음을 전해보세요.', 15, { color: SUB, align: 'center', lineH: 1.6, gap: 64 });

  // 10 진심 (cream)
  {
    const d = 200, y = p.at();
    p.aphoto((W - d) / 2, y, d, d, '아기 진심 컷', { shape: 'circle' });
    p.to(y + d + 30);
  }
  p.ctext('"소중한 순간을 더 따뜻하게"', 24, { weight: 800, color: INK, gap: 56 });
  p.ctext('아가블랑이 전하는 진심', 26, { weight: 800, color: BR, gap: 44 });
  {
    const it = ['엄마가 직접 키우며 느꼈던 마음', '아이에게 안전한 원단만 선별', '작은 부분까지 세심하게 마감', '정직한 생산을 통해 믿을 수 있는 브랜드로'];
    const top = p.at(), cw = (p.cw() - 24) / 2, ch = 96;
    it.forEach((t, i) => {
      const x = 64 + (i % 2) * (cw + 24), y = top + Math.floor(i / 2) * (ch + 24);
      p.abs({ t: 'rect', x, y, w: cw, h: ch, fill: W2, radius: 12 });
      p.atext(x + 22, y + 22, cw - 44, t, 15, { weight: 600, color: INK, lineH: 1.5 });
    });
    p.to(top + ch * 2 + 24 + 56);
  }

  // 11 상품정보 + 도면
  p.ctext('상품정보', 24, { weight: 800, color: INK, gap: 36 });
  p.photo(200, '제품 치수 도면 (앞48 x 28cm, 전체 125 x 85cm)', { x: 160, w: W - 320, radius: 10, gap: 40 });
  {
    const rows = [['품명', '로옹 극세사 망토 블랭킷'], ['디자인', '공용/단품 블랭킷'], ['크기', '앞 48 x 28cm, 전체 125 x 85cm'], ['재질', '컬러 폴리에스터(극세사) 100%, 안감 면 100%'], ['사용연령', '0개월 이상 (전 연령 사용 가능)'], ['제조사', '아가블랑'], ['제조국', '대한민국']];
    rows.forEach((r) => {
      const y = p.at();
      p.atext(80, y, 150, r[0], 15, { weight: 700, color: INK });
      p.atext(240, y, p.cw() - 176, r[1], 14, { color: SUB });
      p.hr({ color: '#e6ddd0', gap: 16, x: 80, w: p.cw() - 32 });
      p.to(y + 46);
    });
  }
  p.gap(30);

  // 12 Q&A
  p.ctext('Q & A', 24, { weight: 800, color: INK, gap: 40 });
  {
    const qa = [['Q1. 못처럼 입을 수 있는 건가요?', '네, 단추식 망토 형태로 외출 시에도 편하게 착용 가능합니다.'], ['Q2. 망토 블랭킷은 뭐가 다른가요?', '단추 분리로 길이를 조절하거나 망토로 활용하는 등 다양하게.'], ['Q3. 세탁방법은 어떻게 되나요?', '네, 단독 세탁 30℃ 이하 손세탁을 권장합니다.'], ['Q4. 몇 살까지 사용 가능한가요?', '0개월부터 전 연령 사용 가능합니다.']];
    qa.forEach((q) => {
      const y = p.at();
      p.bg(96, '#faf6ef', { x: 64, w: p.cw(), radius: 10 });
      p.atext(88, y + 18, p.cw() - 48, q[0], 16, { weight: 700, color: BR });
      p.atext(88, y + 50, p.cw() - 48, q[1], 14, { color: SUB, lineH: 1.5 });
      p.gap(96 + 16);
    });
  }
  p.gap(30);

  return p.done('유아4', '반려동물&유아', CR);
}

/* ══════════ 유아5 — 퍼스트 이유식 포트 (베이지+우드) ══════════ */
function babypot(): Template {
  const CR = '#efe4d6', BEI = '#e3d4c0', BR = '#7a5c40', INK = '#3a2f24', SUB = '#8a7a66',
    W2 = '#fff', ACC = '#a8825e';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(52);
  p.ctext('퍼스트 이유식 포트', 36, { weight: 800, color: INK, gap: 44 });
  p.photo(320, '제품 단독 컷', { x: 180, w: W - 360, radius: 18, gap: 36 });
  p.pill('이유식 한 끼, 매일 신경 써야 할까요?', { cx: true, bg: BEI, color: BR, size: 15, advance: true, gap: 64 });

  // 02 왜 선택
  p.ctext('이유식 한 끼, 왜 늘 신경 써야 할까요?', 28, { weight: 800, color: INK, gap: 30 });
  p.ctext('퍼스트와 함께라면 이유식이 편안해집니다', 16, { color: SUB, gap: 44 });
  {
    const it = ['간편 조리', '정온 가열', '안심 소재', '쉬운 세척'];
    const top = p.at();
    p.cols(4, 18, (i, x, cw) => {
      const d = Math.min(cw, 92);
      p.aphoto(x + (cw - d) / 2, top, d, d, '', { shape: 'circle' });
      p.atext(x - 4, top + d + 14, cw + 8, it[i], 15, { weight: 700, color: INK, align: 'center' });
    });
    p.to(top + 92 + 56);
  }
  p.gap(40);

  // 03 비교
  p.bg(420, CR);
  p.gap(54);
  p.ctext('퍼스트와 함께, 직접 비교해보세요!', 28, { weight: 800, color: INK, gap: 18 });
  p.ctext('퍼스트와 함께라면 편안한 이유식이 시작됩니다', 16, { color: SUB, gap: 44 });
  {
    const y = p.at();
    p.bg(220, W2, { x: 64, w: p.cw(), radius: 14 });
    p.cols(2, 0, (i, x, cw) => {
      p.atext(x + 24, y + 28, cw - 48, i === 0 ? '일반 조리도구' : '퍼스트 이유식 포트', 16, { weight: 800, color: i === 0 ? SUB : ACC, align: 'center' });
      p.atext(x + 24, y + 70, cw - 48, i === 0 ? '여러 도구 필요\n매번 세척 번거로움\n온도 조절 어려움' : '하나로 끝\n간편한 분리 세척\n정온 자동 가열', 15, { color: INK, align: 'center', lineH: 1.9 });
    });
    p.abs({ t: 'line', x: W / 2, y: y + 24, w: 2, h: 170, fill: '#e6ddd0' });
    p.to(y + 220 + 50);
  }

  // 04 따뜻함
  p.ctext('이제 더 이상, 혼자서도 완성하니까!', 26, { weight: 800, color: BR, gap: 60 });
  p.ctext('따뜻함을 길게', 18, { color: SUB, gap: 28 });
  p.ctext('100℃ 가열', 34, { weight: 800, color: INK, gap: 40 });
  p.photo(300, '가열 연출 (엄마 + 아기)', { radius: 16, gap: 36 });
  p.ctext('100℃ 가열로 재료를 충분히 익히고\n설정 온도로 오래 따뜻하게 유지합니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 64 });

  // 05 ZERO 풀스테인리스
  p.bg(520, BR);
  p.gap(60);
  p.ctext('ZERO ZERO', 44, { weight: 800, color: '#f0e2d2', ls: 2, gap: 40 });
  p.ctext('풀 스테인리스 구조', 30, { weight: 800, color: '#fff', gap: 44 });
  {
    const it = ['환경호르몬 ZERO', '코팅 벗겨짐 ZERO', '플라스틱 직접 닿음 ZERO', '냄새 배임 ZERO'];
    it.forEach((t) => {
      const y = p.at();
      p.abs({ t: 'rect', x: 140, y, w: W - 280, h: 56, fill: '#8a6f52', radius: 28 });
      p.atext(140, y + 17, W - 280, '✓  ' + t, 16, { weight: 700, color: '#fff', align: 'center' });
      p.gap(72);
    });
  }
  p.gap(20);

  // 06 위생
  p.ctext('위생까지 생각한 제품!', 28, { weight: 800, color: INK, gap: 40 });
  p.photo(300, '풀 스테인리스 내부 컷', { radius: 16, gap: 64 });

  // 07 안전
  p.ctext('우리 아이를, 제품의 안전은 기본', 26, { weight: 800, color: BR, gap: 40 });
  {
    const it = [['손이 자유로운 이유식 만들기', '버튼 하나로 자동 조리'], ['꼼꼼한 안전 설계', '과열 방지 · 자동 전원 차단']];
    it.forEach((t) => {
      const y = p.at();
      p.bg(96, W2, { x: 64, w: p.cw(), radius: 12 });
      p.aphoto(84, y + 18, 60, 60, '', { shape: 'circle' });
      p.atext(170, y + 22, p.cw() - 140, t[0], 17, { weight: 800, color: INK });
      p.atext(170, y + 54, p.cw() - 140, t[1], 14, { color: SUB });
      p.gap(96 + 18);
    });
  }
  p.gap(30);

  return p.done('유아5', '반려동물&유아', CR);
}

/* ══════════ 유아A — 허그곰 2세대 (크림+브라운, 일러스트/말풍선/리뷰) ══════════ */
function huggom(): Template {
  const CR = '#f6efe6', W2 = '#fff', INK = '#2f261f', SUB = '#8a7e70', BR = '#8a5a36',
    ORG = '#e2542a', YEL = '#ffe89a', BUB = '#efe7da', PINK = '#e98a6a';
  const p = new P(W, 64);

  // 01 공감
  p.gap(52);
  p.ctext('30분.. 1시간마다 잠에서 깨는', 22, { weight: 600, color: INK, gap: 34 });
  p.ctext('아기 재우기 힘드시죠?', 36, { weight: 800, color: INK, gap: 48 });
  {
    const y = p.at();
    p.aphoto((W - 220) / 2, y, 220, 240, '엄마+우는 아기 일러스트', { radius: 16 });
    // 말풍선
    p.abs({ t: 'rect', x: 80, y: y + 30, w: 220, h: 70, fill: BUB, radius: 20 });
    p.atext(90, y + 44, 200, '침대에 눕히면\n왜 자꾸 깨는거지?', 14, { color: INK, align: 'center', lineH: 1.4 });
    p.abs({ t: 'rect', x: W - 300, y: y + 40, w: 200, h: 50, fill: BUB, radius: 20 });
    p.atext(W - 300, y + 54, 200, '엄마도 울고싶다..', 14, { color: INK, align: 'center' });
    p.to(y + 280);
  }
  p.gap(40);

  // 02 솔루션
  p.ctext('엄마, 아빠는 이제 쉬세요,', 28, { weight: 700, color: INK, gap: 18 });
  p.ctext('아기는 허그곰이 재워줄게요!', 36, { weight: 800, color: BR, gap: 50 });
  p.photo(320, '아기 수면 컷 (말풍선: 엄마, 나 깨우지마요~)', { radius: 16, gap: 24 });
  {
    const y = p.at();
    p.atext(W - 420, y, 360, '생후 50일 5kg', 16, { weight: 700, color: INK, align: 'right' });
    p.atext(W - 420, y + 30, 360, '낮잠 1시간 30분 → 3시간 수면증가', 14, { color: ORG, align: 'right', weight: 700 });
    p.atext(W - 420, y + 56, 360, '밤잠 5~6시간 → 7~8시간 수면증가', 14, { color: ORG, align: 'right', weight: 700 });
    p.to(y + 100);
  }
  p.gap(40);

  // 03 인용 카드
  {
    const y = p.at();
    p.bg(420, W2, { x: 64, w: p.cw(), radius: 16 });
    p.aphoto((W - 160) / 2, y + 40, 160, 160, '곰 일러스트', { radius: 12 });
    p.atext(64, y + 220, p.cw(), '"아기가 잘자면,\n육아가 쉬워집니다"', 28, { weight: 800, color: INK, align: 'center', lineH: 1.4 });
    p.atext(64, y + 330, p.cw(), '아기 꿀잠은 허그곰 이모님께 맡기고,\n아기가 자는 시간을 엄마, 아빠의 휴식시간으로 만드세요!', 15, { color: SUB, align: 'center', lineH: 1.6 });
    p.to(y + 420 + 50);
  }

  // 04 2세대
  p.ctext('허그곰을 애용해주신 분들의\n목소리를 담아 리뉴얼한', 20, { color: INK, align: 'center', lineH: 1.5, gap: 70 });
  p.ctext('허그곰 2세대', 44, { weight: 800, color: ORG, gap: 56 });
  p.cols(2, 16, (i, x, cw) => p.aphoto(x, p.at(), cw, 200, ['좌측 방향 사용 (new 허그밴드)', '우측 방향 사용'][i], { radius: 12 }));
  p.gap(220);
  p.ctext('허그곰은 잠 못 드는 아기의 편안한 숙면을 도와주는 베개입니다\n허그곰으로 아기에게 꿀잠을 선물해주세요!', 16, { weight: 600, color: INK, align: 'center', lineH: 1.7, gap: 70 });

  // 05 진짜 잘 자나요
  p.bg(560, CR);
  p.gap(60);
  p.ctext('허그곰, 진짜\n아기가 잘자나요?', 34, { weight: 800, color: INK, lineH: 1.35, gap: 80 });
  p.ctext('네이버 스토어 내돈내산 하신 분들의\n거짓 없는 리얼후기를 확인해주세요.', 17, { weight: 600, color: ORG, align: 'center', lineH: 1.6, gap: 44 });
  {
    const rv = [['isil***  ·  24.06.03', '허그곰 받고 이틀차에 아이가 통잠을 잤네요 👍'], ['skyg****  ·  24.06.14', '허그곰 없었으면 어떻게 재웠을까 싶을 정도로 허그곰에서 너무 잘 자요. 조리원 퇴소하고 쭉 잘 쓰고 있습니다!']];
    rv.forEach((r) => {
      const y = p.at();
      p.bg(120, W2, { x: 64, w: p.cw(), radius: 12 });
      p.atext(88, y + 18, p.cw() - 48, '★★★★★  5', 14, { weight: 700, color: ORG });
      p.atext(88, y + 44, p.cw() - 48, r[0], 13, { color: SUB });
      p.abs({ t: 'rect', x: 88, y: y + 70, w: p.cw() - 80, h: 34, fill: YEL });
      p.atext(96, y + 78, p.cw() - 64, r[1], 14, { color: INK });
      p.to(y + 120 + 24);
    });
  }
  p.gap(20);

  // 06 두상관리
  {
    const d = 90, y = p.at();
    p.circle((W - d) / 2, y, d, '#f4d9b8', { label: '👶', color: '#fff', size: 30 });
    p.to(y + d + 24);
  }
  p.ctext('동글동글~\n두상관리도 되나요?', 34, { weight: 800, color: INK, lineH: 1.35, gap: 80 });
  p.pill('네, 물론입니다!', { cx: true, bg: YEL, color: INK, size: 16, advance: true, gap: 36 });
  p.ctext('좌/우 방향 바꿔가며 옆으로 재우는 자세를 추천드리고,\n하늘보기 자세로도 두상관리가 가능한 짱구베개 형태로 제작되었습니다!', 15, { color: SUB, align: 'center', lineH: 1.7, gap: 44 });
  p.cols(3, 16, (i, x, cw) => {
    p.aphoto(x, p.at(), cw, 130, '', { radius: 10 });
    p.atext(x, p.at() + 142, cw, ['옆으로 눕는 자세', '옆으로 눕는 자세', '하늘보기 자세'][i], 13, { color: SUB, align: 'center' });
  });
  p.gap(200);

  // 07 오래 쓰기
  p.ctext('100일 이후까지\n오래 쓸 수 있나요?', 34, { weight: 800, color: INK, lineH: 1.35, gap: 80 });
  p.pill('신생아부터 24개월까지 사용가능합니다', { cx: true, bg: YEL, color: INK, size: 16, advance: true, gap: 36 });
  p.ctext('100일 되면 사이즈가 작아서 옆잠베개로 못쓰는 게 아닌\n아기의 성장에 따라 지속적으로 사용 가능한 지 꼭 확인하세요!', 15, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(260, '제품 컷 (아기성장에 맞게 4단계 조절)', { radius: 16, gap: 64 });

  // 08 믿고 쓰는 + 평점
  p.ctext('믿고 쓰는 허그곰', 34, { weight: 800, color: INK, gap: 30 });
  p.ctext("허그곰을 사용해보신 분들의 '진짜 입소문'이 퍼지면서\n수 많은 아기들이 허그곰과 함께 했어요", 17, { weight: 600, color: INK, align: 'center', lineH: 1.7, gap: 50 });
  {
    const y = p.at();
    p.bg(400, W2, { x: 64, w: p.cw(), radius: 16 });
    p.atext(64, y + 40, p.cw(), '허그곰 1세대', 24, { weight: 800, color: BR, align: 'center' });
    p.atext(64, y + 82, p.cw(), '고객 총 평점', 18, { weight: 700, color: INK, align: 'center' });
    p.atext(64, y + 118, p.cw(), '4.9 / 5', 48, { weight: 800, color: INK, align: 'center' });
    p.atext(64, y + 190, p.cw(), '★★★★★', 26, { color: ORG, align: 'center' });
    p.atext(64, y + 250, p.cw(), '전체리뷰수  7,721개', 20, { weight: 700, color: INK, align: 'center' });
    p.atext(64, y + 292, p.cw(), '고객만족도  98.6%', 20, { weight: 700, color: INK, align: 'center' });
    p.atext(64, y + 340, p.cw(), '(허그곰 1세대 / 네이버스토어 리뷰기준 2024.4.29)', 12, { color: SUB, align: 'center' });
    p.to(y + 400 + 50);
  }
  p.photo(260, '아기 수면 컷', { radius: 16, gap: 60 });

  // 09 수면 표
  p.ctext('아기가 잘 자면,\n아기가 잘 자랍니다', 32, { weight: 800, color: INK, lineH: 1.35, gap: 80 });
  p.ctext('충분한 수면이 아기의 성장과 두뇌발달,\n정서적 발달, 성격 형성에 아주 중요한 역할을 합니다', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 44 });
  {
    p.pill('권장 수면 시간', { cx: true, bg: BR, color: '#fff', size: 16, advance: true, gap: 16 });
    const y = p.at();
    p.bg(320, '#f6ede0', { x: 64, w: p.cw(), radius: 12 });
    const head = ['개월수', '밤잠', '낮잠', '낮잠횟수', '총수면시간'];
    const rows = [['1개월', '8~9시간', '8시간', '4회', '16~17시간'], ['3개월', '10시간', '5시간', '3회', '15시간'], ['6개월', '11시간', '3~4시간', '2회', '14~15시간'], ['12개월', '11시간', '2~3시간', '2회', '13~14시간'], ['24개월', '11시간', '2시간', '1회', '13시간']];
    const cw5 = p.cw() / 5;
    head.forEach((h, i) => p.atext(64 + i * cw5, y + 20, cw5, h, 14, { weight: 700, color: BR, align: 'center' }));
    rows.forEach((r, ri) => r.forEach((c, ci) => p.atext(64 + ci * cw5, y + 60 + ri * 48, cw5, c, 13, { color: INK, align: 'center', weight: ci === 0 ? 700 : 400 })));
    p.to(y + 320 + 40);
  }

  return p.done('유아A', '반려동물&유아', CR);
}

export const PETBABY: Template[] = [neckring(), babycape(), babypot(), huggom()];
