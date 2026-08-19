import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

// 预生成所有日记的静态路径
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 动态生成页面标题
export async function generateMetadata({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    return { title: `${post.title} · 日记` };
  } catch {
    return { title: '日记 · 我们的故事' };
  }
}

export default async function DiaryDetailPage({ params }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* 返回链接 */}
      <Link
        href="/diary"
        className="inline-flex items-center gap-1 text-couple-pink font-medium mb-8 hover:gap-2 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> 返回日记列表
      </Link>

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-pink-50 text-couple-pink"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-dark mb-3">
          {post.title}
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-ink-medium">
          <Calendar className="w-4 h-4" />
          {formatDate(post.date)}
        </p>
      </header>

      {/* 封面图 */}
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          className="w-full rounded-2xl shadow-lg mb-8 object-cover max-h-96"
        />
      )}

      {/* 正文（Markdown 渲染） */}
      <div
        className="prose-couple max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* 上一篇 / 下一篇导航 */}
      <nav className="mt-12 pt-8 border-t border-pink-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/diary/${prev.slug}`}
            className="group p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
          >
            <span className="flex items-center gap-1 text-xs text-ink-medium">
              <ArrowLeft className="w-3 h-3" /> 上一篇
            </span>
            <span className="block mt-1 font-medium text-ink-dark group-hover:text-couple-pink transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/diary/${next.slug}`}
            className="group p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all sm:text-right"
          >
            <span className="flex items-center gap-1 text-xs text-ink-medium sm:flex-row-reverse">
              下一篇 <ArrowRight className="w-3 h-3" />
            </span>
            <span className="block mt-1 font-medium text-ink-dark group-hover:text-couple-pink transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
