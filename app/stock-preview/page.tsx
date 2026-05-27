import { readdir } from 'node:fs/promises';

export const dynamic = 'force-dynamic';

export default async function StockPreview() {
  let files: string[] = [];
  try {
    files = (await readdir('public/stock-preview'))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort();
  } catch {}

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', fontFamily: "'Pretendard',-apple-system,'Malgun Gothic',sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>스톡 후보 — 한국인/동양인 여성 · 스킨케어</h1>
      <p style={{ color: '#667', marginTop: 6 }}>
        전부 <b>실제 촬영 사진</b>(Pexels)입니다. 마음에 드는 번호를 알려주시면 그 이미지를 페이지에 사용합니다.
        {files.length === 0 && ' (아직 받은 이미지가 없습니다)'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 20 }}>
        {files.map((f, i) => (
          <div key={f} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
            <img src={`/stock-preview/${f}`} alt={f} style={{ width: '100%', display: 'block', aspectRatio: '3/4', objectFit: 'cover' }} />
            <div style={{ padding: '8px 12px', fontSize: 14, fontWeight: 700 }}>#{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
