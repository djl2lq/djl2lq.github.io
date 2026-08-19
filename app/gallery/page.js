import PhotoGrid from '@/components/PhotoGrid';
import galleryData from '@/data/gallery.json';

export const metadata = {
  title: '相册 · 我们的故事',
  description: '定格我们每一个心动的瞬间',
};

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-ink-dark mb-3">📸 我们的相册</h1>
        <p className="text-ink-medium">点击照片，放大那些定格的瞬间</p>
      </header>
      <PhotoGrid photos={galleryData.photos} />
    </div>
  );
}
