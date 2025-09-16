# Vercel部署指南

## 🚀 快速部署到Vercel

### 1. 访问Vercel
- 打开 [vercel.com](https://vercel.com)
- 使用GitHub账号登录

### 2. 导入项目
- 点击 "New Project"
- 选择您的GitHub仓库 `scan-qr-page`
- 点击 "Import"

### 3. 配置项目
- **Framework Preset**: Next.js (自动检测)
- **Root Directory**: `./` (默认)
- **Build Command**: `npm run build` (自动)
- **Output Directory**: `.next` (自动)
- **Install Command**: `npm install` (自动)

### 4. 环境变量（可选）
如果需要，可以添加环境变量：
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 5. 部署
- 点击 "Deploy"
- 等待构建完成
- 访问提供的URL

## 🎯 预期结果

部署成功后，您应该看到：
- QR码扫描器界面
- 导航栏显示"QR码扫描器"
- 扫码功能正常工作
- 响应式设计

## 🔧 如果还是显示README

如果部署后仍然显示README，请检查：
1. 确保选择了正确的仓库
2. 确保构建成功完成
3. 清除浏览器缓存
4. 检查部署日志中的错误信息
