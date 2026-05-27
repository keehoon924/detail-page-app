import type { Template } from '../types.ts';
import { FOOD } from './food.ts';
import { ELECTRONICS } from './electronics.ts';
import { FASHION } from './fashion.ts';
import { PETBABY } from './pet-baby.ts';

// 재현 대상 16종 (초장문 4장 제외: 뷰티A/B/C, 프리미엄A)
export const ALL: Template[] = [
  ...FOOD,
  ...ELECTRONICS,
  ...FASHION,
  ...PETBABY,
];
