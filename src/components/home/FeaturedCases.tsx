import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import SectionHead from '@/components/ui/SectionHead';
import PortfolioCard from '@/components/ui/PortfolioCard';
import type { Content } from './types';
import type { Portfolio, SiteData } from '@/lib/types';

/** Karya pilihan: satu kasus besar + dua kasus pendamping, lalu pita angka. */
export default function FeaturedCases({ c, site, portfolios }: { c: Content; site: SiteData; portfolios: Portfolio[] }) {
  if (!portfolios.length) return null;
  const [first, ...rest] = portfolios;
  const stats = [
    { value: `${site.stats.portfolios}+`, label: c.t('home.stats_projects') },
    { value: `${site.stats.clients}+`, label: c.t('home.stats_clients') },
    { value: String(site.stats.services), label: c.t('home.stats_services') },
    { value: '3', label: c.t('home.stats_guarantee') },
  ].filter((s) => s.label);

  return (
    <section className="bg-paper py-12 sm:py-16" aria-labelledby="kasus-title">
      <div className="container-gt">
        <SectionHead id="kasus-title" label={c.t('home.cases_label')} title={c.t('home.cases_title')} intro={c.t('home.cases_intro')}
          action={<Link href="/portfolio" className="btn-outline min-h-11 px-5 text-sm">Jelajahi seluruh karya <Icon name="arrow-up-right" className="size-4" /></Link>} />

        <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_1fr]">
          <PortfolioCard p={first} large />
          <div className="grid gap-y-10">
            {rest.slice(0, 2).map((p) => <PortfolioCard key={p.slug} p={p} />)}
          </div>
        </div>
        {rest.length > 2 && (
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {rest.slice(2, 5).map((p) => <PortfolioCard key={p.slug} p={p} />)}
          </div>
        )}

        {stats.length > 0 && (
          <dl className="mt-14 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse gap-2 border-b border-ink/15 py-6 pr-4 lg:border-b-0 ${i % 2 === 0 ? 'border-r pl-0' : 'pl-6'} lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0`}>
                <dt className="text-sm text-ink-muted">{s.label}</dt>
                <dd className="font-display text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-ink sm:text-[3.2rem]">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
