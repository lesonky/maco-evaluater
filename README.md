# MACO Evaluater

MACO Evaluater 是一个基于 Next.js 14 构建的现代化 Web 应用程序，专门用于评估和推荐谷歌企业解决方案。本项目采用了最新的 React 技术栈和优秀的 UI 组件库，旨在帮助企业了解和选择适合的谷歌企业服务。

## 📋 核心功能

- **智能对话评估**
  - 基于 AI 的需求分析系统
  - 智能问答和推荐引擎
  - 渐进式信息收集
  - 实时响应和反馈

- **解决方案评估**
  - Google Maps Platform 位置服务评估
  - Google Cloud 云计算解决方案分析
  - Google Workspace 协作工具建议
  - 定制化企业方案推荐

- **用户体验**
  - 实时对话界面
  - 智能输入建议
  - 会话进度追踪
  - 评估完成提醒
  - 会话历史记录
  - 随时重启评估

## 🚀 特性

- 🎨 现代化 UI 设计，基于 Radix UI 和 Tailwind CSS
- ⚡️ 基于 Next.js 14 的快速页面加载和导航
- 🌙 内置深色模式支持
- ♿️ 符合 WCAG 标准的可访问性优化
- 📱 完全响应式设计，支持各种设备
- 🔒 内置安全特性
- 📊 使用 Recharts 的数据可视化支持
- 🎭 使用 Framer Motion 的流畅动画效果

## 🛠️ 技术栈

### 核心框架
- **Next.js 14**: React 框架，提供服务端渲染和静态生成
- **React 18**: 用户界面库
- **TypeScript**: 类型安全的 JavaScript 超集

### UI 组件和样式
- **Radix UI**: 无样式、可访问性优先的组件库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Framer Motion**: 强大的动画库

### 状态管理和表单
- **React Hook Form**: 高性能表单处理
- **Zod**: TypeScript 优先的模式验证

### 数据可视化
- **Recharts**: 基于 React 的图表库

### 工具库
- **date-fns**: 现代 JavaScript 日期工具库
- **clsx**: 条件类名构建工具
- **class-variance-authority**: 类型安全的 UI 变体

## 📦 环境要求

- Node.js 18.0.0 或更高版本
- npm 8.0.0 或更高版本（或等效的 yarn/pnpm）
- Git

## 🚀 快速开始

### 安装

1. 克隆仓库
```bash
git clone [项目地址]
cd maco-evaluater
```

2. 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 开发

启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建和部署

1. 构建生产版本
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

2. 启动生产服务器
```bash
npm run start
# 或
yarn start
# 或
pnpm start
```

## 🚀 部署到 Google Cloud Run

### 前置条件

1. 安装 [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
2. 配置 Google Cloud 项目和认证：
```bash
# 登录 Google Cloud
gcloud auth login

# 设置项目 ID
gcloud config set project YOUR_PROJECT_ID

# 启用必要的 API
gcloud services enable run.googleapis.com
```

### 部署步骤

1. 构建 Docker 镜像并推送到 Google Container Registry：
```bash
# 构建镜像
docker build -t gcr.io/YOUR_PROJECT_ID/maco-evaluater .

# 推送镜像到 GCR
docker push gcr.io/YOUR_PROJECT_ID/maco-evaluater
```

2. 部署到 Cloud Run：
```bash
gcloud run deploy maco-evaluater \
  --image gcr.io/YOUR_PROJECT_ID/maco-evaluater \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --set-env-vars="GOOGLE_VERTEX_LOCATION=your_vertex_location,GOOGLE_VERTEX_PROJECT=your_project_id"
```

### 环境变量配置

在 Cloud Run 控制台中配置以下环境变量：
- `GOOGLE_VERTEX_LOCATION`: Vertex AI 服务区域
- `GOOGLE_VERTEX_PROJECT`: Google Cloud 项目 ID

注意：对于 `GOOGLE_APPLICATION_CREDENTIALS`，Cloud Run 会自动处理服务账号认证，无需手动配置。

### 更新部署

当需要更新应用时，重复以上步骤 1-2 即可。新版本将自动部署并替换旧版本。

### 监控和日志

- 访问 [Cloud Run 控制台](https://console.cloud.google.com/run) 查看部署状态和监控指标
- 使用以下命令查看应用日志：
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=maco-evaluater" --limit 50
```

## 📁 项目结构

```