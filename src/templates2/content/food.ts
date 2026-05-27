import type { Template2 } from '../engine.ts';
import { THEMES } from '../themes.ts';

export const FOOD2: Template2[] = [
  {
    id: '식품1', category: '식품', theme: THEMES['식품1'], sections: [
      { type: 'hero', bg: 'light', label: 'DUBRO SIGNATURE GRANOLA', script: '매일 아침이 든든한', title: '두브로 시그니처', accent: '그래놀라', sub: '국산 통귀리 100% · 직접 로스팅', chips: ['국산 귀리', '인공첨가물 ZERO', '당일 로스팅'], image: '그래놀라 자 + 볼 (히어로)' },
      { type: 'cards', bg: 'page', variant: 'value', label: 'WHEN TO EAT?', head: '언제 먹어도 완벽한 한 끼', cards: [{ n: '01', t: '아침 식사 대용', d: '부어서 3분이면 든든한 아침' }, { n: '02', t: '간식 · 야식', d: '가볍게 한 줌 건강 간식' }, { n: '03', t: '요거트와 함께', d: '상큼하게 즐기는 한 그릇' }] },
      { type: 'iconGrid', bg: 'light2', label: 'INGREDIENTS', head: '엄선한 재료만 담았습니다', cols: 4, items: [{ t: '국산 통귀리' }, { t: '견과류' }, { t: '건과일' }, { t: '비정제원당' }] },
      { type: 'checkPoint', bg: 'primary', label: 'DUBRO PROMISE', title: 'CHECK POINT', items: ['국내산 통귀리만 사용합니다', '매일 소량씩 직접 로스팅합니다', '비정제원당 외 단맛을 더하지 않습니다'] },
      { type: 'cards', bg: 'page', variant: 'value', label: '두브로 FRIENDS', head: '제품 라인업', cards: [{ t: '오리지널', d: '고소한 기본' }, { t: '단호박', d: '달큰한 풍미' }, { t: '카카오', d: '진한 초코' }, { t: '플레인', d: '담백하게' }] },
      { type: 'steps', bg: 'light', label: 'HOW TO EAT?', head: '어떻게 먹지?', sub: '세 가지 방법', steps: [{ n: '01', t: '우유에 부어서', d: '차가운 우유 한 컵에 부으면 끝. 바삭함이 살아있을 때 바로 드세요.', image: '우유 + 그래놀라' }, { n: '02', t: '요거트와 함께', d: '플레인 요거트 위에 듬뿍, 과일을 더하면 근사한 한 그릇.', image: '요거트 볼' }, { n: '03', t: '그대로 간식으로', d: '출출할 때 한 줌, 바삭하고 고소한 건강 간식.', image: '그래놀라 클러스터' }] },
      { type: 'spec', bg: 'light2', label: 'PRODUCT INFO', title: '제품 상세 정보', rows: [['제품명', '두브로 시그니처 그래놀라'], ['중량', '300g'], ['원재료', '국산 귀리, 견과류, 건과일, 비정제원당'], ['보관방법', '직사광선을 피해 실온 보관'], ['알레르기', '견과류 함유']] },
      { type: 'cta', bg: 'primary', label: 'ORDER NOW', head: '매일 아침이 달라집니다', sub: '오늘 주문하면 오늘 볶아서 보내드려요', benefits: ['첫 구매 10% 할인', '2팩 이상 무료배송', '정기배송 혜택'], button: '지금 주문하기', image: '그래놀라 자' },
    ],
  },
  {
    id: '식품2', category: '식품', theme: THEMES['식품2'], sections: [
      { type: 'hero', bg: 'ink', label: '서울 중랑본점', title: '쭈사랑', accent: '쭈꾸미', sub: '차원이 다른 맛의 비결, 16년 연구한 특제 양념', chips: ['당일 생산', '당일 소진', '16년 노하우'], image: '쭈꾸미 볶음 비주얼' },
      { type: 'banner', bg: 'primary', head: '믿고 먹는 브랜드 쭈사랑', sub: '서울 동부시장에서 인정받은 맛집, 쭈사랑 중랑본점' },
      { type: 'cards', bg: 'page', variant: 'value', head: '16년 연구한 특제 양념', cards: [{ n: '01', t: '2009년부터', d: '변함없는 맛으로 사랑받아온 프리미엄 쭈꾸미 볶음' }, { n: '02', t: '2018년', d: '6평에서 24평으로 확장 이전' }, { n: '03', t: '16년 노하우', d: '그대로 담아 온라인 판매 시작' }] },
      { type: 'banner', bg: 'light', head: '배달앱 평점 4.9 이상', sub: '매콤하지만 중독성 있는 진짜 쭈꾸미 볶음' },
      { type: 'iconGrid', bg: 'page', label: 'POINT', head: '언제 먹어도 완벽한 메뉴', sub: '오늘도 신선한 쭈꾸미, 한 번 먹으면 매번 생각나는 맛!', cols: 3, items: [{ t: '밥에 양념 비벼 완성' }, { t: '냉동 보관 간편' }, { t: '초간단 데우면 끝' }] },
      { type: 'cards', bg: 'light2', variant: 'value', label: '활용도 200%', head: '다양한 곁들임 메뉴', cards: [{ t: '삼겹살', d: '함께 구워 풍성하게' }, { t: '볶음밥', d: '남은 양념으로 마무리' }, { t: '라면', d: '얼큰하게 한 그릇' }] },
      { type: 'reviews', bg: 'page', title: '고객님들의 리얼 후기', items: [{ stars: 5, t: '맛도 양도 최고!', d: '온 가족이 만족했어요. 재주문 각입니다.', who: '재구매 고객' }, { stars: 5, t: '여기서만 주문해요', d: '다른 데랑 비교 불가. 양념이 진리예요.', who: '단골 고객' }, { stars: 5, t: '한 입에 반했어요', d: '매콤달콤 중독성 있어요. 강추!', who: '첫 구매 고객' }] },
      { type: 'spec', bg: 'light', label: 'PRODUCT INFO', title: '식품 정보 및 조리 방법', rows: [['판매 단위', '1팩 (400g, 1.5~2인분)'], ['보관 방법', '냉장 5일 / 냉동 6개월 이내'], ['조리', '팬에 볶거나 전자레인지로 간편하게']] },
      { type: 'banner', bg: 'ink', head: '믿고 먹는 브랜드 쭈사랑', sub: '서울 동부시장에서 인정받은 쭈사랑 중랑본점' },
    ],
  },
  {
    id: '식품3', category: '식품', theme: THEMES['식품3'], sections: [
      { type: 'hero', bg: 'light', label: '속이 꽉차고 탱탱한 수제만두', title: '태봉이', accent: '수제만두', sub: '한 입에 가득 차는 진짜 만두', chips: ['수제 만두', '당일 제조', '국내산 재료'], image: '만두 비주얼 (히어로)' },
      { type: 'reviews', bg: 'page', title: '태봉이 수제만두의 생생한 후기', items: [{ stars: 5, t: '속이 알차요', d: '시판 만두랑 차원이 달라요. 만두피도 쫄깃!', who: '구매 고객' }, { stars: 5, t: '아이도 잘 먹어요', d: '담백하고 든든해서 자주 시킵니다.', who: '워킹맘' }] },
      { type: 'iconGrid', bg: 'light2', head: '태봉이 수제만두의 원칙!', cols: 3, items: [{ t: '당일 제조 발송' }, { t: '국내산 신선 재료' }, { t: '무방부제' }] },
      { type: 'feature', bg: 'page', label: 'BRAND STORY', head: '태봉이 수제만두를', accent: '소개합니다', body: '20년 경력의 만두 장인이 한 알 한 알 손으로 빚어낸 정직한 만두. 좋은 재료와 정성으로 매일 신선하게 만듭니다.', image: '대표 사진' },
      { type: 'cards', bg: 'light', variant: 'value', head: '태봉이 수제만두는 어떻게 다른가요?', cards: [{ n: '01', t: '꽉 찬 속', d: '재료를 아끼지 않은 알찬 속' }, { n: '02', t: '당일 발송', d: '냉동 후 신선하게 배송' }, { n: '03', t: '쫄깃한 피', d: '직접 반죽한 만두피' }, { n: '04', t: '깔끔한 맛', d: '비법 양념의 담백함' }] },
      { type: 'feature', bg: 'page', reverse: true, label: 'HOW TO COOK', head: '태봉이 수제만두는', accent: '어떻게 먹나요?', body: '냉동 상태에서 조리 가능. 전자레인지·찜기·에어프라이어 어느 방법으로도 맛있게 즐길 수 있습니다.', image: '조리 컷 (찐만두/튀김만두)', points: ['전자레인지', '찜기', '에어프라이어'] },
      { type: 'cards', bg: 'light2', variant: 'value', head: '남은 만두는 어떻게 보관하나요?', cards: [{ t: '냉동 보관', d: '밀봉 후 냉동실 보관' }, { t: '소비기한', d: '제조일로부터 30일' }] },
      { type: 'banner', bg: 'primary', head: '어떻게 배송되나요?', sub: '아이스팩과 아이스박스로 신선하게 당일 발송됩니다' },
      { type: 'spec', bg: 'light', label: 'DELIVERY', title: '배송정보', rows: [['배송', '냉동 택배 (아이스박스 포장)'], ['구성', '고기만두 / 김치고추만두'], ['보관', '냉동 보관 권장']] },
    ],
  },
  {
    id: '식품4', category: '식품', theme: THEMES['식품4'], sections: [
      { type: 'hero', bg: 'light', label: 'SIMPLE & EASY', script: '번거로우셨다면, 이제는', title: '간편한데', accent: '맛있기까지', sub: '전자레인지 6분이면 완성되는 분식집 떡볶이', chips: ['전자레인지 6분', '고품질 고춧가루', '일정한 배합'], image: '완성 떡볶이 (히어로)' },
      { type: 'feature', bg: 'page', label: 'WHY?', head: '고품질', accent: '고춧가루 사용', body: '자극적인 캡사이신 및 인공소스를 사용하지 않습니다. 고춧가루로 맛을 내는 깔끔한 매운맛.', image: '고춧가루 사진' },
      { type: 'feature', bg: 'light2', reverse: true, head: '일정한', accent: '배합량', body: '한꺼번에 많은 양을 배합하지 않아 배합 비율을 일관성 있게 유지합니다.', image: '계량 사진' },
      { type: 'banner', bg: 'primary', head: '그동안 떡볶이, 한 번 해먹기 힘드셨죠?', sub: '이제는 Simple & Easy' },
      { type: 'steps', bg: 'page', label: '전자레인지 6분!', head: '요리초보자도 쉽게', sub: '조리 가능', steps: [{ n: '01', t: '재료 담기', d: '전자레인지 용기에 떡볶이 재료(떡 250g, 어묵, 소스)를 담아주세요.', image: '재료 담기' }, { n: '02', t: '물 + 소스', d: '물 종이컵 1.5컵 분량에 소스 1봉(1~2단계)을 넣습니다.', image: '소스 넣기' }, { n: '03', t: '6~7분 조리', d: '전자레인지에 6~7분 조리하면 완성!', image: '전자레인지' }] },
      { type: 'banner', bg: 'light', head: '땡! 맛있는 떡볶이 완성!', sub: '바로 이 맛이야!' },
      { type: 'image', bg: 'page', label: '완성 떡볶이 디테일', h: 320, caption: '쫄깃한 떡과 깔끔한 매운맛' },
      { type: 'spec', bg: 'light2', label: 'PRODUCT INFO', title: '제품정보', rows: [['구성', '떡 250g, 어묵, 소스'], ['조리법', '전자레인지 6~7분'], ['맛 단계', '1~2단계 조절 가능'], ['보관', '냉동 보관']] },
    ],
  },
  {
    id: '식품5', category: '식품', theme: THEMES['식품5'], sections: [
      { type: 'hero', bg: 'light', label: '차원이 다른 쫀득~한', title: '설화', accent: '쫀득 쿠키', sub: '먹는 즐거움을 선사하는 칩스앤너츠', chips: ['수제 제작', '개별포장', '6가지 맛'], image: '쿠키 비주얼 (히어로)' },
      { type: 'banner', bg: 'primary', head: '거품 없고 부담 없는 즐거움', sub: '쫀득쿠키는 수제라서 비싼 거 아니냐?' },
      { type: 'cards', bg: 'page', variant: 'value', head: '그럼에도 믿을 수 있습니다!', cards: [{ n: '01', t: '검증된 공장', d: '동결건조 제품·쿠키 제조를 함께 하는 공장' }, { n: '02', t: '까다로운 선정', d: '원하는 결과를 얻기까지 공장 방문' }, { n: '03', t: '직접 확인', d: '식자재·맛·품질 꼼꼼히 점검' }] },
      { type: 'iconGrid', bg: 'light2', label: '맛있는 설화쫀득쿠키의 3박자', head: '완벽조화', cols: 3, items: [{ t: '쫀득함' }, { t: '고소한 버터향' }, { t: '바삭함' }] },
      { type: 'feature', bg: 'page', label: '편리하고 위생적인', head: '개별포장', body: '개당 깔끔한 개별포장으로 한 통에 평균 7~10개가 들어있습니다. 위생적이고 휴대도 간편해요.', image: '개별포장 사진' },
      { type: 'swatches', bg: 'light', label: '골라 먹는 다양한 맛의 재미', head: '6가지 디저트', items: [{ name: '딸기쫀득', c: '#e88aa0' }, { name: '딸기초코', c: '#b06a5a' }, { name: '흑임자', c: '#4a4a4a' }, { name: '말차무화과', c: '#8aa86a' }, { name: '인절미', c: '#c9a96a' }, { name: '땅콩누가바', c: '#caa060' }] },
      { type: 'image', bg: 'page', cols: ['설화 쫀득 쿠키 딸기', '말차무화과', '인절미'], h: 200, caption: '골라 먹는 다양한 맛' },
      { type: 'spec', bg: 'light2', label: 'PRODUCT INFO', title: '제품 정보', rows: [['구성', '쫀득 쿠키 (맛 선택)'], ['포장', '개별포장 (통당 7~10개)'], ['보관', '직사광선을 피해 실온 보관'], ['제조', '수제 제작']] },
    ],
  },
];
