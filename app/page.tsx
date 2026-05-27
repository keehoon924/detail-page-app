'use client';
import { useState } from 'react';

type Img = { path: string; url: string };
const CATEGORIES = ['식품', '전자기기', '패션', '유아', '반려동물', '기타'];

async function uploadFile(file: File): Promise<Img> {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!r.ok) throw new Error('업로드 실패');
  return r.json();
}

type Result = {
  id: string; htmlUrl: string; pngUrl: string | null; codeUrl: string;
  height: number; cuts: number; cutTypes: string[]; planSource: 'ai' | 'fallback'; note: string | null;
};

export default function Page() {
  const [category, setCategory] = useState('식품');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [cutCount, setCutCount] = useState('5');
  const [brandColor, setBrandColor] = useState('');
  const [images, setImages] = useState<Img[]>([]);
  const [mock, setMock] = useState(false);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [bust, setBust] = useState(0); // iframe 캐시 버스터(실시간 갱신)

  const canSubmit = description.trim().length > 5 && !busy;

  async function onImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 12);
    try { const ups = await Promise.all(files.map(uploadFile)); setImages((s) => [...s, ...ups].slice(0, 12)); }
    catch (x: any) { setErr(x.message); }
  }

  async function submit() {
    setErr(''); setBusy(true);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          productName, category, description, prompt,
          cutCount: Number(cutCount) || 5, brandColor: brandColor || undefined,
          images: images.map((i) => i.path), mock,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || '생성 실패');
      setResult(data); setBust(Date.now());
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  }

  function fillDemo() {
    setCategory('전자기기');
    setProductName('AirPure X 차량용 공기청정기');
    setDescription('H13 헤파 3단 필터의 한 손 크기 무선 차량용 공기청정기. USB-C 무선 충전, 완충 8시간. 60dB 이하 저소음. 공기질 LED 실시간 표시. 컵홀더에 쏙 들어가는 크기. KC 인증, 국내 A/S 1년 보장. 정가 89,000원 → 64,000원.');
    setPrompt('신뢰감 있고 깔끔한 톤으로. 미세먼지 정화력과 무선·저소음 편의성을 강조. 마지막에 구매 유도 CTA 포함.');
    setCutCount('7'); setBrandColor('#2563eb');
  }

  return (
    <div className="wrap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <div className="title">상세페이지 생성기</div>
          <div className="sub">자유 설명 + 지시만 적으면 AI가 구성을 짜고 코드가 정확히 렌더합니다. 결과는 브라우저 미리보기 · PNG · Figma 모두 받을 수 있어요.</div>
        </div>
        <button className="btn-s" onClick={fillDemo}>🧪 데모 채우기</button>
      </div>

      <div className="grid2">
        {/* ─── 입력 ─── */}
        <div className="card">
          <label>카테고리 <span className="muted">(색·톤 참고)</span></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>

          <label>제품명 <span className="muted">(선택)</span></label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="예: 두브로 시그니처 그래놀라" />

          <label className="req">자유 설명란 — 여기에 전부 적으세요</label>
          <textarea style={{ minHeight: 180 }} value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="제품 특징·장점·가격·스펙·배송·후기 등 하고 싶은 말을 자유롭게. AI가 알아서 구성합니다." />

          <label>사용자 프롬프트 <span className="muted">(AI 지시 — 정확히 따릅니다)</span></label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder={'예: "3컷만 만들어줘. 메인 KV와 아래 섹션 2개까지만." / "고급스러운 톤, 비교 섹션 넣어줘"'} />

          <div className="row">
            <div>
              <label>컷 수 <span className="muted">(프롬프트가 우선)</span></label>
              <input type="number" min={1} max={15} value={cutCount} onChange={(e) => setCutCount(e.target.value)} />
            </div>
            <div>
              <label>브랜드 컬러 <span className="muted">(선택)</span></label>
              <input type="color" value={brandColor || '#2563eb'} onChange={(e) => setBrandColor(e.target.value)} style={{ height: 40, padding: 4 }} />
            </div>
          </div>

          <label>제품 사진 <span className="muted">(여러 장 · 순서대로 슬롯에 배치)</span></label>
          <input type="file" accept="image/*" multiple onChange={onImages} />
          {images.length > 0 && (
            <div className="thumbs">
              {images.map((s, i) => <img key={i} className="thumb" src={s.url} alt={`img${i}`} title={`#${i + 1}`} />)}
            </div>
          )}
          <div className="hint">사진을 안 올리면 회색 placeholder로 자리만 잡습니다. 올리면 그 순서대로 채워집니다.</div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 13, fontWeight: 600 }}>
            <input type="checkbox" checked={mock} onChange={(e) => setMock(e.target.checked)} style={{ width: 'auto' }} />
            무료 모드 (AI 미사용 · 규칙 기반, 비용 0)
          </label>
          <button className="btn" disabled={!canSubmit} onClick={submit}>
            {busy ? '생성 중…' : mock ? '🆓 무료 생성' : '✨ AI로 생성'}
          </button>
          {err && <div className="hint" style={{ color: '#e8467c', marginTop: 10 }}>⚠ {err}</div>}
        </div>

        {/* ─── 미리보기 ─── */}
        <div>
          {!result && !busy && <div className="card empty">왼쪽에 자유 설명을 적고 “생성”을 누르면<br />여기 상세페이지가 바로 나타납니다.</div>}
          {busy && <div className="card empty busy">AI가 구성을 짜고 코드가 렌더하는 중…</div>}
          {result && (
            <div className="card" style={{ padding: 14 }}>
              <div className="bar" style={{ marginBottom: 10 }}>
                <span>
                  {result.cuts}컷 · {result.planSource === 'ai' ? '🤖 AI 구성' : '⚙️ 규칙 기반'} · {result.height}px
                </span>
                <span style={{ display: 'flex', gap: 8 }}>
                  {result.pngUrl && <a className="btn-s" href={result.pngUrl} download={`detail-${result.id}.png`}>PNG 저장</a>}
                  <a className="btn-s" href={result.htmlUrl} target="_blank" rel="noreferrer">새 탭</a>
                </span>
              </div>
              <div className="hint" style={{ marginBottom: 8 }}>
                구성: {result.cutTypes.join(' · ')}
                {result.note && <><br />ℹ {result.note}</>}
              </div>
              <iframe key={bust} src={`${result.htmlUrl}?t=${bust}`} className="frame" title="preview" />
              <div className="hint" style={{ marginTop: 10 }}>
                🎨 Figma: <code>figma-generated/</code> 가 방금 이 디자인으로 갱신됐습니다. Figma에서 해당 플러그인(생성본)을 다시 실행하면 반영됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
