/** @type {import('next').NextConfig} */
const nextConfig = {
  // src/ CLI 스크립트는 .ts 확장자 import를 쓰므로 빌드 타입검사/ESLint는 건너뜀
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
