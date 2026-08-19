// 通用卡片容器：圆角 16px、浅阴影、hover 上浮
export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-card shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
