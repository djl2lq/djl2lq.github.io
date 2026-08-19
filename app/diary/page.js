import { getAllPosts } from '@/lib/posts';
import DiaryList from '@/components/DiaryList';

export const metadata = {
  title: '日记 · 我们的故事',
  description: '记录我们每一天的平凡与浪漫',
};

export default function DiaryPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-ink-dark mb-3">📝 我们的日记</h1>
        <p className="text-ink-medium">每一篇，都是时光的切片</p>
      </header>
      <DiaryList posts={posts} />
    </div>
  );
}
