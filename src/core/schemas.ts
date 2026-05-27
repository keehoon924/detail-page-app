/**
 * 에이전트 간 데이터 계약 (Zod 스키마) — 단일 진실원천(Single Source of Truth)
 *
 * 파이프라인:
 *   inputs/ → [1] ProductData → [2] ResearchReport → [3] CopyDeck
 *           → [4] DesignSpec → [5] RenderSpec → output/NN.png
 *
 * 렌더링은 하이브리드: OpenAI 배경(텍스트 없음) + 코드 텍스트 합성(Playwright).
 * 각 에이전트는 이전 산출물을 읽고 자기 산출물만 pipeline/*.json 으로 쓴다.
 */
import { z } from 'zod';

/* ───────── 캔버스 / 표준 13컷 ───────── */

export const CANVAS = { width: 860 } as const; // px, 세로 가변

export const STANDARD_SECTIONS = [
  { id: 's01-hero', role: '인트로/후킹 (메인 비주얼)' },
  { id: 's02-value', role: '핵심 가치 한 줄' },
  { id: 's03-empathy', role: '타겟 공감 (페인포인트)' },
  { id: 's04-brand', role: '브랜드·제품 소개' },
  { id: 's05-feature-1', role: '핵심 특징 ①' },
  { id: 's06-feature-2', role: '핵심 특징 ②' },
  { id: 's07-feature-3', role: '핵심 특징 ③' },
  { id: 's08-usage', role: '사용법/사용 시나리오' },
  { id: 's09-detail', role: '디테일 컷 (소재/마감)' },
  { id: 's10-spec', role: '스펙/사이즈' },
  { id: 's11-trust', role: '신뢰/후기/인증' },
  { id: 's12-shipping', role: '배송·교환 안내' },
  { id: 's13-cta', role: 'CTA/마무리' },
] as const;

export const SectionIdSchema = z.string().describe('섹션 식별자 (예: s01-hero)');

/* ───────── 사용자 입력 ───────── */

export const RawInputSchema = z.object({
  productName: z.string(),
  rawFeatures: z.string().describe('핵심 특징·설명 (자유 텍스트)'),
  specSheet: z.string().optional(),
  brandGuide: z.string().optional().describe('브랜드 톤&매너'),
  targetAudience: z.string().optional(),
  referenceImages: z.array(z.string()).default([]).describe('제품/레퍼런스 이미지 경로'),
});
export type RawInput = z.infer<typeof RawInputSchema>;

/* ───────── [1] 정보수집 → ProductData ───────── */

export const ProductDataSchema = z.object({
  name: z.string(),
  category: z.string(),
  features: z.array(z.string()),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  materials: z.array(z.string()).default([]),
  useCases: z.array(z.string()).default([]),
  imageNotes: z.array(z.string()).default([]).describe('레퍼런스 이미지 관찰 내용'),
});
export type ProductData = z.infer<typeof ProductDataSchema>;

/* ───────── [2] 리서치 → ResearchReport ───────── */

export const ResearchReportSchema = z.object({
  targetPersona: z.object({
    description: z.string(),
    painPoints: z.array(z.string()),
  }),
  competitors: z.array(
    z.object({ name: z.string(), positioning: z.string(), weakness: z.string() }),
  ),
  differentiators: z.array(z.string()),
  seoKeywords: z.array(z.string()),
  marketInsights: z.array(z.string()),
});
export type ResearchReport = z.infer<typeof ResearchReportSchema>;

/* ───────── [3] 카피 → CopyDeck (섹션별) ───────── */

export const CopySectionSchema = z.object({
  id: SectionIdSchema,
  role: z.string(),
  headline: z.string(),
  subcopy: z.string().default('').describe('보조 헤드라인'),
  body: z.string().default('').describe('바디 카피'),
  bullets: z.array(z.string()).default([]),
});

export const CopyDeckSchema = z.object({
  tone: z.string().describe('적용 톤&매너'),
  sections: z.array(CopySectionSchema).describe('13컷 섹션별 카피 (순서대로)'),
});
export type CopyDeck = z.infer<typeof CopyDeckSchema>;

/* ───────── [4] 디자인 → DesignSpec ───────── */

export const TextZoneSchema = z.object({
  area: z.enum(['top', 'center', 'bottom', 'left', 'right', 'full']),
  align: z.enum(['left', 'center', 'right']).default('center'),
  maxWidthPct: z.number().min(10).max(100).default(80),
});

export const DesignSectionSchema = z.object({
  id: SectionIdSchema,
  layout: z.enum([
    'hero', 'image-top', 'image-bottom', 'split-left', 'split-right',
    'full-bleed', 'grid', 'list', 'spec-table', 'cta',
  ]),
  backgroundConcept: z.string().describe('배경 생성용 컨셉 (텍스트 없는 비주얼)'),
  textZones: z.array(TextZoneSchema).describe('텍스트 세이프 영역'),
  emphasis: z.enum(['high', 'medium', 'low']),
});

export const DesignSpecSchema = z.object({
  mood: z.string(),
  palette: z.object({
    primary: z.string(), secondary: z.string(),
    background: z.string(), text: z.string(),
  }),
  typography: z.object({
    headingFont: z.string().default('Pretendard'),
    bodyFont: z.string().default('Pretendard'),
  }),
  canvasWidth: z.number().default(CANVAS.width),
  sections: z.array(DesignSectionSchema).describe('13컷 섹션별 디자인 (순서대로)'),
});
export type DesignSpec = z.infer<typeof DesignSpecSchema>;

