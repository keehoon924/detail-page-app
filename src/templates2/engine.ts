/**
 * 상세페이지 디자인 엔진 — 오트밀리 수준 완성 디자인을 20개 템플릿에 일반화.
 * 테마(컬러) + 리치 섹션 컴포넌트 + 스타일 이미지 placeholder. 이미지 생성 없음(코드 합성).
 */

export interface Theme {
  primary: string; primaryDeep: string; light: string; light2: string;
  ink: string; sub: string; accent: string; bg: string; onPrimary: string; band: string;
}

export type Section =
  | { type: 'hero'; label?: string; script?: string; title: string; accent?: string; sub?: string; chips?: string[]; image?: string; imageH?: number; bg?: BG }
  | { type: 'cards'; variant?: 'pain' | 'value'; label?: string; head?: string; accent?: string; body?: string; cards: { n?: string; t: string; d?: string }[]; bg?: BG }
  | { type: 'feature'; no?: string; label?: string; head: string; accent?: string; body?: string; points?: string[]; image: string; reverse?: boolean; bg?: BG }
  | { type: 'iconGrid'; label?: string; head?: string; sub?: string; cols?: number; items: { t: string; d?: string }[]; bg?: BG }
  | { type: 'checkPoint'; label?: string; title: string; items: string[]; bg?: BG }
  | { type: 'steps'; label?: string; head?: string; sub?: string; steps: { n: string; t: string; d: string; image?: string }[]; bg?: BG }
  | { type: 'banner'; label?: string; head: string; sub?: string; bg?: BG }
  | { type: 'stat'; head?: string; sub?: string; image?: string; stats: { label: string; value: string }[]; bg?: BG }
  | { type: 'reviews'; title?: string; items: { stars?: number; t: string; d?: string; who?: string }[]; bg?: BG }
  | { type: 'spec'; label?: string; title?: string; rows: [string, string][]; bg?: BG }
  | { type: 'swatches'; label?: string; head?: string; items: { name: string; c?: string }[]; bg?: BG }
  | { type: 'compare'; head?: string; body?: string; left: string; right: string; bg?: BG }
  | { type: 'image'; label: string; h?: number; caption?: string; round?: boolean; cols?: string[]; bg?: BG }
  | { type: 'detail'; label?: string; head?: string; items: { label: string; t: string; d: string }[]; bg?: BG }
  | { type: 'cta'; label?: string; head: string; sub?: string; benefits?: string[]; button?: string; image?: string; bg?: BG }
  | { type: 'notice'; title: string; items: string[]; bg?: BG };

export type BG = 'page' | 'light' | 'light2' | 'primary' | 'white' | 'ink';
export interface Template2 { id: string; category: string; theme: Theme; width?: number; sections: Section[]; }

/* ── 이미지 placeholder (스타일 적용) ── */
const IMG_ICON = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5L5 21"/></svg>`;
function ph(label: string, o: { h?: number; round?: boolean; w?: string } = {}) {
  const cls = 'ph' + (o.round ? ' ph--round' : '');
  const style = `${o.h ? `height:${o.h}px;` : ''}${o.w ? `width:${o.w};` : ''}`;
  return `<div class="${cls}" style="${style}"><div class="ph__icon">${IMG_ICON}</div><div class="ph__label">${label}</div><div class="ph__tag">이미지 영역</div></div>`;
}

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const stars = (n = 5) => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
const chipRow = (arr: string[], cls = '') => `<div class="chips">${arr.map((c) => `<span class="chip ${cls}">${esc(c)}</span>`).join('')}</div>`;
const headHTML = (head: string, accent?: string) =>
  accent ? `${esc(head)}<br><span class="accent">${esc(accent)}</span>` : esc(head).replace(/\n/g, '<br>');

