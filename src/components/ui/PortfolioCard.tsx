import Link from 'next/link';
import CaseCover from './CaseCover';
import Icon from './Icon';
import type { Portfolio } from '@/lib/types';

/** Kartu studi kasus editorial: foto besar, lalu kategori · klien, judul, dan angka hasil utama. */
export default function PortfolioCard({ p, headingLevel = 3, large = false, priority = false }: {
  p: Portfolio; headingLevel?: 2 | 3; large?: boolean; priority?: boolean;
}) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const m = p.metrics?.[0];
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative">
        <CaseCover p={p} priority={priority} ratio={large ? 'aspect-[16/10] lg:aspect-[6/7]' : 'aspect-[4/3]'} sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'} />
        {m && p.cover && (
          <span className="absolute bottom-3 left-3 rounded-md bg-white px-3 py-2 text-ink shadow-sm">
            <span className="block font-display text-lg font-semibold leading-none">{m.value}</span>
            <span className="mt-1 block text-[0.75rem] font-medium text-ink-muted">{m.label}</span>
          </span>
        )}
        <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white text-ink transition-colors group-hover:bg-brand-500" aria-hidden="true">
          <Icon name="arrow-up-right" className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-muted">
          {[p.service?.title, p.client_name].filter(Boolean).join(' · ')}
        </p>
        <H className={`mt-2 leading-snug text-ink ${large ? 'text-2xl sm:text-[1.7rem]' : 'text-lg sm:text-xl'}`}>
          <Link href={`/portfolio/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
        </H>
        {large && p.summary && <p className="mt-3 line-clamp-2 max-w-2xl text-ink-muted">{p.summary}</p>}
      </div>
    </article>
  );
}
