'use client';
import { useState } from 'react';

type Img = { path: string; url: string };

/** UI 표시용 시안(ref) 목록 — recommend-ref.ts 의 REFS 와 동기화. */
const REFS: { id: string; name: string }[] = [
  { id: 'auto', name: '🪄 자동 추천 (자유 설명 분석)' },
  { id: 'ref-01', name: '시안 1 — 미니멀 베이지 (모자/잡화)' },
  { id: 'ref-02', name: '시안 2 — 소프트 화이트 (스카프/헤어액세서리)' },
  { id: 'ref-03', name: '시안 3 — 비비드 푸드 다크 (농산물/간식)' },
  { id: 'ref-04', name: '시안 4 — 럭셔리 다크 (기능성 화장품/뷰티)' },
  { id: 'ref-05', name: '시안 5 — 에디토리얼 모노 (의류/패션)' },
  { id: 'ref-06', name: '시안 6 — 클린 아쿠아 (텀블러/물병)' },
  { id: 'ref-07', name: '시안 7 — 파스텔 멀티 (텀블러/리빙)' },
  { id: 'ref-08', name: '시안 8 — 다크 그린 럭셔리 (식물/리빙 가전)' },
  { id: 'ref-09', name: '시안 9 — 테크 다이내믹 (선풍기/전자)' },
  { id: 'ref-olive', name: '시안 10 — 내추럴 프리미엄 (프리미엄 식품/선물)' },
];

async function uploadFile(file: File): Promise<Img> {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!r.ok) throw new Error('업로드 실패');
  return r.json();
}

type Result = {
  id: string; htmlUrl: string; pngUrl: string | null;
  height: number; cuts: number; cutTypes: string[];
  ref: { id: string; description: string; category: string; source: 'auto' | 'manual' };
  planSource: 'ai' | 'fallback'; note: string | null;
};

export default function Page() {
  const [refSel, setRefSel] = useState('auto');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [cutCount, setCutCount] = useState('13');
  const [brandColor, setBrandColor] = useState('');
  const [images, setImages] = useState<Img[]>([]);
  const [mock, setMock] = useState(false);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [bust, setBust] = useState(0);

  const canSubmit = description.trim().length > 5 && !busy;

  async function onImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 20);
    try { const ups = await Promise.all(files.map(uploadFile)); setImages((s) => [...s, ...ups].slice(0, 20)); }
    catch (x: any) { setErr(x.message); }
  }

  async function submit() {
    setErr(''); setBusy(true);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          productName, description, prompt,
          cutCount: Number(cutCount) || 13,
          brandColor: brandColor || undefined,
          ref: refSel,
          images: images.map((i) => i.path),
          mock,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || '생성 실패');
      setResult(data); setBust(Date.now());
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  }

  function fillDemo() {
    setRefSel('auto');
    setProductName('두브로 시그니처 그래놀라');
    setDescription('강원도 청정 지역에서 자란 국산 통귀리 100%로 만든 수제 그래놀라. 매일 아침 소량씩 직접 로스팅. 인공첨가물 없음. 비정제원당으로 자연스러운 단맛. 우유나 요거트에 부어 3분이면 든든한 아침 완성. 평점 4.9, 누적 판매 5만봉. 견과류·건과일 함유. 300g 한 봉.');
    setPrompt('따뜻하고 친근한 톤. 건강한 아침의 장면을 그려주세요.');
    setCutCount('15'); setBrandColor('');
  }

  return (
    <div className="wrap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <div className="title">상세페이지 생성기 v4</div>
          <div className="sub">시안(ref) 레이아웃을 그대로 따라가고, 카피만 사장님 제품으로 교체합니다. 사장님 카피 가이드(7무기) 자동 적용.</div>
        </div>
        <button className="btn-s" onClick={fillDemo}>🧪 데모 채우기</button>
      </div>

      <div className="grid2">
        {/* ─── 입력 ─── */}
        <div className="card">
          <label>시안 선택 <span className="muted">(자동 추천 권장)</span></label>
          <select value={refSel} onChange={(e) => setRefSel(e.target.value)}>
            {REFS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>

          <label>제품명 <span className="muted">(선택)</span></label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="예: 두브로 시그니처 그래놀라" />

          <label className="req">자유 설명란 — 여기에 전부 적으세요</label>
          <textarea style={{ minHeight: 180 }} value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="제품 특징·장점·스펙·배송·후기 등 하고 싶은 말을 자유롭게. AI가 카피를 짜고 시안도 자동 추천합니다." />

          <label>사용자 프롬프트 <span className="muted">(AI 지시 — 정확히 따릅니다)</span></label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder={'예: "고급스러운 톤, 비교 섹션 살려줘" / "감각적이고 친근하게"'} />

          <div className="row">
            <div>
              <label>컷 수</label>
              <input type="number" min={1} max={30} value={cutCount} onChange={(e) => setCutCount(e.target.value)} />
            </div>
            <div>
              <label>브랜드 컬러 <span className="muted">(선택, primary 오버라이드)</span></label>
              <input type="color" value={brandColor || '#2563eb'} onChange={(e) => setBrandColor(e.target.value)} style={{ height: 40, padding: 4 }} />
            </div>
          </div>

          <label>제품 사진 <span className="muted">(여러 장 — 순서대로 슬롯에 들어갑니다)</span></label>
          <input type="file" accept="image/*" multiple onChange={onImages} />
          {images.length > 0 && (
            <div className="thumbs">
              {images.map((s, i) => <img key={i} className="thumb" src={s.url} alt={`img${i}`} title={`#${i + 1}`} />)}
            </div>
          )}
          <div className="hint">사진은 hero · feature · image · mediaRow · cta 슬롯에 차례로 채워집니다. 남는 슬롯은 회색 placeholder.</div>

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
          {busy && <div className="card empty busy">AI가 카피를 짜고 시안 레이아웃에 입혀 렌더하는 중…</div>}
          {result && (
            <div className="card" style={{ padding: 14 }}>
              <div className="bar" style={{ marginBottom: 10 }}>
                <span>
                  🎨 <strong>{result.ref.id}</strong> <span className="muted">({result.ref.source === 'auto' ? '자동 추천' : '수동 선택'})</span>
                  {' · '}{result.cuts}컷 · {result.planSource === 'ai' ? '🤖 AI 카피' : '⚙️ 규칙 기반'} · {result.height}px
                </span>
                <span style={{ display: 'flex', gap: 8 }}>
                  {result.pngUrl && <a className="btn-s" href={result.pngUrl} download={`detail-${result.id}.png`}>PNG 저장</a>}
                  <a className="btn-s" href={result.htmlUrl} target="_blank" rel="noreferrer">새 탭</a>
                </span>
              </div>
              <div className="hint" style={{ marginBottom: 8 }}>
                시안: {result.ref.description}<br />
                구성: {result.cutTypes.join(' · ')}
                {result.note && <><br />ℹ {result.note}</>}
              </div>
              <iframe key={bust} src={`${result.htmlUrl}?t=${bust}`} className="frame" title="preview" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
