/**
 * 템플릿 스펙 — 레퍼런스 1장 = Template 1개.
 * 절대좌표 블록(rect/ellipse/text/line/photo)으로 레이아웃 기본 틀을 기술.
 * 이 스펙 하나에서 ① Figma 플러그인(편집 레이어) ② HTML 프리뷰(검증) 둘 다 생성.
 */

export type FontKind = 'sans' | 'script' | 'serif';
export type Align = 'left' | 'center' | 'right';

export interface Block {
  t: 'rect' | 'ellipse' | 'text' | 'line' | 'photo';
  x: number;
  y: number;
  w: number;
  h?: number; // text 는 자동높이 가능
  // 도형
  fill?: string; // hex
  radius?: number; // 모서리 (rect/photo)
  stroke?: string;
  strokeW?: number;
  opacity?: number; // 0~1
  rotate?: number; // deg
  // 텍스트
  text?: string;
  size?: number;
  weight?: number; // 400/500/700/800
  color?: string;
  align?: Align;
  font?: FontKind;
  lineH?: number; // 배수 (1.4 등)
  ls?: number; // letter-spacing px
  // 사진 placeholder
  shape?: 'rect' | 'circle';
  label?: string; // placeholder 안 표기
  // 실제 이미지 (photo 블록에 src 지정 시 회색 대신 진짜 이미지로 채움)
  src?: string;   // 프로젝트 루트 기준 이미지 경로 (예: 'inputs/images/제품/01.jpg')
  b64?: string;   // 빌드시 자동 주입 (base64 본문). 직접 쓰지 말 것.
  mime?: string;  // 빌드시 자동 주입 (image/jpeg 등). 직접 쓰지 말 것.
  fit?: 'cover' | 'contain'; // 채우기(cover=잘라서 꽉, 기본) / 맞춤(contain=전체 보이게)
  focusX?: number; // 0~1 크롭 초점 가로 (기본 0.5) — cover일 때 어디를 살릴지
  focusY?: number; // 0~1 크롭 초점 세로 (기본 0.5)
  overlay?: string;        // 이미지 위 단색 스크림(글자 가독성용) hex
  overlayOpacity?: number; // 0~1 (기본 0.35)
  // 그라데이션 (rect 전용): 풀블리드 이미지 위 글자 가독성 스크림 등
  grad?: { from: string; to: string; angle?: number; fromA?: number; toA?: number };
}

export interface Template {
  id: string; // 파일/프레임 이름 (예: '식품1')
  category: string; // '식품' 등
  w: number; // 프레임 폭
  h: number; // 프레임 높이
  bg: string; // 배경 hex
  blocks: Block[];
}
