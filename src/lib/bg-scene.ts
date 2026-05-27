/**
 * #4 컨텍스트 배경 생성 + 합성.
 * 카테고리/섹션에 맞는 배경을 gpt-image-1로 생성(텍스트/로고 금지) 후
 * 누끼한 제품을 sharp로 합성한다.
 */
import sharp from 'sharp';
import { generateBackground } from '../generate-bg.ts';

const SCENE: Record<string, string> = {
  '전자기기': 'modern minimal studio with a soft gradient backdrop and a clean reflective surface',
  '식품': 'a warm wooden kitchen table with natural daylight, cozy and appetizing',
  '뷰티': 'an elegant marble surface with soft flowers and gentle water droplets, soft diffused lighting',
  '패션': 'an urban concrete wall with natural daylight, editorial lookbook mood',
  '유아': 'a soft pastel nursery with gentle knit fabric and warm light',
  '반려동물': 'a bright cozy home floor with soft natural light',
  '생활': 'a clean modern home interior with soft light',
  '건강': 'a calm wellness setting with warm natural light',
  '기타': 'a minimal premium studio with a soft gradient',
};

export function buildScenePrompt(category: string, role = 'hero'): string {
  const scene = SCENE[category] ?? SCENE['기타'];
  const mood =
    role === 'hero' ? 'cinematic, impactful lighting, generous empty space'
      : role === 'scenario' ? 'real-life use environment, lifestyle feel'
        : 'clean, minimal, even soft light';
  return `Commercial product photography background scene: ${scene}. ${mood}. Keep a clear empty area in the center-lower part for a product to be placed later. Vertical portrait composition. Absolutely NO people, NO humans, NO hands, NO faces, NO text, no letters, no numbers, no logos, no watermark, and NO product in the scene. Empty environment only.`;
}

export async function genScene(category: string, role: string, outPath: string) {
  return generateBackground(buildScenePrompt(category, role), outPath);
}

/** 누끼 제품(투명 PNG)을 배경 위 중앙-하단에 합성. */
export async function composeScene(cutPath: string, bgPath: string, outPath: string) {
  const m = await sharp(bgPath).metadata();
  const W = m.width ?? 1024;
  const H = m.height ?? 1536;
  const pw = Math.round(W * 0.6);
  const prod = await sharp(cutPath).resize({ width: pw }).png().toBuffer();
  const pm = await sharp(prod).metadata();
  const left = Math.round((W - pw) / 2);
  const top = Math.max(0, Math.round(H - (pm.height ?? 0) - H * 0.08));
  await sharp(bgPath).composite([{ input: prod, left, top }]).png().toFile(outPath);
  return outPath;
}
