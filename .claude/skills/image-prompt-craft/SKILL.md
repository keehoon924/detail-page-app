---
name: image-prompt-craft
description: OpenAI(gpt-image-1) 배경 이미지 프롬프트 작성 규칙. 한국어 디자인 컨셉을 영문 이미지 프롬프트로 변환, 글자 금지·세로구도·텍스트 여백 확보. 프롬프팅 에이전트가 RenderSpec 의 backgroundPrompt 작성 시 사용.
---

# 배경 이미지 프롬프트 작성 규칙

배경은 **텍스트가 올라갈 캔버스**다. 한글 카피는 코드로 합성하므로, 이미지에는 **글자가 없어야** 한다.

## 필수 규칙
1. **영문으로 작성.** 이미지 모델은 영문 프롬프트에서 더 정확하다.
2. **글자 금지 문구를 끝에 반드시 포함:** `Absolutely no text, no letters, no numbers, no logos, no watermark.`
3. **세로 구도:** `Vertical portrait composition` (캔버스 1024x1536).
4. **텍스트 여백 확보:** 카피가 들어갈 영역(textZone)에 맞춰 그쪽을 비운다.
   - top zone → "generous empty space in the top half"
   - bottom zone → "empty space at the bottom"
   - center zone → "subject off to one side, open center"

## 좋은 프롬프트 구성요소
- 피사체/장면 (제품, 디테일, 무드)
- 배경/색/조명 (palette·mood 반영)
- 구도/여백 (textZone)
- 스타일 (e.g., premium commercial product photography, cinematic, minimalist)

## 변환 예시
- 디자인 컨셉(한): "딥 네이비-틸 그라데이션, 하단 중앙 제품, 상단 절반 여백, 상단 광원"
- 배경 프롬프트(영): `Premium product photography of a sleek cylindrical white-silver car air purifier in the lower-center on a subtle reflective surface, deep navy-to-teal gradient studio background, soft volumetric glow from the top, generous empty space in the top half, vertical portrait, minimalist, cinematic. Absolutely no text, no letters, no numbers, no logos, no watermark.`

## 하지 말 것
- 카피 문구·슬로건·가격을 프롬프트에 넣기 (→ 이미지에 글자가 생김)
- 특정 실제 브랜드/로고 요청
- 텍스트 영역까지 피사체로 꽉 채우기 (→ 합성 시 가독성 저하)
