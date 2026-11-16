import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import LeadForm from '@/components/forms/LeadForm';
import Icon from '@/components/ui/Icon';
import WaLink from '@/components/ui/WaLink';
import JsonLd from '@/components/ui/JsonLd';
import { getServices, getSite } from '@/lib/api';
import { contentOf, setting, waLink } from '@/lib/site';
import { abs, pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Kontak GordaTech Medan: WhatsApp, Alamat & Jam Kerja', description: `${contentOf(site).t('contact.intro')} Alamat: ${setting(site, 'address.full')}.`, path: '/kontak' });
}

export default async function KontakPage() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const c = contentOf(site);
  const s = (k: string) => setting(site, k);
  const lat = s('address.lat'), lng = s('address.lng');
  const rows = [
    ['whatsapp', 'WhatsApp', s('contact.phone'), waLink(site)],
    ['email', 'Email', s('contact.email'), `mailto:${s('contact.email')}`],
    ['map-pin', 'Alamat', s('address.full'), s('address.maps_url')],
    ['clock', 'Jam kerja', s('contact.hours'), ''],
  ].filter(([, , v]) => v);
  return (
    <>
      <PageHeader label="Kontak" title={c.t('contact.title')} intro={c.t('contact.intro')} crumbs={[{ name: 'Kontak', path: '/kontak' }]}>
        <div className="mt-8"><WaLink href={waLink(site)} label="Kontak hero">Chat WhatsApp sekarang</WaLink></div>
      </PageHeader>
      <section className="py-10 sm:py-12">
        <div className="container-gt grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {rows.map(([icon, label, value, href]) => (
                <li key={label} className="flex gap-4 py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-600"><Icon name={icon} /></span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-muted">{label}</span>
                    {href ? <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})} className="break-words font-semibold hover:text-brand-600">{value}</a> : <span className="font-semibold">{value}</span>}
                  </span>
                </li>
              ))}
            </ul>
            {lat && lng && (
              <div className="relative mt-8 overflow-hidden rounded-xl border border-line bg-paper">
                <span className="absolute inset-0 grid place-items-center text-sm text-ink-muted" aria-hidden="true">Memuat peta lokasi…</span>
                <iframe title="Peta lokasi kantor GordaTech di Medan" src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" className="relative aspect-[4/3] w-full border-0" />
              </div>
            )}
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl">{c.t('contact.form_title', 'Kirim pesan')}</h2>
            <div className="mt-6">
              <LeadForm type="contact" fields={['company', 'service', 'message']} services={services.map((x) => ({ slug: x.slug, title: x.title }))}
                        button={c.t('contact.button', 'Kirim pesan')} success={c.t('contact.success')} privacy={c.t('contact.privacy')} waNumber={s('contact.whatsapp')}
                        messagePlaceholder="Ceritakan kebutuhan atau kendala usaha Anda" />
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ContactPage', url: abs('/kontak'), about: { '@id': abs('/#organization') } }} />
    </>
  );
}
