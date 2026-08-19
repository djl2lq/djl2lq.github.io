import Link from 'next/link';
import Card from './Card';

/**
 * Others 卡片网格：展示创意小玩意
 * props: items - 小玩意数组
 */
export default function OthersGrid({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-ink-medium py-16">还没有小玩意，敬请期待～</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Link href={`/others/${item.slug}`} key={item.id} className="block">
          <Card className="h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden bg-purple-50">
              <img
                src={item.cover}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display text-lg font-bold text-ink-dark mb-2">{item.title}</h3>
              <p className="text-sm text-ink-medium flex-1">{item.description}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-purple-50 text-couple-purple"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="mt-4 text-sm font-medium text-couple-purple">进入体验 →</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
