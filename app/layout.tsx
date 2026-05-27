import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: '상세페이지 자동 생성기',
  description: '제품 정보를 입력하면 13컷 상세페이지를 자동 생성합니다.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
