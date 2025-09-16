import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出配置（用于GitHub Pages）
  output: 'export',
  
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  // 确保正确的路径
  trailingSlash: true,
  
  // 环境变量
  env: {
    NEXT_PUBLIC_APP_NAME: 'QR码扫描器',
  },
  
  // 确保所有页面都被导出
  generateStaticParams: true,
};

export default nextConfig;
