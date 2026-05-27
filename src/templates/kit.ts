/**
 * 작성 툴킷 — 단일 연속 세로 상세페이지를 y커서로 쌓는다.
 * 레퍼런스 1장 = P 1개. 색 섹션·뱃지·번호원·다단·체크리스트·표 헬퍼 제공.
 * 좌표는 절대값으로 기록되어 Figma 레이어 / HTML 프리뷰 양쪽에 그대로 쓰인다.
 */
import type { Block, Template, FontKind, Align } from './types.ts';

export interface TextOpt {
  weight?: number; color?: string; align?: Align; font?: FontKind;
  lineH?: number; ls?: number; gap?: number; x?: number; w?: number;
}

/** 이미지 옵션 (photo/aphoto/bgimage 공통) */
export interface ImgOpt {
  src?: string;            // 이미지 경로 (없으면 회색 placeholder)
  fit?: 'cover' | 'contain';
  focusX?: number; focusY?: number; // 크롭 초점 0~1
  overlay?: string; overlayOpacity?: number; // 단색 스크림
}
/** ImgOpt → Block 필드만 추려 반환 (undefined는 그대로 둠) */
function img(o: ImgOpt) {
  return { src: o.src, fit: o.fit, focusX: o.focusX, focusY: o.focusY, overlay: o.overlay, overlayOpacity: o.overlayOpacity };
}

export class P {
  B: Block[] = [];
  y = 0;
  constructor(public w = 860, public pad = 64) {}

  cw() { return this.w - this.pad * 2; }          // 콘텐츠 폭
  at() { return this.y; }
  gap(n: number) { this.y += n; return this; }
  to(y: number) { this.y = y; return this; }

  /* ─ 배경 레이어 (커서 전진 안 함; 위에 콘텐츠를 올린다) ─ */
  bg(h: number, fill: string, o: { x?: number; w?: number; radius?: number; y?: number } = {}) {
    this.B.push({ t: 'rect', x: o.x ?? 0, y: o.y ?? this.y, w: o.w ?? this.w, h, fill, radius: o.radius });
    return this;
  }
  /* ─ 절대 블록 (커서 전진 안 함) ─ */
  abs(b: Block) { this.B.push(b); return this; }

  /* ─ 박스 (커서 전진) ─ */
  rect(h: number, o: { fill?: string; x?: number; w?: number; radius?: number; stroke?: string; strokeW?: number; gap?: number; opacity?: number } = {}) {
    this.B.push({ t: 'rect', x: o.x ?? this.pad, y: this.y, w: o.w ?? this.cw(), h, fill: o.fill, radius: o.radius, stroke: o.stroke, strokeW: o.strokeW, opacity: o.opacity });
    this.y += h + (o.gap ?? 0);
    return this;
  }

  /* ─ 텍스트 (커서 전진: gap 우선, 없으면 줄 수 추정) ─ */
  text(text: string, size: number, o: TextOpt = {}) {
    const lineH = o.lineH ?? 1.45;
    const w = o.w ?? this.cw();
    const lines = this._lines(text, size, w);
    this.B.push({ t: 'text', x: o.x ?? this.pad, y: this.y, w, text, size, weight: o.weight ?? 400, color: o.color ?? '#2b2b2b', align: o.align ?? 'left', font: o.font, lineH, ls: o.ls });
    // 전진: gap은 "텍스트 다음 위치까지" 의미. 실제 텍스트 높이보다 작으면 겹치므로 둘 중 큰 값을 쓴다.
    const textH = Math.round(lines * size * lineH);
    if (o.gap != null) this.y += Math.max(o.gap, textH);
    else this.y += textH + Math.round(size * 0.5);
    return this;
  }
  /* 가운데 정렬 풀폭 텍스트 */
  ctext(text: string, size: number, o: TextOpt = {}) {
    return this.text(text, size, { ...o, align: 'center', x: o.x ?? this.pad, w: o.w ?? this.cw() });
  }
  /* 절대 위치 텍스트 (전진 안 함) */
  atext(x: number, y: number, w: number, text: string, size: number, o: TextOpt = {}) {
    this.B.push({ t: 'text', x, y, w, text, size, weight: o.weight ?? 400, color: o.color ?? '#2b2b2b', align: o.align ?? 'left', font: o.font, lineH: o.lineH ?? 1.45, ls: o.ls });
    return this;
  }

