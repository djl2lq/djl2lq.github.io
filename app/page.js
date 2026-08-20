import Link from 'next/link';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { getRecentPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const recentPosts = getRecentPosts(3);

  return (
    <div>
      {/* Hero 区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-couple-pink via-couple-orange to-couple-purple">
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-white"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                width: `${20 + (i % 4) * 12}px`,
                height: `${20 + (i % 4) * 12}px`,
              }}
              fill="currentColor"
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>欢迎来到 文青&大江 的小宇宙</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">💗 我们的故事</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            这里是我们记录日常、收藏回忆的小角落。<br className="hidden sm:block" />
            每一篇日记、每一张照片，都是我们平凡日子里闪闪发光的证据。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/diary"
              className="px-6 py-3 rounded-full bg-white text-couple-pink font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              翻阅日记
            </Link>
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/40 hover:bg-white/30 transition-colors"
            >
              看看相册
            </Link>
          </div>
        </div>
      </section>

      {/* 我们的故事简介 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-center text-ink-dark mb-12">
          关于我们
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-ink-medium leading-relaxed">
            <p>
              <span className="font-semibold text-couple-pink">相识</span> ——
              在三月一个风和日丽的日子里，我们于观音桥初次相见。那时的我们还不知道，这看似寻常的一面，会拉开属于我们的故事序幕。
            </p>
            <p>
              <span className="font-semibold text-couple-orange">相知</span> ——
              从夜爬缙云山等一场日出，到漫步嘉陵江畔吹晚风；从一杯咖啡的闲谈到一桌子家常菜的烟火。我们慢慢看清彼此的笨拙与可爱，也学着接纳对方的不完美。
            </p>
            <p>
              <span className="font-semibold text-couple-purple">相爱</span> ——
              没有惊天动地的誓言，只有日复一日的陪伴。我们决定把每一个普通的日子，都过成属于我们的故事。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/page/20240323-gyq-1.jpg"
              alt="我们的故事"
              loading="lazy"
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
            <img
              src="/images/page/20240330-jys.jpg"
              alt="我们的故事"
              loading="lazy"
              className="rounded-2xl shadow-lg w-full h-full object-cover mt-8"
            />
          </div>
        </div>
      </section>

      {/* 最新日记预览 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl font-bold text-ink-dark">最新日记</h2>
          <Link
            href="/diary"
            className="flex items-center gap-1 text-couple-pink font-medium hover:gap-2 transition-all"
          >
            查看全部日记 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-center text-ink-medium py-12">还没有日记，快来写下第一篇吧～</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link href={`/diary/${post.slug}`} key={post.slug}>
                <div className="bg-white rounded-card shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {post.cover && (
                    <div className="aspect-[16/9] overflow-hidden bg-pink-50">
                      <img
                        src={post.cover}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-ink-medium mb-2">{formatDate(post.date)}</p>
                    <h3 className="font-display text-lg font-bold text-ink-dark mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-medium line-clamp-3 flex-1">{post.excerpt}</p>
                    <span className="mt-4 text-sm font-medium text-couple-pink">阅读全文 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
