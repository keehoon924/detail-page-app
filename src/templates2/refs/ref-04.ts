/**
 * 시안 4번 (모아르 여성전용 탈모 샴푸) — 레이아웃 1:1, 카피는 7무기로 재작성.
 * ※ 식약처 기능성 인증·임상 수치는 사실(시안 기재)로 보존.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#1c3a2a', primaryDeep: '#10261a',
  light: '#e9efe6', light2: '#dde5d8',
  ink: '#1a2e22', sub: '#6a7a6a',
  accent: '#c0a060', bg: '#f5f5ee', onPrimary: '#f0eadc',
  surface: '#ffffff', badge: '#c0a060',
};

const sections: Section[] = [
  /* 1. Hero — ⑤ 공감 + ① 욕망 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: '머리 감을 때, 매번 한 움큼씩',
    title: '모아르 여성전용',
    accent: '탈모 샴푸',
    image: { mask: 'rect', overlay: 0.3, focusX: 0.5, focusY: 0.45, label: '모아르 샴푸 (다크그린 + 잎)' } as any,
  },

  /* 2. 3개 효능 박스 — ② 숫자 (사실 보존) */
  {
    type: 'iconGrid', bg: 'page',
    cols: 3,
    items: [
      { t: '100%', d: '탈모 증상 개선 만족도' },
      { t: '100%', d: '두피 트러블 개선 만족도' },
      { t: '100%', d: '두피 쿨링 효과 만족도' },
    ],
  },

  /* 3. 비교 — ⑦ 반전 */
  {
    type: 'feature', bg: 'page',
    head: '피부는 매일 케어하면서,',
    accent: '두피는 왜 그냥 두세요?',
    body: '머릿결의 시작은 두피입니다.\n뿌리부터 챙겨야, 풍성함이 따라옵니다.',
    image: 'Before / After 두피 클로즈업',
  },

  /* 4. 동안 본문 — ⑥ 장면 */
  {
    type: 'banner', bg: 'page',
    head: '풍성한 머릿결이,\n동안을 만듭니다.',
    sub: '얼굴이 아니라, 머리부터 시작해보세요.',
  },

  /* 5. 평점 — ② 숫자 */
  {
    type: 'banner', bg: 'primary',
    head: '수천 명이 이미 바꿨습니다',
    sub: '★★★★★  사용자 평점 4.7\n(1,888가구 평가 · 2025년 1월 기준)',
  },

  /* 6. 특제성분 — ① 욕망 */
  {
    type: 'feature', bg: 'page',
    head: '여성 전용 특제 성분으로,',
    accent: '풍성한 볼륨까지',
    image: '금색 "1" 트로피 + 샴푸 단상',
  },

  /* 7. 리얼 후기 — ⑤ 공감 */
  {
    type: 'reviews', bg: 'page',
    title: '실제 사용자가 직접 적은 후기',
    items: [
      { stars: 5, t: '확실히 줄었어요', d: '"머리 감을 때 빠지는 양이 줄었어요. 예전엔 배수구가 막혔는데, 지금은 안 빠져요."', who: '달모포뮬러 skama***씨님' },
      { stars: 5, t: '두피가 시원해요', d: '"감을 때 시원하고 개운한 느낌이 들고, 가렵지 않아요."', who: '달모포뮬러 love***씨님' },
      { stars: 5, t: '꾸준히 쓰니 답이 나옵니다', d: '"큰 기대 없이 시작했는데, 머리카락 빠지는 게 줄었어요. 재구매 확정."', who: '달모포뮬러 love***씨님' },
    ],
  },

  /* 8. 출처 */
  {
    type: 'banner', bg: 'page',
    sub: '- 탈모 커뮤니티 -\n2023.01 ~ 2024.03',
    head: '',
  },

  /* 9. 원인 4개 — ⑤ 공감 */
  {
    type: 'cards', bg: 'page',
    head: '내 머리는 왜 빠지는 걸까?',
    cards: [
      { n: '1', t: '잦은 염색과 펌' },
      { n: '2', t: '급격한 호르몬 변화' },
      { n: '3', t: '무리한 다이어트' },
      { n: '4', t: '꽉 묶은 머리' },
    ],
  },

  /* 10. 솔루션 헤딩 */
  {
    type: 'banner', bg: 'page',
    head: '원인이 다르면, 답도 달라야 합니다',
  },

  /* 11. 모아르 4종 — ① 욕망 */
  {
    type: 'feature', bg: 'page',
    label: 'SOLUTION',
    head: '모아르 한 병으로,',
    accent: '4가지를 한 번에',
    body: '· 두피 각질·비듬 케어\n· 두피 진정 케어\n· 탈모 증상 케어\n· 손상 모발 개선',
    image: '모아르 샴푸 제품 컷',
  },

  /* 12. POINT 1 — ⑥ 장면 + 성분 사실 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 1',
    head: '두피 막힘부터 풀어줍니다',
    accent: '각질·비듬 케어',
    body: '· AHA — 두피 각질을 부드럽게 정리\n· BHA — 피지 분비 조절, 염증 완화\n· 어성초 — 천연 항균·항염, 두피 진정\n· 멘톨 — 두피 열감 완화, 시원한 사용감',
    image: '4가지 성분 원료 사진',
  },

  /* 13. Point 2 */
  {
    type: 'feature', bg: 'light',
    label: 'Point 2',
    head: '매일 써도 자극 없는',
    accent: '쿨링 진정 케어',
    body: '· 병풀추출물 — 상처 회복 + 진정\n· 티트리오일 + 멘톨 — 청량 쿨링\n· 어성초추출물 + 로즈마리잎 — 가려움 완화\n\n*개인차 있을 수 있음 / 지루성두피 대상 유분 개선',
    image: 'Before / After 두피 클로즈업',
  },

  /* 14. 차트 76% (사실) */
  {
    type: 'stat', bg: 'page',
    head: '1회 사용 후, 두피 유분 76% 감소',
    stats: [
      { value: '169.24', label: '사용 전' },
      { value: '40.52', label: '1회 사용 직후' },
      { value: '-76.06%', label: '감소' },
    ],
  },

  /* 15. Point 3 — 식약처 기능성 인증 (사실 보존) */
  {
    type: 'feature', bg: 'page',
    label: 'Point 3',
    head: '식약처 기능성 인증',
    accent: '탈모 증상 완화 샴푸',
    body: '인증된 기능성 성분으로 검증된 효과.\n\n· 모아르 독자 원료\n· 살리실산\n· 덱스판테놀\n· 나이아신아마이드\n· 비오틴',
    image: '4성분 분자 구조 아이콘',
  },

  /* 16. Before / After */
  {
    type: 'feature', bg: 'page',
    head: '2주 사용,',
    accent: '거울 앞에서 느껴집니다',
    image: 'Before / After 머리카락 빠진 양 비교',
  },

  /* 17. 임상 50% (사실) */
  {
    type: 'stat', bg: 'page',
    head: '임상시험으로 증명된\n탈모 증상 완화 기능성',
    sub: '2주 사용 후 모발 탈락 수 50.10% 감소',
    stats: [
      { value: '37.5', label: '사용 전 (0주)' },
      { value: '19.3', label: '사용 2주 후' },
      { value: '-50.10%', label: '감소' },
    ],
  },

  /* 18. Point 4 */
  {
    type: 'feature', bg: 'light',
    label: 'Point 4',
    head: '뿌리부터 끝까지,',
    accent: '한 올 한 올 살립니다',
    body: '· 콜라겐 — 수분 보호막, 윤기\n· 글라이콜릭애씨드 — 두피 정화\n· 식물성 단백질 — 모발 강화 코팅',
    image: 'Before / After 모발 비교',
  },
];

export const REF_04: Template2 = {
  id: 'ref-04', category: '뷰티', theme: T, width: 860, sections,
};
