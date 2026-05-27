/**
 * #3 제품 누끼 — 배경 자동 제거 (@imgly/background-removal-node, 로컬).
 * 실패 시 false 반환(원본 사용 폴백).
 */
import { removeBackground } from '@imgly/background-removal-node';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function cutout(inputPath: string, outPath: string): Promise<boolean> {
  try {
    const blob: any = await removeBackground(inputPath);
    const buf = Buffer.from(await blob.arrayBuffer());
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, buf);
    return true;
  } catch (e) {
    console.error('누끼 실패:', (e as Error)?.message ?? e);
    return false;
  }
}
