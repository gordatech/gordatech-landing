import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Prose from '@/components/ui/Prose';
import CtaBand from '@/components/ui/CtaBand';
import Icon from '@/components/ui/Icon';
import { getSite } from '@/lib/api';
import { contentOf, setting } from '@/lib/site';
import { abs, pageMeta } from '@/lib/seo';
import JsonLd from '@/components/ui/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Tentang GordaTech: Software House & Agensi Digital Medan', description: contentOf(site).t('about.intro'), path: '/tentang' });
}

export default async function TentangPage() {
  const site = await getSite();
  const c = contentOf(site);
  const img = c.img('about.image');
  return (
    <>
      <PageHeader label="Tentang kami" title={c.t('about.title')} intro={c.t('about.intro')} crumbs={[{ name: 'Tentang', path: '/tentang' }]} />
      {img && (
        <div className="container-gt mt-8"><div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-paper sm:aspect-[21/9]"><Image src={img} alt="Tim GordaTech" fill sizes="100vw" className="object-cover" /></div></div>
      )}
      <section className="py-10 sm:py-14">
        <div className="container-gt grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            {[['Misi', c.t('about.mission')], ['Visi', c.t('about.vision')]].filter(([, v]) => v).map(([k, v]) => (
              <div key={k}><p className="tag">{k}</p><p className="mt-4 font-display text-[1.7rem] font-semibold leading-snug tracking-tight">{v}</p></div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl">Mengapa brand memilih GordaTech</h2>
            <Prose md={c.t('about.why_us')} className="mt-6" />
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-paper py-14">
        <div className="container-gt grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-3">
            <Icon name="map-pin" className="mt-1 size-6 text-brand-600" />
            <div><p className="font-display text-lg font-bold">Kantor kami</p><p className="text-ink-soft">{setting(site, 'address.full')}</p><p className="text-sm text-ink-muted">{setting(site, 'contact.hours')}</p></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kontak" className="btn-primary">Hubungi kami</Link>
            {setting(site, 'address.maps_url') && <a href={setting(site, 'address.maps_url')} target="_blank" rel="noopener" className="btn-outline"><Icon name="map-pin" /> Buka di Google Maps</a>}
          </div>
        </div>
      </section>
      <CtaBand site={site} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'AboutPage', url: abs('/tentang'), about: { '@id': abs('/#organization') } }} />
    </>
  );
}
