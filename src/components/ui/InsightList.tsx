import Link from 'next/link';
import InsightCard from './InsightCard';
import Icon from './Icon';
import type { Category, Insight, Paginated } from '@/lib/types';

/** Daftar artikel + navigasi kategori + paginasi (URL statis /halaman/2 agar bisa di-cache & dirayapi). */
export default function InsightList({ list, categories, base, activeCategory }: {
  list: Paginated<Insight>; categories: Category[]; base: string; activeCategory?: string;
}) {
  const { current_page: page, last_page: last } = list.meta;
  const href = (n: number) => (n === 1 ? base : `${base}/halaman/${n}`);
  return (
    <section className="py-10 sm:py-12">
      <div className="container-gt">
        <nav aria-label="Kategori artikel" className="flex flex-wrap gap-2">
          <Link href="/insight" className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold ${!activeCategory ? 'border-navy-500 bg-navy-500 text-white' : 'border-line hover:border-brand-500'}`}>Semua</Link>
          {categories.filter((c) => c.insights_count > 0).map((c) => (
            <Link key={c.slug} href={`/insight/kategori/${c.slug}`} aria-current={activeCategory === c.slug ? 'page' : undefined}
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold ${activeCategory === c.slug ? 'border-navy-500 bg-navy-500 text-white' : 'border-line hover:border-brand-500'}`}>
              {c.name} <span className={activeCategory === c.slug ? 'text-white/60' : 'text-ink-muted'}>{c.insights_count}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {list.data.map((a) => <InsightCard key={a.slug} a={a} headingLevel={2} />)}
        </div>
        {last > 1 && (
          <nav aria-label="Halaman artikel" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {page > 1 && <Link href={href(page - 1)} rel="prev" className="btn-outline min-h-11 px-4"><Icon name="arrow-left" className="size-4" /> Sebelumnya</Link>}
            {Array.from({ length: last }, (_, i) => i + 1).map((n) => (
              <Link key={n} href={href(n)} aria-current={n === page ? 'page' : undefined}
                    className={`grid size-11 place-items-center rounded-md border text-sm font-semibold ${n === page ? 'border-navy-500 bg-navy-500 text-white' : 'border-line hover:border-brand-500'}`}>{n}</Link>
            ))}
            {page < last && <Link href={href(page + 1)} rel="next" className="btn-outline min-h-11 px-4">Berikutnya <Icon name="arrow-right" className="size-4" /></Link>}
          </nav>
        )}
      </div>
    </section>
  );
}
