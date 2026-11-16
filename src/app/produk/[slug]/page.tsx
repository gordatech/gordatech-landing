import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import Icon from '@/components/ui/Icon';
import Prose from '@/components/ui/Prose';
import WaLink from '@/components/ui/WaLink';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import { getProduct, getProducts, getSite, safeParams } from '@/lib/api';
import { redirectOrNotFound } from '@/lib/redirects';
import { pageMeta, productSchema } from '@/lib/seo';
import { waRaw } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => safeParams(getProducts, (p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, p] = await Promise.all([getSite(), getProduct(slug)]);
  if (!p) return {};
  return pageMeta(site, { title: p.seo.title || p.name, description: p.seo.description || p.excerpt, path: `/produk/${p.slug}`, image: p.cover?.url, absoluteTitle: !!p.seo.title });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [site, p] = await Promise.all([getSite(), getProduct(slug)]);
  if (!p) return redirectOrNotFound(`/produk/${slug}`);
  return (
    <>
      <PageHeader label={p.tags.join(' · ') || 'Produk'} title={p.name} intro={p.tagline || p.excerpt} crumbs={[{ name: 'Produk', path: '/produk' }, { name: p.name, path: `/produk/${p.slug}` }]}>
        <div className="mt-8 flex flex-wrap gap-3">
          <WaLink href={waRaw(site, `Halo GordaTech, saya mau demo ${p.name}.`)} label={`Demo ${p.name}`}>Minta demo gratis</WaLink>
          {p.demo_url && <a href={p.demo_url} target="_blank" rel="noopener" className="btn-outline"><Icon name="arrow-up-right" /> Coba demo online</a>}
        </div>
      </PageHeader>
      <section className="py-10 sm:py-12">
        <div className="container-gt grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0 space-y-10">
            {p.images && p.images.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {p.images.map((img, i) => (
                  <a key={img.url} href={img.url} target="_blank" rel="noopener" className={`relative block overflow-hidden rounded-lg border border-line bg-paper ${i === 0 ? 'aspect-[16/10] sm:col-span-2' : 'aspect-[16/10]'}`}>
                    <Image src={i === 0 ? img.url : img.thumb} alt={img.alt || p.name} fill priority={i === 0} sizes={i === 0 ? '(min-width: 1024px) 60vw, 100vw' : '30vw'} quality={70} className="object-cover object-top" />
                  </a>
                ))}
              </div>
            )}
            <div>
              <h2 className="text-2xl">Fitur utama</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">{p.features.map((f) => <li key={f} className="flex gap-2.5 rounded-lg bg-paper p-4"><Icon name="check-circle" className="mt-0.5 size-5 text-brand-600" />{f}</li>)}</ul>
            </div>
            <p className="text-ink-soft">{p.excerpt}</p>
            <Prose md={p.body} />
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card divide-y divide-line">
              <div className="p-6">
                <p className="tag">Cara memakai</p>
                <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-soft">
                  <li className="flex gap-2.5"><Icon name="check" className="mt-1 size-4 text-brand-600" /><span><strong className="text-ink">Sewa bulanan</strong>: langsung pakai, sudah termasuk hosting, pembaruan, dan dukungan.</span></li>
                  <li className="flex gap-2.5"><Icon name="check" className="mt-1 size-4 text-brand-600" /><span><strong className="text-ink">Beli lisensi</strong>: source code dan instalasi di server Anda sendiri.</span></li>
                  <li className="flex gap-2.5"><Icon name="check" className="mt-1 size-4 text-brand-600" /><span><strong className="text-ink">Kustomisasi</strong>: fitur disesuaikan dengan alur kerja usaha Anda.</span></li>
                </ul>
                <WaLink href={waRaw(site, `Halo GordaTech, saya tertarik dengan ${p.name}. Boleh dijelaskan pilihan sewa dan lisensinya?`)} label={`Penawaran ${p.name}`} className="btn-primary mt-6 w-full">Minta penawaran</WaLink>
              </div>
              {p.tech_stack && <div className="p-6 text-sm"><p className="text-ink-muted">Teknologi</p><p className="mt-1 font-semibold">{p.tech_stack}</p></div>}
            </div>
          </aside>
        </div>
      </section>
      <CtaBand site={site} context={p.name} />
      <JsonLd data={productSchema(p)} />
    </>
  );
}
