/**
 * 오트밀리 상세페이지 HTML 빌더 — 식품1(두브로) 디자인 언어 재현.
 * 폭 860px 세로 가변. 아치 텍스트(SVG), 원형/블롭 마스크, 레드 번호 뱃지,
 * 웨이브 구분선, 레드/크림 블록 교차. 카피는 content.ts.
 */
import { PALETTE as P, BRAND, CONTENT as C } from './content.ts';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const ASSET = (id: string) =>
  pathToFileURL(resolve('assets/oatmeally', `${id}.png`)).href;

/* ── 작은 헬퍼들 ── */

// 아치(레인보우) 텍스트 — SVG textPath
function arc(text: string, color = P.red, w = 360, fs = 15) {
  const id = 'arc_' + Math.random().toString(36).slice(2, 8);
  return `<svg class="arc" viewBox="0 0 360 64" width="${w}" height="${(w / 360) * 64}">
    <defs><path id="${id}" d="M18,58 Q180,6 342,58" fill="none"/></defs>
    <text fill="${color}" font-size="${fs}" letter-spacing="3" font-weight="700">
      <textPath href="#${id}" startOffset="50%" text-anchor="middle">${text}</textPath>
    </text></svg>`;
}

// 웨이브 구분선 (위/아래 색 지정)
function wave(top: string, bottom: string) {
  return `<div class="wavewrap" style="background:${top}">
    <svg viewBox="0 0 860 48" preserveAspectRatio="none" width="860" height="48">
      <path d="M0,24 C140,52 280,0 430,22 C580,44 720,4 860,26 L860,48 L0,48 Z" fill="${bottom}"/>
    </svg></div>`;
}

// 스캘럽(울퉁불퉁) 구분선
function scallop(top: string, bottom: string) {
  let d = 'M0,40 ';
  const n = 16, step = 860 / n;
  for (let i = 0; i < n; i++) d += `Q${i * step + step / 2},6 ${(i + 1) * step},40 `;
  return `<div class="wavewrap" style="background:${top}">
    <svg viewBox="0 0 860 44" preserveAspectRatio="none" width="860" height="44">
      <path d="${d}L860,44 L0,44 Z" fill="${bottom}"/></svg></div>`;
}

const chips = (arr: string[], cls = '') =>
  `<div class="chips">${arr.map((c) => `<span class="chip ${cls}">${c}</span>`).join('')}</div>`;

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

/* ── 섹션들 ── */

function s01() {
  const h = C.hero;
  return `<section class="sec sec--cream hero">
    ${arc(h.arc, P.kraft, 380)}
    <p class="script">${h.script}</p>
    <h1 class="h1">${h.title[0]} <span class="accent">${h.title[1]}</span></h1>
    <p class="sub">${h.sub}</p>
    <div class="hero-img"><img src="${ASSET(h.img)}" alt=""></div>
    ${chips(h.chips, 'chip--red')}
  </section>`;
}

function s02() {
  const e = C.empathy;
  return `<section class="sec sec--cream2 empathy">
    <p class="label">${e.label}</p>
    <h2 class="h2">${e.head[0]}<br><span class="accent">${e.head[1]}</span></h2>
    <p class="body center">${e.body}</p>
    <div class="grid3">
      ${e.pains.map((p, i) => `<div class="pcard">
        <div class="pdot">0${i + 1}</div>
        <div class="pt">${p.t}</div>
        <div class="pd">${p.d}</div></div>`).join('')}
    </div>
  </section>`;
}

function s03() {
  const s = C.solution;
  return `<section class="sec sec--red solution">
    <p class="label label--on">${s.label}</p>
    <h2 class="h2 on">${s.head[0]}<br>${s.head[1]}</h2>
    <p class="body on center">${s.body}</p>
    <div class="grid3">
      ${s.cards.map((c) => `<div class="vcard">
        <div class="num">${c.n}</div>
        <div class="vt">${c.t}</div>
        <div class="vd">${c.d}</div></div>`).join('')}
    </div>
  </section>`;
}

