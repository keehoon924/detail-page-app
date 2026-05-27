/** 결정적 테스트 — gpt-image-1이 한글 텍스트를 이미지 안에 정확히 렌더하는지 확인. */
import { generateBackground } from './generate-bg.ts';

const prompt = `Korean e-commerce product detail page HERO section, vertical 2:3 portrait, clean modern commercial design.
Warm orange-to-coral gradient background.
At the TOP, a large bold Korean headline text, exactly this Hangul: "퇴근 후 5분, 매콤 불맛 국물 떡볶이".
Below the headline, a smaller Korean subtext, exactly this Hangul: "집에서 간편하게 즐기는 진짜 분식".
In the lower-center, a realistic delicious steaming bowl of Korean tteokbokki (spicy rice cakes).
IMPORTANT: render all Korean (Hangul) text accurately, correctly spelled, sharp and legible.`;

const r = await generateBackground(prompt, 'assets/imgtext-test.png');
console.log(`✅ assets/imgtext-test.png (${(r.bytes / 1024).toFixed(0)}KB)`);
