import OthersGrid from '@/components/OthersGrid';
import othersData from '@/data/others.json';

export const metadata = {
  title: '妙物工坊 · 我们的故事',
  description: '一些奇思妙想，专门为你而做',
};

export default function OthersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-ink-dark mb-3">🎁 妙物工坊</h1>
        <p className="text-ink-medium">一些奇思妙想，专门为你而做</p>
      </header>
      <OthersGrid items={othersData.items} />
    </div>
  );
}