/**
 * 시안 3번 (강화도 꿀 고구마) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#f5b324', primaryDeep: '#d4901a',
  light: '#2a2018', light2: '#3a3023',
  ink: '#f8e9c2', sub: '#c9b896',
  accent: '#c93838', bg: '#1a1410', onPrimary: '#1a1410',
  surface: '#2a2018', badge: '#f5b324',
};

const sections: Section[] = [
  /* 1. Hero — ⑥ 장면 + ⑦ 호기심 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: '우리농장',
    script: '한 입 베어 물면, 꿀이 주르륵',
    title: '꿀고구마',
    sub: '해풍 맞고 자란, 강화도 단맛',
    image: { mask: 'rect', overlay: 0.45, focusX: 0.5, focusY: 0.5, label: '군고구마 사진 (단면 + 그릇)' } as any,
  },

  /* 2. 재구매율 + 평점 — ② 숫자 + 신뢰 */
  {
    type: 'banner', bg: 'primary',
    head: '한 번 드신 분, 또 시키십니다',
    sub: '구매자 평점 4.8 / 재구매율 70%↑',
  },

  /* 3. 후기 4개 — ⑤ 공감 */
  {
    type: 'cards', bg: 'page',
    label: 'REAL REVIEW',
    head: '한 박스 시키면, 이렇게 됩니다',
    cards: [
      { t: '두 박스째 시켜요', d: '"한 박스로는 모자라요. 아이도 어른도 다 좋아하니까."' },
      { t: '디저트가 따로 없어요', d: '"퇴근하고 구워먹는 게 하루의 낙입니다."' },
      { t: '진짜 꿀이 흐릅니다', d: '"단단하고 촉촉. 사진 그대로예요."' },
      { t: '리뷰 그대로네요', d: '"의심하다가 한 박스 시켰는데, 다음 주에 또 시켰어요."' },
    ],
  },

  /* 4. 비교 — ⑦ 반전 */
  {
    type: 'banner', bg: 'page',
    head: '밤고구마처럼 안 퍽퍽,\n호박고구마보다 더 답니다',
  },

  /* 5. 재구매율 본문 */
  {
    type: 'feature', bg: 'page',
    head: '한 번 먹어보면,',
    accent: '왜 70%가 또 시키는지 압니다',
    body: '맛으로 증명하는 강화 꿀 고구마.',
    image: '군고구마 단면 + 김 모락모락',
  },

  /* 6. CHECK POINT 3 */
  {
    type: 'cards', bg: 'page', variant: 'value',
    label: 'CHECK POINT',
    head: '왜 이 고구마가 단가요?',
    cards: [
      { n: '01', t: '강화도 청정 국내산' },
      { n: '02', t: '해풍 + 황토 = 당도 폭발' },
      { n: '03', t: '72시간 저온 숙성' },
    ],
  },

  /* 7. POINT 01 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 01',
    head: '강화도 청정 지역에서,',
    accent: '햇볕과 해풍으로 키웠습니다',
    body: '국내산 100% — 한 알 한 알 다 우리 땅에서.',
    image: '한국 지도 + 강화도 강조',
  },

  /* 8. POINT 02 — ⑥ 장면 */
  {
    type: 'feature', bg: 'page', reverse: true,
    label: 'POINT 02',
    head: '해풍, 햇살, 황토 —',
    accent: '단맛이 들 수밖에 없는 땅',
    body: '당도를 끌어올리는 세 가지 조건이 다 갖춰진 자리.\n그 자리에서, 정성껏 키웠습니다.',
    image: '밭에서 캐는 모습 + 흙 묻은 고구마',
  },

  /* 9. POINT 03 — ② 숫자 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 03',
    head: '캐자마자가 아니라,',
    accent: '72시간 더 익혔습니다',
    body: '저온 큐어링으로 단맛과 촉촉함이 한 번 더 올라온, 진짜 꿀고구마.',
    image: '저장 박스 + 큐어링 환경',
  },

  /* 10. 큰 카피 — ⑥ 장면 + 감각 */
  {
    type: 'banner', bg: 'page',
    head: '겉은 쫀득, 속은 촉촉.\n입안 가득 퍼지는 단맛.',
  },

  /* 11. 판매옵션 4개 */
  {
    type: 'checkPoint', bg: 'primary',
    label: '판매옵션',
    title: '드시고 싶은 만큼, 골라 담으세요',
    items: ['옵션 1 — 2kg', '옵션 2 — 3kg', '옵션 3 — 5kg', '옵션 4 — 8kg'],
  },

  /* 12. 사이즈 안내 + TIP */
  {
    type: 'feature', bg: 'page',
    label: 'TIP',
    head: '사이즈는 랜덤,',
    accent: '맛은 다 똑같이 답니다',
    body: '큰 거 작은 거 섞여 갑니다. 어떤 게 와도, 맛은 보장합니다.',
    image: '랜덤 고구마 사이즈 사진',
  },

  /* 13. 활용 요리 4가지 */
  {
    type: 'image', bg: 'page',
    label: '활용 요리',
    cols: ['고구마 스프', '고구마 샐러드', '고구마 밥', '고구마 말랭이'],
    h: 220,
    caption: '구워먹는 게 전부가 아닙니다.',
  },

  /* 14. 보관방법 — mediaRow */
  {
    type: 'mediaRow', bg: 'page',
    label: '보관방법',
    head: '받자마자, 이렇게만 해주세요',
    headerBg: 'yellow',
    items: [
      { image: '신문지 위에 펼쳐 말리기', t: '반나절 펼쳐 말리기', d: '신문지에 펼쳐 반나절 이상 말려주세요.' },
      { image: '키친타올 + 종이박스', t: '하나씩 감싸 보관', d: '신문지나 키친타올로 감싸 종이박스에 넣어주세요.' },
      { image: '서늘한 곳에 보관', t: '13~15°C 서늘한 곳', d: '햇볕 피해 서늘한 곳. 장기 보관은 굽거나 삶아 냉동.' },
    ],
  },

  /* 15. 배송안내 */
  {
    type: 'banner', bg: 'primary',
    label: '배송안내',
    head: '종이팩으로 안전하게 보내드립니다',
  },

  /* 16. 배송 본문 */
  {
    type: 'feature', bg: 'page',
    head: '환경까지 챙긴',
    accent: '종이팩 포장',
    body: '플라스틱 없이, 종이박스로.\n박스 디자인은 변경될 수 있는 점 양해 부탁드립니다.',
    image: '종이팩 박스 배송 사진',
  },

  /* 17. spec */
  {
    type: 'spec', bg: 'page',
    label: 'PRODUCT INFO',
    title: '상품정보고시',
    rows: [
      ['제품명', '우리농장 꿀고구마'],
      ['사이즈와 용량', '옵션 페이지 참고'],
      ['원산지', '국내산'],
      ['소비기한', '신선식품으로 발송 후 별도 기한 없음'],
      ['수입자', '병행수입 X'],
      ['소비자상담', '판매처 카톡 문의'],
    ],
  },

  /* 18. Notice */
  {
    type: 'notice', bg: 'page',
    title: 'Notice',
    items: [
      '농산물 특성상 색상·크기에 차이가 있을 수 있습니다.',
      '입금 확인 후 발송 — 전화 받아주시면 빠르게 처리됩니다.',
    ],
  },
];

export const REF_03: Template2 = {
  id: 'ref-03', category: '식품', theme: T, width: 860, sections,
};
