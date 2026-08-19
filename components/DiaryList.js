import Link from 'next/link';
import Card from './Card';
import { formatDate } from '@/lib/utils';

/**
 * 日记列表：卡片网格布局（桌面 3 列 / 平板 2 列 / 手机 1 列）
 * props: posts - 日记元数据数组
 */
export default function DiaryList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-ink-medium py-16">还没有日记，快来写下第一篇吧～</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link href={`/diary/${post.slug}`} key={post.slug} className="block">
          <Card className="h-full flex flex-col">
            {post.cover && (
              <div className="aspect-[16/9] overflow-hidden bg-pink-50">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <p className="text-xs text-ink-medium mb-2">{formatDate(post.date)}</p>
              <h3 className="font-display text-lg font-bold text-ink-dark mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-ink-medium line-clamp-3 flex-1">{post.excerpt}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-pink-50 text-couple-pink"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="mt-4 text-sm font-medium text-couple-pink">阅读全文 →</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
