import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';

export const runtime = 'nodejs';

/** 카테고리별 스타일 옵션 메타데이터 제공 (폼 미리보기용). */
export async function GET() {
  try {
    const tpl = JSON.parse(await readFile('src/styles/templates.json', 'utf8'));
    return NextResponse.json({ styles: tpl.styles, formCategories: tpl.formCategories });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
