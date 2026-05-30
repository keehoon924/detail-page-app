/** 컷수 N에 맞춰 ref.sections 추리기 — essential 자동 추론 (hero/cta/spec/notice + 동종 첫 등장). */
import type { Template2, Section } from './engine.ts';

const ALWAYS_ESSENTIAL = new Set(['hero', 'cta', 'spec', 'notice']);

function isEssential(s: Section, idx: number, all: Section[]): boolean {
  const meta = (s as any)._essential;
  if (typeof meta === 'boolean') return meta;
  if (ALWAYS_ESSENTIAL.has(s.type)) return true;
  const sameBefore = all.slice(0, idx).filter((x) => x.type === s.type).length;
  return sameBefore === 0;
}

export function selectByCount(tpl: Template2, n: number): Template2 {
  const sections = tpl.sections;
  const total = sections.length;
  const N = Math.max(1, Math.min(n, total));

  const essIdx: number[] = [];
  const optIdx: number[] = [];
  sections.forEach((s, i) => { (isEssential(s, i, sections) ? essIdx : optIdx).push(i); });

  let picked = new Set<number>(essIdx);
  if (picked.size < N) {
    for (const i of optIdx) { if (picked.size >= N) break; picked.add(i); }
  }
  if (picked.size > N) {
    const arr = [...picked].sort((a, b) => a - b);
    const heroIdx = arr.find((i) => sections[i].type === 'hero');
    const ctaIdx = [...arr].reverse().find((i) => sections[i].type === 'cta');
    while (arr.length > N) {
      let removeAt = arr.length - 1;
      while (removeAt > 0 && (arr[removeAt] === ctaIdx || arr[removeAt] === heroIdx)) removeAt--;
      arr.splice(removeAt, 1);
    }
    picked = new Set(arr);
  }
  const finalIdx = [...picked].sort((a, b) => a - b);
  return { ...tpl, sections: finalIdx.map((i) => sections[i]) };
}
