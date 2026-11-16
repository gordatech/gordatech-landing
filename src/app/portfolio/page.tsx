import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PortfolioCard from '@/components/ui/PortfolioCard';
import PortfolioFilter from '@/components/widgets/PortfolioFilter';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import { getPortfolios, getSite } from '@/lib/api';
import { contentOf } from '@/lib/site';
import { abs, pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Portofolio & Studi Kasus Agensi Digital Medan', description: contentOf(site).t('portfolio.intro'), path: '/portfolio' });
}

export default async function PortfolioPage() {
  const [site, items] = await Promise.all([getSite(), getPortfolios()]);
  const c = contentOf(site);
  const services = Object.values(items.reduce<Record<string, { slug: string; title: string; count: number }>>((acc, p) => {
    if (p.service) (acc[p.service.slug] ??= { slug: p.service.slug, title: p.service.title, count: 0 }).count++;
    return acc;
  }, {}));

  return (
    <>
      <PageHeader label="Studi kasus" title={c.t('portfolio.title')} intro={c.t('portfolio.intro')} crumbs={[{ name: 'Portofolio', path: '/portfolio' }]} />
      <section className="py-10 sm:py-12">
        <div className="container-gt">
          <PortfolioFilter services={services}>
            <ul className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => <li key={p.slug} data-cat={p.service?.slug ?? 'lainnya'}><PortfolioCard p={p} headingLevel={2} /></li>)}
            </ul>
          </PortfolioFilter>
        </div>
      </section>
      <CtaBand site={site} context="kebutuhan serupa dengan studi kasus GordaTech" />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.t('portfolio.title'), url: abs('/portfolio'),
        mainEntity: { '@type': 'ItemList', itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/portfolio/${p.slug}`), name: p.title })) },
      }} />
    </>
  );
}
