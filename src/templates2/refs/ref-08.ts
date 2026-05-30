/**
 * 시안 8번 (plantui Smart Garden) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#1a3a2a', primaryDeep: '#0d1e15',
  light: '#f0ebe1', light2: '#e2dccc',
  ink: '#1a2a1f', sub: '#6a786a',
  accent: '#5a7a3a', bg: '#f5f1e6', onPrimary: '#e8e2d4',
  surface: '#ffffff', badge: '#5a7a3a',
};

const sections: Section[] = [
  /* 1. Hero — ⑥ 장면 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: 'Indoor Smart Garden',
    title: 'plantui',
    sub: '주방 한 켠에서 키우는,\n진짜 신선한 한 잎',
    image: { mask: 'rect', overlay: 0.35, focusX: 0.5, focusY: 0.55, label: '부엌 + 식물재배기 메인 사진' } as any,
  },

  /* 2. SMART GARDEN Point */
  {
    type: 'banner', bg: 'ink',
    label: 'PLANTUI SMART GARDEN',
    head: 'Point',
  },

  /* 3. 4 포인트 */
  {
    type: 'iconGrid', bg: 'ink',
    cols: 4,
    items: [
      { t: '무농약 웰빙채소', d: '내가 키운 한 잎, 농약 걱정 없이' },
      { t: '나만의 힐링가든', d: '베란다 없어도, 거실 한 켠에서' },
      { t: '특허받은 LED 기술', d: '햇볕 없이도 키울 수 있는 단 하나' },
      { t: '간편한 원터치', d: '버튼 한 번이면, 자동으로' },
    ],
  },

  /* 4. POINT 01 — ⑦ 반전 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 01',
    head: '농약 없이 키운 채소,',
    accent: '내 집에서 가능합니다',
    body: '특허받은 식물 생장 LED가\n자연광보다 400% 더 빠르게 채소를 키웁니다.',
    image: '흰 식물재배기 + 채소',
  },

  /* 5. 토마토 */
  { type: 'image', bg: 'primary', label: '빨강 배경 + 토마토 + 식물재배기', h: 540 },

  /* 6. POINT 03 */
  {
    type: 'feature', bg: 'primary',
    label: 'POINT 03',
    head: '특허받은 LED 기술,',
    accent: '햇볕 없이도 자랍니다',
    body: '성장 단계에 맞춘 빛이 자동으로 바뀝니다.\n식물이 가장 잘 자라는 환경, 알아서 만들어줍니다.',
    image: '흰 식물재배기',
  },

  /* 7. 채소 */
  { type: 'image', bg: 'page', label: '식물재배기 + 신선 채소 클로즈업', h: 480 },

  /* 8. 4가지 ZERO */
  {
    type: 'iconGrid', bg: 'page',
    label: 'TECHNOLOGY WITH A PURPOSE',
    head: '목표가 있는 기술',
    cols: 4,
    items: [
      { t: '운송거리 ZERO', d: '주방에서 식탁으로, 한 걸음' },
      { t: '플라스틱 최소화', d: '재사용 가능한 소재' },
      { t: '쓰레기 ZERO', d: '버리는 잎 없이, 그대로' },
      { t: '에너지 효율 UP', d: '저전력 LED' },
    ],
  },

  /* 9. 인용 */
  {
    type: 'banner', bg: 'primary',
    head: '"PLANTUI의 기술은\n순수하고 영양이 풍부한\n자급 가능한 식탁을 위해 개발됐습니다."',
    sub: 'PLANTUI SMART GARDEN',
  },

  /* 10. POINT 04 */
  {
    type: 'feature', bg: 'ink',
    label: 'POINT 04',
    head: '버튼 하나면,',
    accent: '그 다음은 알아서',
    body: '터치 한 번으로 ON/OFF.\n16시간 작동 후 자동 절전 — 신경 쓸 필요 없습니다.',
    image: '손 + 원터치 버튼',
  },

  /* 11. STEP cards */
  {
    type: 'cards', bg: 'page', variant: 'value',
    cards: [
      { n: 'STEP 01', t: 'ON / OFF', d: '터치 한 번으로 켜고 끄기' },
      { n: 'STEP 02', t: 'SLEEP TIMER', d: '3초 길게 누르면 야간 절전' },
    ],
  },

  /* 12. 손 사용 */
  { type: 'image', bg: 'ink', label: '손 + 식물 + 식물재배기', h: 460 },

  /* 13. 사용방법 3 STEP */
  {
    type: 'mediaRow', bg: 'page',
    label: 'HOW TO',
    head: '심고, 물 주고, 기다리면 끝',
    headerBg: 'green',
    items: [
      { image: 'STEP 01 사진', t: 'STEP 01', d: '캡슐을 끼우고 물을 넣어주세요' },
      { image: 'STEP 02 사진', t: 'STEP 02', d: '전원을 켜고 자리만 잡아주세요' },
      { image: 'STEP 03 사진', t: 'STEP 03', d: '7일 뒤, 한 잎씩 따 드시면 됩니다' },
    ],
  },

  /* 14. SMART GARDEN 3 */
  {
    type: 'image', bg: 'page',
    label: 'SMART GARDEN 3',
    cols: ['WHITE', 'MOOMIN WHITE', 'MOOMIN RED', 'MOOMIN BLACK'],
    h: 280,
    caption: '컬러도, 캐릭터도 — 골라보세요',
  },

  /* 15. SMART GARDEN 6 */
  {
    type: 'image', bg: 'page',
    label: 'SMART GARDEN 6',
    cols: ['WHITE', 'RED', 'BLACK'],
    h: 280,
    caption: '더 많이 키우고 싶다면, 6캡슐',
  },

  /* 16. SPEC-01 */
  {
    type: 'spec', bg: 'light',
    label: 'SPEC - 01',
    title: 'Smart Garden 3',
    rows: [
      ['용량', '캡슐 3구'],
      ['높이', '24cm (기본) / 31cm (1단 결합) / 40cm (2단 결합)'],
      ['무게', '1.30kg'],
      ['지름', '15cm'],
      ['전압', '12V'],
      ['보관 환경', '-25°C ~ 55°C'],
      ['최대 음용량', '1L'],
      ['광원', 'LED 8색'],
      ['소음', '50dB'],
      ['소재', 'ABS (BPA-free)'],
    ],
  },

  /* 17. SPEC-02 */
  {
    type: 'spec', bg: 'light',
    label: 'SPEC - 02',
    title: 'Smart Garden 6',
    rows: [
      ['용량', '캡슐 6구'],
      ['높이', '21cm (기본) / 38cm (확장)'],
      ['무게', '2.45kg'],
      ['지름', '20cm'],
    ],
  },
];

export const REF_08: Template2 = {
  id: 'ref-08', category: '리빙', theme: T, width: 860, sections,
};
