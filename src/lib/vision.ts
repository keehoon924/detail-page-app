/**
 * #2 비전 기반 사진 분류 — OpenAI 비전(gpt-4o-mini). AI 생성 아님(분석만).
 * 전체샷/클로즈업/사용장면/패키지/인증서/기타 로 분류해 섹션 매칭에 사용.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import OpenAI from 'openai';
import { readFile } from 'node:fs/promises';

let _c: OpenAI | null = null;
const client = () => (_c ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));
const MODEL = process.env.OPENAI_VISION_MODEL ?? 'gpt-4o-mini';

export type PhotoType = '전체샷' | '클로즈업' | '사용장면' | '패키지' | '인증서' | '기타';

export async function classifyPhoto(path: string): Promise<{ type: PhotoType; desc: string }> {
  try {
    const b = await readFile(path);
    const url = `data:image/png;base64,${b.toString('base64')}`;
    const r = await client().chat.completions.create({
      model: MODEL,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: '제품 상세페이지용 사진 분류기. 오직 JSON {"type":"전체샷|클로즈업|사용장면|패키지|인증서|기타","desc":"한 줄 설명"} 만 출력.' },
        { role: 'user', content: [
          { type: 'text', text: '이 사진을 분류해줘.' },
          { type: 'image_url', image_url: { url } } as any,
        ] },
      ],
    });
    return JSON.parse(r.choices[0]?.message?.content ?? '{}');
  } catch (e) {
    return { type: '기타', desc: (e as Error)?.message ?? '' };
  }
}

/** 분류 → 섹션 역할 우선순위. */
export const TYPE_TO_ROLE: Record<PhotoType, string> = {
  '전체샷': 'hero',
  '클로즈업': 'feature',
  '사용장면': 'scenario',
  '패키지': 'gallery',
  '인증서': 'trust',
  '기타': 'gallery',
};
