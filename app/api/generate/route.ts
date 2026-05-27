import { NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { run } from '../_run';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mock = body.mock === true;
    delete body.mock; // 폼 데이터에서 제외
    const form = body;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    await mkdir('.tmp', { recursive: true });
    const formFile = path.join('.tmp', `form-${id}.json`);
    const specFile = path.join('.tmp', `spec-${id}.json`);
    const outDir = path.join('public', 'generated', id);
    await writeFile(formFile, JSON.stringify(form));

    await run(['src/generate.ts', formFile, specFile], { MOCK_LLM: mock ? '1' : '0' });
    await run(['src/render.ts'], { SPEC_FILE: specFile, RENDER_OUT: outDir });

    const spec = JSON.parse(await readFile(specFile, 'utf8'));
    const images = spec.sections.map((s: any) => `/generated/${id}/${path.basename(s.outFile)}`);
    return NextResponse.json({
      id,
      sections: spec.sections,
      images,
      fullPage: `/generated/${id}/full-page.png`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
