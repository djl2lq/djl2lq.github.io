/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出，部署到 GitHub Pages
  output: 'export',
  // GitHub Pages 不支持图片优化，需关闭
  images: {
    unoptimized: true,
  },
  // 如果部署在子路径（如 username.github.io/repo-name），取消注释并改为你的仓库名：
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
};

module.exports = nextConfig;
