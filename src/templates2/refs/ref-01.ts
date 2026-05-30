/**
 * 시안 1번 (다비온 남녀공용 빅사이즈 캡모자) — 레이아웃 1:1, 카피는 7무기로 재작성.
 * 사실(브랜드명·소재·사이즈·컬러)만 보존, 표현은 멈추는 멘트로.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#3a352e', primaryDeep: '#1f1d18',
  light: '#ebe4d6', light2: '#e0d9c8',
  ink: '#2b2620', sub: '#8a8278',
  accent: '#8a7a5e', bg: '#f4f1ec', onPrimary: '#f3efe6',
  surface: '#ffffff', badge: '#3a352e',
};

const sections: Section[] = [
  /* 1. Hero — ⑤ 공감 후킹 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: '머리 큰 거, 티 안 나게',
    title: '남녀공용 대두 캡모자',
    sub: '55~65cm까지, 두상 걱정 끝',
    image: { mask: 'rect', overlay: 0.35, focusX: 0.5, focusY: 0.35, label: '모델 클로즈업 (헤드폰 + 카키 COLORADO 캡)' } as any,
  },

  /* 2. 큰 영문 + 본문 — ⑦ 반전 */
  {
    type: 'banner', bg: 'light',
    head: 'MEN & WOMEN\nOVERSIZED CAP',
    sub: '예쁜데 큰 사이즈, 더 이상 안 찾으셔도 됩니다.\n남녀 누구나, 매일매일 자연스럽게.\n\n26년 시즌 5컬러 — 오늘의 룩에 맞춰 고르세요.',
  },

  /* 3. 모델 풀샷 */
  { type: 'image', bg: 'page', label: '모델 풀샷 — 카키 COLORADO 캡 + 짚업', h: 620 },

  /* 4. DETAIL POINT 1 — ⑥ 장면 + ① 욕망 */
  {
    type: 'feature', bg: 'page',
    label: 'DETAIL POINT',
    head: '푹 눌러써도, 예쁜 핏',
    body: '이마 가리고 싶은 날도,\n끝까지 안 흔들립니다.',
    image: '빅사이즈 볼캡 디테일',
  },

  /* 5. DETAIL POINT 2 — ② 숫자 + 손실 회피 */
  {
    type: 'feature', bg: 'light', reverse: true,
    label: 'DETAIL POINT',
    head: '한 시즌 쓰고 버리는 캡, 그만',
    body: '박음질이 단단해서,\n모양 그대로 1년 갑니다.',
    image: '박음질 디테일 클로즈업',
  },

  /* 6. 4컬러 미리보기 — ⑤ 공감 */
  {
    type: 'image', bg: 'page',
    label: '4컬러 미리보기',
    cols: ['카키', '다크브라운', '베이지', '네이비'],
    h: 200,
    caption: '오늘은 어떤 룩이세요?',
  },

  /* 7-9. 모델 풀샷 3컷 */
  { type: 'image', bg: 'light', label: '모델 풀샷 — 다크브라운 캡', h: 620 },
  {
    type: 'image', bg: 'page',
    label: '모델 듀얼',
    cols: ['브라운 짚업 + 다크브라운 캡', '베이지 + 마스크'],
    h: 420,
  },
  { type: 'image', bg: 'light', label: '모델 풀샷 — 블랙 캡 + 흰셔츠', h: 620 },

  /* 10. 비교 — ⑦ 반전 */
  {
    type: 'compare', bg: 'page',
    head: '같은 디자인, 다른 깊이.',
    body: '다비온은 푹 눌러도 깊이가 살아있습니다.\n흔히 보이는 캡과 비교해보세요.',
    left: '다비온 제품 (베이지 캡)',
    right: '타제품 (검정 캡)',
  },

  /* 11. 모델 풀샷 */
  { type: 'image', bg: 'light', label: '모델 풀샷 — 네이비 캡 + 베이지 코트', h: 620 },

  /* 12. 조절 — ⑤ 공감 + ② 숫자 */
  {
    type: 'feature', bg: 'page',
    head: '55~65cm,',
    accent: '두상 따로 안 재셔도 됩니다.',
    body: '깊이 있는 디자인에 조절 스트랩까지.\n남녀 누구나, 안정감 있게.',
    image: '조절 디테일 + 모델',
    points: ['55~65cm', '데일리 핏'],
  },

  /* 13. 색상 옵션 5종 */
  {
    type: 'image', bg: 'page',
    label: '색상 옵션',
    cols: ['블랙', '아이보리', '브라운', '베이지', '네이비'],
    h: 220,
    caption: '5컬러, 한 캡으로 1년.',
  },

  /* 14. spec */
  {
    type: 'spec', bg: 'light',
    label: 'PRODUCT INFO',
    title: '제품 상세 정보',
    rows: [
      ['제품명', '다비온 남녀공용 빅사이즈 캡모자'],
      ['컬러', '블랙, 브라운, 네이비, 베이지, 아이보리'],
      ['소재', '폴리에스터'],
      ['제조국', 'made in china'],
      ['수입자/제조사', '아르미야/아르미야협력사'],
      ['제조년월', '2026.03'],
      ['머리둘레', '약 55~65cm'],
      ['수입자 정보', '0505-007-2228'],
    ],
  },

  /* 15. 주의사항 */
  {
    type: 'notice', bg: 'page',
    title: '주의사항',
    items: [
      '세탁시 변형가능성이 있으므로 가볍게 닦아주세요.',
      '본 제품은 공정거래위원회 고시 소비자분쟁해결기준에 의거하여 보상받을 수 있습니다.',
    ],
  },
];

export const REF_01: Template2 = {
  id: 'ref-01', category: '패션', theme: T, width: 860, sections,
};
