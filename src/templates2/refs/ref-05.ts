/**
 * 시안 5번 (슬림핏 슬리브리스) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#111111', primaryDeep: '#000000',
  light: '#f0f0f0', light2: '#e2e2e2',
  ink: '#111111', sub: '#8a8a8a',
  accent: '#111111', bg: '#ffffff', onPrimary: '#ffffff',
  surface: '#fafafa', badge: '#111111',
};

const sections: Section[] = [
  /* 1. Hero — ⑤ 공감 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: '군살 가리려고, 또 큰 사이즈 사셨죠?',
    title: '여름엔 이 한 장이면',
    accent: '끝납니다',
    image: { mask: 'rect', overlay: 0.3, focusX: 0.5, focusY: 0.4, label: '모델 (흰 슬리브리스 + 카키 후드)' } as any,
  },

  /* 2. VERSION DESIGN */
  {
    type: 'image', bg: 'page',
    label: 'VERSION DESIGN',
    cols: ['모델 (블랙)', '모델 (화이트)'],
    h: 540,
    caption: '인플루언서들이 먼저 입은 그 핏',
  },

  /* 3. 3-Way */
  {
    type: 'banner', bg: 'page',
    head: '운동복으로 · 일상복으로 · 이너로',
    sub: '한 장이 세 가지 룩을 만듭니다.\n#섹시 / #홈웨어 / #이너웨어',
  },

  /* 4. 모델 헤드폰 */
  { type: 'image', bg: 'page', label: '모델 — 헤드폰 + 셀카', h: 600 },

  /* 5. 만능 코디룩 */
  {
    type: 'banner', bg: 'ink',
    head: '뭘 입어도 어울리는 한 장',
    sub: '청바지에도, 슬랙스에도, 트레이닝에도.',
  },

  /* 6. 옆가슴 디자인 — ① 욕망 */
  {
    type: 'feature', bg: 'page',
    head: '옆가슴은 잡아주고,',
    accent: '실루엣은 더 슬림하게',
    body: '소매 디자인 하나로 라인이 달라집니다.\n자신감 있게, 더 가볍게.',
    image: '모델 (흰 + 회색 트랙수트)',
  },

  /* 7. 고탄력 */
  {
    type: 'feature', bg: 'light', reverse: true,
    head: '고탄력 밀착핏,',
    accent: '몸에 붙는데 답답하지 않아요',
    body: '하루 종일 입어도 조이지 않는 신축성.\n그래서 매일 손이 갑니다.',
    image: '모델 (다크그레이 슬리브리스)',
    points: ['고탄력'],
  },

  /* 8. FASHION INSIDER */
  {
    type: 'banner', bg: 'page',
    head: 'FASHION INSIDER',
    sub: '소재부터 디테일까지, 다 까보겠습니다.',
  },

  /* 9. 원단 — ② 숫자 */
  {
    type: 'stat', bg: 'page',
    head: '92 + 8.\n살에 닿는 모든 시간이 달라집니다.',
    sub: '피부에 닿는 촉감은 부드럽게,\n활동에는 탄탄하게.',
    stats: [
      { value: '92%', label: 'COTTON' },
      { value: '8%', label: 'SPANDEX' },
    ],
  },

  /* 10. 어깨끈 */
  {
    type: 'feature', bg: 'page',
    head: '어깨에 자국 안 남는,',
    accent: '24시간 무압박 너비',
    image: '옷걸이에 걸린 컬러 옵션 (베이지/카키/네이비/그레이/브라운)',
  },

  /* 11. DETAILS DISPLAY */
  {
    type: 'banner', bg: 'light',
    label: 'IBELL STUDIOS',
    head: 'DETAILS DISPLAY',
  },

  /* 12. 3가지 디테일 */
  {
    type: 'mediaRow', bg: 'page',
    items: [
      { image: '슬림핏 U넥 디테일', t: 'U넥, 슬림해 보이는 각도', d: '목선이 아름답게 보이는 그 한 끗' },
      { image: '깔끔한 암홀 마감', t: '겨드랑이 마감 깔끔', d: '봉제 자국 없이, 피부에 안 걸립니다' },
      { image: '탄탄한 밑단', t: '밑단 늘어남 ZERO', d: '한 시즌 입어도 그 모양 그대로' },
    ],
  },

  /* 13. 데일리 */
  {
    type: 'banner', bg: 'page',
    head: '어떤 계절에도, 어떤 코디에도.',
    sub: '한 장이면 충분합니다.',
  },

  /* 14. 컬러 옵션 */
  {
    type: 'image', bg: 'page',
    label: 'COLOR',
    cols: ['화이트', '블랙'],
    h: 320,
  },

  /* 15. 모델 착용샷 */
  {
    type: 'image', bg: 'page',
    label: '모델 착용샷',
    h: 620,
    caption: 'SEXY LIGHT LUXURY BRA',
  },

  /* 16. 모델 듀얼 */
  {
    type: 'image', bg: 'page',
    label: '모델 듀얼 (검정)',
    cols: ['모델 클로즈업 (검정 + 헤드폰)', '모델 정면 (검정 슬리브리스)'],
    h: 460,
  },

  /* 17. 모델 풀샷 */
  {
    type: 'image', bg: 'page',
    label: '모델 풀샷 (검정 + 카모 팬츠)',
    h: 700,
    caption: 'SEXY LIGHT LUXURY BRA',
  },
];

export const REF_05: Template2 = {
  id: 'ref-05', category: '패션', theme: T, width: 860, sections,
};
