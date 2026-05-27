/** 식품 5종 — 레퍼런스 단일 연속 상세페이지 재현 (사진만 placeholder). */
import type { Template } from '../types.ts';
import { P, stars } from '../kit.ts';

const W = 860;

/* ══════════ 식품1 — 두브로 시그니처 그래놀라 (우드+레드+크림) ══════════ */
function food1(): Template {
  const CR = '#f7eee2', CR2 = '#fbf4ea', R = '#c43a2f', RD = '#a82e25', KR = '#b07a3e',
    INK = '#3a2a1f', SUB = '#8a7867', W2 = '#ffffff', ONR = '#f7e6d3';
  const p = new P(W, 64);

  // 01 HERO
  p.gap(52);
  p.circle((W - 96) / 2, p.at(), 96, KR, { label: 'DUBRO', color: ONR, size: 16, weight: 700 });
  p.gap(120);
  p.ctext('매일 아침이 든든한', 30, { font: 'script', color: R, gap: 40 });
  p.ctext('두브로 시그니처\n그래놀라', 54, { weight: 800, color: R, lineH: 1.16, gap: 132 });
  p.ctext('DUBRO SIGNATURE GRANOLA', 16, { weight: 700, color: KR, ls: 3, gap: 40 });
  p.photo(380, '그래놀라 한 그릇 (메인 비주얼)', { radius: 20, gap: 28 });
  p.chips(['국산 통귀리 100%', '인공첨가물 ZERO', '직화 로스팅'], { bg: W2, color: R, stroke: '#eccfae', strokeW: 1, size: 15, advanceGap: 80 });

  // 02 WHEN TO EAT
  p.bg(560, CR2);
  p.gap(64);
  p.ctext('WHEN TO EAT?', 17, { weight: 700, color: KR, ls: 2, gap: 30 });
  p.ctext('언제 먹어도 완벽한 한 끼', 36, { weight: 800, color: INK, gap: 56 });
  {
    const items = [['01', '아침 식사 대용', '우유에 부어 3분이면\n든든한 아침'], ['02', '간식 · 야식', '출출할 때 가볍게\n즐기는 건강 간식'], ['03', '요거트와 함께', '상큼하게 즐기는\n한 그릇']];
    const top = p.at();
    p.cols(3, 28, (i, x, cw) => {
      p.circle(x + (cw - 72) / 2, top, 72, R, { label: items[i][0], color: W2, size: 28 });
      p.atext(x, top + 96, cw, items[i][1], 23, { weight: 800, color: INK, align: 'center' });
      p.atext(x, top + 138, cw, items[i][2], 16, { color: SUB, align: 'center', lineH: 1.5 });
    });
    p.to(top + 240);
  }
  p.gap(60);

  // 03 INGREDIENTS
  p.ctext('INGREDIENTS', 17, { weight: 700, color: KR, ls: 2, gap: 30 });
  p.ctext('엄선한 재료만 담았습니다', 34, { weight: 800, color: INK, gap: 48 });
  {
    const ing = ['국산 통귀리', '견과류', '건과일', '비정제원당'];
    const top = p.at();
    p.cols(4, 22, (i, x, cw) => {
      const d = Math.min(cw, 150);
      p.aphoto(x + (cw - d) / 2, top, d, d, ing[i], { shape: 'circle' });
      p.atext(x - 6, top + d + 14, cw + 12, ing[i], 17, { weight: 700, color: INK, align: 'center' });
    });
    p.to(top + 150 + 56);
  }
  p.gap(56);

  // 04 CHECK POINT (red)
  p.bg(440, R);
  p.gap(56);
  p.ctext('DUBRO PROMISE', 16, { weight: 700, color: ONR, ls: 3, gap: 26 });
  p.pill('CHECK POINT', { cx: true, bg: W2, color: R, size: 20, padX: 30, advance: true, gap: 44 });
  {
    const pts = ['국내산 통귀리만 사용합니다', '매일 소량씩 직접 로스팅합니다', '비정제원당 외 단맛을 더하지 않습니다'];
    const x0 = 150;
    pts.forEach((t, i) => {
      const y = p.at();
      p.circle(x0, y, 52, ONR, { label: String(i + 1).padStart(2, '0'), color: R, size: 21 });
      p.atext(x0 + 72, y + 12, W - x0 * 2 - 72 + 60, t, 22, { weight: 700, color: W2 });
      p.gap(80);
    });
  }
  p.gap(28);

  // 05 FRIENDS 라인업
  p.ctext('DUBRO FRIENDS', 17, { weight: 700, color: KR, ls: 2, gap: 28 });
  p.ctext('제품 라인업', 34, { weight: 800, color: INK, gap: 44 });
  {
    const fr = [['오리지널', '고소한 기본맛'], ['단호박', '달달한 풍미'], ['카카오', '진한 초코'], ['플레인', '담백하게']];
    const top = p.at();
    p.cols(4, 20, (i, x, cw) => {
      p.aphoto(x, top, cw, 150, fr[i][0], { radius: 14 });
      p.atext(x, top + 162, cw, fr[i][0], 19, { weight: 800, color: INK, align: 'center' });
      p.atext(x, top + 192, cw, fr[i][1], 14, { color: SUB, align: 'center' });
    });
    p.to(top + 230);
  }
  p.gap(64);

  // 06 HOW TO EAT
  p.bg(900, CR2);
  p.gap(60);
  p.ctext('세 가지 방법', 28, { font: 'script', color: R, gap: 36 });
  p.ctext('HOW TO EAT?', 17, { weight: 700, color: KR, ls: 2, gap: 26 });
  p.ctext('어떻게 먹지?', 34, { weight: 800, color: INK, gap: 48 });
  {
    const st = [['01', '우유에 부어서', '차가운 우유 한 컵에\n부으면 끝'], ['02', '요거트와 함께', '플레인 요거트 위에\n듬뿍 올려서'], ['03', '그대로 간식으로', '출출할 때 한 줌,\n바삭하고 고소하게']];
    st.forEach((s) => {
      const y = p.at();
      p.aphoto(64, y, 200, 150, '', { radius: 14 });
      p.circle(80, y + 16, 56, R, { label: s[0], color: '#fff', size: 24 });
      p.atext(296, y + 26, 500, s[1], 26, { weight: 800, color: INK });
      p.atext(296, y + 70, 500, s[2], 17, { color: SUB, lineH: 1.5 });
      p.gap(176);
    });
  }
  p.gap(40);

  // 07 제품 상세 정보
  p.ctext('PRODUCT INFO', 16, { weight: 700, color: KR, ls: 2, gap: 26 });
  p.ctext('제품 상세 정보', 32, { weight: 800, color: INK, gap: 40 });
  {
    const rows = [['제품명', '두브로 시그니처 그래놀라'], ['중량', '300g'], ['원재료', '국산 귀리, 견과류, 건과일, 비정제원당'], ['보관방법', '직사광선을 피해 실온 보관'], ['알레르기', '견과류 함유']];
    rows.forEach((r) => {
      const y = p.at();
      p.bg(60, '#fff', { x: 64, w: p.cw(), radius: 10 });
      p.atext(88, y + 19, 150, r[0], 16, { weight: 700, color: R });
      p.atext(250, y + 19, p.cw() - 210, r[1], 16, { color: INK });
      p.gap(70);
    });
  }
  p.gap(36);

  // 08 CTA (red)
  p.bg(420, R);
  p.gap(56);
  p.ctext('ORDER NOW', 16, { weight: 700, color: ONR, ls: 3, gap: 26 });
  p.ctext('매일 아침이 달라집니다', 40, { weight: 800, color: '#fff', gap: 50 });
  p.ctext('오늘 주문하면 오늘 보내드려요', 18, { color: ONR, gap: 44 });
  p.chips(['첫 구매 10% 할인', '2개 이상 무료배송', '정기배송 혜택'], { bg: RD, color: '#fff', size: 15, advanceGap: 44 });
  p.pill('지금 주문하기', { cx: true, bg: '#fff', color: R, size: 22, padX: 42, h: 64, advance: true, gap: 40 });

  return p.done('식품1', '식품', CR);
}

