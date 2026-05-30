/**
 * recommendRef — 자유설명·카테고리로 ref-01~10 중 가장 적합한 것 자동 선택.
 * 사용자가 폼에서 직접 ref 고르면 그게 우선. 'auto' 면 이 함수가 추천.
 */
import { REF_OLIVE } from './refs/ref-olive.ts';
import { REF_01 } from './refs/ref-01.ts';
import { REF_02 } from './refs/ref-02.ts';
import { REF_03 } from './refs/ref-03.ts';
import { REF_04 } from './refs/ref-04.ts';
import { REF_05 } from './refs/ref-05.ts';
import { REF_06 } from './refs/ref-06.ts';
import { REF_07 } from './refs/ref-07.ts';
import { REF_08 } from './refs/ref-08.ts';
import { REF_09 } from './refs/ref-09.ts';
import type { Template2 } from './engine.ts';

export interface RefMeta {
  id: string;
  template: Template2;
  category: string;        // 시안 카테고리
  productKind: string[];   // 매칭 키워드 (한국어, 사용자 입력에 자주 나오는 단어)
  vibes: string[];         // 시안 분위기 키워드
  description: string;     // UI 표시용
}

export const REFS: RefMeta[] = [
  {
    id: 'ref-01', template: REF_01, category: '패션',
    productKind: ['모자', '캡', '볼캡', '버킷햇', '캡모자'],
    vibes: ['미니멀', '베이지', '캐주얼', '데일리'],
    description: '미니멀 베이지 — 모자/캡 같은 잡화',
  },
  {
    id: 'ref-02', template: REF_02, category: '뷰티',
    productKind: ['스카프', '두건', '커치프', '헤어밴드', '레이스'],
    vibes: ['로맨틱', '파스텔', '여성스러운', '플라워'],
    description: '소프트 화이트 — 스카프·헤어 액세서리',
  },
  {
    id: 'ref-03', template: REF_03, category: '식품',
    productKind: ['고구마', '농산물', '과일', '농산', '한과', '간식', '식품'],
    vibes: ['따뜻한', '비비드', '풍부한', '달콤한'],
    description: '비비드 푸드 다크 — 농산물·간식 (강한 후킹+후기+POINT)',
  },
  {
    id: 'ref-04', template: REF_04, category: '뷰티',
    productKind: ['샴푸', '두피', '탈모', '에센스', '앰플', '화장품', '스킨', '뷰티'],
    vibes: ['럭셔리', '다크그린', '기능성', '임상'],
    description: '럭셔리 다크 — 기능성 화장품 (성분·임상·전후 비교)',
  },
  {
    id: 'ref-05', template: REF_05, category: '패션',
    productKind: ['옷', '의류', '나시', '슬리브리스', '탑', '브라', '이너', '티셔츠'],
    vibes: ['에디토리얼', '흑백', '슬림', '화보'],
    description: '에디토리얼 모노 — 의류 (룩북+모델컷 풍부)',
  },
  {
    id: 'ref-06', template: REF_06, category: '리빙',
    productKind: ['텀블러', '물병', '보온병', '컵', '주방', '리빙', '식기', '베개', '침구', '이불', '매트', '쿠션', '패드', '위생', '청결'],
    vibes: ['클린', '하늘색', '청량', '여름', '깔끔한', '위생적'],
    description: '클린 아쿠아 — 텀블러/물병·침구·위생용품 (POINT+FAQ+환경)',
  },
  {
    id: 'ref-07', template: REF_07, category: '리빙',
    productKind: ['텀블러', '물병', '컵', '보온병', '주방', '리빙', '컬러', '쿠션', '패드'],
    vibes: ['파스텔', '멀티컬러', '친환경', '귀여운', '부드러운'],
    description: '파스텔 멀티 — 텀블러/리빙 (POINT+컬러 옵션 풍부)',
  },
  {
    id: 'ref-08', template: REF_08, category: '리빙',
    productKind: ['식물', '화분', '재배기', '가든', '인테리어', '주방가전', '소가전'],
    vibes: ['다크 그린', '럭셔리', '내추럴', '인테리어'],
    description: '다크 그린 럭셔리 — 식물 재배기/리빙 소가전',
  },
  {
    id: 'ref-09', template: REF_09, category: '전자기기',
    productKind: ['선풍기', '가전', '전자', '디지털', '모터', '쿨링', '냉각', '핸디'],
    vibes: ['테크', '다이내믹', '딥블루', '강력'],
    description: '테크 다이내믹 — 가전/전자 (강한 임팩트·풍속·BLDC 같은 스펙)',
  },
  {
    id: 'ref-olive', template: REF_OLIVE, category: '식품',
    productKind: ['올리브오일', '오일', '식용유', '프리미엄식품', '선물', '한정판', '오일'],
    vibes: ['자연주의', '럭셔리', '내추럴', '프리미엄'],
    description: '내추럴 프리미엄 — 프리미엄 식품·선물 (스토리+인증+FAQ 풍부)',
  },
];

function overlaps(a: string, b: string): boolean {
  if (!a || !b) return false;
  const al = a.toLowerCase(), bl = b.toLowerCase();
  return al === bl || al.includes(bl) || bl.includes(al);
}

export function getRef(id: string): RefMeta | null {
  return REFS.find((r) => r.id === id) ?? null;
}

export function recommendRef(opts: { category?: string; keywords?: string }): RefMeta {
  const tokens = (opts.keywords ?? '').toLowerCase().split(/[\s,.·\n]+/).filter((t) => t.length >= 2);
  let best = REFS[0];
  let bestScore = -1;
  for (const r of REFS) {
    let score = 0;
    if (opts.category && r.category === opts.category) score += 3;
    // 제품군 키워드 강한 가중치
    for (const t of tokens) {
      for (const k of r.productKind) {
        if (overlaps(t, k)) score += 6;
      }
      for (const v of r.vibes) {
        if (overlaps(t, v)) score += 2;
      }
      if (overlaps(t, r.category)) score += 2;
    }
    if (score > bestScore) { bestScore = score; best = r; }
  }
  return best;
}
