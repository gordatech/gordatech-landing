import { renderMarkdown } from '@/lib/markdown';

export default function Prose({ md, className = '' }: { md: string | null | undefined; className?: string }) {
  if (!md) return null;
  const { html } = renderMarkdown(md);
  return <div className={`prose-gt ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
