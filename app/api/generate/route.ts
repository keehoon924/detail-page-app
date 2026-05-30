import { NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { run } from '../_run';

export const runtime = 'nodejs';
export const maxDuration = 300;

/**
 * v5 엔진 (B 방식 - AI sections 직접 생성):
 * 폼 → planSections (시안 ref 를 few-shot 으로 AI 에게 보여주고 sections JSON 직접 생성)
 *    → 사진 슬롯 매핑 → HTML+PNG.
 * 시안의 박스 구조·리듬 유지, 카피는 새 제품 맥락에서 자연스럽게 새로 작성.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    await mkdir('.tmp', { recursive: true });
    const formFile = path.join('.tmp', `form-${id}.json`);
    const resultFile = path.join('.tmp', `result-${id}.json`);
    await writeFile(formFile, JSON.stringify({
      id,
      productName: body.productName ?? '',
      category: body.category ?? undefined,
      description: body.description ?? '',
      prompt: body.prompt ?? '',
      cutCount: Number(body.cutCount) || 13,
      brandColor: body.brandColor || undefined,
      ref: body.ref ?? 'auto',
      images: Array.isArray(body.images) ? body.images : [],
    }));

    // B 방식은 AI 호출 필수 (mock 모드 폐기 — sections 생성은 AI 만 가능)
    await run(['src/templates2/generate-sections.ts', formFile, resultFile], {});

    const result = JSON.parse(await readFile(resultFile, 'utf8'));
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
