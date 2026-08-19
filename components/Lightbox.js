'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 灯箱组件：全屏查看大图，显示标题 / 拍摄日期 / 描述
 * props:
 *   - photo: 当前照片对象 { title, date, description, imageUrl }
 *   - onClose: 关闭回调
 *   - onPrev / onNext: 切换回调
 */
export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  // 键盘交互：Esc 关闭，左右切换
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    // 锁定背景滚动
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
        onClick={onClose}
        aria-label="关闭"
      >
        <X className="w-8 h-8" />
      </button>

      {/* 上一张 */}
      <button
        className="absolute left-2 sm:left-6 p-2 text-white/80 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="上一张"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      {/* 下一张 */}
      <button
        className="absolute right-2 sm:right-6 p-2 text-white/80 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="下一张"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* 大图 + 信息 */}
      <div
        className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="max-h-[75vh] w-auto rounded-xl shadow-2xl object-contain"
        />
        <div className="mt-4 text-center text-white px-4">
          <h3 className="font-display text-xl font-semibold">{photo.title}</h3>
          <p className="text-sm text-white/60 mt-1">{photo.date}</p>
          <p className="text-sm text-white/80 mt-2 max-w-xl mx-auto">{photo.description}</p>
        </div>
      </div>
    </div>
  );
}
