/**
 * 레이아웃 엔진 v2 — 컴포넌트 기반. 반투명 박스 패턴 없음.
 * 컷마다 역할(layout)에 맞는 솔리드 컬러 섹션 + 실제 사진 + 벡터 장식으로 구성.
 *
 * 8대 요소: 웨이브/대각선 divider · 뱃지/손글씨/블롭 · 다단 · 리뷰 · FAQ · 비교표 · 배경색전환 · GIF영역
 */

export type CutRender = {
  id: string;
  layout:
    | 'hero' | 'feature-split' | 'columns' | 'comparison'
    | 'review' | 'faq' | 'steps' | 'centered' | 'gif' | 'cta' | 'scene';
  bg: string;             // 섹션 배경색 (hex)
  next?: string;          // 다음 섹션 배경색 (divider 채움색)
  divider?: 'wave' | 'diagonal' | 'none';
  accent: string;         // 포인트 컬러
  badge?: { text: string; kind?: 'pill' | 'number' | 'check' };
  handwrite?: string;     // 손글씨 악센트
  headline?: string;
  subcopy?: string;
  body?: string;
  bullets?: string[];
  stat?: { value: string; label: string }[];
  columns?: { emoji?: string; title: string; caption?: string; imageDataUri?: string; icon?: string; iconSvg?: string }[];
  reviews?: { rating: number; text: string; user: string }[];
  faqs?: { q: string; a: string }[];
  comparison?: { headers: string[]; rows: { label: string; cells: (string | boolean)[] }[]; highlightCol: number };
  steps?: { n: number; title: string; caption?: string }[];
  imageDataUri?: string;  // 제품 사진 (배경 아님 — 합성용)
  imageRight?: boolean;   // feature-split 사진 위치
  gifLabel?: string;
  logoDataUri?: string;
};

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ml = (s = '') => esc(s).replace(/\n/g, '<br/>');
const maskUser = (u = '') => (/\*{2,}/.test(u) ? u : (u.slice(0, Math.min(3, u.length)) || '익명') + '****');

/* 배경 명도로 텍스트 색 자동 결정 (대비 확보) */
function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  const f = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const isLight = (hex: string) => luminance(hex) > 0.5;
const ink = (bg: string) => (isLight(bg) ? '#1c1c22' : '#ffffff');
const sub = (bg: string) => (isLight(bg) ? 'rgba(28,28,34,0.66)' : 'rgba(255,255,255,0.80)');
const line = (bg: string) => (isLight(bg) ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.14)');
const card = (bg: string) => (isLight(bg) ? '#ffffff' : 'rgba(255,255,255,0.06)');

function badge(b: NonNullable<CutRender['badge']>, accent: string, bg: string) {
  const t = esc(b.text);
  if (b.kind === 'number')
    return `<span class="bdg num" style="background:${accent};color:#fff;">${t}</span>`;
  if (b.kind === 'check')
    return `<span class="bdg chk" style="border-color:${accent};color:${accent};">✓ ${t}</span>`;
  return `<span class="bdg pill" style="background:${accent};color:#fff;">${t}</span>`;
}

function stars(r: number, accent: string) {
  const full = Math.round(r);
  return `<span class="stars" style="color:${accent}">${'★'.repeat(full)}<span style="opacity:.25">${'★'.repeat(5 - full)}</span></span>`;
}

function statRow(stat: NonNullable<CutRender['stat']>, accent: string, bg: string) {
  return `<div class="stats">${stat
    .map(
      (s) =>
        `<div class="stat"><div class="sv" style="color:${accent}">${ml(s.value)}</div><div class="sl" style="color:${sub(bg)}">${ml(s.label)}</div></div>`,
    )
    .join('')}</div>`;
}

function blobs(accent: string) {
  return `<svg class="blob b1" viewBox="0 0 200 200"><path fill="${accent}" d="M44,-67C56,-58,63,-43,68,-28C73,-12,74,5,69,20C64,35,52,47,38,56C23,65,5,71,-13,73C-31,75,-49,73,-62,62C-75,51,-82,31,-83,12C-84,-8,-79,-26,-68,-39C-57,-52,-40,-60,-24,-67C-7,-74,9,-80,24,-78C39,-76,53,-66,44,-67Z" transform="translate(100 100)"/></svg>
  <svg class="blob b2" viewBox="0 0 200 200"><path fill="${accent}" d="M38,-62C49,-54,57,-43,64,-30C71,-17,76,-2,73,12C70,26,59,39,47,49C34,59,17,66,0,66C-17,66,-34,59,-47,49C-60,39,-69,26,-72,11C-75,-4,-72,-21,-63,-34C-54,-47,-39,-56,-25,-63C-11,-70,5,-75,20,-73C35,-71,49,-62,38,-62Z" transform="translate(100 100)"/></svg>`;
}

