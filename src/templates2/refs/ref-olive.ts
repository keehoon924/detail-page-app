/**
 * 시안 10번 (밀레나리움 올리브오일) — 레이아웃·박스 1:1, 카피는 사장님 가이드(7무기)로 재작성.
 * 원본 inputs/references/new/10.png (860×21289).
 *
 * 원칙(2026-05-30 사장님 정정):
 *  - "1:1"은 레이아웃·박스·섹션 순서이지 글자 1:1이 아니다.
 *  - 시안의 사실(브랜드명·산지·품종·인증·구성·스펙)만 보존.
 *  - 표현은 [[copywriting-style]] 가이드 — 7무기 · 멘트 형식 · 첫 컷 멈춤 · 동사·숫자·감각어.
 *  - CTA 버튼 금지 — 마지막은 브랜드 메시지로 자연스럽게.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#3a2a14', primaryDeep: '#1e1408',
  light: '#efe5d0', light2: '#e3d6b8',
  ink: '#1f1812', sub: '#7a6f60',
  accent: '#c63a2f', bg: '#fefcf6', onPrimary: '#fdf6e6',
  surface: '#ffffff', badge: '#8a6a2a',
};

const sections: Section[] = [
  /* 1. Hero 풀블리드 — ⑦ 호기심·반전 + ⑥ 장면 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: '그저 그런 올리브오일은, 그만',
    title: 'MILLENARIUM GRAND CRU',
    sub: '천 년을 살아낸 나무가\n한 방울에 담겼습니다',
    image: { mask: 'rect', overlay: 0.4, focusX: 0.5, focusY: 0.45, label: '메인 비주얼 (올리브오일 병 + 올리브 잎 + 컵)' } as any,
  },

  /* 2. 다크 4박스 — 사실 + 짧고 임팩트 */
  {
    type: 'cards', bg: 'ink', variant: 'value',
    cards: [
      { t: '이탈리아 천년 올리브나무' },
      { t: '오토브라티카 단일 품종' },
      { t: 'EU 유기농 Demeter 인증' },
      { t: '한 병 한 번호, 넘버링 한정' },
    ],
  },

  /* 3. 브랜드 스토리 — ⑥ 장면 + ① 욕망 직격 */
  {
    type: 'feature', bg: 'page',
    label: 'OUR STORY',
    head: '한 자리, 천 년.',
    accent: '할아버지가 시작해,\n손자가 이은 오일.',
    body: '이탈리아 남부 칼라브리아.\n천 년 동안 한 자리를 지킨 올리브나무를,\n3대째 한 가족이 가꿉니다.\n\n농약도, 화학비료도, 첨가물도 없습니다.\n자연이 만든 시간만 담았습니다.',
    image: '이탈리아 지도 일러스트 (남부 칼라브리아 강조)',
    points: ['이탈리아 남부 칼라브리아'],
  },

  /* 4. POINT 01 풀블리드 — ② 구체적 숫자 + 희소성 */
  {
    type: 'banner', bg: 'ink',
    label: 'POINT 01',
    head: '350그루.\n천 년을 살아낸 나무에서만.',
  },

  /* 5. 350그루 feature — ⑥ 장면 + 감각어 */
  {
    type: 'feature', bg: 'page', reverse: true,
    head: '10m 깊이 뿌리가\n빨아올린 흙의 영양,',
    accent: '그대로.',
    body: '바다 바람, 지중해 햇살, 미네랄 황토.\n천 년 동안 뿌리가 깨어 모은 영양이\n한 방울에 다 있습니다.',
    image: '올리브나무 뿌리 클로즈업',
    points: ['폴리페놀', '항산화', '미네랄'],
  },

  /* 6. mediaRow PROCESS — ⑥ 장면 + 동사 */
  {
    type: 'mediaRow', bg: 'page',
    label: 'PROCESS',
    head: '한 알의 올리브가\n한 방울의 오일이 되기까지',
    headerBg: 'plain',
    items: [
      { image: '친환경 관리 사진', t: '농약 없는 손길', d: '화학 농약 한 방울 없이, 자연의 시간에 맡깁니다.' },
      { image: '한낮 수확 사진', t: '햇살 가장 깊은 12시', d: '풍미가 가장 진한 한낮에만, 손으로 골라 땁니다.' },
      { image: '냉압착 사진', t: '딴 지 6시간 내, 27°C 압착', d: '산화될 새 없이 — 향과 영양, 그대로 담깁니다.' },
    ],
  },

  /* 7. rateTable 프루티 — 사실 표 + 강조 헤딩 */
  {
    type: 'rateTable', bg: 'page',
    head: '입맛에 맞는, 단 한 단계',
    items: [
      { level: '라이트 프루티', levelEn: 'Light Fruity', desc: '은은한 과일향, 부드러운 맛' },
      { level: '미디엄 프루티', levelEn: 'Medium Fruity', desc: '과일향이 분명히 나며, 풍미가 살아있음', highlight: true },
      { level: '인텐스 프루티', levelEn: 'Intense Fruity', desc: '매우 강한 과일향 + 매운맛, 산뜻한 풍미' },
    ],
  },

  /* 8. 풀블리드 다크 — ③ 손실 회피 + 희소성 */
  {
    type: 'banner', bg: 'ink',
    head: '한 계절, 한 품종, 한 번의 수확.\n다시 만들 수 없는 한 방울.',
    sub: 'MILLENARIUM',
  },

  /* 9. POINT 03 — ⑦ 호기심·반전 */
  {
    type: 'banner', bg: 'page',
    label: 'POINT 03',
    head: '유기농이라는 말,\n이 한 마디면 충분합니다.',
    sub: 'EU 유기농 + Demeter 인증 완료',
  },

  /* 10. tablePair 인증 — 사실 표 + 강조 헤딩 */
  {
    type: 'tablePair', bg: 'page',
    head: '두 기관, 같은 결과 — 진짜 유기농.',
    left: {
      title: '유기농 — 오일 분석',
      rows: [
        ['검사 항목', '오일 성분 분석'],
        ['적합 여부', 'EU 규정 적합'],
        ['결과', 'CONFORME'],
      ],
    },
    right: {
      title: '친환경 농업 관리 인증',
      rows: [
        ['검사 항목', '농업 관리 적합성'],
        ['적합 여부', 'EU 규정 적합'],
        ['결과', 'CONFORME'],
      ],
    },
  },

  /* 11. 풀블리드 다크 무첨가 — ② 구체 + ⑦ 반전 */
  {
    type: 'banner', bg: 'ink',
    head: '다른 건, 단 한 방울도 섞지 않았습니다.',
    sub: '올리브, 그뿐입니다.',
  },

  /* 12. POINT 04 — ⑦ 호기심·반전 */
  {
    type: 'banner', bg: 'ink',
    label: 'POINT 04',
    head: '오일이라 부르기엔,\n너무 귀합니다.',
    sub: '한 병마다 새겨진 번호 — Limited Numbered Edition',
  },

  /* 13. 선물 패키지 — ⑥ 장면 + ⑤ 공감 */
  {
    type: 'feature', bg: 'page',
    label: 'GIFT EDITION',
    head: '1000년의 시간을,',
    accent: '선물합니다.',
    body: '건강을 바라는 그분께 —\n\n· 500ml × 3병\n· 빛바램 없는 프리미엄 라벨\n· 프리미엄 케이스\n· 쇼핑백 (×3)',
    image: '3병 + 케이스 + 쇼핑백 라인업',
    points: ['선물 한정'],
  },

  /* 14. 추천 대상 — ⑤ 공감 후킹 */
  {
    type: 'checkPoint', bg: 'ink',
    label: 'FOR YOU',
    title: '이런 분이라면, 한 병 챙기세요',
    items: [
      '내 건강은 내가 챙기는 분',
      '오래오래 건강하시길 바라는 부모님께',
      '정말 좋은 걸 드리고 싶은 그분께',
    ],
  },

  /* 15. POINT 05 — ⑥ 장면 */
  {
    type: 'banner', bg: 'page',
    label: 'POINT 05',
    head: '오늘 저녁,\n식탁이 바뀝니다.',
  },

  /* 16. mediaRow 생식 추천 — ⑥ 장면 + 감각어 */
  {
    type: 'mediaRow', bg: 'page',
    label: '그대로 한 스푼',
    head: '향이 다 다릅니다.',
    headerBg: 'green',
    items: [
      { image: '플레인 한 스푼', t: '아침 공복 한 스푼', d: '잠든 사이 빠진 영양을, 일어나 한 스푼.' },
      { image: '샐러드 마무리', t: '샐러드 마무리', d: '레몬도 발사믹도 필요 없어요. 향이 다 다릅니다.' },
      { image: '치즈 한 방울', t: '치즈 한 방울', d: '리코타·페타에 한 방울 — 지중해의 깊이.' },
    ],
  },

  /* 17. mediaRow 조리활용 — ⑥ 장면 + 결과 */
  {
    type: 'mediaRow', bg: 'page',
    label: '데우면 향이 깨어납니다',
    head: '저온 조리에서 살아나는 깊은 풍미',
    headerBg: 'yellow',
    items: [
      { image: '마늘빵', t: '마늘빵', d: '마늘 단맛이 한 번 더 살아납니다.' },
      { image: '토마토 파스타', t: '토마토 파스타', d: '한 바퀴 두르면, 토마토 향이 깊어집니다.' },
      { image: '감바스 알 아히요', t: '감바스 알 아히요', d: '이 한 병이면, 진짜 스페인 맛.' },
    ],
  },

  /* 18. 풀블리드 식탁 — ① 욕망 직격 */
  {
    type: 'banner', bg: 'ink',
    head: '한 병이 식탁을 바꾸고,\n식탁이 일상을 바꿉니다.',
  },

  /* 19. FAQ — 정보성, 친근하게 */
  {
    type: 'faq', bg: 'ink',
    label: 'FAQ',
    head: '자주 묻는 질문',
    items: [
      { q: '생식으로 먹어도 되나요?', a: '네, 콜드프레스 방식이라 영양소가 살아있어서 생식에 가장 좋습니다.' },
      { q: '유통기한은 얼마나 되나요?', a: '제조일로부터 24개월입니다. 개봉 후엔 6개월 안에 드시는 걸 권장합니다.' },
      { q: '요리에도 사용 가능한가요?', a: '발연점 210°C로 저온~중온 조리에 적합합니다. 튀김보다는 볶음·구이·오븐 요리에 어울립니다.' },
      { q: '일반 올리브오일과 어떻게 다른가요?', a: '단일 품종 + 천년 고목 + 한정 생산이라, 향미의 균형과 영양 밀도가 다릅니다.' },
      { q: '선물 포장 가능한가요?', a: '프리미엄 케이스와 쇼핑백이 기본 제공돼서, 따로 포장하지 않아도 완성도 높은 선물이 됩니다.' },
    ],
  },

  /* 20. notice A/S — 정보성 보존 */
  {
    type: 'notice', bg: 'page',
    title: 'A/S 및 교환·환불 안내',
    items: [
      '제품 수령 후 7일 이내, 미개봉 제품에 한해 교환·환불 가능',
      '배송 중 파손 시 100% 교환 (사진 첨부 필수)',
      '개봉 후 제품 문제 발생 시 고객센터로 연락 주시면 개별 확인 후 조치',
      '직사광선 피해 서늘한 곳에 보관해주세요',
      '개봉 후엔 밀폐해 냉장 보관 권장',
      '산화 방지를 위해 6개월 안에 소진 권장',
    ],
  },

  /* 21. 푸터 — 브랜드 메시지로 자연스럽게 (CTA 버튼 없음) */
  {
    type: 'cta', bg: 'ink',
    head: '밀레나리움 그랑크루',
    sub: '한 자리에서 천 년을 살아낸 나무가,\n당신의 식탁에 도착했습니다.',
    image: '제품(병) + 올리브 잎 정물 컷',
  },
];

export const REF_OLIVE: Template2 = {
  id: 'ref-olive',
  category: '식품',
  theme: T,
  width: 860,
  sections,
};
