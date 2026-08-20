'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { daysSince } from '@/lib/utils';

// 相恋起始日期（可按实际情况修改）
const START_DATE = '2024-05-04';

export default function Footer() {
  // 在客户端计算相恋天数，避免服务端/客户端时间不一致导致的 hydration 不匹配
  const [days, setDays] = useState(null);

  useEffect(() => {
    setDays(daysSince(START_DATE));
  }, []);

  return (
    <footer className="mt-16 border-t border-pink-100 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-couple-pink">
          <Heart className="w-4 h-4" fill="currentColor" />
          <span className="font-display text-lg font-semibold">
            {days !== null ? `我们已经在一起 ${days} 天啦` : '我们的故事还在继续'}
          </span>
          <Heart className="w-4 h-4" fill="currentColor" />
        </div>
        <p className="text-sm text-ink-medium">
          © {new Date().getFullYear()} 我们的故事 · 用心记录每一个平凡而闪光的瞬间
        </p>
      </div>
    </footer>
  );
}
