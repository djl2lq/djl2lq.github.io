import '@/styles/globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: '我们的故事 · 情侣日记',
  description: '情侣专属博客日记网站，记录每一个平凡而闪光的瞬间',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#fff7fb] text-ink-dark min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