/* ───────── 레이아웃별 본문 ───────── */

function heroBody(c: CutRender) {
  const img = c.imageDataUri
    ? `<div class="hero-img"><img src="${c.imageDataUri}"/></div>` : '';
  return `<div class="pad center">
    ${c.logoDataUri ? `<div class="logo"><img src="${c.logoDataUri}"/></div>` : ''}
    ${c.handwrite ? `<div class="hand" style="color:${c.accent}">${ml(c.handwrite)}</div>` : ''}
    ${c.badge ? badge(c.badge, c.accent, c.bg) : ''}
    ${c.headline ? `<h1 class="big">${ml(c.headline)}</h1>` : ''}
    ${c.subcopy ? `<p class="sub">${ml(c.subcopy)}</p>` : ''}
    ${img}
  </div>`;
}

function featureSplitBody(c: CutRender) {
  const txt = `<div class="col-txt">
    ${c.badge ? badge(c.badge, c.accent, c.bg) : ''}
    ${c.headline ? `<h2>${ml(c.headline)}</h2>` : ''}
    ${c.subcopy ? `<p class="sub">${ml(c.subcopy)}</p>` : ''}
    ${c.body ? `<p class="body">${ml(c.body)}</p>` : ''}
    ${bulletsHtml(c)}
    ${c.stat ? statRow(c.stat, c.accent, c.bg) : ''}
  </div>`;
  if (!c.imageDataUri) return `<div class="pad">${txt}</div>`; // 사진 없으면 텍스트 전폭
  const img = `<div class="col-img"><img src="${c.imageDataUri}"/></div>`;
  return `<div class="pad split">${c.imageRight ? txt + img : img + txt}</div>`;
}

function bulletsHtml(c: CutRender) {
  if (!c.bullets?.length) return '';
  return `<ul class="bul">${c.bullets
    .map((b) => `<li><span class="dot" style="background:${c.accent}"></span>${ml(b)}</li>`)
    .join('')}</ul>`;
}

function columnsBody(c: CutRender) {
  const cols = c.columns ?? [];
  if (!cols.length) return `<div class="pad">${head(c)}</div>`;
  const n = cols.length || 3;
  return `<div class="pad">
    ${head(c)}
    <div class="grid" style="grid-template-columns:repeat(${Math.min(n, 3)},1fr)">
      ${cols
        .map(
          (col) => `<div class="gcard" style="background:${card(c.bg)};border:1px solid ${line(c.bg)}">
        ${col.imageDataUri ? `<div class="gimg"><img src="${col.imageDataUri}"/></div>` : col.iconSvg ? `<div class="gicon" style="color:${c.accent}">${col.iconSvg}</div>` : col.emoji ? `<div class="gemoji">${esc(col.emoji)}</div>` : ''}
        <div class="gtitle">${ml(col.title)}</div>
        ${col.caption ? `<div class="gcap" style="color:${sub(c.bg)}">${ml(col.caption)}</div>` : ''}
      </div>`,
        )
        .join('')}
    </div>
  </div>`;
}

function comparisonBody(c: CutRender) {
  const cmp = c.comparison;
  if (!cmp || !cmp.rows?.length) return `<div class="pad">${head(c)}</div>`;
  const hc = cmp.highlightCol ?? 2;
  const cell = (v: string | boolean, hi: boolean) => {
    if (typeof v === 'boolean')
      return `<td class="${hi ? 'hi' : ''}">${v ? `<span class="ok" style="color:${c.accent}">●</span>` : '<span class="no">—</span>'}</td>`;
    return `<td class="${hi ? 'hi' : ''}">${ml(v)}</td>`;
  };
  return `<div class="pad">
    ${head(c)}
    <table class="cmp">
      <thead><tr>${(cmp.headers ?? [])
        .map((h, i) => `<th class="${i === hc ? 'hi' : ''}" style="${i === hc ? `background:${c.accent};color:#fff;` : ''}">${ml(h)}</th>`)
        .join('')}</tr></thead>
      <tbody>${cmp.rows
        .map(
          (row) =>
            `<tr><th class="rl">${ml(row.label)}</th>${row.cells.map((v, i) => cell(v, i + 1 === hc)).join('')}</tr>`,
        )
        .join('')}</tbody>
    </table>
  </div>`;
}

