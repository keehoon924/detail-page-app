import { NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { run } from '../_run';

export const runtime = 'nodejs';
export const maxDuration = 300;

/**
 * 새 엔진: 폼(자유설명+프롬프트+컷수+이미지) → AI 계획 → 섹션 조립 → HTML+PNG+Figma code.js.
 * 번들링 회피 위해 tsx CLI(generate-web.ts)를 자식프로세스로 실행.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mock = body.mock === true;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    await mkdir('.tmp', { recursive: true });
    const formFile = path.join('.tmp', `form-${id}.json`);
    const resultFile = path.join('.tmp', `result-${id}.json`);
    await writeFile(formFile, JSON.stringify({
      id,
      productName: body.productName ?? '',
      category: body.category ?? '기타',
      description: body.description ?? '',
      prompt: body.prompt ?? '',
      cutCount: Number(body.cutCount) || 5,
      brandColor: body.brandColor || undefined,
      images: Array.isArray(body.images) ? body.images : [],
    }));

    await run(['src/templates/generate-web.ts', formFile, resultFile], { MOCK_LLM: mock ? '1' : '0' });

    const result = JSON.parse(await readFile(resultFile, 'utf8'));
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
