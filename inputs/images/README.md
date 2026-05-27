# 실제 이미지 넣는 곳

상세페이지에 들어갈 **실제 제품 사진**을 여기에 제품별 폴더로 넣습니다.

```
inputs/images/
  두브로-그래놀라/
    01-hero.jpg
    02-bowl.jpg
    03-detail.jpg
    ...
```

## 스펙에서 쓰는 법 (src 경로만 지정하면 끝)

```ts
// 풀블리드 배경 + 글자 가독성 스크림
p.bgimage(420, 'inputs/images/두브로-그래놀라/01-hero.jpg', { overlay:'#000', overlayOpacity:0.15 });
p.grad(420, '#000', '#000', { y, fromA:0, toA:0.6 });   // 위 투명 → 아래 어둡게
p.atext(64, y+300, p.cw(), '브랜드 카피', 30, { weight:800, color:'#fff', align:'center' });

// 슬롯에 사진 재배치 (크롭 cover, 초점 지정 가능)
p.photo(280, '', { src:'inputs/images/두브로-그래놀라/02-bowl.jpg', focusY:0.4 });

// 원형 마스킹 + 어둡게 오버레이
p.aphoto(x, y, 180, 180, '', { src:'.../03.jpg', shape:'circle', overlay:'#000', overlayOpacity:0.3 });
```

- `src` 없으면 기존처럼 **회색 placeholder + 라벨**로 렌더 (사진 받기 전 단계).
- 빌드(`npx tsx src/templates/build.ts --png`) 시 이미지를 자동으로 base64 임베드 → **Figma 플러그인·HTML 프리뷰 양쪽**에 동일하게 들어감.
- 지원: jpg/png/webp/gif. `fit:'cover'`(기본, 잘라 꽉) / `'contain'`(전체 보이게). `focusX/Y` 0~1 크롭 초점.
