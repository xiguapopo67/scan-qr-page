# QR码扫描器

一个基于 Next.js、HeroUI 和 Tailwind CSS 构建的现代化QR码扫描应用。

## 功能特性

- 📱 **实时QR码扫描** - 使用摄像头实时扫描QR码
- 🎨 **现代化UI** - 基于HeroUI组件库的美观界面
- 📋 **智能识别** - 自动识别链接、邮箱、电话等不同类型内容
- 🔗 **快速操作** - 一键打开链接、发送邮件或拨打电话
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🌙 **深色模式** - 支持明暗主题切换

## 技术栈

- **Next.js 15** - React全栈框架
- **HeroUI** - 现代化UI组件库
- **Tailwind CSS** - 实用优先的CSS框架
- **qr-scanner** - 高性能QR码扫描库
- **TypeScript** - 类型安全的JavaScript

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

1. **开始扫描** - 点击"开始扫描"按钮启动摄像头
2. **授权摄像头** - 首次使用需要授权摄像头权限
3. **扫描QR码** - 将QR码对准摄像头进行扫描
4. **查看结果** - 扫描成功后查看QR码内容
5. **快速操作** - 根据内容类型进行相应操作（打开链接、发送邮件等）

## 项目结构

```
src/
├── app/
│   ├── layout.tsx          # 应用布局和主题配置
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
└── components/
    ├── QRScanner.tsx       # QR码扫描组件
    ├── ScanResult.tsx      # 扫描结果展示组件
    └── index.ts            # 组件导出索引
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**注意**: 需要HTTPS环境或localhost才能使用摄像头功能。

## 部署

### Vercel部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/qr-scanner-nextjs)

### 其他平台

应用可以部署到任何支持Next.js的平台，如：
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 许可证

MIT License