/* ── 섹션 렌더 ── */
function renderSection(s: Section): string {
  const bg = s.bg ?? 'page';
  const cls = `sec sec--${bg}`;
  switch (s.type) {
    case 'hero':
      return `<section class="${cls} t-center">
        ${s.label ? `<p class="label">${esc(s.label)}</p>` : ''}
        ${s.script ? `<p class="script">${esc(s.script)}</p>` : ''}
        <h1 class="h1">${headHTML(s.title, s.accent)}</h1>
        ${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ''}
        ${s.image ? `<div class="hero-img">${ph(s.image, { h: s.imageH ?? 360 })}</div>` : ''}
        ${s.chips ? chipRow(s.chips, 'chip--line') : ''}</section>`;
    case 'cards': {
      const variant = s.variant ?? 'value';
      const cardsH = s.cards.map((c) => `<div class="card ${variant === 'pain' ? 'card--pain' : 'card--value'}">
        ${c.n ? `<div class="${variant === 'pain' ? 'pdot' : 'num'}">${esc(c.n)}</div>` : ''}
        <div class="card-t">${esc(c.t)}</div>${c.d ? `<div class="card-d">${esc(c.d)}</div>` : ''}</div>`).join('');
      return `<section class="${cls} t-center">
        ${s.label ? `<p class="label">${esc(s.label)}</p>` : ''}
        ${s.head ? `<h2 class="h2">${headHTML(s.head, s.accent)}</h2>` : ''}
        ${s.body ? `<p class="body t-center">${esc(s.body)}</p>` : ''}
        <div class="grid grid-${s.cards.length}">${cardsH}</div></section>`;
    }
    case 'feature':
      return `<section class="${cls}">
        <div class="frow ${s.reverse ? 'rev' : ''}">
          <div class="fimg">${s.no ? `<span class="watermark">${esc(s.no)}</span>` : ''}${ph(s.image, { h: 320 })}</div>
          <div class="ftext">
            ${s.label ? `<p class="label label--left">${esc(s.label)}</p>` : ''}
            <h2 class="h2">${headHTML(s.head, s.accent)}</h2>
            ${s.body ? `<p class="body">${esc(s.body)}</p>` : ''}
            ${s.points ? chipRow(s.points, 'chip--line') : ''}
          </div></div></section>`;
    case 'iconGrid': {
      const cols = s.cols ?? 3;
      const itemsH = s.items.map((it) => `<div class="igcell"><div class="igdot">${IMG_ICON}</div><div class="igt">${esc(it.t)}</div>${it.d ? `<div class="igd">${esc(it.d)}</div>` : ''}</div>`).join('');
      return `<section class="${cls} t-center">
        ${s.label ? `<p class="label">${esc(s.label)}</p>` : ''}
        ${s.head ? `<h2 class="h2">${esc(s.head)}</h2>` : ''}
        ${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ''}
        <div class="iggrid" style="grid-template-columns:repeat(${cols},1fr)">${itemsH}</div></section>`;
    }
    case 'checkPoint':
      return `<section class="${cls} t-center">
        ${s.label ? `<p class="label label--on">${esc(s.label)}</p>` : ''}
        <div class="cp-title">${esc(s.title)}</div>
        <ol class="checklist">${s.items.map((c, i) => `<li><span class="num num--sm">${String(i + 1).padStart(2, '0')}</span><span>${esc(c)}</span></li>`).join('')}</ol></section>`;
    case 'steps':
      return `<section class="${cls}">
        ${s.label ? `<p class="label t-center">${esc(s.label)}</p>` : ''}
        ${s.head ? `<h2 class="h2 t-center">${esc(s.head)}</h2>` : ''}
        ${s.sub ? `<p class="script script--sm t-center">${esc(s.sub)}</p>` : ''}
        <div class="steps">${s.steps.map((st) => `<div class="step">
          <div class="step-img">${ph(st.image ?? st.t, { round: false })}<span class="num num--abs">${esc(st.n)}</span></div>
          <div class="step-txt"><div class="step-t">${esc(st.t)}</div><div class="step-d">${esc(st.d)}</div></div></div>`).join('')}</div></section>`;
    case 'banner':
      return `<section class="${cls} t-center banner">
        ${s.label ? `<p class="label label--on">${esc(s.label)}</p>` : ''}
        <h2 class="h2 ${bg === 'primary' || bg === 'ink' ? 'on' : ''} big">${headHTML(s.head)}</h2>
        ${s.sub ? `<p class="sub ${bg === 'primary' || bg === 'ink' ? 'on' : ''}">${esc(s.sub)}</p>` : ''}</section>`;
    case 'stat': {
      const statsH = s.stats.map((st) => `<div class="statcell"><div class="statv">${esc(st.value)}</div><div class="statl">${esc(st.label)}</div></div>`).join('');
      return `<section class="${cls} t-center">
        ${s.head ? `<h2 class="h2">${esc(s.head)}</h2>` : ''}
        ${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ''}
        ${s.image ? `<div class="midimg">${ph(s.image, { h: 220 })}</div>` : ''}
        <div class="stats">${statsH}</div></section>`;
    }
    case 'reviews':
      return `<section class="${cls} t-center">
        ${s.title ? `<h2 class="h2">${esc(s.title)}</h2>` : ''}
        <div class="grid grid-${Math.min(s.items.length, 3)}">${s.items.map((r) => `<div class="card rcard">
          <div class="rstars">${stars(r.stars ?? 5)}</div>
          <div class="rt">"${esc(r.t)}"</div>${r.d ? `<div class="rd">${esc(r.d)}</div>` : ''}${r.who ? `<div class="rwho">${esc(r.who)}</div>` : ''}</div>`).join('')}</div></section>`;
    case 'spec':
      return `<section class="${cls} t-center">
        ${s.label ? `<p class="label">${esc(s.label)}</p>` : ''}
        ${s.title ? `<h2 class="h2">${esc(s.title)}</h2>` : ''}
        <table class="spectable">${s.rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table></section>`;
    case 'swatches':
      return `<section class="${cls} t-center">
        ${s.label ? `<p class="label">${esc(s.label)}</p>` : ''}
        ${s.head ? `<h2 class="h2">${esc(s.head)}</h2>` : ''}
        <div class="swgrid">${s.items.map((it) => `<div class="swcell"><span class="swdot" style="background:${it.c ?? 'var(--primary)'}"></span><span class="swt">${esc(it.name)}</span></div>`).join('')}</div></section>`;
    case 'compare':
      return `<section class="${cls} t-center">
        ${s.head ? `<h2 class="h2">${headHTML(s.head)}</h2>` : ''}
        ${s.body ? `<p class="sub">${esc(s.body)}</p>` : ''}
        <div class="compare"><div class="cmpbox">${ph(s.left, { h: 200 })}</div><div class="cmpbox">${ph(s.right, { h: 200 })}</div></div></section>`;
    case 'image': {
      if (s.cols) return `<section class="${cls}"><div class="imgrow">${s.cols.map((c) => `<div class="imgcell">${ph(c, { h: s.h ?? 200 })}</div>`).join('')}</div>${s.caption ? `<p class="cap">${esc(s.caption)}</p>` : ''}</section>`;
      return `<section class="${cls} t-center"><div class="${s.round ? 'roundwrap' : 'fullimg'}">${ph(s.label, { h: s.h ?? 300, round: s.round })}</div>${s.caption ? `<p class="cap">${esc(s.caption)}</p>` : ''}</section>`;
    }
    case 'detail':
      return `<section class="${cls}">
        ${s.label ? `<p class="label t-center">${esc(s.label)}</p>` : ''}
        ${s.head ? `<h2 class="h2 t-center">${esc(s.head)}</h2>` : ''}
        <div class="dlist">${s.items.map((it) => `<div class="drow"><div class="dimg">${ph(it.label, { round: true, h: 120, w: '120px' })}</div><div class="dtxt"><div class="dt">${esc(it.t)}</div><div class="dd">${esc(it.d)}</div></div></div>`).join('')}</div></section>`;
    case 'cta':
      return `<section class="${cls} t-center cta">
        ${s.image ? `<div class="cta-bg">${ph(s.image, { h: 600 })}</div>` : ''}
        <div class="cta-inner">
          ${s.label ? `<p class="label label--on">${esc(s.label)}</p>` : ''}
          <h2 class="h2 on big">${headHTML(s.head)}</h2>
          ${s.sub ? `<p class="sub on">${esc(s.sub)}</p>` : ''}
          ${s.benefits ? chipRow(s.benefits, 'chip--on') : ''}
          ${s.button ? `<div class="button">${esc(s.button)}</div>` : ''}</div></section>`;
    case 'notice':
      return `<section class="${cls} t-center">
        <div class="cp-title cp-title--ink">${esc(s.title)}</div>
        <ul class="noticelist">${s.items.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></section>`;
  }
}

export { renderSection, ph };