function reviewBody(c: CutRender) {
  const rs = c.reviews ?? [];
  if (!rs.length) return `<div class="pad">${head(c)}</div>`;
  const avg = rs.length ? rs.reduce((a, r) => a + r.rating, 0) / rs.length : 0;
  return `<div class="pad">
    ${head(c)}
    <div class="rsum" style="background:${card(c.bg)};border:1px solid ${line(c.bg)}">
      <div class="ravg" style="color:${c.accent}">${avg.toFixed(1)}</div>
      <div>${stars(avg, c.accent)}<div class="rcount" style="color:${sub(c.bg)}">리뷰 ${rs.length}건</div></div>
    </div>
    <div class="rlist">
      ${rs
        .map(
          (r) => `<div class="rcard" style="background:${card(c.bg)};border:1px solid ${line(c.bg)}">
        <div class="rhead">${stars(r.rating, c.accent)}<span class="ruser" style="color:${sub(c.bg)}">${esc(maskUser(r.user))}</span></div>
        <p class="rtext">${ml(r.text)}</p>
      </div>`,
        )
        .join('')}
    </div>
  </div>`;
}

function faqBody(c: CutRender) {
  const fs = c.faqs ?? [];
  if (!fs.length) return `<div class="pad">${head(c)}</div>`;
  return `<div class="pad">
    ${head(c)}
    <div class="faqs">
      ${fs
        .map(
          (f) => `<div class="faq" style="background:${card(c.bg)};border:1px solid ${line(c.bg)}">
        <div class="q"><span class="qbadge" style="background:${c.accent}">Q</span>${ml(f.q)}</div>
        <div class="a" style="color:${sub(c.bg)}">${ml(f.a)}</div>
      </div>`,
        )
        .join('')}
    </div>
  </div>`;
}

function stepsBody(c: CutRender) {
  const st = c.steps ?? [];
  if (!st.length) return `<div class="pad">${head(c)}</div>`;
  return `<div class="pad">
    ${head(c)}
    <div class="steps">
      ${st
        .map(
          (s) => `<div class="step"><div class="snum" style="background:${c.accent}">${s.n}</div>
        <div class="stitle">${ml(s.title)}</div>${s.caption ? `<div class="scap" style="color:${sub(c.bg)}">${ml(s.caption)}</div>` : ''}</div>`,
        )
        .join('')}
    </div>
  </div>`;
}

function centeredBody(c: CutRender) {
  return `<div class="pad center tall">
    ${c.handwrite ? `<div class="hand" style="color:${c.accent}">${ml(c.handwrite)}</div>` : ''}
    ${c.headline ? `<h1 class="big">${ml(c.headline)}</h1>` : ''}
    ${c.subcopy ? `<p class="sub">${ml(c.subcopy)}</p>` : ''}
    ${c.stat ? statRow(c.stat, c.accent, c.bg) : ''}
  </div>`;
}

function gifBody(c: CutRender) {
  const inner = c.imageDataUri
    ? `<img src="${c.imageDataUri}"/>`
    : `<div class="gifph" style="border-color:${c.accent};color:${c.accent}">▶ ${esc(c.gifLabel ?? 'GIF')}<div class="gifsub">움짤(GIF)을 업로드하면 여기에 표시됩니다</div></div>`;
  return `<div class="pad">${head(c)}<div class="gifbox">${inner}</div></div>`;
}

function head(c: CutRender) {
  return `${c.badge ? badge(c.badge, c.accent, c.bg) : ''}
    ${c.handwrite ? `<div class="hand" style="color:${c.accent}">${ml(c.handwrite)}</div>` : ''}
    ${c.headline ? `<h2 class="sec-h">${ml(c.headline)}</h2>` : ''}
    ${c.subcopy ? `<p class="sub">${ml(c.subcopy)}</p>` : ''}`;
}

function ctaBody(c: CutRender) {
  return `<div class="pad center tall">
    ${c.logoDataUri ? `<div class="logo"><img src="${c.logoDataUri}"/></div>` : ''}
    ${c.handwrite ? `<div class="hand" style="color:${c.accent}">${ml(c.handwrite)}</div>` : ''}
    ${c.headline ? `<h1 class="big">${ml(c.headline)}</h1>` : ''}
    ${c.subcopy ? `<p class="sub">${ml(c.subcopy)}</p>` : ''}
    <div style="display:inline-block;margin-top:34px;background:#fff;color:${c.bg};font-size:26px;font-weight:800;padding:22px 56px;border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,0.28);">구매하러 가기</div>
  </div>`;
}

