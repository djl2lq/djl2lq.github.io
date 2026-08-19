'use client';

import { useMemo, useState } from 'react';
import Lightbox from './Lightbox';

/**
 * 照片网格 + 灯箱 + 分类筛选
 * props: photos - 照片数组
 */
export default function PhotoGrid({ photos }) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // 分类列表
  const categories = useMemo(() => {
    const set = new Set(photos.map((p) => p.category).filter(Boolean));
    return ['全部', ...Array.from(set)];
  }, [photos]);

  // 当前分类下的照片
  const filtered = useMemo(
    () => (activeCategory === '全部' ? photos : photos.filter((p) => p.category === activeCategory)),
    [photos, activeCategory]
  );

  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  const nextPhoto = () => setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));

  return (
    <>
      {/* 分类筛选标签 */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-couple-pink text-white shadow-md'
                : 'bg-white text-ink-medium hover:bg-pink-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 照片网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-sm font-medium">{photo.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 灯箱 */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
