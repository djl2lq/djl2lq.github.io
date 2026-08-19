'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

// 浪漫文案（不少于 50 字）
const LOVE_TEXT =
  '在这个被星光点缀的夜晚，我想悄悄告诉你：遇见你，是我所有好运的总和。愿你眼里有星辰，心里有暖阳，而我，会一直一直在你身旁。';

export default function QixiDetail({ item }) {
  const [typed, setTyped] = useState('');
  const [bursts, setBursts] = useState([]);
  const burstId = useRef(0);

  // 预生成 24 个浮动爱心（随机位置 / 大小 / 速度 / 延迟）
  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 28,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 8,
        opacity: 0.5 + Math.random() * 0.5,
      })),
    []
  );

  // 打字机效果：逐字显示文案
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(LOVE_TEXT.slice(0, i));
      if (i >= LOVE_TEXT.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // 点击页面任意处生成一朵上升的爱心
  const handleClick = (e) => {
    const id = burstId.current++;
    const x = e.clientX;
    const y = e.clientY;
    setBursts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 2500);
  };

  return (
    <div
      onClick={handleClick}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-couple-pink via-fuchsia-500 to-couple-purple cursor-pointer"
    >
      {/* 浮动爱心层 */}
      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((h) => (
          <Heart
            key={h.id}
            className="absolute bottom-0 text-white animate-floatHeart"
            style={{
              left: `${h.left}%`,
              width: `${h.size}px`,
              height: `${h.size}px`,
              opacity: h.opacity,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* 点击产生的爱心 */}
      {bursts.map((b) => (
        <Heart
          key={b.id}
          className="pointer-events-none fixed text-white animate-floatHeart"
          style={{
            left: b.x,
            top: b.y,
            width: '32px',
            height: '32px',
            animationDuration: '2.5s',
          }}
          fill="currentColor"
        />
      ))}

      {/* 返回按钮 */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/others"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm text-white font-medium border border-white/40 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 返回 Others
        </Link>
      </div>

      {/* 中央内容 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center text-white">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">
          {item.title}
        </h1>

        {/* 代表性图片 */}
        <img
          src={item.cover}
          alt={item.title}
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover shadow-2xl border-4 border-white/60 mb-8 animate-pulseHeart"
        />

        {/* 打字机浪漫文案 */}
        <p className="font-display text-xl sm:text-2xl max-w-2xl leading-relaxed drop-shadow min-h-[6rem]">
          {typed}
          <span className="inline-block w-0.5 h-6 ml-1 bg-white align-middle animate-pulse" />
        </p>

        <p className="mt-10 text-white/70 text-sm">点击屏幕任意位置，让爱心飞起来 💗</p>
      </div>
    </div>
  );
}
