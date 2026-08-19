# 我们的故事 · 情侣博客日记网站

一款情侣专属的博客日记网站，融合情感记录、生活分享与趣味互动小工具。基于 **Next.js 14 (App Router)** 静态导出，部署到 **GitHub Pages**。

## ✨ 功能模块

| 模块 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 简介 + 我们的故事 + 最新日记预览 |
| 博客日记 | `/diary` `/diary/[slug]` | 图文混排的文章列表与详情（Markdown 渲染） |
| 相册 | `/gallery` | 照片网格 + 灯箱预览 + 分类筛选 |
| Others | `/others` `/others/[slug]` | 创意小玩意集合，含七夕浪漫交互页 |

## 🛠 技术栈

- **框架**：Next.js 14 (App Router)，`output: 'export'` 静态导出
- **样式**：Tailwind CSS
- **动画**：Framer Motion / 纯 CSS / 原生 JS
- **图标**：Lucide React
- **数据**：本地 JSON / Markdown 文件（`data/` 与 `posts/` 目录），无数据库、无 API Routes

## 📂 目录结构

```
project-root/
├── app/                  # 页面路由（App Router）
│   ├── layout.js         # 全局布局（导航 + 页脚）
│   ├── page.js           # 首页
│   ├── diary/            # 日记列表与详情
│   ├── gallery/          # 相册
│   └── others/           # Others 列表与详情
├── components/           # 公共组件
├── posts/                # 日记 Markdown 文件
├── data/                 # 相册 / Others 数据 (JSON)
├── lib/                  # 工具函数（读取 Markdown、日期格式化等）
├── styles/               # 全局样式（Tailwind）
├── public/               # 静态资源
├── next.config.js        # 含 output: 'export'
└── package.json
```

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 开发模式（带热更新）
npm run dev
```

访问 http://localhost:3000

## 📦 本地预览生产构建

```bash
# 构建并预览静态导出结果
npm run preview
```

## 🚢 部署到 GitHub Pages

### 方式一：使用 gh-pages 包（推荐）

```bash
npm run deploy
```

### 方式二：手动部署

```bash
npm run build
npx gh-pages -d out
```

> **关于子路径部署**：若部署在 `username.github.io/repo-name` 这样的子路径下，需在 `next.config.js` 中取消 `basePath` 与 `assetPrefix` 的注释并改为你的仓库名。本项目仓库为 `username.github.io` 形式（用户页），部署在根路径，因此无需配置。

## 📝 内容维护

- **新增日记**：在 `posts/` 目录新增 `.md` 文件，包含 Frontmatter（title / date / tags / cover / excerpt）与 Markdown 正文。
- **新增相册照片**：编辑 `data/gallery.json`。
- **新增小玩意**：编辑 `data/others.json`，并在 `app/others/[slug]/page.js` 中按需添加专属交互页。

## 📌 版本记录

详见 [version.md](./version.md)。
