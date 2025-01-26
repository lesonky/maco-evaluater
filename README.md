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

## 📁 项目结构

```
maco-evaluater/
├── app/                # Next.js 应用主目录
│   ├── api/           # API 路由
│   ├── layout.tsx     # 根布局
│   └── page.tsx       # 主页面
├── components/        # React 组件
│   ├── ui/           # 基础 UI 组件
│   └── shared/       # 共享组件
├── hooks/            # 自定义 React Hooks
├── lib/              # 工具函数和配置
├── public/           # 静态资源
└── styles/           # 全局样式
```

## 🔧 配置

### 环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=your_api_url
# 添加其他必要的环境变量
```

### 开发工具配置

- ESLint 配置已包含在项目中
- Prettier 配置可根据团队规范调整
- TypeScript 配置在 `tsconfig.json` 中

## 📝 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则进行代码格式化
- 使用 Tailwind CSS 进行样式管理
- 组件采用原子化设计
- 提交代码前运行测试和类型检查

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。 