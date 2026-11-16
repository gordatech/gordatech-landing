import Image from 'next/image';
import Link from 'next/link';
import type { Insight } from '@/lib/types';
import { dateID } from '@/lib/site';

/** Sampul artikel: foto bila ada, atau panel teal bermerek. */
export function InsightCover({ a, priority = false, className = '' }: { a: Insight; priority?: boolean; className?: string }) {
  if (a.cover) {
    return (
      <div className={`relative aspect-[1200/630] overflow-hidden rounded-lg bg-paper ${className}`}>
        <Image src={a.cover.url} alt={a.cover.alt || a.title} fill sizes="(min-width: 1024px) 33vw, 100vw" priority={priority} quality={70}
               className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
    );
  }
  return (
    <div className={`relative flex aspect-[1200/630] items-end overflow-hidden rounded-lg bg-brand-500 p-6 ${className}`} aria-hidden="true">
      <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-ink">GordaTech Insight</span>
    </div>
  );
}

export default function InsightCard({ a, headingLevel = 3 }: { a: Insight; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className="group relative flex h-full flex-col">
      <InsightCover a={a} />
      <div className="flex flex-1 flex-col pt-5">
        <p className="flex flex-wrap items-center gap-x-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
          {a.category && <span className="text-brand-600">{a.category.name}</span>}
          <time dateTime={a.published_at}>{dateID(a.published_at, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
          <span>{a.reading_minutes} menit baca</span>
        </p>
        <H className="mt-3 text-lg leading-snug text-ink sm:text-xl">
          <Link href={`/insight/${a.slug}`} className="line-clamp-2 decoration-1 underline-offset-4 after:absolute after:inset-0 group-hover:underline">{a.title}</Link>
        </H>
        <p className="mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-ink-muted">{a.excerpt}</p>
      </div>
    </article>
  );
}
