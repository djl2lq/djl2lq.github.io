import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import othersData from '@/data/others.json';
import QixiDetail from '@/components/QixiDetail';

// 预生成所有小玩意的静态路径
export function generateStaticParams() {
  return othersData.items.map((item) => ({ slug: item.slug }));
}

// 动态生成页面标题
export function generateMetadata({ params }) {
  const item = othersData.items.find((i) => i.slug === params.slug);
  return { title: `${item?.title || 'Others'} · 我们的故事` };
}

export default function OthersDetailPage({ params }) {
  const item = othersData.items.find((i) => i.slug === params.slug);
  if (!item) notFound();

  // 七夕专题页：特殊浪漫交互
  if (params.slug === 'qixi') {
    return <QixiDetail item={item} />;
  }

  // 通用详情页
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/others"
        className="inline-flex items-center gap-1 text-couple-purple font-medium mb-8 hover:gap-2 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> 返回 Others
      </Link>

      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-dark mb-3">
          {item.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-couple-purple"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <img
        src={item.cover}
        alt={item.title}
        className="w-full rounded-2xl shadow-lg mb-8 object-cover max-h-96"
      />

      <p className="text-ink-medium leading-relaxed text-lg">{item.description}</p>
      <p className="text-ink-medium leading-relaxed mt-4">
        这个小玩意的完整体验正在精心制作中，敬请期待更多惊喜 ✨
      </p>
    </div>
  );
}
