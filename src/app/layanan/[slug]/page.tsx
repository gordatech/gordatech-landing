import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import ServiceBody from '@/components/ui/ServiceBody';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import WaLink from '@/components/ui/WaLink';
import { getService, getServices, getSite, safeParams } from '@/lib/api';
import { redirectOrNotFound } from '@/lib/redirects';
import { pageMeta, serviceSchema } from '@/lib/seo';
import { waLink } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => safeParams(getServices, (s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, s] = await Promise.all([getSite(), getService(slug)]);
  if (!s) return {};
  return pageMeta(site, { title: s.seo.title || s.headline || s.title, description: s.seo.description || s.excerpt, path: `/layanan/${s.slug}`, image: s.cover?.url, absoluteTitle: !!s.seo.title });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [site, s] = await Promise.all([getSite(), getService(slug)]);
  if (!s) return redirectOrNotFound(`/layanan/${slug}`);
  return (
    <>
      <PageHeader label={s.title} title={s.headline || s.title} intro={s.excerpt} crumbs={[{ name: 'Layanan', path: '/layanan' }, { name: s.title, path: `/layanan/${s.slug}` }]}>
        <div className="mt-8 flex flex-wrap gap-3">
          <WaLink href={waLink(site, s.title)} label={`Hero layanan ${s.title}`}>Konsultasi gratis</WaLink>
          <Link href="/portfolio" className="btn-outline"><Icon name="briefcase" /> Lihat studi kasus</Link>
        </div>
        {s.local_pages && s.local_pages.length > 0 && (
          <p className="mt-6 text-sm text-ink-soft">Halaman khusus: {s.local_pages.map((l, i) => <span key={l.slug}>{i > 0 && " · "}<Link href={`/${l.slug}`} className="link">{l.title.split(/ (di|yang|:) /)[0]} di {l.city}</Link></span>)}</p>
        )}
      </PageHeader>
      <ServiceBody site={site} service={s} />
      <CtaBand site={site} context={s.title} />
      <JsonLd data={serviceSchema(s, `/layanan/${s.slug}`)} />
    </>
  );
}