function featureRow(f: typeof C.feature1, reverse: boolean, bg: 'cream' | 'cream2', extra = '') {
  return `<section class="sec sec--${bg} feature">
    <div class="frow ${reverse ? 'rev' : ''}">
      <div class="fimg"><span class="watermark">${f.no}</span><img src="${ASSET(f.img)}" alt=""></div>
      <div class="ftext">
        ${arc(f.arc, P.kraft, 240, 13)}
        <h2 class="h2">${f.head[0]}<br><span class="accent">${f.head[1]}</span></h2>
        <p class="body">${f.body}</p>
        ${extra}
      </div>
    </div>
  </section>`;
}

function s04() { return featureRow(C.feature1, false, 'cream', chips(C.feature1.points, 'chip--red')); }
function s05() {
  const z = `<div class="zeros">${C.feature2.zeros.map((x) => `<div class="zero">${x}</div>`).join('')}</div>`;
  return featureRow(C.feature2, true, 'cream2', z);
}
function s06() { return featureRow(C.feature3, false, 'cream', chips(C.feature3.points, 'chip--red')); }

function s07() {
  const f = C.fresh;
  return `<section class="sec sec--red fresh">
    <p class="label label--on">${f.label}</p>
    <div class="frow">
      <div class="fimg round"><img src="${ASSET(f.img)}" alt=""><span class="stamp">당일<br>발송</span></div>
      <div class="ftext">
        <h2 class="h2 on">${f.head[0]}<br>${f.head[1]}</h2>
        <p class="body on">${f.body}</p>
      </div>
    </div>
  </section>`;
}

function s08() {
  const h = C.howto;
  return `<section class="sec sec--cream howto">
    ${arc(h.arc, P.red, 300, 14)}
    <h2 class="h2 howhead">${h.head}</h2>
    <p class="script script--sm">${h.headKo}</p>
    <div class="steps">
      ${h.steps.map((st) => `<div class="step">
        <div class="step-img"><img src="${ASSET(st.img)}" alt=""><span class="num num--abs">${st.n}</span></div>
        <div class="step-txt"><div class="step-t">${st.t}</div><div class="step-d">${st.d}</div></div>
      </div>`).join('')}
    </div>
  </section>`;
}

function s09() {
  const t = C.trust;
  return `<section class="sec sec--red check">
    ${arc(t.checkArc, P.onRed, 280, 13)}
    <div class="checkbox-title">${t.checkTitle}</div>
    <ol class="checklist">
      ${t.checks.map((c, i) => `<li><span class="num num--sm">0${i + 1}</span><span>${c}</span></li>`).join('')}
    </ol>
  </section>
  <section class="sec sec--cream reviews">
    <h2 class="h2 center">${t.reviewTitle}</h2>
    <div class="rgrid">
      ${t.reviews.map((r) => `<div class="rcard">
        <div class="rstars">${stars(r.stars)}</div>
        <div class="rt">"${r.t}"</div>
        <div class="rd">${r.d}</div>
        <div class="rwho">${r.who}</div></div>`).join('')}
    </div>
  </section>
  <section class="sec sec--cream2 spec">
    ${arc('PRODUCT INFO', P.kraft, 240, 13)}
    <h2 class="h2 center">${t.specTitle}</h2>
    <table class="spectable">
      ${t.specs.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}
    </table>
  </section>`;
}

function s10() {
  const c = C.cta;
  return `<section class="sec sec--red cta">
    <img class="cta-bg" src="${ASSET(c.img)}" alt="">
    <div class="cta-inner">
      ${arc(c.arc, P.onRed, 240, 13)}
      <h2 class="h2 on big">${c.head[0]}<br>${c.head[1]}</h2>
      <p class="sub on">${c.sub}</p>
      ${chips(c.benefits, 'chip--on')}
      <div class="button">${c.button}</div>
    </div>
  </section>`;
}

