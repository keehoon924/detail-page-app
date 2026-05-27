import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const file = fd.get('file') as File | null;
    if (!file) return NextResponse.json({ error: '파일 없음' }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    const safe = `${Date.now().toString(36)}-${(file.name || 'img').replace(/[^\w.\-]/g, '_')}`;
    await mkdir(path.join('public', 'uploads'), { recursive: true });
    const fp = path.join('public', 'uploads', safe);
    await writeFile(fp, buf);
    // path: 서버 파일 경로(렌더 입력) / url: 미리보기용
    return NextResponse.json({ path: `public/uploads/${safe}`, url: `/uploads/${safe}` });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
