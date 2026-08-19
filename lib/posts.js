import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 日记 Markdown 文件目录
const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * 从正文自动提取摘要（去除 Markdown 标记，截取前约 100 字）
 */
function extractExcerpt(content) {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // 去图片
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 链接保留文字
    .replace(/[#>*`_~-]/g, '') // 去格式符
    .replace(/\s+/g, ' ')
    .trim();
  return plain.slice(0, 100) + (plain.length > 100 ? '…' : '');
}

/**
 * 获取所有日记的元数据（按日期倒序）
 */
export function getAllPosts() {
  let fileNames = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch {
    return [];
  }

  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: data.tags || [],
        cover: data.cover || '',
        excerpt: data.excerpt || extractExcerpt(content),
      };
    });

  // 按日期倒序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * 根据 slug 获取单篇日记（含 HTML 正文）
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // 将 Markdown 转为 HTML
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: data.tags || [],
    cover: data.cover || '',
    excerpt: data.excerpt || extractExcerpt(content),
    contentHtml,
  };
}

/**
 * 获取相邻的上一篇 / 下一篇日记（按日期倒序，上一篇为较新，下一篇为较旧）
 */
export function getAdjacentPosts(slug) {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  // 列表为倒序，index-1 为更早的一篇（下一篇），index+1 为更新的一篇（上一篇）
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

/**
 * 获取最新的 N 篇日记（用于首页预览）
 */
export function getRecentPosts(count = 3) {
  return getAllPosts().slice(0, count);
}