/* ── CSS ── */
const CSS = `
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Jua&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
body{font-family:'Pretendard',sans-serif;color:${P.ink};background:#ddd;word-break:keep-all;line-break:strict}
.page{width:860px;margin:0 auto;background:${P.cream};overflow:hidden}
.sec{padding:64px 60px;position:relative}
.sec--cream{background:${P.cream}}
.sec--cream2{background:${P.cream2}}
.sec--red{background:${P.red};color:${P.onRed}}
.arc{display:block;margin:0 auto 6px}
.label{font-size:13px;letter-spacing:4px;font-weight:800;color:${P.kraft};text-align:center;margin-bottom:14px}
.label--on{color:${P.onRed};opacity:.85}
.script{font-family:'Nanum Pen Script',cursive;font-size:34px;color:${P.red};text-align:center;line-height:1;margin-bottom:6px}
.script--sm{font-size:30px;margin-top:2px}
.h1{font-family:'Jua',sans-serif;font-size:52px;font-weight:800;text-align:center;line-height:1.15;letter-spacing:-1px}
.h2{font-size:34px;font-weight:800;line-height:1.3;letter-spacing:-1px}
.h2.center{text-align:center}
.h2.on{color:#fff}
.h2.big{font-size:44px}
.accent{color:${P.red}}
.h2.on .accent{color:#ffe1c9}
.sub{font-size:19px;color:${P.sub};text-align:center;margin-top:14px;line-height:1.6}
.sub.on{color:${P.onRed};opacity:.95}
.body{font-size:17px;line-height:1.8;color:${P.sub};margin-top:16px}
.body.on{color:${P.onRed};opacity:.95}
.body.center{text-align:center;max-width:560px;margin-left:auto;margin-right:auto}
/* chips */
.chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:24px}
.chip{font-size:14px;font-weight:700;padding:9px 18px;border-radius:999px;background:#fff;color:${P.kraft};border:1px solid ${P.line}}
.chip--red{background:#fff;color:${P.red};border:1.5px solid ${P.red}}
.chip--on{background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.4)}
/* number badge */
.num{width:46px;height:46px;border-radius:50%;background:${P.red};color:#fff;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(213,0,1,.3)}
.num--sm{width:34px;height:34px;font-size:15px;flex:none}
.num--abs{position:absolute;top:-10px;left:-10px;border:3px solid ${P.cream}}
.sec--red .num{background:#fff;color:${P.red}}
/* hero */
.hero{padding-top:54px}
.hero-img{margin:30px auto 0;width:560px;height:420px;border-radius:32px;overflow:hidden;box-shadow:0 24px 50px rgba(120,70,30,.22)}
.hero-img img{width:100%;height:100%;object-fit:cover}
/* empathy / grids */
.grid3{display:flex;gap:18px;margin-top:34px}
.pcard{flex:1;background:#fff;border-radius:22px;padding:28px 22px;text-align:center;box-shadow:0 10px 26px rgba(120,70,30,.08)}
.pdot{width:42px;height:42px;border-radius:50%;background:${P.cream};color:${P.red};font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;border:1.5px solid ${P.red}}
.pt{font-size:19px;font-weight:800;color:${P.ink};margin-bottom:8px}
.pd{font-size:14px;color:${P.sub};line-height:1.6}
.vcard{flex:1;background:#fff;border-radius:22px;padding:30px 22px;text-align:center}
.vcard .num{margin:0 auto 16px}
.vt{font-size:19px;font-weight:800;color:${P.ink};margin-bottom:8px}
.vd{font-size:14px;color:${P.sub};line-height:1.6}
/* feature rows */
.frow{display:flex;align-items:center;gap:40px}
.frow.rev{flex-direction:row-reverse}
.fimg{flex:none;width:340px;height:340px;border-radius:28px;overflow:hidden;position:relative;box-shadow:0 18px 40px rgba(120,70,30,.18)}
.fimg.round{border-radius:50%;width:300px;height:300px}
.fimg img{width:100%;height:100%;object-fit:cover}
.watermark{position:absolute;top:-26px;left:14px;font-family:'Jua',sans-serif;font-size:120px;font-weight:800;color:rgba(255,255,255,.7);z-index:2;text-shadow:0 2px 8px rgba(120,70,30,.15)}
.ftext{flex:1}
.ftext .arc{margin-left:0}
.ftext .h2{margin-top:8px}
.zeros{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:22px}
.zero{border:1.5px solid ${P.red};color:${P.red};border-radius:14px;padding:14px;text-align:center;font-weight:800;font-size:16px;background:#fff}
/* fresh stamp */
.stamp{position:absolute;right:-6px;bottom:-6px;width:88px;height:88px;border-radius:50%;background:#fff;color:${P.red};font-family:'Jua',sans-serif;font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.1;border:3px solid ${P.red};transform:rotate(-12deg)}
/* howto */
.howhead{text-align:center;font-size:40px;letter-spacing:1px;color:${P.red}}
.steps{margin-top:34px;display:flex;flex-direction:column;gap:26px}
.step{display:flex;align-items:center;gap:26px;background:#fff;border-radius:26px;padding:22px 28px;box-shadow:0 10px 26px rgba(120,70,30,.08)}
.step:nth-child(even){flex-direction:row-reverse;text-align:right}
.step-img{flex:none;width:150px;height:150px;border-radius:50%;overflow:hidden;position:relative}
.step-img img{width:100%;height:100%;object-fit:cover}
.step-t{font-size:23px;font-weight:800;color:${P.red};margin-bottom:8px}
.step-d{font-size:16px;color:${P.sub};line-height:1.7}
/* check point */
.check{text-align:center}
.checkbox-title{display:inline-block;border:2px solid #fff;color:#fff;font-weight:800;font-size:22px;letter-spacing:3px;padding:10px 30px;border-radius:14px;margin:6px auto 26px}
.checklist{list-style:none;max-width:560px;margin:0 auto;text-align:left}
.checklist li{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.1);border-radius:16px;padding:16px 20px;margin-bottom:12px;font-size:17px;font-weight:600;color:#fff}
/* reviews */
.rgrid{display:flex;gap:18px;margin-top:30px}
.rcard{flex:1;background:#fff;border-radius:22px;padding:26px 22px;box-shadow:0 10px 26px rgba(120,70,30,.08)}
.rstars{color:#ffb400;font-size:18px;letter-spacing:2px;margin-bottom:12px}
.rt{font-size:18px;font-weight:800;color:${P.ink};margin-bottom:10px;line-height:1.4}
.rd{font-size:14px;color:${P.sub};line-height:1.7;margin-bottom:14px}
.rwho{font-size:13px;color:${P.kraft};font-weight:700}
/* spec */
.spec{text-align:center}
.spectable{width:100%;max-width:620px;margin:26px auto 0;border-collapse:collapse;text-align:left;background:#fff;border-radius:18px;overflow:hidden}
.spectable th,.spectable td{padding:16px 22px;font-size:15px;border-bottom:1px solid ${P.line}}
.spectable th{width:120px;background:${P.cream};color:${P.kraft};font-weight:800}
.spectable td{color:${P.ink}}
.spectable tr:last-child th,.spectable tr:last-child td{border-bottom:none}
/* cta */
.cta{padding:0;overflow:hidden}
.cta-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.18}
.cta-inner{position:relative;padding:70px 60px;text-align:center}
.button{display:inline-block;margin-top:28px;background:#fff;color:${P.red};font-size:22px;font-weight:800;padding:20px 60px;border-radius:999px;box-shadow:0 14px 34px rgba(0,0,0,.22)}
.cta .chips{margin-top:22px}
/* wave dividers */
.wavewrap{line-height:0}
.wavewrap svg{display:block;width:100%}
`;

export function buildHTML(): string {
  const body = [
    s01(),
    scallop(P.cream, P.cream2),
    s02(),
    wave(P.cream2, P.red),
    s03(),
    wave(P.red, P.cream),
    s04(),
    s05(),
    s06(),
    wave(P.cream, P.red),
    s07(),
    wave(P.red, P.cream),
    s08(),
    wave(P.cream, P.red),
    s09(),
    s10(),
  ].join('\n');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8">
  <style>${CSS}</style></head>
  <body><div class="page">${body}</div></body></html>`;
}
