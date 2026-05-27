'use client';
import { useState, useEffect } from 'react';

type Img = { path: string; url: string };
const CATEGORIES = ['전자기기', '식품', '뷰티', '패션', '생활', '건강', '유아', '반려동물', '기타'];
const TONES = ['미니멀 프리미엄', '따뜻한 신뢰', '데이터 중심', '감성 내러티브', '자신감 직설'];
const PLATFORMS = ['쿠팡', '네이버', '자사몰', '인스타'];

async function uploadFile(file: File): Promise<Img> {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!r.ok) throw new Error('업로드 실패');
  return r.json();
}

export default function Page() {
  // 필수
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('전자기기');
  const [priceRegular, setPriceRegular] = useState('');
  const [priceSale, setPriceSale] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [main, setMain] = useState<Img | null>(null);
  const [subs, setSubs] = useState<Img[]>([]);
  const [people, setPeople] = useState<Img[]>([]);
  const [features, setFeatures] = useState(['', '', '']);
  // 직접 작성
  const [freeDescription, setFreeDescription] = useState('');
  const [mustInclude, setMustInclude] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  // 선택
  const [target, setTarget] = useState('');
  const [brandColor, setBrandColor] = useState('#2563EB');
  const [brandTone, setBrandTone] = useState('');
  const [specs, setSpecs] = useState('');
  const [shipping, setShipping] = useState('');
  const [rvRating, setRvRating] = useState('');
  const [rvCount, setRvCount] = useState('');
  const [rvQuotes, setRvQuotes] = useState('');
  const [certifications, setCertifications] = useState('');
  const [promotion, setPromotion] = useState('');
  const [platform, setPlatform] = useState('');
  const [cutCount, setCutCount] = useState('13');
  const [styleId, setStyleId] = useState('');
  const [styleData, setStyleData] = useState<any>(null);

  const [mock, setMock] = useState(true);
  const [busy, setBusy] = useState(false);
  const [regen, setRegen] = useState<number | null>(null);
  const [err, setErr] = useState('');
  const [result, setResult] = useState<{ id: string; images: string[]; sections: any[] } | null>(null);

  useEffect(() => {
    fetch('/api/styles').then((r) => r.json()).then(setStyleData).catch(() => {});
  }, []);
  useEffect(() => {
    const opts: string[] = styleData?.formCategories?.[category] ?? [];
    if (opts.length && !opts.includes(styleId)) setStyleId(opts[0]);
  }, [category, styleData]);

  const canSubmit =
    productName && priceRegular && oneLiner && main && features.some((f) => f.trim()) && !busy;

  async function onMain(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setMain(await uploadFile(f));
  }
  async function onSubs(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 10);
    const ups = await Promise.all(files.map(uploadFile));
    setSubs((s) => [...s, ...ups].slice(0, 10));
  }
  async function onPeople(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 10);
    const ups = await Promise.all(files.map(uploadFile));
    setPeople((s) => [...s, ...ups].slice(0, 10));
  }

  async function submit() {
    setErr('');
    setBusy(true);
    setResult(null);
    try {
      const must = mustInclude.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
      const quotes = rvQuotes.split('\n').map((s) => s.trim()).filter(Boolean);
      const body: any = {
        productName,
        category,
        priceRegular: Number(priceRegular),
        priceSale: priceSale ? Number(priceSale) : undefined,
        oneLiner,
        mainImage: main!.path,
        subImages: subs.map((s) => s.path),
        peopleImages: people.map((s) => s.path),
        features3: features.map((f) => f.trim()).filter(Boolean).slice(0, 3),
        freeDescription,
        mustIncludePhrases: must,
        userPrompt,
        target: target || undefined,
        brandColor: brandColor || undefined,
        brandTone: brandTone || undefined,
        specs: specs || undefined,
        shipping: shipping || undefined,
        reviews:
          rvRating || rvCount || quotes.length
            ? { rating: rvRating ? Number(rvRating) : undefined, count: rvCount ? Number(rvCount) : undefined, quotes }
            : undefined,
        certifications: certifications || undefined,
        promotion: promotion || undefined,
        platform: platform || undefined,
        cutCount: Number(cutCount),
        styleId: styleId || undefined,
        mock,
      };
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || '생성 실패');
      setResult(data);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function regenerate(i: number) {
    if (!result) return;
    setRegen(i);
    try {
      const r = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: result.id, index: i, mock }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || '재생성 실패');
      setResult((prev) => {
        if (!prev) return prev;
        const images = [...prev.images];
        images[i] = data.image;
        const sections = [...prev.sections];
        sections[i] = data.cut;
        return { ...prev, images, sections };
      });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setRegen(null);
    }
  }

  function fillDemo() {
    setProductName('AirPure X 무선 차량용 공기청정기');
    setCategory('전자기기');
    setPriceRegular('89000');
    setPriceSale('64000');
    setOneLiner('H13 헤파 3단 필터의 한 손 크기 무선 차량용 공기청정기');
    setMain({ path: 'public/demo/01.png', url: '/demo/01.png' });
    setSubs([
      { path: 'public/demo/02.png', url: '/demo/02.png' },
      { path: 'public/demo/03.png', url: '/demo/03.png' },
      { path: 'public/demo/04.png', url: '/demo/04.png' },
    ]);
    setFeatures([
      'H13 헤파 3단 필터로 미세먼지·냄새·유해가스 정화',
      'USB-C 무선 충전, 완충 8시간, 컵홀더에 쏙',
      '60dB 이하 저소음 + 공기질 LED 실시간 표시',
    ]);
    setFreeDescription(
      '차량 출퇴근이 잦은 분들이 미세먼지와 음식·담배·반려동물 냄새로 고민이 많습니다. 밀폐된 차 안 공기질을 빠르게 개선하는 데 초점을 맞춘 제품입니다.',
    );
    setMustInclude('국내 A/S 1년 보장\n당일출고');
    setUserPrompt(
      '신뢰감 있고 깔끔한 톤으로. 미세먼지 정화력(H13)과 무선·저소음 편의성을 강조하고, 경쟁 제품 대비 작은 크기와 조용함을 비교로 보여줄 것.',
    );
    setTarget('차량 출퇴근이 잦은 30~40대 직장인, 아이를 태우는 부모');
    setBrandColor('#2563EB');
    setBrandTone('데이터 중심');
    setSpecs('크기 65x65x180mm / 무게 380g / 정화면적 5㎡ / 배터리 2000mAh 8시간 / 필터 교체 3~4개월 / 충전 USB-C / 소재 알루미늄·식품등급 ABS');
    setShipping('평일 오후 2시 이전 주문 시 당일출고, 무료배송, 수령 후 7일 이내 교환·반품, 국내 A/S 1년 보장');
    setRvRating('4.8');
    setRvCount('1243');
    setRvQuotes('차에서 음식 냄새가 정말 안 나요. 출퇴근이 쾌적해졌습니다.\n생각보다 조용하고 LED로 공기질 보는 재미가 있어요.\n컵홀더에 딱 맞는 크기예요. 필터 교체도 간편합니다.');
    setCertifications('KC 인증, H13 헤파 등급 시험성적서 보유');
    setPromotion('런칭 기념 28% 할인 + 여분 필터 1개 증정 (선착순)');
    setPlatform('네이버');
    setCutCount('13');
    setStyleId('elec-2');
    setErr('');
  }

  return (
    <div className="wrap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <div className="title">상세페이지 자동 생성기</div>
          <div className="sub">제품 정보를 입력하고 “생성”을 누르면 13컷 상세페이지가 자동으로 만들어집니다.</div>
        </div>
        <button className="btn-s" onClick={fillDemo}>🧪 데모 채우기</button>
      </div>

      <div className="grid2">
        {/* ─── 입력 폼 ─── */}
        <div className="card">
          <div className="sec-t">필수</div>
          <label className="req">제품명</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <label className="req">카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {styleData && (
            <>
              <label>스타일 (레퍼런스 학습 기반)</label>
              <div className="styleGrid">
                {((styleData.formCategories?.[category] as string[]) ?? []).map((sid) => {
                  const s = styleData.styles?.[sid];
                  if (!s) return null;
                  return (
                    <button type="button" key={sid} className={`styleCard${styleId === sid ? ' on' : ''}`} onClick={() => setStyleId(sid)}>
                      <img src={s.ref} alt={s.label} />
                      <div className="nm">{s.label}</div>
                    </button>
                  );
                })}
              </div>
              <div className="hint">레퍼런스 스타일을 고르세요. 한 페이지 = 하나의 스타일로 통일됩니다.</div>
            </>
          )}
          <div className="row">
            <div><label className="req">정가(원)</label><input type="number" value={priceRegular} onChange={(e) => setPriceRegular(e.target.value)} /></div>
            <div><label>할인가(원)</label><input type="number" value={priceSale} onChange={(e) => setPriceSale(e.target.value)} /></div>
          </div>
          <label className="req">한 줄 소개</label>
          <input type="text" value={oneLiner} onChange={(e) => setOneLiner(e.target.value)} maxLength={40} />
          <label className="req">메인 제품 사진</label>
          <input type="file" accept="image/*" onChange={onMain} />
          {main && <div className="thumbs"><img className="thumb" src={main.url} alt="main" /></div>}
          <label>추가 사진 (최대 10장)</label>
          <input type="file" accept="image/*" multiple onChange={onSubs} />
          {subs.length > 0 && <div className="thumbs">{subs.map((s, i) => <img key={i} className="thumb" src={s.url} alt={`sub${i}`} />)}</div>}
          <label>사람/모델 사진 (선택 · 사용장면에 우선 사용)</label>
          <input type="file" accept="image/*" multiple onChange={onPeople} />
          {people.length > 0 && <div className="thumbs">{people.map((s, i) => <img key={i} className="thumb" src={s.url} alt={`people${i}`} />)}</div>}
          <div className="hint">한국인 모델 등 원하는 사람 사진을 올리면 스톡 대신 이 사진을 사용장면 컷에 씁니다.</div>
          <label className="req">핵심 특징 3가지</label>
          {features.map((f, i) => (
            <input key={i} type="text" style={{ marginBottom: 6 }} placeholder={`특징 ${i + 1}`} value={f}
              onChange={(e) => setFeatures((fs) => fs.map((v, j) => (j === i ? e.target.value : v)))} />
          ))}

          <div className="sec-t">직접 작성</div>
          <label>자유 설명란</label>
          <textarea value={freeDescription} onChange={(e) => setFreeDescription(e.target.value)} placeholder="제품에 대해 하고 싶은 말을 자유롭게" />
          <label>필수 포함 문구 (줄/쉼표로 구분)</label>
          <textarea value={mustInclude} onChange={(e) => setMustInclude(e.target.value)} placeholder="예: 국내산 100%, 당일출고" />
          <label>사용자 프롬프트 (AI 지시)</label>
          <textarea value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="예: 고급스러운 톤으로, 가격 경쟁력 강조" />

          <div className="sec-t">선택</div>
          <label>타겟 고객</label>
          <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="연령/성별/라이프스타일" />
          <div className="row">
            <div><label>브랜드 컬러</label><input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} style={{ height: 40, padding: 4 }} /></div>
            <div><label>브랜드 톤</label>
              <select value={brandTone} onChange={(e) => setBrandTone(e.target.value)}>
                <option value="">자동</option>{TONES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <label>상세 스펙</label>
          <textarea value={specs} onChange={(e) => setSpecs(e.target.value)} />
          <label>배송/교환/AS</label>
          <textarea value={shipping} onChange={(e) => setShipping(e.target.value)} />
          <div className="row">
            <div><label>리뷰 평점</label><input type="number" step="0.1" value={rvRating} onChange={(e) => setRvRating(e.target.value)} /></div>
            <div><label>리뷰 수</label><input type="number" value={rvCount} onChange={(e) => setRvCount(e.target.value)} /></div>
          </div>
          <label>대표 리뷰 문구 (줄바꿈으로 구분)</label>
          <textarea value={rvQuotes} onChange={(e) => setRvQuotes(e.target.value)} />
          <label>인증/수상</label>
          <input type="text" value={certifications} onChange={(e) => setCertifications(e.target.value)} />
          <label>프로모션/이벤트/쿠폰</label>
          <input type="text" value={promotion} onChange={(e) => setPromotion(e.target.value)} />
          <div className="row">
            <div><label>출력 플랫폼</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="">자동</option>{PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div><label>컷 수</label>
              <select value={cutCount} onChange={(e) => setCutCount(e.target.value)}>
                {['9', '11', '13', '15'].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 13, fontWeight: 600 }}>
            <input type="checkbox" checked={mock} onChange={(e) => setMock(e.target.checked)} style={{ width: 'auto' }} />
            Mock 모드 (무료 · OpenAI 미사용, 카피는 입력값 기반)
          </label>
          <button className="btn" disabled={!canSubmit} onClick={submit}>
            {busy ? '생성 중…' : mock ? '🆓 Mock 생성 (무료)' : '13컷 생성하기 (OpenAI 사용)'}
          </button>
          {err && <div className="hint" style={{ color: '#e8467c', marginTop: 10 }}>⚠ {err}</div>}
        </div>

        {/* ─── 미리보기 ─── */}
        <div>
          {!result && !busy && <div className="card empty">왼쪽 폼을 작성하고 “생성”을 누르면<br />여기에 13컷 미리보기가 나타납니다.</div>}
          {busy && <div className="card empty busy">AI가 카피·레이아웃을 설계하고 이미지를 합성하는 중입니다…</div>}
          {result && (
            <div className="preview">
              {result.images.map((src, i) => (
                <div className="cut" key={i}>
                  <div className="bar">
                    <span>{String(i + 1).padStart(2, '0')} · {result.sections[i]?.layout}</span>
                    <button className="btn-s" disabled={regen !== null} onClick={() => regenerate(i)}>
                      {regen === i ? '재생성 중…' : '이 컷 재생성'}
                    </button>
                  </div>
                  <img src={src} alt={`cut ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
