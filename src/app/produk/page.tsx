import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Icon from '@/components/ui/Icon';
import CtaBand from '@/components/ui/CtaBand';
import { getProducts, getSite } from '@/lib/api';
import { contentOf, waLink } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Software Bisnis Siap Pakai: Kasir, Stok & Laporan', description: contentOf(site).t('products.intro'), path: '/produk' });
}

export default async function ProdukPage() {
  const [site, products] = await Promise.all([getSite(), getProducts()]);
  const c = contentOf(site);
  return (
    <>
      <PageHeader label="Produk" title={c.t('products.title')} intro={c.t('products.intro')} crumbs={[{ name: 'Produk', path: '/produk' }]} />
      <section className="py-10 sm:py-14">
        <div className="container-gt space-y-14">
          {products.map((p) => (
            <article key={p.slug} className="group relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-paper">
                {p.cover && <Image src={p.cover.url} alt={p.cover.alt || p.name} fill sizes="(min-width: 1024px) 55vw, 100vw" quality={70} className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />}
              </div>
              <div>
                {p.tags.length > 0 && <p className="tag">{p.tags.slice(0, 2).join(' · ')}</p>}
                <h2 className="mt-4 text-[2rem] sm:text-[2.6rem]"><Link href={`/produk/${p.slug}`} className="after:absolute after:inset-0">{p.name}</Link></h2>
                {p.tagline && <p className="mt-3 text-lg font-medium text-ink-soft">{p.tagline}</p>}
                <p className="mt-4 text-ink-muted">{p.excerpt}</p>
                <ul className="mt-6 space-y-2.5 text-[0.95rem]">{p.features.slice(0, 4).map((f) => <li key={f} className="flex gap-2.5"><Icon name="check" className="mt-1 size-4 text-brand-600" />{f}</li>)}</ul>
                <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                  <Link href={`/produk/${p.slug}`} className="btn-outline">Lihat detail <Icon name="arrow-up-right" className="size-4" /></Link>
                  <a href={waLink(site, `demo ${p.name}`)} target="_blank" rel="noopener" data-track-label={`Produk ${p.name}`} className="btn-primary"><Icon name="whatsapp" /> Jadwalkan demo</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand site={site} context="produk software GordaTech" />
    </>
  );
}
