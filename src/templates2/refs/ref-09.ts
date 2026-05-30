/**
 * 시안 9번 (휴대용 BLDC 터보 선풍기) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#1d6fd0', primaryDeep: '#1455a8',
  light: '#16243a', light2: '#1d2f4a',
  ink: '#eaf2fb', sub: '#9fb2c9',
  accent: '#39c2ff', bg: '#0f1826', onPrimary: '#eaf6ff',
  surface: '#16243a', badge: '#39c2ff',
};

const sections: Section[] = [
  /* 1. Hero — ⑤ 공감 + ⑥ 장면 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    title: '30도 넘는 한낮,',
    accent: '일반 선풍기로는 못 버팁니다',
    image: { mask: 'rect', overlay: 0.4, focusX: 0.5, focusY: 0.5, label: '더위에 지친 도시 사람들 풀블리드' } as any,
  },

  /* 2. 일반 선풍기 단점 */
  {
    type: 'banner', bg: 'ink',
    head: '바람만 나오는 선풍기,\n외출 중 꺼지는 배터리,\n— 그만 쓰세요.',
  },

  /* 3. 딱 3초 — ② 숫자 */
  {
    type: 'banner', bg: 'page',
    label: '딱 3초면',
    head: '"확실히 식혀주는\n100단 터보 쿨링"',
  },

  /* 4. 3 단점 — ⑤ 공감 */
  {
    type: 'cards', bg: 'page', variant: 'pain',
    head: '올 여름도 이렇게 버티시겠어요?',
    cards: [
      { n: '1', t: '3단 버튼', d: '세게/약하게 — 그게 다인 조절' },
      { n: '2', t: '약한 풍속', d: '바람만 나오고, 시원하진 않은' },
      { n: '3', t: '무거운 무게', d: '들고 다니기 부담스러운' },
    ],
  },

  /* 5. 해결 — ⑦ 반전 */
  {
    type: 'banner', bg: 'ink',
    head: '에어블래스트 터보,\n그 모든 걸 한 번에 해결합니다.',
    sub: '#100단 초정밀  #대용량 배터리  #펠티어 냉각',
  },

  /* 6. 작지만 — ① 욕망 */
  {
    type: 'banner', bg: 'primary',
    head: '작지만,\n체감은 완전히 다릅니다.',
    sub: '최대 9~10m/s + 펠티어 냉각',
  },

  /* 7. 6가지 핵심 */
  {
    type: 'iconGrid', bg: 'primary',
    cols: 3,
    items: [
      { t: '100단 풍속 조절', d: '내가 원하는 딱 그 세기' },
      { t: '9~10m/s 터보 바람', d: '얼굴이 식는 느낌까지' },
      { t: '펠티어 냉각', d: '진짜 차가운 바람' },
      { t: '4000mAh 배터리', d: '하루 종일 안 꺼집니다' },
      { t: 'LED 디지털 표시', d: '풍속 한눈에' },
      { t: '손풍기·거치 겸용', d: '한 손에도, 책상에도' },
    ],
  },

  /* 8. 9~10m/s */
  {
    type: 'banner', bg: 'ink',
    label: '9~10m/s',
    head: '열기까지 날려버리는,\n터보 바람',
  },

  /* 9. 사용 상황 3장 */
  {
    type: 'image', bg: 'page',
    label: '출근길 · 야외활동 · 운동 후',
    cols: ['출근길 — 정장 + 선풍기', '야외활동 — 모델', '운동 후 — 운동복'],
    h: 460,
    caption: '한낮에도, 운동 후에도 — 손에서 안 떼는 이유',
  },

  /* 10. 강력 풍속 */
  {
    type: 'banner', bg: 'page',
    label: '강력 풍속',
    head: '답답한 한낮을\n빠르게 식혀줍니다.',
  },

  /* 11. BLDC */
  {
    type: 'feature', bg: 'ink',
    head: '바람의 차이는,',
    accent: '모터에서 시작됩니다',
    body: '고속 회전 BLDC 모터 + 공기 흐름 설계로\n더 멀리, 더 강하게 바람이 닿습니다.',
    image: '선풍기 단면 (전면커버 / 팬 블레이드 / BLDC 모터)',
    points: ['전면 커버', '팬 블레이드', 'BLDC 모터'],
  },
];

export const REF_09: Template2 = {
  id: 'ref-09', category: '전자기기', theme: T, width: 860, sections,
};
