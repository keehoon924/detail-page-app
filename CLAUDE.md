# 상세페이지 13컷 이미지 생성 — 에이전트 팀

이 저장소는 한국형 **상세페이지(세로 13컷 PNG)** 를 자동 생성하는 Claude Code 에이전트 팀이다.

## 목표 산출물
- `output/01.png … 13.png` — 세로로 이어 붙이는 상세페이지 13컷
- 캔버스 폭 **860px** (세로 가변), 한글 폰트 **Pretendard**

## 렌더링 방식 (하이브리드 — 매우 중요)
이미지 모델은 한글 텍스트를 정확히 못 그린다. 그래서:
1. **OpenAI gpt-image-1** → 섹션 **배경/비주얼만** 생성 (텍스트 없음, 분위기·구도만)
2. **React/HTML 템플릿 + Playwright** → 한글 카피를 배경 위에 **코드로 합성**
3. Playwright 스크린샷 → `output/NN.png`

> 카피 텍스트는 절대 생성 이미지에 넣지 않는다. 항상 코드(템플릿)로 올린다.

## 파이프라인 (5 에이전트, 순차)
| 단계 | 에이전트 | 입력 | 출력 |
|------|---------|------|------|
| 1 | `info-collector` (정보수집) | `inputs/` | `pipeline/01-product.json` |
| 2 | `researcher` (리서치) | 01 | `pipeline/02-research.json` |
| 3 | `copywriter` (카피) | 01,02 | `pipeline/03-copy.json` |
| 4 | `designer` (디자인) | 01,02,03 | `pipeline/04-design.json` |
| 5 | `image-prompter` (프롬프팅/개발) | 03,04 | `pipeline/05-render-spec.json` + `templates/` → `output/*.png` |

## 핸드오프 규칙
- 각 에이전트는 **이전 단계의 `pipeline/*.json`을 읽고**, **자기 산출물만** 쓴다.
- 데이터 형식(계약)은 `src/core/schemas.ts`(Zod, 단일 진실원천)와 `detail-page-schema` 스킬을 따른다.
- 컨텍스트가 격리되므로 대화로 데이터를 넘기지 말고 **항상 파일로** 주고받는다.

## 오케스트레이션
- **서브에이전트는 다른 서브에이전트를 호출할 수 없다.** 순서 제어는 항상 메인 세션(팀 리드)이 한다.
- 기본은 **순차 체이닝**. 13컷 배경 생성처럼 병렬이 유리할 때만 Agent Teams 옵션 사용.
- 각 단계 사이에 JSON 스키마 검증 + (선택) 사용자 검토 게이트.

## 렌더 스크립트 (src/)
- `generate-bg.ts` — `05-render-spec.json`의 배경 프롬프트로 OpenAI 배경 PNG 생성 → `assets/bg-NN.png`
- `compose.ts` — 배경 + 템플릿 → Playwright 합성 → `output/NN.png`
- `render.ts` — 위 둘을 13컷 전체에 실행 (병렬 배치)
- 모델/키: `.env` (`OPENAI_API_KEY`, `OPENAI_IMAGE_MODEL`)

## 표준 13컷 구성 (조정 가능)
01 인트로/후킹 · 02 핵심가치 · 03 타겟공감 · 04 브랜드소개 · 05~07 핵심특징①②③ · 08 사용법 · 09 디테일컷 · 10 스펙 · 11 신뢰/후기 · 12 배송안내 · 13 CTA
