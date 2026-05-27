/**
 * Phase B 통합 오케스트레이터 — 업로드 사진을 "어울리게" 가공.
 *  #2 비전 분류 → 섹션 매칭, #3 누끼(별도 프로세스), #4 씬 생성+합성, #6 스톡 사람.
 *
 * 주의: 누끼(@imgly sharp)와 우리 sharp 충돌 회피 위해 누끼는 cutout-cli 자식 프로세스로 실행.
 * 실제 호출 시 #4(씬 생성)는 gpt-image-1 과금, #6은 PEXELS_API_KEY 필요.
 */
import { spawn } from 'node:child_process';
import { genScene, composeScene } from './lib/bg-scene.ts';
import { classifyPhoto, TYPE_TO_ROLE, type PhotoType } from './lib/vision.ts';
import { searchStock, peopleQuery } from './lib/stock.ts';

function runCutout(inp: string, outp: string): Promise<boolean> {
  return new Promise((resolve) => {
    const p = spawn('npx', ['tsx', 'src/cutout-cli.ts', inp, outp], { shell: true, cwd: process.cwd(), env: process.env });
    p.on('close', (code) => resolve(code === 0));
    p.on('error', () => resolve(false));
  });
}

export type Enhanced = {
  classified: { path: string; type: PhotoType; role: string; desc: string }[];
  heroScene?: string;
  stock?: string | null;
};

/** 사진들을 분석·가공해 섹션 매칭 + 히어로 씬 합성 결과를 반환. */
export async function enhancePhotos(photos: string[], category: string, target?: string): Promise<Enhanced> {
  // #2 비전 분류 → 역할 매칭
  const classified = await Promise.all(
    photos.map(async (p) => {
      const c = await classifyPhoto(p);
      return { path: p, type: c.type, desc: c.desc, role: TYPE_TO_ROLE[c.type] };
    }),
  );

  // #3+#4 히어로: 전체샷 우선 → 누끼(별도 프로세스) → 씬 생성 → 합성
  const heroSrc = classified.find((c) => c.type === '전체샷')?.path ?? photos[0];
  let heroScene: string | undefined;
  if (heroSrc) {
    const cut = 'assets/enh-hero-cut.png';
    if (await runCutout(heroSrc, cut)) {
      await genScene(category, 'hero', 'assets/enh-hero-bg.png');
      heroScene = await composeScene(cut, 'assets/enh-hero-bg.png', 'assets/enh-hero-scene.png');
    }
  }

  // #6 스톡 사람 사진(키 있을 때)
  const stock = await searchStock(peopleQuery(category, target), 'assets/enh-people.jpg');

  return { classified, heroScene, stock };
}
