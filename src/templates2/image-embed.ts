/** 파일경로 → base64 data URI 임베드. HTML 안에 이미지를 그대로 박아 PNG 변환·이식이 안전하다. */
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp',
  '.gif': 'image/gif', '.svg': 'image/svg+xml',
};

export async function toDataURI(srcPath: string): Promise<string> {
  const abs = resolve(srcPath);
  const buf = await readFile(abs);
  const ext = extname(srcPath).toLowerCase();
  const mime = MIME[ext] ?? 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

/** 여러 경로를 일괄 임베드. 실패한 항목은 빈 문자열로(렌더 시 placeholder fallback). */
export async function embedImages(paths: string[]): Promise<string[]> {
  return Promise.all(paths.map(async (p) => {
    try { return await toDataURI(p); }
    catch { return ''; }
  }));
}