  /* ─ 사진 (커서 전진). src 주면 실제 이미지, 없으면 회색 placeholder ─ */
  photo(h: number, label: string, o: ImgOpt & { x?: number; w?: number; shape?: 'rect' | 'circle'; radius?: number; gap?: number } = {}) {
    this.B.push({ t: 'photo', x: o.x ?? this.pad, y: this.y, w: o.w ?? this.cw(), h, shape: o.shape ?? 'rect', radius: o.radius ?? 16, label, ...img(o) });
    this.y += h + (o.gap ?? 0);
    return this;
  }
  aphoto(x: number, y: number, w: number, h: number, label: string, o: ImgOpt & { shape?: 'rect' | 'circle'; radius?: number } = {}) {
    this.B.push({ t: 'photo', x, y, w, h, shape: o.shape ?? 'rect', radius: o.radius ?? 16, label, ...img(o) });
    return this;
  }
  /* ─ 풀블리드 배경 이미지 (커서 전진 안 함; 위에 글자/스크림을 올린다) ─ */
  bgimage(h: number, src: string, o: ImgOpt & { x?: number; w?: number; y?: number; radius?: number } = {}) {
    this.B.push({ t: 'photo', x: o.x ?? 0, y: o.y ?? this.y, w: o.w ?? this.w, h, shape: 'rect', radius: o.radius ?? 0, label: '', src, fit: o.fit ?? 'cover', focusX: o.focusX, focusY: o.focusY, overlay: o.overlay, overlayOpacity: o.overlayOpacity });
    return this;
  }
  /* ─ 그라데이션 스크림 (커서 전진 안 함). 풀블리드 위 글자 가독성용 ─ */
  grad(h: number, from: string, to: string, o: { x?: number; w?: number; y?: number; angle?: number; fromA?: number; toA?: number; radius?: number } = {}) {
    this.B.push({ t: 'rect', x: o.x ?? 0, y: o.y ?? this.y, w: o.w ?? this.w, h, radius: o.radius, grad: { from, to, angle: o.angle ?? 180, fromA: o.fromA, toA: o.toA } });
    return this;
  }

  /* ─ 알약 뱃지 (가운데 cx, 또는 x지정). 커서 전진 옵션 ─ */
  pill(text: string, o: { y?: number; cx?: boolean; x?: number; bg?: string; color?: string; size?: number; padX?: number; h?: number; font?: FontKind; weight?: number; ls?: number; advance?: boolean; gap?: number } = {}) {
    const size = o.size ?? 16, padX = o.padX ?? 22, h = o.h ?? Math.round(size * 2.4);
    const tw = this._tw(text, size, o.weight ?? 700, o.ls ?? 0);
    const bw = Math.round(tw + padX * 2);
    const y = o.y ?? this.y;
    const x = o.cx ? Math.round((this.w - bw) / 2) : (o.x ?? this.pad);
    this.B.push({ t: 'rect', x, y, w: bw, h, fill: o.bg ?? '#222', radius: Math.round(h / 2) });
    this.B.push({ t: 'text', x, y: y + Math.round((h - size * 1.2) / 2), w: bw, text, size, weight: o.weight ?? 700, color: o.color ?? '#fff', align: 'center', font: o.font, ls: o.ls });
    if (o.advance) this.y = y + h + (o.gap ?? 0);
    return this;
  }

