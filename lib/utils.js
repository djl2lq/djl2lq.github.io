/**
 * 格式化日期为中文形式：2026 年 8 月 15 日
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

/**
 * 计算从指定日期到今天的天数（相恋天数）
 */
export function daysSince(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  // 仅按日期计算，忽略时分秒
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = today - startDay;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

/**
 * 截断文本到指定长度
 */
export function truncate(text, length = 100) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '…' : text;
}
