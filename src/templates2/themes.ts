import type { Theme } from './engine.ts';

const T = (primary: string, primaryDeep: string, light: string, light2: string, ink: string, sub: string, accent: string, bg: string, onPrimary: string): Theme =>
  ({ primary, primaryDeep, light, light2, ink, sub, accent, bg, onPrimary });

export const THEMES: Record<string, Theme> = {
  식품1: T('#d50001', '#b00000', '#f8ece1', '#f3e3d2', '#33241c', '#7a6a5a', '#a76743', '#fbf4ec', '#fdf3e8'),
  식품2: T('#ff5a3c', '#e0432a', '#ffe7e0', '#ffd9cf', '#2b2b2b', '#777777', '#ff5a3c', '#f6f5f3', '#fff5f0'),
  식품3: T('#f5821f', '#e0670a', '#fde9d2', '#fbdcb8', '#4a2f15', '#8a6f55', '#c9701a', '#fdf1e2', '#fff3e6'),
  식품4: T('#f5821f', '#e0670a', '#fdf3c5', '#fce9a8', '#5a3a10', '#8a6f3a', '#d50001', '#fdfae8', '#fff3e0'),
  식품5: T('#ef7d3a', '#d8650f', '#fdeadb', '#fbdcc2', '#3a2a1c', '#8a7560', '#ef7d3a', '#fff7f0', '#fff3e8'),
  전자기기1: T('#7a3b1a', '#5e2c12', '#eceae4', '#e3dfd4', '#2b2b2b', '#8a8478', '#9a7b3a', '#f2f0ea', '#f5ece0'),
  전자기기2: T('#3a7abf', '#2c5f9a', '#eef4fb', '#dbe9f7', '#2b2b2b', '#8a8a8a', '#3a7abf', '#ffffff', '#eef4fb'),
  밥솥: T('#3f8f3f', '#2e7030', '#f2f1ee', '#e7e6e1', '#2b2b2b', '#8a8a8a', '#3f8f3f', '#ffffff', '#eaf5ea'),
  선풍기: T('#2f7fd0', '#245f9f', '#eef6fc', '#dbeefb', '#2b2b2b', '#8a8a8a', '#2f7fd0', '#ffffff', '#eef6fc'),
  에어프라이기: T('#e0670a', '#c0560a', '#f4f3f1', '#e9e7e3', '#1f1f1f', '#8a8a8a', '#e0670a', '#ffffff', '#fff2e6'),
  유아3: T('#6a93a8', '#4f7387', '#efedea', '#e4e1db', '#2b2b2b', '#8a857d', '#6a93a8', '#e6e3de', '#eef4f6'),
  유아4: T('#b08a5a', '#8a6a40', '#f6f1ea', '#ece4d6', '#3a2e26', '#8a7d70', '#c79a52', '#161616', '#fff7ec'),
  유아A: T('#9a6a3a', '#7a5028', '#f5efe7', '#ece2d4', '#3a2e26', '#8a7d70', '#9a6a3a', '#faf6ef', '#fff7ec'),
  유아5: T('#9a6a3a', '#7a5028', '#f3ece2', '#e8dccb', '#3a2e26', '#8a7d70', '#9a6a3a', '#f7f1e8', '#fff7ec'),
  뷰티A: T('#e8527a', '#d83a66', '#fdeef2', '#fbdce4', '#3a2a30', '#9a8088', '#e8527a', '#fff7f9', '#ffffff'),
  뷰티B: T('#e0436e', '#c52f59', '#fde9f0', '#f9d3e0', '#3a2a30', '#9a8088', '#e0436e', '#fff7fa', '#ffffff'),
  뷰티C: T('#e8607a', '#d8475f', '#fdeef0', '#fbdce0', '#3a2a2e', '#9a8085', '#e8607a', '#fff8f8', '#ffffff'),
  패션1: T('#3a342e', '#232019', '#efe9e1', '#e6ded2', '#2b2b2b', '#8a8580', '#7a6a52', '#faf7f2', '#efe9e1'),
  패션2: T('#d98aa0', '#c06d85', '#f6efe9', '#efe4d9', '#4a3a3a', '#9a8580', '#c0708a', '#faf5f0', '#ffffff'),
  프리미엄A: T('#2b3147', '#1c2133', '#f3efe9', '#e9e2d8', '#2b2b2b', '#8a8580', '#9a6a7a', '#faf8f4', '#ffffff'),
};