  /* ─ 가운데 정렬 칩 행 (커서 전진) ─ */
  chips(items: string[], o: { bg?: string; color?: string; size?: number; gap?: number; padX?: number; h?: number; weight?: number; stroke?: string; strokeW?: number; advanceGap?: number } = {}) {
    const size = o.size ?? 15, padX = o.padX ?? 18, h = o.h ?? Math.round(size * 2.3), gap = o.gap ?? 10;
    const ws = items.map((t) => Math.round(this._tw(t, size, o.weight ?? 700, 0) + padX * 2));
    const total = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
    let x = Math.round((this.w - total) / 2);
    items.forEach((t, i) => {
      this.B.push({ t: 'rect', x, y: this.y, w: ws[i], h, fill: o.bg, radius: Math.round(h / 2), stroke: o.stroke, strokeW: o.strokeW });
      this.B.push({ t: 'text', x, y: this.y + Math.round((h - size * 1.2) / 2), w: ws[i], text: t, size, weight: o.weight ?? 700, color: o.color ?? '#fff', align: 'center' });
      x += ws[i] + gap;
    });
    this.y += h + (o.advanceGap ?? 0);
    return this;
  }

  /* ─ 번호/아이콘 원 (절대) ─ */
  circle(x: number, y: number, d: number, fill: string, o: { label?: string; color?: string; size?: number; weight?: number; stroke?: string; strokeW?: number } = {}) {
    this.B.push({ t: 'ellipse', x, y, w: d, h: d, fill, stroke: o.stroke, strokeW: o.strokeW });
    if (o.label != null) {
      const size = o.size ?? Math.round(d * 0.4);
      this.B.push({ t: 'text', x, y: y + Math.round((d - size * 1.2) / 2), w: d, text: o.label, size, weight: o.weight ?? 700, color: o.color ?? '#fff', align: 'center' });
    }
    return this;
  }

  /* ─ N단 열 좌표 계산. render(i, x, colW) ─ */
  cols(n: number, gapPx: number, render: (i: number, x: number, colW: number) => void, o: { x?: number; w?: number } = {}) {
    const x0 = o.x ?? this.pad, total = o.w ?? this.cw();
    const colW = Math.round((total - gapPx * (n - 1)) / n);
    for (let i = 0; i < n; i++) render(i, x0 + i * (colW + gapPx), colW);
    return this;
  }

  /* ─ 가는 구분선 ─ */
  hr(o: { color?: string; x?: number; w?: number; gap?: number; h?: number } = {}) {
    this.B.push({ t: 'line', x: o.x ?? this.pad, y: this.y, w: o.w ?? this.cw(), h: o.h ?? 2, fill: o.color ?? '#e3e3e3' });
    this.y += (o.h ?? 2) + (o.gap ?? 0);
    return this;
  }

  done(id: string, category: string, bg: string): Template {
    return { id, category, w: this.w, h: Math.ceil(this.y + 40), bg, blocks: this.B };
  }

  /* ── 내부: 폭 기반 줄 수 / 텍스트 폭 추정(한글 ~0.92em, 영문/숫자 ~0.55em) ── */
  private _charW(ch: string, em: number) {
    const code = ch.codePointAt(0) ?? 0;
    const wide = code > 0x1100; // 한글·CJK·기호 대략
    return em * (wide ? 0.98 : (/[A-Z]/.test(ch) ? 0.62 : 0.52));
  }
  private _tw(text: string, size: number, weight: number, ls: number) {
    const em = size * (weight >= 700 ? 1.02 : 1);
    let w = 0; for (const ch of text) w += this._charW(ch, em) + ls;
    return w;
  }
  private _lines(text: string, size: number, boxW: number) {
    let lines = 0;
    for (const seg of text.split('\n')) {
      const tw = this._tw(seg, size, 400, 0);
      lines += Math.max(1, Math.ceil(tw / boxW));
    }
    return lines;
  }
}

/** 별점 문자열 */
export const stars = (n = 5) => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
