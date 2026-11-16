import Link from 'next/link';
import SectionHead from '@/components/ui/SectionHead';
import Icon from '@/components/ui/Icon';
import type { Content } from './types';
import { initials } from '@/lib/site';
import type { Testimonial } from '@/lib/types';

const norm = (s?: string | null) => (s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

/** Testimoni: kutipan besar + angka hasil, kartu bergaris. */
export default function Testimonials({ c, items }: { c: Content; items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="bg-paper py-12 sm:py-16" aria-labelledby="testi-title">
      <div className="container-gt">
        <SectionHead id="testi-title" label={c.t('home.testimonials_label')} title={c.t('home.testimonials_title')} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((t) => (
            <figure key={t.id} className="flex flex-col rounded-xl border border-line bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <Icon name="quotes" className="size-7 text-brand-500" weight="fill" />
                {t.metric && <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-ink">{t.metric}</span>}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-[1.15rem] font-medium leading-snug tracking-[-0.01em] text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-semibold text-white" aria-hidden="true">{initials(t.author)}</span>
                <span className="min-w-0 text-sm leading-snug">
                  <span className="block font-semibold text-ink">{t.author}</span>
                  <span className="block text-ink-muted">{t.role}{t.company && !norm(t.role).includes(norm(t.company)) ? `, ${t.company}` : ''}</span>
                  {t.portfolio && <Link href={`/portfolio/${t.portfolio.slug}`} className="mt-1 inline-flex min-h-10 items-center text-xs font-semibold text-brand-600 underline underline-offset-2">Baca studi kasusnya</Link>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
