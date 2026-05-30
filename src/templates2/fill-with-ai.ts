/**
 * Template2 의 빈 이미지 슬롯을 AI 생성으로 채운다 (병렬).
 * - src 가 비어있고 aiPrompt 가 있는 ImageRef 만 대상
 * - 결과는 data URI 로 src 에 박아 PNG 변환·전송이 안전
 * - 캐시(ai-image)가 같은 프롬프트 재호출 방지
 */
import type { Template2, ImageRef, ImageInput } from './engine.ts';
import { generateImage, bufferToDataURI } from './ai-image.ts';

interface Slot { ref: ImageRef; describe: string; }

function pickRef(img: ImageInput | undefined): ImageRef | null {
  if (!img || typeof img === 'string') return null;
  if (img.src || !img.aiPrompt) return null;
  return img;
}

function collectSlots(tpl: Template2): Slot[] {
  const out: Slot[] = [];
  tpl.sections.forEach((s: any, i: number) => {
    if (s.type === 'hero' || s.type === 'feature' || s.type === 'cta' || s.type === 'stat') {
      const r = pickRef(s.image); if (r) out.push({ ref: r, describe: `${i}:${s.type}` });
    }
    if (s.type === 'image') {
      const r = pickRef(s.label); if (r) out.push({ ref: r, describe: `${i}:image` });
    }
    if (s.type === 'steps' && Array.isArray(s.steps)) {
      s.steps.forEach((st: any, j: number) => {
        const r = pickRef(st.image); if (r) out.push({ ref: r, describe: `${i}:step:${j}` });
      });
    }
    if (s.type === 'mediaRow' && Array.isArray(s.items)) {
      s.items.forEach((it: any, j: number) => {
        const r = pickRef(it.image); if (r) out.push({ ref: r, describe: `${i}:mediaRow:${j}` });
      });
    }
  });
  return out;
}

export interface FillResult { total: number; filled: number; failed: number; cachedHits: number; }

export async function fillWithAI(
  tpl: Template2,
  opts: { concurrency?: number; onProgress?: (done: number, total: number, key: string) => void } = {},
): Promise<FillResult> {
  const slots = collectSlots(tpl);
  const total = slots.length;
  if (!total) return { total: 0, filled: 0, failed: 0, cachedHits: 0 };
  const concurrency = Math.max(1, Math.min(opts.concurrency ?? 4, 8));

  let cursor = 0; let done = 0; let failed = 0; let cachedHits = 0;
  async function worker() {
    while (cursor < slots.length) {
      const idx = cursor++;
      const { ref, describe } = slots[idx];
      const t0 = Date.now();
      try {
        const buf = await generateImage(ref.aiPrompt!, { size: ref.aiSize, quality: 'high' });
        ref.src = bufferToDataURI(buf, 'image/png');
        if (Date.now() - t0 < 800) cachedHits++; // 캐시 히트 추정 (실제 API는 수 초 이상 걸림)
      } catch (e: any) {
        failed++;
        console.error(`⚠ AI 슬롯 실패 ${describe}: ${e?.message ?? e}`);
      }
      done++;
      opts.onProgress?.(done, total, describe);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return { total, filled: total - failed, failed, cachedHits };
}
