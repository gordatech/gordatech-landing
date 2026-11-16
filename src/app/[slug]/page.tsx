import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ServiceBody from '@/components/ui/ServiceBody';
import Prose from '@/components/ui/Prose';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import WaLink from '@/components/ui/WaLink';
import { getLocalPage, getLocalPages, getSite, safeParams } from '@/lib/api';
import { redirectOrNotFound } from '@/lib/redirects';
import { pageMeta, serviceSchema } from '@/lib/seo';
import { waLink } from '@/lib/site';

/** Halaman target lokal di root, mis. /jasa-pembuatan-website-medan (Admin → Halaman lokal). Slug lain → redirect 301 / 404. */
type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => safeParams(getLocalPages, (p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, p] = await Promise.all([getSite(), getLocalPage(slug)]);
  if (!p) return {};
  return pageMeta(site, { title: p.seo.title || p.title, description: p.seo.description || p.intro, path: `/${p.slug}`, absoluteTitle: !!p.seo.title });
}

export default async function LocalPageView({ params }: Props) {
  const { slug } = await params;
  const [site, p] = await Promise.all([getSite(), getLocalPage(slug)]);
  if (!p) return redirectOrNotFound(`/${slug}`);
  const s = p.service;
  return (
    <>
      <PageHeader label={`${s?.title ?? 'Layanan'} · ${p.city}`} title={p.title} intro={p.intro} crumbs={[...(s ? [{ name: s.title, path: `/layanan/${s.slug}` }] : []), { name: p.city, path: `/${p.slug}` }]}>
        <div className="mt-8 flex flex-wrap gap-3">
          <WaLink href={waLink(site, `${s?.title ?? p.title} di ${p.city}`)} label={`Halaman lokal ${p.slug}`}>Konsultasi gratis</WaLink>
          <a href="#isi-layanan" className="btn-outline">Lihat cakupan layanan</a>
        </div>
      </PageHeader>
      {s ? (
        <div id="isi-layanan"><ServiceBody site={site} service={{ ...s, body: null }} intro={p.body ? <Prose md={p.body} className="mb-16" /> : undefined} /></div>
      ) : (
        <section className="py-14"><div className="container-gt"><Prose md={p.body} /></div></section>
      )}
      <CtaBand site={site} context={`${s?.title ?? 'layanan'} di ${p.city}`} />
      {s && <JsonLd data={serviceSchema({ ...s, title: p.title, excerpt: p.intro }, `/${p.slug}`, p.city)} />}
    </>
  );
}