/* ══════════ 식품2 — 쭈사랑 쭈꾸미 (블랙+코랄) ══════════ */
function food2(): Template {
  const BG = '#f4f4f4', BK = '#1c1c1c', CO = '#ff5a3c', COD = '#e23b1f', W2 = '#fff',
    INK = '#222', SUB = '#777', ONB = '#ffd9cf';
  const p = new P(W, 64);

  // 01 HERO (black)
  p.bg(900, BK);
  p.gap(56);
  p.ctext('차원이 다른 맛의 비결', 20, { color: ONB, gap: 36 });
  p.ctext('쭈사랑 주꾸미', 56, { weight: 800, color: CO, gap: 70 });
  p.ctext('서울 중랑본점', 18, { color: W2, gap: 40 });
  p.photo(360, '쭈꾸미 볶음 메인 비주얼', { x: 120, w: W - 240, radius: 18, gap: 36 });
  p.pill('당일 생산, 당일 소진!', { cx: true, bg: CO, color: '#fff', size: 19, padX: 30, advance: true, gap: 40 });
  p.ctext('16년 연구한 특제 양념으로\n매콤하지만 중독성 있는 진짜 쭈꾸미 볶음', 22, { weight: 700, color: W2, lineH: 1.6, gap: 60 });

  // 02 브랜드 (white)
  p.bg(560, W2);
  p.gap(56);
  p.ctext('믿고 먹는 브랜드 쭈사랑', 32, { weight: 800, color: INK, gap: 40 });
  p.ctext('서울 동부시장에서 인정받은 맛집, 쭈사랑 중랑본점', 17, { color: SUB, gap: 44 });
  {
    const y = p.at();
    p.bg(220, '#faf7f5', { x: 100, w: W - 200, radius: 16 });
    p.atext(140, y + 32, W - 280, '· 2009년부터 운영하며 변함없는 맛으로 사랑받아온 프리미엄 쭈꾸미 볶음', 17, { weight: 600, color: INK, lineH: 1.7 });
    p.atext(140, y + 96, W - 280, '· 2018년, 6평에서 24평으로 확장 이전', 17, { weight: 600, color: INK, lineH: 1.7 });
    p.atext(140, y + 138, W - 280, '· 16년간 쌓아온 노하우를 담아 간편한 밀키트로 온라인 판매', 17, { weight: 600, color: INK, lineH: 1.7 });
    p.to(y + 250);
  }
  p.pill('배달앱 평점 4.9 이상', { cx: true, bg: CO, color: '#fff', size: 17, padX: 26, advance: true, gap: 60 });

  // 03 GIF
  p.bg(300, '#000');
  p.gap(110);
  p.ctext('gif', 48, { weight: 800, color: W2, gap: 30 });
  p.ctext('조리 과정 GIF 영역', 16, { color: '#888', gap: 130 });

  // 04 활용도
  p.gap(50);
  p.ctext('활용도 200%!', 30, { weight: 800, color: CO, gap: 40 });
  p.ctext('다양한 곁들임 메뉴', 32, { weight: 800, color: INK, gap: 18 });
  p.ctext('다양한 추가 재료로도 풍성하게', 16, { color: SUB, gap: 40 });
  p.photo(220, '곁들임 요리 (라면 사리 · 볶음밥)', { radius: 14, gap: 18 });
  p.cols(2, 20, (i, x, cw) => p.aphoto(x, p.at(), cw, 180, ['치즈 토핑', '볶음밥 마무리'][i], { radius: 14 }));
  p.gap(198);

  // 05 후기
  p.bg(520, BG);
  p.gap(54);
  p.ctext('고객님들의 리얼 후기!', 32, { weight: 800, color: INK, gap: 48 });
  {
    const rv = ['쭈꾸미 하면 무조건 쭈사랑!', '믿고 먹는 쭈사랑, 맛도 양도 최고', '앞으로 쭈꾸미는 여기서만 시켜요', '한 입에 반했어요, 재구매 각'];
    rv.forEach((t) => {
      const y = p.at();
      p.bg(72, CO, { x: 120, w: W - 240, radius: 36 });
      p.atext(120, y + 24, W - 240, '★★★★★  ' + t, 18, { weight: 700, color: '#fff', align: 'center' });
      p.gap(88);
    });
  }
  p.gap(24);

  // 06 언제 먹어도
  p.gap(40);
  p.ctext('언제 먹어도 완벽한 메뉴', 32, { weight: 800, color: INK, gap: 18 });
  p.ctext('오늘도 신선한 쭈꾸미, 한 번 먹으면 매번 생각나는 맛', 16, { color: SUB, gap: 46 });
  {
    const ic = ['밥과 든든하게', '맥주 안주로', '초간단 야식', '혼술 메뉴'];
    const top = p.at();
    p.cols(4, 20, (i, x, cw) => {
      const d = Math.min(cw, 110);
      p.aphoto(x + (cw - d) / 2, top, d, d, '', { shape: 'circle' });
      p.atext(x - 6, top + d + 14, cw + 12, ic[i], 16, { weight: 700, color: INK, align: 'center' });
    });
    p.to(top + 110 + 56);
  }
  p.gap(56);

  // 07 식품 정보 (black)
  p.bg(560, BK);
  p.gap(54);
  p.ctext('식품 정보 및 조리 방법', 32, { weight: 800, color: W2, gap: 44 });
  p.photo(200, '조리 비주얼', { x: 140, w: W - 280, radius: 14, gap: 36 });
  {
    const y = p.at();
    p.atext(140, y, W - 280, '판매 단위', 16, { weight: 700, color: CO });
    p.atext(140, y + 28, W - 280, '1팩 (400g, 1.5~2인분)', 17, { color: W2 });
    p.atext(140, y + 78, W - 280, '보관 방법', 16, { weight: 700, color: CO });
    p.atext(140, y + 106, W - 280, '냉장 보관 시 제조일로부터 5일 이내 / 냉동 보관 시 6개월 이내', 16, { color: '#ccc', lineH: 1.6 });
    p.to(y + 200);
  }

  // 08 이렇게 드시면
  p.gap(50);
  p.ctext('이렇게 드시면 좋아요!', 30, { weight: 800, color: INK, gap: 48 });
  {
    const it = [['쭈꾸미 마니아라면', '혼자서도 배불리'], ['다른 재료 추가하면', '두 분이서 넉넉히']];
    const top = p.at();
    p.cols(2, 40, (i, x, cw) => {
      const d = 120;
      p.aphoto(x + (cw - d) / 2, top, d, d, '', { shape: 'circle' });
      p.atext(x, top + d + 16, cw, it[i][0], 18, { weight: 800, color: INK, align: 'center' });
      p.atext(x, top + d + 46, cw, it[i][1], 15, { color: SUB, align: 'center' });
    });
    p.to(top + d_(120) + 80);
  }
  p.gap(40);

  // 09 footer (black)
  p.bg(220, BK);
  p.gap(64);
  p.ctext('믿고 먹는 브랜드 쭈사랑', 30, { weight: 800, color: CO, gap: 44 });
  p.ctext('서울 동부시장에서 인정받은 쭈사랑 중랑본점', 16, { color: '#bbb', gap: 60 });

  return p.done('식품2', '식품', BG);
}
function d_(n: number) { return n; }

