# 部署指南

本指南将帮助您部署QR码扫描应用到各种平台。

## 🚀 快速部署

### Vercel (推荐)

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上 Fork 此仓库
   ```

2. **连接 Vercel**
   - 访问 [Vercel](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择 Fork 的仓库

3. **配置项目**
   - 框架预设: Next.js
   - 构建命令: `npm run build`
   - 输出目录: `.next`
   - 安装命令: `npm install`

4. **环境变量** (可选)
   ```bash
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 访问提供的 URL

### Netlify

1. **连接仓库**
   - 访问 [Netlify](https://netlify.com)
   - 连接 GitHub 仓库

2. **构建设置**
   ```bash
   Build command: npm run build
   Publish directory: .next
   ```

3. **环境变量**
   ```bash
   NODE_VERSION=18
   NPM_VERSION=9
   ```

### Railway

1. **连接仓库**
   - 访问 [Railway](https://railway.app)
   - 连接 GitHub 仓库

2. **自动部署**
   - Railway 自动检测 Next.js 项目
   - 自动配置构建和部署

## 🐳 Docker 部署

### 本地 Docker

```bash
# 构建镜像
docker build -t qr-scanner-app .

# 运行容器
docker run -p 3000:3000 qr-scanner-app
```

### Docker Compose

```bash
# 开发环境
docker-compose --profile dev up

# 生产环境
docker-compose up
```

### 云平台 Docker 部署

#### AWS ECS
```bash
# 构建并推送到 ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
docker build -t qr-scanner-app .
docker tag qr-scanner-app:latest your-account.dkr.ecr.us-east-1.amazonaws.com/qr-scanner-app:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/qr-scanner-app:latest
```

#### Google Cloud Run
```bash
# 构建并推送到 GCR
gcloud builds submit --tag gcr.io/your-project/qr-scanner-app
gcloud run deploy --image gcr.io/your-project/qr-scanner-app --platform managed
```

#### Azure Container Instances
```bash
# 构建并推送到 ACR
az acr build --registry your-registry --image qr-scanner-app .
az container create --resource-group your-rg --name qr-scanner-app --image your-registry.azurecr.io/qr-scanner-app:latest --ports 3000
```

## ☁️ 云平台部署

### AWS Amplify

1. **连接仓库**
   - 访问 [AWS Amplify](https://aws.amazon.com/amplify/)
   - 连接 GitHub 仓库

2. **构建设置**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Google Cloud Platform

1. **使用 Cloud Build**
   ```yaml
   # cloudbuild.yaml
   steps:
     - name: 'gcr.io/cloud-builders/npm'
       args: ['install']
     - name: 'gcr.io/cloud-builders/npm'
       args: ['run', 'build']
     - name: 'gcr.io/cloud-builders/docker'
       args: ['build', '-t', 'gcr.io/$PROJECT_ID/qr-scanner-app', '.']
     - name: 'gcr.io/cloud-builders/docker'
       args: ['push', 'gcr.io/$PROJECT_ID/qr-scanner-app']
   ```

2. **部署到 Cloud Run**
   ```bash
   gcloud run deploy qr-scanner-app --image gcr.io/$PROJECT_ID/qr-scanner-app --platform managed --region us-central1 --allow-unauthenticated
   ```

### Azure Static Web Apps

1. **创建静态 Web 应用**
   ```bash
   az staticwebapp create --name qr-scanner-app --resource-group your-rg --source https://github.com/your-username/qr-scanner-nextjs --location "Central US" --branch main --app-location "/" --output-location ".next"
   ```

## 🖥️ 服务器部署

### Ubuntu/Debian

1. **安装依赖**
   ```bash
   # 安装 Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # 安装 PM2
   sudo npm install -g pm2
   ```

2. **部署应用**
   ```bash
   # 克隆仓库
   git clone https://github.com/your-username/qr-scanner-nextjs.git
   cd qr-scanner-nextjs

   # 安装依赖
   npm install

   # 构建应用
   npm run build

   # 启动应用
   pm2 start npm --name "qr-scanner" -- start
   pm2 save
   pm2 startup
   ```

3. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### CentOS/RHEL

1. **安装依赖**
   ```bash
   # 安装 Node.js
   curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install -y nodejs

   # 安装 PM2
   sudo npm install -g pm2
   ```

2. **部署步骤同 Ubuntu**

## 🔧 环境配置

### 生产环境变量

```bash
# .env.production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 开发环境变量

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📊 监控和日志

### 应用监控

1. **Vercel Analytics**
   - 自动启用
   - 性能监控
   - 用户分析

2. **自定义监控**
   ```javascript
   // 添加监控代码
   import { Analytics } from '@vercel/analytics/react';
   
   export default function App() {
     return (
       <>
         <YourApp />
         <Analytics />
       </>
     );
   }
   ```

### 日志管理

1. **PM2 日志**
   ```bash
   pm2 logs qr-scanner
   pm2 monit
   ```

2. **Docker 日志**
   ```bash
   docker logs qr-scanner-app
   docker logs -f qr-scanner-app
   ```

## 🔒 安全配置

### HTTPS 配置

1. **Let's Encrypt (Nginx)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

2. **Vercel (自动)**
   - 自动提供 HTTPS
   - 自动续期证书

### 安全头配置

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## 🚨 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理缓存
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

2. **内存不足**
   ```bash
   # 增加 Node.js 内存限制
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

3. **端口冲突**
   ```bash
   # 使用不同端口
   PORT=3001 npm start
   ```

### 性能优化

1. **启用压缩**
   ```javascript
   // next.config.js
   const nextConfig = {
     compress: true,
   };
   ```

2. **优化图片**
   ```javascript
   // 使用 Next.js Image 组件
   import Image from 'next/image';
   ```

## 📚 相关资源

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 部署指南](https://vercel.com/docs)
- [Docker 部署最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [PM2 文档](https://pm2.keymetrics.io/docs/)
