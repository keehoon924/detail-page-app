import type { Template } from '../types.ts';
import { Flow } from '../flow.ts';

const INK = '#3a2e26', SUB = '#8a7d70', BROWN = '#9a6a3a', CREAM = '#f5efe7', LG = '#f3ede4', W = '#ffffff', RED = '#c0392b';

/** 말풍선 */
function bubble(f: Flow, text: string, x: number, w: number) {
  const y = f.at();
  f.add({ t: 'rect', x, y, w, h: 46, fill: W, radius: 23, stroke: '#e6ddd0', strokeW: 1 });
  f.add({ t: 'text', x: x + 14, y: y + 15, w: w - 28, text, size: 12, weight: 600, color: INK, align: 'center' });
}

/* 유아A — 허그곰 2세대 아기 베개 (1920×39599 → 640 단일세로) */
function hugbear(): Template {
  const f = new Flow(640, 48);
  let s = f.at(); f.band(560, CREAM);
  f.gap(26);
  f.text('30분.. 1시간마다 잠에서 깨는', 16, { align: 'center', color: SUB });
  f.text('아기 재우기 힘드시죠?', 28, { align: 'center', weight: 800, color: INK });
  f.photo(220, '아기 안고 힘들어하는 엄마 (일러스트)', { x: 150, w: 340 });
  bubble(f, '침대에 눕히면 왜 자꾸 깨는거지?', 60, 250); f.gap(0);
  bubble(f, '엄마도 울고싶다..', 360, 220);
  f.set(s + 560); f.gap(24);
  f.text('엄마, 아빠는 이제 쉬세요,', 22, { align: 'center', weight: 700, color: INK });
  f.text('아기는 허그곰이 재워줄게요!', 28, { align: 'center', weight: 800, color: BROWN });
  f.photo(220, '곤히 자는 아기 ("나 깨우지마요~")', { x: 90, w: 460 });
  // 수면증가 사례
  f.photo(220, '허그곰에서 자는 아기', { x: 90, w: 460 });
  f.text('생후 50일 5kg  ·  낮잠 1시간30분→3시간, 밤잠 5~6시간→7~8시간 수면증가\n생후 46일 5kg  ·  낮잠 30분~1시간→2시간 30분 수면증가', 12, { align: 'center', weight: 600, color: INK, lineH: 1.8 });
  f.gap(10);
  // 아기가 잘자면
  s = f.at(); f.band(180, LG);
  f.gap(28);
  f.text('“아기가 잘자면, 육아가 쉬워집니다”', 18, { align: 'center', weight: 800, color: INK });
  f.text('아기 꿀잠은 허그곰 이모님께 맡기고,\n아기가 자는 시간을 엄마·아빠의 휴식시간으로 만드세요!', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.set(s + 180); f.gap(24);
  // 허그곰 2세대
  f.text('허그곰을 애용해주신 분들의 목소리를 담아 리뉴얼한', 14, { align: 'center', color: SUB });
  f.text('허그곰 2세대', 30, { align: 'center', weight: 800, color: BROWN });
  f.photo(240, '허그곰 착용 아기 (좌측 방향 / 허그밴드)', { x: 90, w: 460 });
  f.photo(240, '허그곰 착용 아기 (우측 방향)', { x: 90, w: 460 });
  f.text('허그곰은 잠 못 드는 아기의 편안한 숙면을 도와주는 베개입니다.\n허그곰으로 아기에게 꿀잠을 선물해주세요!', 13, { align: 'center', color: INK, lineH: 1.6 });
  f.gap(10);
  // 리얼후기
  f.text('🌙', 24, { align: 'center' });
  f.text('허그곰, 진짜 아기가 잘자나요?', 26, { align: 'center', weight: 800, color: INK });
  f.text('네이버 스토어 내돈내산 하신 분들의 거짓없는 리얼후기를 확인해주세요.', 13, { align: 'center', color: SUB });
  f.rect(110, W, { radius: 12, stroke: '#eee', strokeW: 1, gap: 12 });
  f.add({ t: 'text', x: 70, y: f.at() - 98, w: 500, text: '★★★★★  허그곰 받고 이틀째에 아이가 통잠을 잤네요 👍', size: 13, weight: 600, color: INK });
  f.rect(110, W, { radius: 12, stroke: '#eee', strokeW: 1, gap: 12 });
  f.add({ t: 'text', x: 70, y: f.at() - 98, w: 500, text: '★★★★★  조리원 퇴소하고 20일부터 57일까지 잘 잤습니다!', size: 13, weight: 600, color: INK });
  f.text('네이버 스토어에서 구입하신 고객님들이 직접 작성해주신 리뷰입니다.', 12, { align: 'center', color: SUB });
  f.gap(10);
  // 두상관리
  s = f.at(); f.band(220, LG);
  f.gap(26);
  f.text('동글동글~ 두상관리도 되나요?', 24, { align: 'center', weight: 800, color: INK });
  f.text('네, 물론입니다!', 16, { align: 'center', weight: 700, color: BROWN });
  f.text('좌/우 방향 바꿔가며 옆으로 재우는 자세를 추천드리고,\n하늘보기 자세로도 두상관리가 가능한 짱구베개 형태로 제작되었습니다.', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.set(s + 220); f.gap(20);
  f.add({ t: 'photo', x: 48, y: f.at(), w: 168, h: 120, shape: 'rect', radius: 8, label: '좌측 방향' });
  f.add({ t: 'photo', x: 236, y: f.at(), w: 168, h: 120, shape: 'rect', radius: 8, label: '우측 방향' });
  f.add({ t: 'photo', x: 424, y: f.at(), w: 168, h: 120, shape: 'rect', radius: 8, label: '하늘보기' });
  f.gap(140);
  // 100일 이후
  f.text('100일 이후까지 오래 쓸 수 있나요?', 24, { align: 'center', weight: 800, color: INK });
  f.text('신생아부터 24개월까지 사용 가능합니다', 14, { align: 'center', weight: 700, color: BROWN });
  f.photo(200, '허그곰 (4단계 조절)', { x: 90, w: 460 });
  f.text('아기 성장에 맞게 4단계 조절 가능해요', 14, { align: 'center', weight: 700, color: INK });
  f.gap(10);
  // 믿고 쓰는 허그곰
  f.text('믿고 쓰는 허그곰', 26, { align: 'center', weight: 800, color: INK });
  f.text("허그곰을 사용해보신 분들의 '진짜 입소문'이 퍼지면서\n수많은 아기들이 허그곰과 함께 했어요", 13, { align: 'center', color: SUB, lineH: 1.6 });
  s = f.at(); f.band(160, LG);
  f.gap(24);
  f.text('허그곰 1세대 고객 총 평점', 14, { align: 'center', color: SUB });
  f.text('4.9 / 5  ★★★★★', 24, { align: 'center', weight: 800, color: BROWN });
  f.text('전체 리뷰수 7,721개  ·  고객 만족도 98.6%', 13, { align: 'center', weight: 600, color: INK });
  f.set(s + 160); f.gap(24);
  f.photo(220, '허그곰에서 자는 아기', { x: 90, w: 460 });
  f.text('아기가 잘 자면, 아기가 잘 자랍니다', 22, { align: 'center', weight: 800, color: RED });
  // 권장 수면시간 표
  f.text('충분한 수면이 아기의 성장과 두뇌발달,\n정서적 발달, 성격 형성에 아주 중요한 역할을 합니다', 14, { align: 'center', color: INK, lineH: 1.6 });
  f.text('권장 수면 시간', 16, { align: 'center', weight: 800, color: W });
  f.add({ t: 'rect', x: f.w / 2 - 80, y: f.at() - 24, w: 160, h: 32, fill: BROWN, radius: 16 });
  f.add({ t: 'text', x: f.w / 2 - 80, y: f.at() - 16, w: 160, text: '권장 수면 시간', size: 13, weight: 700, color: W, align: 'center' });
  f.gap(6);
  f.rect(200, LG, { radius: 10, gap: 16 });
  f.add({ t: 'text', x: 70, y: f.at() - 184, w: 500, text: '개월수    밤잠      낮잠      낮잠횟수    총수면\n1개월   8~9시간   8시간     4회      16~17시간\n3개월   10시간    5시간     3회      15시간\n6개월   11시간    3~4시간   2회      14~15시간\n12개월  11시간    2~3시간   2회      13~14시간\n24개월  11시간    2시간     1회      13시간', size: 11, weight: 500, color: INK, lineH: 2 });

  return f.done('유아A', '반려동물&유아', '#ffffff');
}

/* 유아5 — FIRST 퍼스트 이유식 포트 (1540×3397, 3열 콘택트시트) */
const b5: Template = {
  id: '유아5', category: '반려동물&유아', w: 1000, h: 2200, bg: '#f3ece2',
  blocks: [
    // col1
    { t: 'text', x: 40, y: 24, w: 300, text: 'FIRST', size: 14, weight: 800, color: BROWN, align: 'center' },
    { t: 'text', x: 40, y: 48, w: 300, text: '퍼스트 이유식 포트', size: 24, weight: 800, color: INK, align: 'center' },
    { t: 'photo', x: 70, y: 100, w: 240, h: 240, shape: 'rect', radius: 12, label: '이유식 포트 (히어로)' },
    { t: 'text', x: 40, y: 380, w: 300, text: '이유식 준비,\n왜 늘 신경 쓰이까요?', size: 20, weight: 800, color: INK, align: 'center', lineH: 1.3 },
    { t: 'photo', x: 70, y: 470, w: 240, h: 180, shape: 'rect', radius: 10, label: '이유식 조리 장면' },
    { t: 'text', x: 40, y: 680, w: 300, text: '이 모든 불편함을\n퍼스트 하나면 끝!', size: 20, weight: 800, color: INK, align: 'center', lineH: 1.3 },
    { t: 'text', x: 40, y: 770, w: 300, text: 'ZERO', size: 40, weight: 800, color: '#d8c8b6', align: 'center' },
    { t: 'photo', x: 90, y: 840, w: 200, h: 200, shape: 'rect', radius: 12, label: '포트 제품컷' },
    { t: 'text', x: 40, y: 1070, w: 300, text: '위험감 없이\n안전하게', size: 18, weight: 800, color: INK, align: 'center', lineH: 1.3 },
    { t: 'photo', x: 70, y: 1150, w: 240, h: 160, shape: 'rect', radius: 10, label: '안전 사용 장면' },
    // col2
    { t: 'text', x: 360, y: 24, w: 300, text: '퍼스트와 함께 여유롭고 편안한 하루', size: 13, weight: 600, color: SUB, align: 'center' },
    { t: 'text', x: 360, y: 48, w: 300, text: '왜 선택해야 할까요?', size: 22, weight: 800, color: INK, align: 'center' },
    { t: 'photo', x: 380, y: 100, w: 80, h: 80, shape: 'circle', label: '기능1' },
    { t: 'photo', x: 480, y: 100, w: 80, h: 80, shape: 'circle', label: '기능2' },
    { t: 'photo', x: 580, y: 100, w: 80, h: 80, shape: 'circle', label: '기능3' },
    { t: 'photo', x: 380, y: 200, w: 80, h: 80, shape: 'circle', label: '기능4' },
    { t: 'photo', x: 480, y: 200, w: 80, h: 80, shape: 'circle', label: '기능5' },
    { t: 'photo', x: 580, y: 200, w: 80, h: 80, shape: 'circle', label: '기능6' },
    { t: 'text', x: 360, y: 320, w: 300, text: '최고 100℃\n따뜻함도 깊게', size: 20, weight: 800, color: INK, align: 'center', lineH: 1.3 },
    { t: 'photo', x: 410, y: 410, w: 200, h: 180, shape: 'rect', radius: 10, label: '가열 비주얼' },
    { t: 'rect', x: 380, y: 610, w: 260, h: 120, fill: '#ece3d6', radius: 10 },
    { t: 'text', x: 390, y: 625, w: 240, text: '100℃ 가열 시 / 영양소 보존 / 시간·온도 표', size: 12, weight: 500, color: INK, align: 'center', lineH: 1.6 },
    { t: 'text', x: 360, y: 760, w: 300, text: '스스로 깨끗하게\n자동살균', size: 18, weight: 800, color: INK, align: 'center', lineH: 1.3 },
    { t: 'photo', x: 410, y: 850, w: 200, h: 160, shape: 'rect', radius: 10, label: '자동살균 장면' },
    // col3
    { t: 'text', x: 680, y: 24, w: 300, text: '퍼스트만의 차별점,', size: 14, weight: 600, color: SUB, align: 'center' },
    { t: 'text', x: 680, y: 48, w: 300, text: '직접 비교해보세요', size: 20, weight: 800, color: INK, align: 'center' },
    { t: 'rect', x: 700, y: 100, w: 260, h: 220, fill: W, radius: 10, stroke: '#e0d6c8', strokeW: 1 },
    { t: 'text', x: 712, y: 116, w: 236, text: '[비교표]\n퍼스트 vs 일반 이유식기\n용량 / 가열 / 살균 / 재질 / 세척', size: 12, weight: 500, color: INK, align: 'center', lineH: 1.9 },
    { t: 'text', x: 680, y: 360, w: 300, text: '올 스테인리스 구조', size: 20, weight: 800, color: INK, align: 'center' },
    { t: 'photo', x: 730, y: 410, w: 200, h: 180, shape: 'rect', radius: 10, label: '스테인리스 내부' },
    { t: 'text', x: 680, y: 620, w: 300, text: '최적의 재질', size: 18, weight: 800, color: INK, align: 'center' },
    { t: 'photo', x: 730, y: 670, w: 200, h: 160, shape: 'rect', radius: 10, label: '재질 디테일' },
    { t: 'text', x: 680, y: 860, w: 300, text: '우리 아이\n제품에 안전한 기본', size: 18, weight: 800, color: INK, align: 'center', lineH: 1.3 },
    { t: 'photo', x: 730, y: 950, w: 200, h: 160, shape: 'rect', radius: 10, label: '안전 인증' },
  ],
};

export const PETBABY_LONG: Template[] = [hugbear(), b5];
