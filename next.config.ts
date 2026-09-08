import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'gsap', 'lenis'],
};

export default nextConfig;
