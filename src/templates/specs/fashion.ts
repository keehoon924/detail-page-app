/** 패션 2종 — 레퍼런스 단일 연속 상세페이지 재현. */
import type { Template } from '../types.ts';
import { P } from '../kit.ts';

const W = 860;

/* ══════════ 패션1 — 다비온 남녀공용 빅사이즈 캡모자 (베이지+세리프) ══════════ */
function fashion1(): Template {
  const BG = '#f3efe9', CR = '#efe9e0', INK = '#2c2722', SUB = '#8b8276', LINE = '#cfc6b8',
    BR = '#6b5a45', W2 = '#fff';
  const p = new P(W, 64);

  // 01 HERO lifestyle
  p.gap(40);
  p.photo(420, '착용 라이프스타일 (블랙 캡 + 헤드셋)', { radius: 0, gap: 70 });

  // 02 인트로 카피
  p.ctext('머리를 폭 감싸주는', 28, { weight: 700, color: INK, gap: 18 });
  p.ctext('남녀공용 대두 캡모자 5color', 32, { weight: 800, color: INK, gap: 56 });
  p.ctext('55-65cm 둘레까지 사용 가능한\n빅사이즈 캡모자로\n데일리하게 쓰기 좋은 디자인입니다!', 18, { color: SUB, align: 'center', lineH: 2, gap: 60 });
  p.ctext('"편하게 쓰고 싶은데 예쁜 캡모자를 찾기 어려우셨다면"\n이 제품을 추천드려요.', 18, { color: INK, align: 'center', lineH: 1.9, gap: 56 });
  p.ctext('다양한 26년 시즌 컬러 구성으로\n취향에 맞게 선택해보세요!', 18, { color: SUB, align: 'center', lineH: 1.9, gap: 80 });

  // 03 serif 타이틀
  p.bg(420, CR);
  p.gap(60);
  p.ctext('MEN & WOMEN', 40, { weight: 700, color: '#cfc4b2', font: 'serif', ls: 2, gap: 8 });
  p.ctext('OVERSIZED CAP', 40, { weight: 700, color: '#9a8f7c', font: 'serif', ls: 2, gap: 50 });
  p.photo(240, '베이지 캡 착용 컷', { x: 200, w: W - 400, radius: 8, gap: 70 });

  // 04 라이프 컷
  p.photo(300, '그레이 톱 착용 컷', { radius: 0, gap: 70 });

  // 05 DETAIL POINT
  p.bg(620, '#f6f2eb');
  p.gap(54);
  p.ctext('DETAIL POINT', 34, { weight: 700, color: INK, font: 'serif', ls: 1, gap: 56 });
  {
    const it = [['빅사이즈 볼캡', '깊이가 깊어서 남녀공용 쓰기 좋고\n둘레 상관없이 예쁜 핏을 완성해줍니다.'], ['튼튼한 내구성', '흐물거리지 않고 탄탄한 박음질로\n오래 사용할 수 있습니다.'], ['다양한 색상', '데일리룩에 어울리는 다섯 컬러로\n취향대로 선택할 수 있습니다.']];
    it.forEach((t) => {
      const y = p.at();
      const d = 130;
      p.aphoto(90, y, d, d, '', { shape: 'circle' });
      p.atext(250, y + 14, p.cw() - 200, t[0], 22, { weight: 800, color: INK });
      p.atext(250, y + 52, p.cw() - 200, t[1], 15, { color: SUB, lineH: 1.6 });
      p.gap(d + 40);
    });
  }
  p.gap(20);

  // 06 라이프 컷 grid
  p.photo(300, '네이비 캡 착용 컷', { radius: 0, gap: 16 });
  p.cols(2, 16, (i, x, cw) => p.aphoto(x, p.at(), cw, 240, ['카키 캡', '블랙 캡'][i], { radius: 0 }));
  p.gap(280);

  // 07 비교
  p.cols(2, 30, (i, x, cw) => {
    p.aphoto(x, p.at(), cw, 180, ['다비온 제품', '타제품'][i], { radius: 8 });
  });
  p.gap(200);
  p.ctext('같은 디자인이라도 깊이가 다른, 다비온 캡모자.', 19, { weight: 700, color: INK, gap: 32 });
  p.ctext('꾸안꾸하고 싶은 날,\n가볍게 푹 눌러 쓰고 나가기 좋은 데일리 캡입니다.', 17, { color: SUB, align: 'center', lineH: 1.7, gap: 60 });

  // 08 라이프 컷
  p.photo(320, '스카프 코디 착용 컷', { radius: 0, gap: 24 });
  p.photo(320, '네이비 캡 착용 컷', { radius: 0, gap: 64 });

  // 09 조절 카피
  p.ctext('55-65cm까지 조절 가능해\n두상에 상관없이 편안하게 착용할 수 있습니다.', 20, { weight: 700, color: INK, align: 'center', lineH: 1.6, gap: 50 });
  p.ctext('깊이감 있는 디자인으로 안정감 있게\n남녀 모두 예쁜 핏을 완성해줍니다.', 17, { color: SUB, align: 'center', lineH: 1.7, gap: 60 });

  // 10 색상 옵션
  p.text('색상 옵션', 24, { weight: 800, color: INK, gap: 40 });
  {
    const y = p.at();
    p.bg(440, '#a98b6a', { x: 64, w: p.cw(), radius: 14 });
    const cols = [['블랙', 0, 0], ['아이보리', 1, 0], ['브라운', 0, 1], ['베이지', 1, 1], ['네이비', 0.5, 2]];
    const cw = 280, ch = 110;
    cols.forEach(([nm, cx, ry]) => {
      const x = 110 + (cx as number) * 300;
      p.aphoto(x, y + 30 + (ry as number) * 130, cw, ch, nm as string, { radius: 8 });
    });
    p.to(y + 440 + 50);
  }

  // 11 SPEC
  {
    const rows = [['제품명', '다비온 남녀공용 빅사이즈 캡모자'], ['컬러', '블랙, 브라운, 네이비, 베이지, 아이보리'], ['소재', '폴리에스터'], ['제조국', 'made in china'], ['수입자/제조사', '아르미아 / 아르미아협력사'], ['제조년월', '2026.03'], ['머리둘레', '약 55-65cm'], ['수입자 정보', '0505-007-2228']];
    rows.forEach((r) => {
      const y = p.at();
      p.atext(80, y, 180, r[0], 15, { weight: 700, color: INK });
      p.atext(270, y, p.cw() - 206, r[1], 15, { color: SUB });
      p.hr({ color: '#e8e2d8', gap: 18, x: 80, w: p.cw() - 32 });
      p.to(y + 48);
    });
  }
  p.gap(20);
  p.text('* 세탁 시 변형 가능성이 있으므로 가볍게 닦아주세요.\n* 본 제품은 공정거래위원회 고시 소비자분쟁해결기준에 의거하여 보상받을 수 있습니다.', 13, { color: '#a89e90', lineH: 1.8, gap: 30 });

  return p.done('패션1', '패션', BG);
}

