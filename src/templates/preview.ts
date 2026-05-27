/** 스펙 → HTML 프리뷰 (검증용). 절대좌표 div 렌더. */
import type { Template, Block } from './types.ts';

const FONT: Record<string, string> = {
  sans: "'Pretendard',sans-serif",
  script: "'Nanum Pen Script',cursive",
  serif: "'Noto Serif KR',serif",
};

/** hex(+alpha) → rgba() 문자열 */
function rgba(hex: string, a?: number): string {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(f, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a == null ? 1 : a})`;
}

function blockHTML(b: Block): string {
  const pos = `position:absolute;left:${b.x}px;top:${b.y}px;width:${b.w}px;`;
  const op = b.opacity != null ? `opacity:${b.opacity};` : '';
  const rot = b.rotate ? `transform:rotate(${b.rotate}deg);` : '';
  const stroke = b.stroke ? `border:${b.strokeW ?? 1}px solid ${b.stroke};` : '';

  if (b.t === 'rect') {
    let bg = b.fill ?? 'transparent';
    if (b.grad) bg = `linear-gradient(${b.grad.angle ?? 180}deg, ${rgba(b.grad.from, b.grad.fromA)}, ${rgba(b.grad.to, b.grad.toA)})`;
    return `<div style="${pos}height:${b.h}px;${op}${rot}background:${bg};border-radius:${b.radius ?? 0}px;${stroke}box-sizing:border-box"></div>`;
  }
  if (b.t === 'ellipse') {
    return `<div style="${pos}height:${b.h}px;${op}${rot}background:${b.fill ?? 'transparent'};border-radius:50%;${stroke}box-sizing:border-box"></div>`;
  }
  if (b.t === 'line') {
    return `<div style="${pos}height:${b.h ?? b.strokeW ?? 2}px;${op}${rot}background:${b.stroke ?? b.fill ?? '#000'}"></div>`;
  }
  if (b.t === 'photo') {
    const circle = b.shape === 'circle';
    const radius = circle ? '50%' : (b.radius ?? 12) + 'px';
    if (b.b64) { // 실제 이미지
      const url = `data:${b.mime ?? 'image/jpeg'};base64,${b.b64}`;
      const focal = `${Math.round((b.focusX ?? 0.5) * 100)}% ${Math.round((b.focusY ?? 0.5) * 100)}%`;
      const sizeMode = b.fit === 'contain' ? 'contain' : 'cover';
      const layers: string[] = [];
      if (b.overlay) { const c = rgba(b.overlay, b.overlayOpacity ?? 0.35); layers.push(`linear-gradient(${c},${c})`); }
      layers.push(`url('${url}')`);
      return `<div style="${pos}height:${b.h}px;${op}${rot}background-image:${layers.join(',')};background-size:${sizeMode};background-position:${focal};background-repeat:no-repeat;background-color:#edeae4;border-radius:${radius};box-sizing:border-box"></div>`;
    }
    const icon = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b6b0a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:6px"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5L5 21"/></svg>`;
    return `<div style="${pos}height:${b.h}px;${op}${rot}background:#edeae4;border:1px solid #d9d4ca;border-radius:${radius};display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;color:#a39d92;font:500 12px Pretendard;text-align:center;padding:8px;overflow:hidden">${icon}<span style="line-height:1.3">${b.label ?? ''}</span></div>`;
  }
  // text
  const f = FONT[b.font ?? 'sans'];
  return `<div style="${pos}${op}${rot}font-family:${f};font-size:${b.size ?? 16}px;font-weight:${b.weight ?? 400};color:${b.color ?? '#222'};text-align:${b.align ?? 'left'};line-height:${b.lineH ?? 1.4};letter-spacing:${b.ls ?? 0}px;white-space:pre-wrap;word-break:keep-all">${(b.text ?? '').replace(/\n/g, '<br>')}</div>`;
}

export function templateHTML(t: Template): string {
  return `<div class="tpl" style="position:relative;width:${t.w}px;height:${t.h}px;background:${t.bg};overflow:hidden;flex:none">
    ${t.blocks.map(blockHTML).join('')}
  </div>`;
}

export function pageHTML(templates: Template[]): string {
  const items = templates.map((t) =>
    `<div class="col"><div class="cap">${t.category} / ${t.id} (${t.w}×${t.h})</div>${templateHTML(t)}</div>`
  ).join('');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8">
  <style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Serif+KR:wght@400;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#cfcfcf;padding:30px;font-family:Pretendard}
  .row{display:flex;gap:30px;align-items:flex-start;flex-wrap:wrap}
  .col{background:#fff;padding:10px;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15)}
  .cap{font-weight:700;font-size:14px;margin-bottom:8px;color:#444}
  </style></head>
  <body><div class="row">${items}</div></body></html>`;
}
