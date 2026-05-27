/**
 * OpenAI 텍스트 LLM 래퍼 — 에이전트 로직의 런타임 두뇌.
 * 키는 .env 의 OPENAI_API_KEY. 모델은 OPENAI_TEXT_MODEL(기본 gpt-4o-mini).
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import OpenAI from 'openai';

let _client: OpenAI | null = null;
function client(): OpenAI {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _client;
}

export const TEXT_MODEL = process.env.OPENAI_TEXT_MODEL ?? 'gpt-4o-mini';

/** system+user 프롬프트로 JSON 객체를 생성(JSON 모드). */
export async function genJSON(system: string, user: string, model = TEXT_MODEL): Promise<any> {
  const r = await client().chat.completions.create({
    model,
    temperature: 0.75,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });
  const txt = r.choices[0]?.message?.content ?? '{}';
  return JSON.parse(txt);
}
