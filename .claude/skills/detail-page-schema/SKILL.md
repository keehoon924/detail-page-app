---
name: detail-page-schema
description: 상세페이지 13컷 파이프라인의 단계별 데이터 계약(ProductData, ResearchReport, CopyDeck, DesignSpec, RenderSpec)과 pipeline/*.json 핸드오프 규칙. 정보수집·리서치·카피·디자인·프롬프팅 에이전트가 JSON을 읽고 쓸 때 형식의 단일 진실원천.
---

# 상세페이지 데이터 계약

모든 단계는 `pipeline/*.json` 파일로 데이터를 주고받는다. **Zod 단일 진실원천은 `src/core/schemas.ts`** 이며, 아래는 그 요약이다. 형식이 모호하면 `src/core/schemas.ts`를 직접 읽어 확인할 것.

## 핸드오프 규칙
- 각 에이전트는 **이전 단계 파일을 읽고**, **자기 단계 파일만** 쓴다.
- 출력은 **유효한 JSON만** (주석·마크다운 펜스 없이). 스키마에 정의된 키만 사용.
- 섹션 배열은 항상 **13개**, `STANDARD_SECTIONS` 순서(`s01-hero` … `s13-cta`)를 따른다.

## 단계별 파일

| 파일 | 작성 에이전트 | 타입 |
|------|--------------|------|
| `pipeline/01-product.json` | 정보수집 | `ProductData` |
| `pipeline/02-research.json` | 리서치 | `ResearchReport` |
| `pipeline/03-copy.json` | 카피 | `CopyDeck` |
| `pipeline/04-design.json` | 디자인 | `DesignSpec` |
| `pipeline/05-render-spec.json` | 프롬프팅 | `RenderSpec` |

## 핵심 형태 (요약)

- **ProductData**: `{ name, category, features[], specs[{label,value}], materials[], useCases[], imageNotes[] }`
- **ResearchReport**: `{ targetPersona{description,painPoints[]}, competitors[{name,positioning,weakness}], differentiators[], seoKeywords[], marketInsights[] }`
- **CopyDeck**: `{ tone, sections[{ id, role, headline, subcopy, body, bullets[] }] }` (13개)
- **DesignSpec**: `{ mood, palette{primary,secondary,background,text}, typography{headingFont,bodyFont}, canvasWidth, sections[{ id, layout, backgroundConcept, textZones[{area,align,maxWidthPct}], emphasis }] }` (13개)
- **RenderSpec**: `{ canvasWidth, font, imageModel, sections[{ id, index, backgroundPrompt, backgroundFile, template, text{headline,subcopy,body,bullets[]}, style{}, outFile }] }` (13개)

## 하이브리드 렌더 원칙 (프롬프팅 단계에서 필수)
- `backgroundPrompt`에는 **글자/텍스트/로고를 절대 요청하지 않는다** (예: "no text, no letters"). 비주얼·구도·분위기만.
- 한글 카피는 `text` 필드로 분리되어 템플릿이 코드로 합성한다.
- `backgroundFile`은 `assets/bg-NN.png`, `outFile`은 `output/NN.png` 규칙을 따른다.
