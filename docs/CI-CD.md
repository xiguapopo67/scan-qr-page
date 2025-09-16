# CI/CD 工作流程文档

本文档描述了QR码扫描应用的持续集成和持续部署(CI/CD)工作流程。

## 📋 工作流程概览

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)

**触发条件:**
- 推送到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 分支

**工作流程步骤:**

#### 🔍 代码质量检查 (Lint)
- 运行 ESLint 代码检查
- TypeScript 类型检查
- 确保代码质量和一致性

#### 🏗️ 构建和测试 (Build & Test)
- 安装依赖
- 构建应用
- 上传构建产物

#### 🔒 安全扫描 (Security)
- npm 安全审计
- Snyk 安全漏洞扫描
- 确保依赖安全性

#### 🚀 部署到 Vercel (Deploy)
- 仅 `main` 分支推送时触发
- 自动部署到生产环境
- 使用 Vercel 平台

#### 🐳 Docker 镜像构建
- 构建 Docker 镜像
- 推送到 GitHub Container Registry
- 支持多架构构建

### 2. 发布工作流程 (`.github/workflows/release.yml`)

**触发条件:**
- 推送版本标签 (如 `v1.0.0`)

**工作流程步骤:**

#### 📦 创建发布
- 自动生成变更日志
- 创建 GitHub Release
- 包含详细的发布说明

#### 🏗️ 构建生产版本
- 构建优化后的生产版本
- 上传构建产物到 Release

#### 🚀 部署到生产环境
- 部署到 Vercel 生产环境
- 发送部署通知

## 🛠️ 环境配置

### GitHub Secrets 配置

在 GitHub 仓库设置中添加以下 Secrets:

```bash
# Vercel 部署
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# 安全扫描 (可选)
SNYK_TOKEN=your_snyk_token
```

### 获取 Vercel 配置

1. 安装 Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. 登录并链接项目:
   ```bash
   vercel login
   vercel link
   ```

3. 获取配置信息:
   ```bash
   vercel env pull .env.local
   ```

## 🐳 Docker 部署

### 本地开发

```bash
# 开发环境
docker-compose --profile dev up

# 生产环境
docker-compose up
```

### 生产部署

```bash
# 构建镜像
docker build -t qr-scanner-app .

# 运行容器
docker run -p 3000:3000 qr-scanner-app
```

## 📊 监控和日志

### 构建状态
- 查看 GitHub Actions 页面了解构建状态
- 设置 Slack/邮件通知

### 应用监控
- Vercel Analytics (自动启用)
- 错误监控和性能追踪

## 🔧 自定义配置

### 修改构建命令

在 `package.json` 中自定义脚本:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:coverage": "jest --coverage"
  }
}
```

### 添加测试

1. 安装测试框架:
   ```bash
   npm install --save-dev jest @testing-library/react
   ```

2. 在 CI 工作流程中添加测试步骤:
   ```yaml
   - name: Run tests
     run: npm test
   ```

### 环境变量

在 Vercel 项目设置中配置环境变量:

```bash
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🚨 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本兼容性
   - 验证所有依赖是否正确安装

2. **部署失败**
   - 检查 Vercel 配置和权限
   - 验证环境变量设置

3. **Docker 构建失败**
   - 检查 Dockerfile 语法
   - 验证基础镜像可用性

### 调试步骤

1. 查看 GitHub Actions 日志
2. 检查 Vercel 部署日志
3. 验证本地构建是否成功

## 📈 性能优化

### 构建优化
- 使用 Turbopack 加速构建
- 启用构建缓存
- 优化 Docker 镜像大小

### 部署优化
- 启用 Vercel Edge Functions
- 配置 CDN 缓存策略
- 使用 Next.js 图片优化

## 🔄 回滚策略

### 自动回滚
- Vercel 自动回滚失败的部署
- 保留前一个稳定版本

### 手动回滚
```bash
# 使用 Vercel CLI
vercel rollback

# 或通过 GitHub 重新部署特定提交
```

## 📚 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vercel 部署文档](https://vercel.com/docs)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
