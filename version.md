# 项目版本变更记录

> 每次修改请按日期追加记录，最新记录位于顶部。

---

## 2026-08-19（新增七夕日记）

### 🎉 新增
- 新增七夕日记《七夕夜：一捧花里的小确幸》（`posts/20260819-qixi.md`），含 3 张实拍配图
- 新增图片目录 `public/images/20260819-qixi/`（1.jpg / 2.jpg / 3.jpg）

### ⚡ 优化
- 修复日记 frontmatter `cover` 字段写法：从错误的 Markdown 语法 `![](...)` 改为标准字符串路径 `"/images/20260819-qixi/1.jpg"`

### 🗑️ 删除
- 无

---

## 2026-08-19（新增操作手册文档）

### 🎉 新增
- 新增用户操作手册 `操作手册.md`：分步教学文档，覆盖写日记、相册分类上传、Others 小玩意管理、图片资源管理、本地预览与发布上线流程、常见问题排查、日常操作速查表等全部常用操作

### ⚡ 优化
- 修复 `jsconfig.json` 的 TypeScript 弃用警告：移除已弃用的 `baseUrl` 字段，保留 `paths` 别名配置（`@/*`），不影响 Next.js 构建与别名解析
- 新增 GitHub Actions 自动部署配置（`.github/workflows/deploy.yml`）：push 到 main 后自动 `npm build` 并发布 `out/` 到 GitHub Pages，含 `.nojekyll` 防止 Jekyll 忽略 `_next/` 资源

### 🗑️ 删除
- 无

---

## 2026-08-19（项目重构为 Next.js）

### 🎉 新增
- 项目整体重构为 **Next.js 14 (App Router)** 情侣博客日记网站，采用 `output: 'export'` 静态导出，面向 GitHub Pages 部署
- 新增首页 `/`：Hero 区（渐变背景 + 浮动爱心）、「我们的故事」简介（相识 / 相知 / 相爱）、最新 3 篇日记预览
- 新增博客日记模块：列表页 `/diary`（响应式卡片网格）与详情页 `/diary/[slug]`，支持 Markdown Frontmatter 解析与图文混排渲染（gray-matter + remark），含上一篇 / 下一篇导航
- 新增相册模块 `/gallery`：照片网格 + 灯箱预览（键盘 ←/→ 切换、Esc 关闭）+ 分类筛选
- 新增 Others 模块：列表页 `/others` 与详情页 `/others/[slug]`
- 新增七夕浪漫详情页 `/others/qixi`：粉紫渐变背景、24 个浮动爱心、打字机情诗、点击生成爱心交互、返回按钮
- 新增公共组件：`Navigation`（响应式折叠菜单 + 当前页高亮）、`Footer`（动态相恋天数）、`Card`、`Lightbox`、`DiaryList`、`PhotoGrid`、`OthersGrid`、`QixiDetail`
- 新增工具函数 `lib/posts.js`（Markdown 读取、摘要自动提取、相邻文章）、`lib/utils.js`（日期格式化、相恋天数计算）
- 新增示例数据：3 篇日记（`posts/`）、8 张相册照片（`data/gallery.json`）、2 个小玩意（`data/others.json`，含七夕）
- 新增全局样式 `styles/globals.css`（Tailwind + Google Fonts + Markdown 排版样式）
- 新增配置文件 `next.config.js`、`tailwind.config.js`、`postcss.config.js`、`jsconfig.json`、`public/favicon.svg`，更新 `package.json` 与 `.gitignore`
- 新增 `README.md` 部署说明（本地开发 / 预览 / GitHub Pages 部署）

### ⚡ 优化
- 无（本次为整体重构）

### 🗑️ 删除
- 移除旧版 Jekyll 学术主题全部相关文件，完成技术栈迁移：`_config.yml`、`_config_docker.yml`、`Gemfile`、`Dockerfile`、`docker-compose.yaml`，以及 `_data`、`_includes`、`_layouts`、`_pages`、`_posts`、`_portfolio`、`_publications`、`_sass`、`_talks`、`_teaching`、`assets`、`images`、`files`、`markdown_generator`、`scripts`、`talkmap` 等目录及旧版 `CONTRIBUTING.md`、`README_CN.md`

---

## 2026-08-19

### 🎉 新增
- 新增 `Others` 主列表页（路径：`/others/`），响应式卡片网格布局，桌面端 3~4 列、平板 2 列、手机 1 列
- 新增七夕浪漫详情页（路径：`/others/qixi/`），包含星空背景、浮动爱心、SVG 主视觉（玫瑰+月夜+人影剪影）、打字机情诗、爱心点击爆炸、脉冲心跳、心动计数器、许愿弹窗等交互
- 新增数据源 `_data/others.json`，集中管理所有小玩意信息，支持卡片动态渲染
- 新增样式文件 `assets/css/others.css`（卡片样式 + 全部七夕动画 keyframes）
- 新增脚本文件 `assets/js/qixi.js`（浮动爱心、点击爆炸、计数器、打字机、许愿弹窗）
- 新增中文项目说明文档 `README_CN.md`

### ⚡ 优化
- 修复 manifest.json 跨域（CORS）问题：将 `_includes/head/custom.html` 中的 manifest 链接从 `{{ base_path }}` 改为根相对路径 `/images/manifest.json`
- 调整顶部导航栏顺序：将 "Teaching" 移至末尾并重命名为 "Others"，指向 `/others/`

### 🗑️ 删除
- 无
