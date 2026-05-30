/**
 * AI 이미지 생성 — OpenAI gpt-image-1.
 * 같은 (prompt + size + quality) 조합은 디스크 캐시(assets/ai/&lt;hash&gt;.png)에서 즉시 반환.
 *
 * gpt-image-1 은 항상 b64_json 으로 응답한다(response_format 옵션 없음).
 * 텍스트(글자)는 모델이 자주 깨므로 모든 프롬프트에 "no text, no letters" 강제 필요.
 */
import 'dotenv/config';
import OpenAI from 'openai';
import { createHash } from 'node:crypto';
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const CACHE_DIR = 'assets/ai';

export type AISize = '1024x1024' | '1024x1536' | '1536x1024';
export type AIQuality = 'low' | 'medium' | 'high' | 'auto';

export interface AIGenOpts {
  size?: AISize;       // 기본 1024x1024
  quality?: AIQuality; // 기본 high
}

let _client: OpenAI | null = null;
function client(): OpenAI {
  if (_client) return _client;
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY 없음 — .env 확인');
  _client = new OpenAI({ apiKey: key });
  return _client;
}

/** 프롬프트 → PNG Buffer. 캐시 우선. */
export async function generateImage(prompt: string, opts: AIGenOpts = {}): Promise<Buffer> {
  const size = opts.size ?? '1024x1024';
  const quality = opts.quality ?? 'high';
  await mkdir(CACHE_DIR, { recursive: true });
  const hash = createHash('sha1').update(`${prompt}|${size}|${quality}`).digest('hex').slice(0, 20);
  const path = resolve(CACHE_DIR, `${hash}.png`);
  try { await access(path); return await readFile(path); } catch { /* not cached, generate */ }

  const model = process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-1';
  const res: any = await client().images.generate({ model, prompt, size, n: 1, quality } as any);
  const b64 = res?.data?.[0]?.b64_json;
  if (!b64) throw new Error('AI 이미지 생성 실패 (b64_json 없음): ' + JSON.stringify(res).slice(0, 300));
  const buf = Buffer.from(b64, 'base64');
  await writeFile(path, buf);
  return buf;
}

export function bufferToDataURI(buf: Buffer, mime = 'image/png'): string {
  return `data:${mime};base64,${buf.toString('base64')}`;
}
