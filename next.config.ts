import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 确保正确输出
  output: 'standalone',
  
  // 启用实验性功能
  experimental: {
    // 确保Turbopack正常工作
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // 图片优化
  images: {
    unoptimized: true,
  },
  
  // 确保正确的构建输出
  trailingSlash: false,
  
  // 环境变量
  env: {
    NEXT_PUBLIC_APP_NAME: 'QR码扫描器',
  },
};

export default nextConfig;