/* ───────── [5] 프롬프팅 → RenderSpec (렌더 파이프라인 입력) ───────── */

// v2 — 컴포넌트 레이아웃 엔진(layout-v2.ts) 입력. 컷마다 역할에 맞는 리치 구조.
export const CutLayoutEnum = z.enum([
  'hero', 'feature-split', 'columns', 'comparison',
  'review', 'faq', 'steps', 'centered', 'gif', 'cta', 'scene',
]);

export const CutSpecSchema = z.object({
  id: SectionIdSchema,
  layout: CutLayoutEnum,
  bg: z.string().describe('섹션 배경색 hex (배경색 전환 흐름)'),
  next: z.string().optional().describe('다음 섹션 배경색 (divider 채움)'),
  divider: z.enum(['wave', 'diagonal', 'none']).optional(),
  accent: z.string().describe('포인트 컬러 hex'),
  badge: z.object({ text: z.string(), kind: z.enum(['pill', 'number', 'check']).optional() }).optional(),
  handwrite: z.string().optional().describe('손글씨 악센트'),
  headline: z.string().optional(),
  subcopy: z.string().optional(),
  body: z.string().optional(),
  bullets: z.array(z.string()).optional(),
  stat: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  columns: z.array(z.object({
    emoji: z.string().optional(), title: z.string(),
    caption: z.string().optional(), image: z.string().optional(),
    icon: z.string().optional().describe('Lucide 아이콘 이름'),
  })).optional(),
  reviews: z.array(z.object({ rating: z.number(), text: z.string(), user: z.string() })).optional(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  comparison: z.object({
    headers: z.array(z.string()),
    rows: z.array(z.object({ label: z.string(), cells: z.array(z.union([z.string(), z.boolean()])) })),
    highlightCol: z.number().int(),
  }).optional(),
  steps: z.array(z.object({ n: z.number().int(), title: z.string(), caption: z.string().optional() })).optional(),
  image: z.string().optional().describe('제품 사진 파일 경로(배경 아님, 합성 슬롯)'),
  imageRight: z.boolean().optional(),
  gifLabel: z.string().optional(),
  outFile: z.string().describe('최종 출력 경로 (예: output/01.png)'),
});
export type CutSpec = z.infer<typeof CutSpecSchema>;

export const RenderSpecSchema = z.object({
  canvasWidth: z.number().default(CANVAS.width),
  font: z.string().default('Pretendard'),
  logo: z.string().optional().describe('브랜드 로고 파일 경로'),
  sections: z.array(CutSpecSchema),
});
export type RenderSpec = z.infer<typeof RenderSpecSchema>;

/* ───────── 오케스트레이터 누적 상태 ───────── */

export const PipelineStateSchema = z.object({
  input: RawInputSchema,
  productData: ProductDataSchema.optional(),
  research: ResearchReportSchema.optional(),
  copy: CopyDeckSchema.optional(),
  design: DesignSpecSchema.optional(),
  renderSpec: RenderSpecSchema.optional(),
});
export type PipelineState = z.infer<typeof PipelineStateSchema>;

/* ───────── 웹 입력 폼 (FormInput) ───────── */

export const CategoryEnum = z.enum([
  '전자기기', '식품', '뷰티', '패션', '생활', '건강', '유아', '반려동물', '기타',
]);
export const BrandToneEnum = z.enum([
  '미니멀 프리미엄', '따뜻한 신뢰', '데이터 중심', '감성 내러티브', '자신감 직설',
]);
export const PlatformEnum = z.enum(['쿠팡', '네이버', '자사몰', '인스타']);

export const FormInputSchema = z.object({
  // 필수
  productName: z.string().min(1),
  category: CategoryEnum,
  priceRegular: z.number(),
  priceSale: z.number().optional(),
  oneLiner: z.string().min(1).describe('한 줄 소개'),
  mainImage: z.string().min(1).describe('메인 제품 사진 경로 (필수)'),
  subImages: z.array(z.string()).max(10).default([]).describe('추가 제품 사진 (최대 10)'),
  peopleImages: z.array(z.string()).max(10).default([]).describe('사람/모델 사진 (사용장면용, 업로드 우선)'),
  features3: z.array(z.string()).min(1).max(3).describe('핵심 특징 3가지'),
  // 사용자 직접 작성
  freeDescription: z.string().default('').describe('자유 설명란'),
  mustIncludePhrases: z.array(z.string()).default([]).describe('반드시 포함할 문구'),
  userPrompt: z.string().default('').describe('생성 전 AI 지시'),
  // 선택
  target: z.string().optional().describe('타겟 고객(연령/성별/라이프스타일)'),
  brandLogo: z.string().optional(),
  brandColor: z.string().optional().describe('브랜드 컬러 hex'),
  brandTone: BrandToneEnum.optional(),
  specs: z.string().optional().describe('상세 스펙(자유 입력)'),
  shipping: z.string().optional().describe('배송/교환/AS'),
  reviews: z.object({
    rating: z.number().optional(),
    count: z.number().optional(),
    quotes: z.array(z.string()).default([]),
  }).optional(),
  certifications: z.string().optional().describe('인증/수상'),
  promotion: z.string().optional().describe('프로모션/이벤트/쿠폰'),
  referenceImages: z.array(z.string()).default([]).describe('레퍼런스 이미지'),
  platform: PlatformEnum.optional(),
  cutCount: z.number().int().min(9).max(15).default(13),
  styleId: z.string().optional().describe('레퍼런스 학습 스타일 옵션 id (카테고리별)'),
});
export type FormInput = z.infer<typeof FormInputSchema>;
