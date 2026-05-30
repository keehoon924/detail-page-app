/**
 * 시안 2번 (로멀리 플라워 헤어 커치프) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#2d6048', primaryDeep: '#1a4030',
  light: '#f4f1ec', light2: '#ede8df',
  ink: '#2b2620', sub: '#8a857c',
  accent: '#c93838', bg: '#fbfaf6', onPrimary: '#f1fbf6',
  surface: '#ffffff', badge: '#2d6048',
};

const sections: Section[] = [
  /* 1. Hero — ⑥ 장면 + ⑤ 공감 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: '가볍게 두른 한 장이, 화보가 됩니다',
    title: '로멀리',
    accent: '플라워 헤어 커치프',
    image: { mask: 'rect', overlay: 0.35, focusX: 0.5, focusY: 0.4, label: '꽃밭 모델 (흰 레이스 헤어 커치프)' } as any,
  },

  /* 2. CHECK POINT 5 — ② 숫자 */
  {
    type: 'checkPoint', bg: 'page',
    label: '한 눈에 보는',
    title: 'CHECK POINT 5',
    items: [
      '두르는 순간, 룩이 살아납니다',
      '하루 종일 둘러도 부담 ZERO',
      '머리·목·허리 — 어디든 어울립니다',
      '피부에 닿는 촉감이 다릅니다',
      '2개 구성, 갈아 둘러도 여유',
    ],
  },

  /* 3. OPTION */
  {
    type: 'banner', bg: 'page',
    head: 'OPTION',
    sub: '화이트 | 2개입',
  },

  /* 4. 제품 사진 2장 */
  {
    type: 'image', bg: 'page',
    label: '제품 사진',
    cols: ['흰 레이스 두건 (좌)', '흰 레이스 두건 (우)'],
    h: 420,
  },

  /* 5. Check.01 — ⑦ 반전 */
  {
    type: 'feature', bg: 'light',
    label: 'Check. 01',
    head: '이만큼 은은한 레이스, 본 적 없죠',
    body: '플라워 패턴이 자연스럽게 어우러져,\n과하지 않게 — 그래서 더 시선이 갑니다.',
    image: '회색 배경에 놓인 흰 레이스 디테일',
  },

  /* 6. Check.02 — ⑥ 장면 */
  {
    type: 'feature', bg: 'page', reverse: true,
    label: 'Check. 02',
    head: '아침에 둘렀는데, 저녁에도 까먹습니다',
    body: '부드러운 폴리에스터 소재라,\n무게감이 없어요 — 둘렀는지 잊을 정도.',
    image: '레이스 클로즈업',
  },

  /* 7. 모델 풀샷 */
  { type: 'image', bg: 'light', label: '모델 풀샷 — 꽃 + 두건', h: 620 },

  /* 8. Check.03 — ① 욕망 */
  {
    type: 'feature', bg: 'page',
    label: 'Check. 03',
    head: '단순한 룩이 화보가 되는 순간',
    body: '티셔츠 한 장에 한 번 두르세요.\n분위기가 완전히 바뀝니다.',
    image: '모델 (포인트 연출)',
  },

  /* 9. 모델 듀얼 컷 */
  {
    type: 'image', bg: 'light',
    label: '모델 듀얼 컷',
    cols: ['꽃 + 두건 누워있는 모습', '책 + 두건 클로즈업'],
    h: 460,
  },

  /* 10. Check.04 — ⑦ 반전 */
  {
    type: 'feature', bg: 'page', reverse: true,
    label: 'Check. 04',
    head: '한 장으로 다섯 가지 연출',
    body: '머리에, 목에, 가방에, 손목에, 허리에 —\n한 장이면 5가지 룩이 완성됩니다.',
    image: '허리 포인트로 두른 모델',
  },

  /* 11. 모델 듀얼 */
  {
    type: 'image', bg: 'light',
    label: '모델 듀얼',
    cols: ['허리에 두른 모델', '두건 + 정면 미소'],
    h: 480,
  },

  /* 12. Check.05 — ② 숫자 */
  {
    type: 'feature', bg: 'page',
    label: 'Check. 05',
    head: '2개니까, 매일 갈아 둘러도 OK',
    body: '하나 세탁해도 하나는 늘 준비됨.\n갈아 두를 여유까지 있는 2개입.',
    image: '2개 제품 사진',
  },

  /* 13. 제품 사진 2장 */
  {
    type: 'image', bg: 'page',
    label: '제품 2개 구성',
    cols: ['흰 레이스 두건 1', '흰 레이스 두건 2'],
    h: 420,
  },

  /* 14. spec */
  {
    type: 'spec', bg: 'light',
    label: 'PRODUCT INFO',
    title: '제품 상세',
    rows: [
      ['제품명', '헤어 커치프 플라워 레이스 두건'],
      ['구성품', '화이트 2개'],
      ['소재', '폴리에스터 90%, 스판덱스 10%'],
      ['사이즈', '25×70cm'],
      ['제조국', '중국'],
      ['판매처', '로멀리'],
      ['사용연령', '만 14세 이상'],
    ],
  },

  /* 15. 취급 시 주의사항 */
  {
    type: 'notice', bg: 'page',
    title: '취급 시 주의사항',
    items: [
      '용도 외 사용하지 마십시오.',
      '날카로운 물체와의 접촉을 피하십시오.',
      '고온 세탁 및 건조기 사용을 피하십시오.',
      '표백제 및 강한 세제 사용을 금지하십시오.',
      '화기 및 고온 직사광선을 피해 보관하십시오.',
      '영유아 및 어린이 손에 닿지 않는 곳에 보관하십시오.',
    ],
  },
];

export const REF_02: Template2 = {
  id: 'ref-02', category: '패션', theme: T, width: 860, sections,
};
