/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主色调：粉色 / 暖橙 / 淡紫 / 米白
        couple: {
          pink: '#F472B6',
          orange: '#FB923C',
          purple: '#C084FC',
          cream: '#FEF3C7',
        },
        // 文字颜色：深灰 / 中灰
        ink: {
          dark: '#1F2937',
          medium: '#4B5563',
        },
      },
      fontFamily: {
        // 标题：衬线手写感；正文：无衬线
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatHeart: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-110vh) scale(1.1)', opacity: '0' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out both',
        floatHeart: 'floatHeart linear infinite',
        pulseHeart: 'pulseHeart 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
