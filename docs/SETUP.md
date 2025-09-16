# 项目设置指南

本指南将帮助您完成QR码扫描应用的初始设置和部署配置。

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd qr-scanner-nextjs
npm install
npm run dev
```

### 2. 配置GitHub Actions

#### 方法一：使用简化工作流程（推荐）
1. 删除复杂的CI文件：
   ```bash
   rm .github/workflows/ci.yml
   rm .github/workflows/release.yml
   ```

2. 重命名简化版本：
   ```bash
   mv .github/workflows/simple-ci.yml .github/workflows/ci.yml
   ```

#### 方法二：配置完整工作流程
如果您想使用完整的工作流程，需要配置以下Secrets：

### 3. 配置GitHub Secrets

在GitHub仓库设置中添加以下Secrets：

#### 必需配置
```bash
# Vercel部署配置
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### 可选配置
```bash
# Snyk安全扫描（可选）
SNYK_TOKEN=your_snyk_token
```

### 4. 获取Vercel配置

#### 方法一：使用Vercel CLI
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 在项目目录中链接
vercel link

# 获取配置信息
vercel env pull .env.local
```

#### 方法二：从Vercel Dashboard
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 创建新项目或选择现有项目
3. 在项目设置中找到：
   - **Token**: 在Account Settings > Tokens中创建
   - **Org ID**: 在项目设置 > General中查看
   - **Project ID**: 在项目设置 > General中查看

### 5. 测试部署

#### 本地测试
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
npm start
```

#### 推送到GitHub
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: QR scanner app"

# 推送到main分支
git push origin main
```

## 🔧 故障排除

### 常见问题

#### 1. GitHub Actions失败
**问题**: 工作流程运行失败
**解决方案**:
- 检查Secrets是否正确配置
- 查看Actions日志了解具体错误
- 确保分支名称正确（main或develop）

#### 2. Vercel部署失败
**问题**: Vercel部署失败
**解决方案**:
- 验证Vercel Token是否有效
- 检查Org ID和Project ID是否正确
- 确保项目在Vercel中已正确配置

#### 3. 构建失败
**问题**: 应用构建失败
**解决方案**:
```bash
# 清理缓存
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### 4. 依赖问题
**问题**: 依赖安装失败
**解决方案**:
```bash
# 使用npm ci而不是npm install
npm ci

# 或者清理后重新安装
rm -rf node_modules package-lock.json
npm install
```

### 调试步骤

1. **检查GitHub Actions状态**
   - 访问仓库的Actions页面
   - 查看最新的工作流程运行状态
   - 点击失败的步骤查看详细日志

2. **验证本地构建**
   ```bash
   npm run build
   npm start
   ```

3. **检查Vercel部署**
   - 访问Vercel Dashboard
   - 查看部署日志
   - 检查环境变量配置

## 📊 监控和维护

### 应用监控
- **Vercel Analytics**: 自动启用，无需配置
- **GitHub Actions**: 查看构建和部署状态
- **Vercel Dashboard**: 监控应用性能和错误

### 更新应用
```bash
# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 测试本地构建
npm run build

# 推送到GitHub触发自动部署
git push origin main
```

### 回滚部署
```bash
# 使用Vercel CLI回滚
vercel rollback

# 或通过GitHub重新部署特定提交
```

## 🎯 下一步

1. **自定义应用**: 修改UI和功能
2. **添加测试**: 配置Jest或其他测试框架
3. **配置域名**: 在Vercel中设置自定义域名
4. **设置监控**: 配置错误监控和性能追踪
5. **优化性能**: 启用CDN和缓存策略

## 📚 相关资源

- [GitHub Actions文档](https://docs.github.com/en/actions)
- [Vercel部署文档](https://vercel.com/docs)
- [Next.js部署指南](https://nextjs.org/docs/deployment)
- [Docker部署指南](docs/DEPLOYMENT.md)