/* ══════════ 식품3 — 태봉이 수제만두 (오렌지+크림+브라운) ══════════ */
function food3(): Template {
  const CR = '#fde9d2', OR = '#f2741a', ORD = '#db5e0a', BR = '#5a3210', W2 = '#fff',
    INK = '#3a2a1f', SUB = '#8a7565', ONB = '#ffe0b0';
  const p = new P(W, 64);

  // 01 HERO (brown)
  p.bg(560, BR);
  p.gap(56);
  p.ctext('속이 꽉차고 탱탱한 수제만두', 19, { color: ONB, gap: 40 });
  p.ctext('태봉이\n수제만두', 56, { weight: 800, color: OR, lineH: 1.12, gap: 150 });
  p.photo(240, '만두 메인 비주얼', { x: 220, w: W - 440, radius: 16, gap: 60 });

  // 02 후기
  p.gap(48);
  p.ctext('태봉이 수제만두의 생생한 후기', 30, { weight: 800, color: INK, gap: 18 });
  p.ctext('★★★★★', 22, { color: OR, gap: 40 });
  ['아이도 어른도 좋아하는 든든한 한 끼, 만두 속이 가득해요!', '냉동실 필수템! 해동 없이 바로 조리해서 너무 편해요.'].forEach((t) => {
    const y = p.at();
    p.bg(72, W2, { x: 100, w: W - 200, radius: 36 });
    p.atext(130, y + 24, W - 260, t, 16, { color: INK, align: 'center' });
    p.gap(88);
  });
  p.gap(30);

  // 03 원칙 (orange band)
  p.bg(360, OR);
  p.gap(54);
  p.ctext('태봉이 수제만두의 원칙!', 32, { weight: 800, color: '#fff', gap: 56 });
  {
    const it = ['당일 생산', '무방부제', '안심 포장재'];
    const top = p.at();
    p.cols(3, 30, (i, x, cw) => {
      const d = 96;
      p.aphoto(x + (cw - d) / 2, top, d, d, '', { shape: 'circle' });
      p.atext(x, top + d + 18, cw, it[i], 19, { weight: 800, color: '#fff', align: 'center' });
    });
    p.to(top + 96 + 60);
  }
  p.gap(40);

  // 04 소개
  p.ctext('"태봉이 수제만두를 소개합니다"', 28, { weight: 800, color: INK, gap: 44 });
  {
    const d = 150, y = p.at();
    p.aphoto((W - d) / 2, y, d, d, '대표 사진', { shape: 'circle' });
    p.to(y + d + 24);
  }
  p.ctext('20년 경력의 손맛으로 매일 아침 직접 빚는 수제만두.\n좋은 재료만 고집하는 태봉이 만두의 약속입니다.', 17, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(180, '매장 / 작업 전경', { radius: 14, gap: 56 });

  // 05 어떻게 다른가요 (2x2 포인트)
  p.ctext('태봉이 수제만두는 어떻게 다른가요?', 30, { weight: 800, color: ORD, gap: 48 });
  {
    const pts = [['POINT 1', '천연 재료', '국내산 채소와 고기'], ['POINT 2', '당일 배송', '신선하게 문 앞까지'], ['POINT 3', '손 반죽', '쫄깃한 피의 비결'], ['POINT 4', '비법 양념', '깊은 풍미의 만두소']];
    const top = p.at(), cw = (p.cw() - 24) / 2, ch = 150;
    pts.forEach((pt, i) => {
      const x = 64 + (i % 2) * (cw + 24), y = top + Math.floor(i / 2) * (ch + 24);
      p.abs({ t: 'rect', x, y, w: cw, h: ch, fill: W2, radius: 14 });
      p.atext(x + 24, y + 24, cw - 48, pt[0], 14, { weight: 700, color: OR });
      p.atext(x + 24, y + 54, cw - 48, pt[1], 22, { weight: 800, color: INK });
      p.atext(x + 24, y + 96, cw - 48, pt[2], 15, { color: SUB });
    });
    p.to(top + ch * 2 + 24 + 56);
  }

  // 06 즐기기 (만두 종류 + 큰 사진)
  p.ctext('속이 꽉차고 쫄깃한 태봉이 수제만두', 22, { weight: 700, color: OR, gap: 40 });
  p.cols(2, 20, (i, x, cw) => {
    p.aphoto(x, p.at(), cw, 150, ['고기만두', '김치고추만두'][i], { radius: 12 });
    p.atext(x, p.at() + 160, cw, ['고기만두', '김치고추만두'][i], 17, { weight: 700, color: INK, align: 'center' });
  });
  p.gap(210);
  p.ctext('태봉이 수제만두 즐기기', 26, { font: 'script', color: ORD, gap: 36 });
  p.photo(300, '찐만두 클로즈업', { radius: 16, gap: 18 });
  p.photo(180, '튀김만두', { radius: 16, gap: 56 });

  // 07 어떻게 먹나요
  p.ctext('태봉이 수제만두는 어떻게 먹나요?', 30, { weight: 800, color: ORD, gap: 18 });
  p.ctext('냉동 상태에서 조리하거나 자연 해동 후 드세요', 16, { color: SUB, gap: 44 });
  {
    const it = ['전자레인지', '찜기', '에어프라이어'];
    const top = p.at();
    p.cols(3, 24, (i, x, cw) => {
      p.aphoto(x, top, cw, 110, '', { radius: 12 });
      p.atext(x, top + 122, cw, it[i], 17, { weight: 700, color: INK, align: 'center' });
    });
    p.to(top + 110 + 56);
  }
  p.gap(40);

  // 08 보관
  p.ctext('남은 만두는 어떻게 보관하나요?', 30, { weight: 800, color: ORD, gap: 44 });
  {
    const it = [['냉장 보관', '2~3일 이내 섭취'], ['냉동 보관', '한 달 이내 섭취']];
    const top = p.at();
    p.cols(2, 24, (i, x, cw) => {
      p.aphoto(x, top, cw, 130, '', { radius: 12 });
      p.atext(x, top + 142, cw, it[i][0], 18, { weight: 800, color: INK, align: 'center' });
      p.atext(x, top + 172, cw, it[i][1], 14, { color: SUB, align: 'center' });
    });
    p.to(top + 130 + 70);
  }
  p.gap(40);

  // 09 배송 (orange box)
  {
    const y = p.at();
    p.bg(280, OR, { x: 64, w: p.cw(), radius: 18 });
    p.atext(64, y + 32, p.cw(), '어떻게 배송되나요?', 28, { weight: 800, color: '#fff', align: 'center' });
    p.aphoto(110, y + 96, W - 220, 150, '아이스팩 + 아이스박스 포장', { radius: 12 });
    p.to(y + 280 + 40);
  }

  // 10 배송정보
  p.ctext('배송 정보', 26, { weight: 800, color: INK, gap: 36 });
  {
    const y = p.at();
    p.bg(200, '#f3e6d4', { x: 64, w: p.cw(), radius: 14 });
    p.atext(96, y + 28, p.cw() - 64, '· 평일 오후 2시 이전 주문 시 당일 출고됩니다.\n· 신선식품 특성상 단순 변심에 의한 교환·반품은 어렵습니다.\n· 제품 수령 즉시 냉동 보관해 주세요.', 15, { color: SUB, lineH: 1.9 });
    p.to(y + 200 + 30);
  }

  return p.done('식품3', '식품', CR);
}

/* ══════════ 식품4 — Simple & Easy 떡볶이 (옐로+오렌지) ══════════ */
function food4(): Template {
  const YEL = '#fbf0bf', OR = '#f5821f', ORD = '#e0670a', R = '#d9342a', W2 = '#fff',
    INK = '#2b2b2b', SUB = '#7a7256';
  const p = new P(W, 64);

  // 01 Why
  p.gap(48);
  p.photo(220, '완성 떡볶이', { x: 180, w: W - 360, radius: 16, gap: 40 });
  p.ctext('Why?', 40, { weight: 800, color: R, gap: 50 });
  p.ctext('간편한데, 맛있기까지 해요', 30, { weight: 800, color: INK, gap: 56 });

  // 고춧가루
  p.photo(220, '고춧가루', { radius: 14, gap: 24 });
  p.text('고품질 고춧가루 사용', 24, { weight: 800, color: ORD, gap: 36 });
  p.text('자극적인 캡사이신 및 인공소스를 사용하지 않습니다.\n고춧가루로 맛을 내는 깔끔한 매운맛.', 17, { color: SUB, lineH: 1.7, gap: 60 });

  // 배합
  p.photo(220, '정량 계량 장면', { radius: 14, gap: 24 });
  p.text('일정한 배합량', 24, { weight: 800, color: ORD, gap: 36 });
  p.text('한꺼번에 많은 양을 배합하지 않아\n배합 비율을 일관성 있게 유지합니다.', 17, { color: SUB, lineH: 1.7, gap: 70 });

  p.ctext('그동안 떡볶이가\n한 번 해먹기 힘드셨죠?', 28, { weight: 800, color: ORD, lineH: 1.4, gap: 100 });
  p.photo(240, '요리 장면', { radius: 16, gap: 70 });

  // 02 Simple & Easy capsule
  {
    const y = p.at();
    p.bg(520, OR, { x: 200, w: W - 400, radius: 230 });
    p.atext(200, y + 36, W - 400, '번거로우셨다면, 이제는', 18, { weight: 700, color: '#fff', align: 'center' });
    p.atext(200, y + 78, W - 400, 'Simple & Easy', 40, { weight: 800, color: '#fff', align: 'center' });
    p.aphoto(260, y + 150, (W - 520) / 2 - 10, 130, '일반 떡볶이', { radius: 12 });
    p.aphoto(260 + (W - 520) / 2 + 10, y + 150, (W - 520) / 2 - 10, 130, '소스연유 떡볶이', { radius: 12 });
    p.atext(200, y + 320, W - 400, '간편하게 전자레인지\n조리 후 흡입!', 18, { weight: 700, color: '#fff', align: 'center', lineH: 1.5 });
    p.to(y + 520 + 56);
  }

  p.ctext('전자레인지 6분!', 32, { weight: 800, color: ORD, gap: 54 });
  p.ctext('요리 초보자도 쉽게 조리 가능', 22, { weight: 700, color: INK, gap: 48 });
  p.photo(240, '전자레인지 조리', { x: 200, w: W - 400, radius: 14, gap: 44 });
  {
    const st = ['① 전자레인지 용기에 떡볶이 재료(떡, 어묵)를 담는다', '② 물 종이컵 1.5컵과 분말 소스 1봉을 넣는다', '③ 전자레인지에 6~7분 조리한다'];
    st.forEach((t) => p.ctext(t, 17, { color: INK, gap: 40 }));
  }
  p.gap(30);

  // 03 완성 + 제품정보
  p.ctext('땡! 맛있는 떡볶이 완성!', 26, { weight: 800, color: ORD, gap: 36 });
  {
    const d = 280, y = p.at();
    p.aphoto((W - d) / 2, y, d, d, '완성 떡볶이', { shape: 'circle' });
    p.to(y + d + 14);
  }
  p.ctext('바로 이 맛이야!', 26, { font: 'script', color: ORD, gap: 60 });
  p.ctext('· 제품 정보 ·', 24, { weight: 800, color: INK, gap: 44 });
  p.cols(2, 24, (i, x, cw) => {
    p.aphoto(x, p.at(), cw, 130, ['소스 패키지', '성분표'][i], { radius: 10 });
    p.aphoto(x, p.at() + 154, cw, 130, ['떡·어묵 구성', '조리법 안내'][i], { radius: 10 });
  });
  p.gap(308);
  p.photo(260, '떡볶이 디테일 컷', { radius: 16, gap: 40 });

  return p.done('식품4', '식품', YEL);
}

/* ══════════ 식품5 — 설화 쫀득 쿠키 (오렌지+크림) ══════════ */
function food5(): Template {
  const ORG = '#ef7d3a', CR = '#f7f0e6', ORD = '#d9601f', W2 = '#fff',
    INK = '#3a2a22', SUB = '#8a7565', GR = '#dcdcdc';
  const p = new P(W, 64);

  // 01 HERO (gray card on orange page)
  p.gap(48);
  {
    const y = p.at();
    p.bg(380, GR, { x: 64, w: p.cw(), radius: 16 });
    p.aphoto((W - 180) / 2, y + 30, 180, 90, '로고', { radius: 8 });
    p.atext(64, y + 140, p.cw(), '차원이 다른 쫀득~한', 17, { weight: 600, color: SUB, align: 'center' });
    p.atext(64, y + 170, p.cw(), '설화 쫀득 쿠키', 36, { weight: 800, color: INK, align: 'center' });
    p.aphoto(180, y + 230, W - 360, 120, '쿠키 비주얼', { radius: 10 });
    p.to(y + 380 + 50);
  }

  // 02 브랜드 신뢰 (orange)
  p.gap(8);
  p.ctext('거품 빼고! 부담 없는!', 22, { weight: 700, color: '#fff', gap: 40 });
  p.ctext('먹는 즐거움을 선사하는', 18, { color: '#ffe6d6', gap: 34 });
  p.ctext('칩스앤너츠', 38, { weight: 800, color: '#fff', gap: 70 });
  p.ctext('?', 40, { weight: 800, color: '#fff', gap: 50 });
  p.ctext('쫀득쿠키는 수제라서\n비싼 거 아니냐고요?', 24, { weight: 700, color: '#fff', lineH: 1.4, gap: 80 });
  p.ctext('그럼에도\n믿을 수 있습니다!', 30, { weight: 800, color: '#fff', lineH: 1.35, gap: 100 });
  {
    const st = [['01', '동결건조 제품·쿠키 제조를 함께 할 수 있는 공장을 찾고'], ['02', '그 중에도 믿을 수 있는 공장을 찾고 또 찾고'], ['03', '공장을 선택한 뒤, 원하는 결과를 얻기까지 공장 방문']];
    st.forEach((s) => {
      const y = p.at();
      p.aphoto(64, y, p.cw(), 150, '', { radius: 12 });
      p.circle(84, y + 16, 50, '#fff', { label: s[0], color: ORG, size: 20 });
      p.gap(162);
      p.text(s[1], 16, { weight: 600, color: '#fff', align: 'center', lineH: 1.5, gap: 44 });
    });
  }
  p.gap(20);

  // 03 완벽조화 (cream)
  p.bg(440, CR);
  p.gap(54);
  p.ctext('맛있을 설화쫀득쿠키의 3박자', 16, { color: ORD, gap: 26 });
  p.ctext('완벽조화', 34, { weight: 800, color: ORD, gap: 40 });
  p.chips(['쫀득함', '고소함', '바삭함'], { bg: ORG, color: '#fff', size: 16, advanceGap: 40 });
  p.photo(200, '쿠키 단면 비주얼', { x: 160, w: W - 320, radius: 14, gap: 60 });

  // 04 개별포장
  p.ctext('편리하고 위생적인', 16, { color: ORD, gap: 26 });
  p.ctext('개별포장', 32, { weight: 800, color: ORD, gap: 40 });
  p.photo(200, '개별포장 사진', { x: 220, w: W - 440, radius: 12, gap: 20 });
  p.ctext('한 봉 평균 7~10g씩 개별 포장', 16, { color: SUB, gap: 64 });

  // 05 6가지 디저트
  p.ctext('골라 먹는 다양한 맛의 재미', 16, { color: ORD, gap: 26 });
  p.ctext('6가지 디저트', 32, { weight: 800, color: ORD, gap: 48 });
  {
    const fl = ['딸기쫀득', '딸기초코쫀득', '흑임자쫀득', '말차무화과', '인절미쫀득', '땅콩누가바'];
    const top = p.at(), d = 150;
    const cw = (p.cw() - 48) / 3;
    fl.forEach((nm, i) => {
      const c = i % 3, r = Math.floor(i / 3);
      const x = 64 + c * (cw + 24), yy = top + r * (d + 50);
      p.aphoto(x + (cw - d) / 2, yy, d, d, '', { shape: 'circle' });
      p.atext(x - 6, yy + d + 12, cw + 12, nm, 15, { weight: 700, color: INK, align: 'center' });
    });
    p.to(top + d * 2 + 50 + 56);
  }

  // 06 맛별 큰 사진 (cream)
  p.bg(1390, CR);
  p.gap(54);
  {
    const items = [['설화 쫀득 쿠키 말차무화과', 220], ['설화 쫀득 쿠키 인절미', 240], ['설화 쫀득 쿠키 딸기', 220], ['땅콩 누가 바', 200]];
    items.forEach(([nm, h]) => {
      p.ctext(nm as string, 20, { weight: 800, color: INK, gap: 36 });
      p.photo(h as number, '', { x: 160, w: W - 320, radius: 14, gap: 50 });
    });
  }

  return p.done('식품5', '식품', ORG);
}

export const FOOD: Template[] = [food1(), food2(), food3(), food4(), food5()];