/** #3+#4 통합 — 누끼 제품을 AI 생성 씬 위에 합성한 이미지를 풀블리드 배경으로, 텍스트는 상단 스크림 위에(#8). */
function sceneBody(c: CutRender) {
  return `<div class="scene">
    <div class="scene-img" style="background-image:url('${c.imageDataUri ?? ''}');"></div>
    <div class="scene-scrim"></div>
    <div class="scene-txt">
      ${c.logoDataUri ? `<div class="logo"><img src="${c.logoDataUri}"/></div>` : ''}
      ${c.badge ? badge(c.badge, c.accent, '#0a0e14') : ''}
      ${c.handwrite ? `<div class="hand" style="color:${c.accent}">${ml(c.handwrite)}</div>` : ''}
      ${c.headline ? `<h1 class="big scene-h">${ml(c.headline)}</h1>` : ''}
      ${c.subcopy ? `<p class="sub scene-sub">${ml(c.subcopy)}</p>` : ''}
    </div>
  </div>`;
}

const BODY: Record<CutRender['layout'], (c: CutRender) => string> = {
  hero: heroBody,
  scene: sceneBody,
  'feature-split': featureSplitBody,
  columns: columnsBody,
  comparison: comparisonBody,
  review: reviewBody,
  faq: faqBody,
  steps: stepsBody,
  centered: centeredBody,
  gif: gifBody,
  cta: ctaBody,
};

/* ───────── divider ───────── */
function divider(c: CutRender) {
  if (!c.divider || c.divider === 'none' || !c.next) return '';
  if (c.divider === 'diagonal')
    return `<div class="divider diag" style="background:${c.next};clip-path:polygon(0 100%,100% 45%,100% 100%);"></div>`;
  return `<svg class="divider" viewBox="0 0 860 80" preserveAspectRatio="none"><path d="M0,44 C200,90 420,4 640,40 C760,60 820,46 860,40 L860,80 L0,80 Z" fill="${c.next}"/></svg>`;
}

