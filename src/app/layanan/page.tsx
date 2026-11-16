import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Icon from '@/components/ui/Icon';
import CtaBand from '@/components/ui/CtaBand';
import { getServices, getSite } from '@/lib/api';
import { contentOf, waLink } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Layanan Agensi Digital Medan: Website, Ads & Sistem Bisnis', description: contentOf(site).t('services.intro'), path: '/layanan' });
}

export default async function LayananPage() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const c = contentOf(site);
  return (
    <>
      <PageHeader label="Layanan" title={c.t('services.title')} intro={c.t('services.intro')} crumbs={[{ name: 'Layanan', path: '/layanan' }]} />
      <section className="py-12 sm:py-16">
        <div className="container-gt">
          <ol className="border-t border-ink/15">
            {services.map((s, i) => (
              <li key={s.slug} className="group relative grid gap-6 border-b border-ink/15 py-8 lg:grid-cols-[5rem_1.1fr_1.4fr] lg:gap-10">
                <span className="num text-base">({String(i + 1).padStart(2, '0')})</span>
                <div>
                  <h2 className="text-[1.8rem] text-ink sm:text-[2.2rem]">
                    <Link href={`/layanan/${s.slug}`} className="decoration-brand-500 decoration-2 underline-offset-8 hover:underline">{s.title}</Link>
                  </h2>
                  {s.result && <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-ink"><Icon name="trend-up" className="size-4 text-brand-600" />{s.result}</p>}
                </div>
                <div>
                  <p className="text-[1.02rem] leading-relaxed text-ink-muted">{s.excerpt}</p>
                  {s.features && s.features.length > 0 && (
                    <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[0.95rem] text-ink-soft sm:grid-cols-2">
                      {s.features.slice(0, 6).map((f) => <li key={f.title} className="flex gap-2.5"><Icon name="check" className="mt-1 size-4 text-brand-600" />{f.title}</li>)}
                    </ul>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href={`/layanan/${s.slug}`} className="btn-outline min-h-11 px-5 text-sm">Pelajari selengkapnya <Icon name="arrow-up-right" className="size-4" /></Link>
                    <a href={waLink(site, s.title)} target="_blank" rel="noopener" data-track-label={`Layanan ${s.title}`} className="btn-primary min-h-11 px-5 text-sm">
                      <Icon name="whatsapp" className="size-4" /> Jadwalkan konsultasi
                    </a>
                    {s.timeline && <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted"><Icon name="clock" className="size-4" />{s.timeline}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
