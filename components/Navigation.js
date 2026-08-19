'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

// 导航菜单项（顺序：首页 / 日记 / 相册 / Others）
const navItems = [
  { href: '/', label: '首页' },
  { href: '/diary', label: '日记' },
  { href: '/gallery', label: '相册' },
  { href: '/others', label: 'Others' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 判断当前菜单项是否高亮
  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-ink-dark">
            <Heart className="w-6 h-6 text-couple-pink animate-pulseHeart" fill="currentColor" />
            <span>我们的故事</span>
          </Link>

          {/* 桌面端菜单 */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-couple-pink text-white shadow-md'
                      : 'text-ink-medium hover:text-couple-pink hover:bg-pink-50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 移动端汉堡按钮 */}
          <button
            className="md:hidden p-2 text-ink-dark"
            onClick={() => setOpen(!open)}
            aria-label="切换菜单"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 移动端展开菜单 */}
        {open && (
          <ul className="md:hidden flex flex-col gap-1 pb-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-couple-pink text-white'
                      : 'text-ink-medium hover:bg-pink-50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