/* ───────── 전체 컷 ───────── */
export function buildCutV2(c: CutRender, width = 860): string {
  const fg = ink(c.bg);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Pretendard','Malgun Gothic',sans-serif;}
  .cut{width:${width}px;background:${c.bg};color:${fg};position:relative;overflow:hidden;padding-bottom:${c.divider && c.divider !== 'none' ? 80 : 0}px;}
  .blob{position:absolute;width:340px;height:340px;opacity:0.07;z-index:0;}
  .b1{top:-90px;right:-90px;} .b2{bottom:40px;left:-110px;}
  .pad{position:relative;z-index:1;padding:76px 64px;}
  .pad.center{display:flex;flex-direction:column;align-items:center;text-align:center;}
  .pad.tall{padding:104px 64px;}
  .hand{font-family:'Nanum Pen Script',cursive;font-size:38px;line-height:1.1;margin-bottom:8px;}
  .bdg{display:inline-block;font-size:18px;font-weight:700;letter-spacing:.5px;margin-bottom:20px;}
  .bdg.pill{padding:9px 22px;border-radius:999px;}
  .bdg.num{width:46px;height:46px;line-height:46px;text-align:center;border-radius:50%;font-size:22px;}
  .bdg.chk{padding:8px 18px;border:2px solid;border-radius:999px;}
  h1.big{font-size:60px;font-weight:800;line-height:1.22;letter-spacing:-1.5px;}
  h2.sec-h{font-size:44px;font-weight:800;line-height:1.25;letter-spacing:-1px;}
  h2{font-size:42px;font-weight:800;line-height:1.25;letter-spacing:-1px;}
  .sub{font-size:24px;font-weight:500;line-height:1.55;color:${sub(c.bg)};margin-top:18px;}
  .body{font-size:21px;line-height:1.7;color:${sub(c.bg)};margin-top:16px;}
  .hero-img{margin-top:40px;width:92%;}
  .hero-img img{width:100%;border-radius:28px;display:block;box-shadow:0 34px 80px rgba(0,0,0,0.30);}
  .stats{display:flex;gap:34px;margin-top:30px;flex-wrap:wrap;}
  .stat .sv{font-size:46px;font-weight:800;line-height:1;}
  .stat .sl{font-size:17px;margin-top:8px;}
  .bul{list-style:none;margin-top:24px;}
  .bul li{font-size:21px;line-height:1.6;margin:12px 0;padding-left:30px;position:relative;}
  .bul .dot{position:absolute;left:2px;top:11px;width:11px;height:11px;border-radius:50%;}
  .split{display:flex;align-items:center;gap:44px;}
  .col-img{flex:0 0 44%;}
  .col-img img{width:100%;border-radius:22px;display:block;box-shadow:0 20px 48px rgba(0,0,0,0.2);}
  .col-txt{flex:1;}
  .grid{display:grid;gap:22px;margin-top:40px;}
  .gcard{border-radius:20px;padding:28px 22px;text-align:center;}
  .gimg img{width:100%;border-radius:14px;display:block;margin-bottom:16px;}
  .gemoji{font-size:54px;margin-bottom:14px;}
  .gicon{margin-bottom:16px;display:flex;justify-content:center;align-items:center;}
  .gicon svg{width:46px;height:46px;}
  .logo{margin-bottom:22px;}
  .logo img{height:40px;width:auto;display:block;margin:0 auto;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.12));}
  .scene{position:relative;width:100%;height:1290px;overflow:hidden;background:#0a0e14;}
  .scene-img{position:absolute;inset:0;background-size:cover;background-position:center;}
  .scene-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,14,0.62) 0%,rgba(5,8,14,0.16) 34%,rgba(5,8,14,0.04) 60%,rgba(5,8,14,0.4) 100%);}
  .scene-txt{position:absolute;left:0;right:0;top:0;padding:96px 64px;display:flex;flex-direction:column;align-items:center;text-align:center;color:#fff;}
  .scene-h{color:#fff;text-shadow:0 2px 24px rgba(0,0,0,0.6);}
  .scene-sub{color:rgba(255,255,255,0.92);text-shadow:0 1px 14px rgba(0,0,0,0.55);margin-top:18px;}
  .gtitle{font-size:23px;font-weight:700;}
  .gcap{font-size:17px;line-height:1.55;margin-top:10px;}
  table.cmp{width:100%;border-collapse:separate;border-spacing:0;margin-top:40px;font-size:21px;}
  .cmp th,.cmp td{padding:20px 16px;text-align:center;border-bottom:1px solid ${line(c.bg)};}
  .cmp thead th{font-size:22px;font-weight:800;border-radius:14px 14px 0 0;}
  .cmp th.rl{text-align:left;font-weight:600;width:34%;}
  .cmp td.hi{background:${isLight(c.bg) ? 'rgba(0,0,0,0.035)' : 'rgba(255,255,255,0.06)'};font-weight:700;}
  .cmp .ok{font-size:24px;} .cmp .no{opacity:.4;}
  .rsum{display:flex;align-items:center;gap:24px;border-radius:20px;padding:26px 30px;margin-top:36px;}
  .ravg{font-size:64px;font-weight:800;line-height:1;}
  .stars{font-size:26px;letter-spacing:2px;}
  .rcount{font-size:17px;margin-top:6px;}
  .rlist{display:flex;flex-direction:column;gap:16px;margin-top:18px;}
  .rcard{border-radius:18px;padding:22px 24px;}
  .rhead{display:flex;align-items:center;gap:14px;}
  .rhead .stars{font-size:20px;}
  .ruser{font-size:17px;}
  .rtext{font-size:20px;line-height:1.6;margin-top:12px;}
  .faqs{display:flex;flex-direction:column;gap:16px;margin-top:36px;}
  .faq{border-radius:18px;padding:24px 26px;}
  .q{display:flex;align-items:flex-start;gap:14px;font-size:23px;font-weight:700;line-height:1.4;}
  .qbadge{flex:0 0 auto;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;color:#fff;font-size:19px;}
  .a{font-size:20px;line-height:1.65;margin-top:14px;padding-left:48px;}
  .steps{display:flex;gap:18px;margin-top:40px;}
  .step{flex:1;text-align:center;}
  .snum{width:54px;height:54px;line-height:54px;border-radius:50%;color:#fff;font-size:24px;font-weight:800;margin:0 auto 16px;}
  .stitle{font-size:22px;font-weight:700;}
  .scap{font-size:17px;margin-top:8px;line-height:1.5;}
  .gifbox{margin-top:36px;}
  .gifbox img{width:100%;border-radius:20px;display:block;}
  .gifph{border:3px dashed;border-radius:20px;height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:40px;font-weight:800;}
  .gifsub{font-size:18px;font-weight:500;margin-top:14px;opacity:.8;}
  .divider{position:absolute;left:0;bottom:0;width:100%;height:80px;z-index:2;}
</style></head>
<body>
  <div class="cut" id="cut">
    ${blobs(c.accent)}
    ${BODY[c.layout](c)}
    ${divider(c)}
  </div>
</body></html>`;
}
