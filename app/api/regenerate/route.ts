import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { run } from '../_run';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { id, index, mock } = await req.json();
    const formFile = path.join('.tmp', `form-${id}.json`);
    const specFile = path.join('.tmp', `spec-${id}.json`);
    const outDir = path.join('public', 'generated', id);

    await run(['src/regen.ts', formFile, specFile, String(index)], { MOCK_LLM: mock ? '1' : '0' });
    await run(['src/render.ts', `--only=${index + 1}`], { SPEC_FILE: specFile, RENDER_OUT: outDir });

    const spec = JSON.parse(await readFile(specFile, 'utf8'));
    const cut = spec.sections[index];
    const url = `/generated/${id}/${path.basename(cut.outFile)}?t=${Date.now()}`;
    return NextResponse.json({ index, cut, image: url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
