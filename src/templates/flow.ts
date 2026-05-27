/** 수직 흐름 빌더 — 단일세로(롱) 레퍼런스용. y커서로 섹션을 순서대로 쌓는다. */
import type { Block, Template, FontKind, Align } from './types.ts';

interface TextOpt { weight?: number; color?: string; align?: Align; font?: FontKind; lineH?: number; ls?: number; down?: number; x?: number; w?: number; }
interface PhotoOpt { x?: number; w?: number; shape?: 'rect' | 'circle'; radius?: number; }

export class Flow {
  blocks: Block[] = [];
  y = 0;
  constructor(public w = 640, public pad = 48) {}

  at() { return this.y; }
  set(y: number) { this.y = y; return this; }
  gap(px: number) { this.y += px; return this; }

  /** 배경 밴드(현재 y에 깔되 커서는 그대로). 색 섹션의 바탕용. */
  band(h: number, fill: string, opacity?: number) {
    this.blocks.push({ t: 'rect', x: 0, y: this.y, w: this.w, h, fill, opacity });
    return this.y;
  }
  /** 박스(커서 전진). */
  rect(h: number, fill: string, opt: { x?: number; w?: number; radius?: number; stroke?: string; strokeW?: number; gap?: number } = {}) {
    this.blocks.push({ t: 'rect', x: opt.x ?? this.pad, y: this.y, w: opt.w ?? this.w - this.pad * 2, h, fill, radius: opt.radius, stroke: opt.stroke, strokeW: opt.strokeW });
    this.y += h + (opt.gap ?? 16);
    return this;
  }
  text(text: string, size: number, opt: TextOpt = {}) {
    const lines = text.split('\n').length;
    this.blocks.push({ t: 'text', x: opt.x ?? this.pad, y: this.y, w: opt.w ?? this.w - this.pad * 2, text, size, weight: opt.weight ?? 400, color: opt.color ?? '#2b2b2b', align: opt.align ?? 'left', font: opt.font, lineH: opt.lineH ?? 1.4, ls: opt.ls });
    this.y += opt.down ?? Math.round(lines * size * (opt.lineH ?? 1.4) + 12);
    return this;
  }
  photo(h: number, label: string, opt: PhotoOpt = {}) {
    this.blocks.push({ t: 'photo', x: opt.x ?? this.pad, y: this.y, w: opt.w ?? this.w - this.pad * 2, h, shape: opt.shape ?? 'rect', radius: opt.radius ?? 12, label });
    this.y += h + 18;
    return this;
  }
  /** 임의 블록 추가(절대좌표; 커서 영향 없음). */
  add(b: Block) { this.blocks.push(b); return this; }

  done(id: string, category: string, bg: string): Template {
    return { id, category, w: this.w, h: Math.ceil(this.y + 40), bg, blocks: this.blocks };
  }
}