/* ══════════ 패션2 — 로멀리 플라워 헤어 커치프 (그린+그레이) ══════════ */
function fashion2(): Template {
  const BG = '#efefef', GR = '#1f7a3d', INK = '#2a2a2a', SUB = '#7c7c7c', W2 = '#fff',
    DK = '#3a3a3a', RED = '#e23b1f';
  const p = new P(W, 64);

  // 01 HERO (nature photo + overlay text)
  {
    const y = p.at();
    p.bg(560, '#6f7d5a');
    p.aphoto(0, y, W, 560, '꽃밭 인물 (레이스 두건 착용)');
    p.atext(64, y + 50, p.cw(), '가볍게 둘러도 살아나는 데일리 포인트', 17, { weight: 600, color: '#fff' });
    p.atext(64, y + 86, p.cw(), '로멀리', 30, { weight: 800, color: '#fff' });
    p.atext(64, y + 130, p.cw(), '플라워 헤어 커치프', 36, { weight: 800, color: '#fff' });
    p.to(y + 560);
  }

  // 02 CHECK POINT 5
  p.bg(640, BG);
  p.gap(56);
  p.ctext('"한 눈에 보는"', 26, { font: 'script', color: '#9a9a9a', gap: 34 });
  p.ctext('CHECK POINT 5', 40, { weight: 800, color: GR, ls: 1, gap: 50 });
  {
    const chk = ['플라워 레이스로 은은한 분위기 완성', '가벼운 소재로 부담 없는 착용감', '헤어부터 허리까지 다양한 연출', '부드러운 촉감으로 편안한 착용', '2개 구성으로 여유 있는 활용성'];
    chk.forEach((t) => {
      const y = p.at();
      p.bg(64, W2, { x: 64, w: p.cw(), radius: 12 });
      p.abs({ t: 'rect', x: 92, y: y + 18, w: 28, h: 28, fill: '#fff', stroke: RED, strokeW: 2, radius: 5 });
      p.atext(92, y + 19, 28, '✓', 18, { weight: 800, color: RED, align: 'center' });
      p.atext(140, y + 20, p.cw() - 100, t, 17, { weight: 700, color: INK });
      p.gap(80);
    });
  }
  p.gap(20);

  // 03 OPTION
  p.ctext('OPTION', 34, { weight: 800, color: INK, gap: 36 });
  p.pill('화이트 | 2개입', { cx: true, bg: DK, color: '#fff', size: 16, advance: true, gap: 44 });
  {
    const y = p.at();
    p.bg(420, W2, { x: 64, w: p.cw(), radius: 20 });
    p.aphoto(180, y + 50, W - 360, 320, '레이스 두건 2개입 (제품컷)', { radius: 12 });
    p.to(y + 420 + 60);
  }

  // 04~05 Check.01 / Check.02 (serif)
  const checks: [string, string, string][] = [
    ['Check. 01', '은은한 레이스', '플라워 패턴 레이스가 자연스럽게 어우러져\n과하지 않은 포인트 스타일을 완성합니다.'],
    ['Check. 02', '가벼운 착용감', '부드러운 폴리에스터 소재로 제작되어\n장시간 착용에도 부담 없이 사용할 수 있습니다.'],
  ];
  checks.forEach((c) => {
    p.gap(20);
    p.ctext(c[0], 22, { font: 'serif', color: SUB, gap: 36 });
    p.ctext(c[1], 32, { weight: 800, color: INK, gap: 30 });
    p.ctext(c[2], 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
    p.photo(320, '연출 컷', { radius: 0, gap: 50 });
  });

  // 06 감각적 포인트
  p.ctext('감각적 포인트', 32, { weight: 800, color: INK, gap: 30 });
  p.ctext('단순한 코디에 가볍게 더해져\n전체 분위기를 자연스럽게 살려줍니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(340, '인물 연출 (꽃과 함께)', { radius: 0, gap: 16 });
  p.photo(320, '독서 연출 컷', { radius: 0, gap: 60 });

  // 07 Check.04
  p.ctext('Check. 04', 22, { font: 'serif', color: SUB, gap: 36 });
  p.ctext('다양한 연출', 32, { weight: 800, color: INK, gap: 30 });
  p.ctext('헤어 커치프부터 허리 포인트까지 활용되어\n하나로 여러 스타일 연출이 가능합니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(300, '허리 포인트 연출', { radius: 0, gap: 16 });
  p.photo(320, '카페 착용 컷', { radius: 0, gap: 60 });

  // 08 Check.05 2개입 구성
  p.ctext('Check. 05', 22, { font: 'serif', color: SUB, gap: 36 });
  p.ctext('2개입 구성', 32, { weight: 800, color: INK, gap: 30 });
  p.ctext('2개입 구성으로 세탁이나 교체 상황에도\n여유 있게 활용할 수 있습니다.', 16, { color: SUB, align: 'center', lineH: 1.7, gap: 40 });
  p.photo(280, '2개입 제품컷', { x: 180, w: W - 360, radius: 12, gap: 64 });

  // 09 제품 상세
  p.text('제품 상세', 24, { weight: 800, color: INK, gap: 36 });
  {
    const rows = [['제품명', '헤어 커치프 플라워 레이스 두건'], ['구성품', '화이트 2개'], ['소재', '폴리에스터 90%, 스판덱스 10%'], ['사이즈', '25 × 70cm'], ['제조국', '중국'], ['판매처', '로멀리'], ['사용연령', '만 14세 이상']];
    rows.forEach((r) => {
      const y = p.at();
      p.atext(80, y, 150, r[0], 15, { weight: 700, color: INK });
      p.atext(240, y, p.cw() - 176, r[1], 15, { color: SUB });
      p.hr({ color: '#e3e3e3', gap: 18, x: 80, w: p.cw() - 32 });
      p.to(y + 48);
    });
  }
  p.gap(30);

  // 10 주의사항
  p.text('취급 시 주의사항', 24, { weight: 800, color: INK, gap: 40 });
  p.text('- 용도 외 사용하지 마십시오.\n- 날카로운 물체와의 접촉을 피하십시오.\n- 고온 세탁 및 건조기 사용을 피하십시오.\n- 표백제 및 강한 세제 사용을 금지하십시오.\n- 화기 및 고온 직사광선을 피해 보관하십시오.\n- 영유아 및 어린이 손에 닿지 않는 곳에 보관하십시오.', 15, { color: SUB, lineH: 2, gap: 30 });

  return p.done('패션2', '패션', BG);
}

export const FASHION: Template[] = [fashion1(), fashion2()];
