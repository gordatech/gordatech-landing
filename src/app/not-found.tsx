import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import WaLink from '@/components/ui/WaLink';
import { getServices, getSite } from '@/lib/api';
import { contentOf, waLink } from '@/lib/site';

export const metadata = { title: 'Halaman tidak ditemukan', robots: { index: false, follow: true } };

export default async function NotFound() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const c = contentOf(site);
  return (
    <section className="border-b border-line">
      <div className="container-gt py-10 sm:py-14">
        <p className="text-sm text-brand-600">404</p>
        <h1 className="mt-3 text-3xl sm:text-5xl">{c.t('notfound.title', 'Halaman tidak ditemukan')}</h1>
        <p className="mt-5 max-w-xl text-lg text-ink-soft">{c.t('notfound.text')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary"><Icon name="arrow-left" /> Ke beranda</Link>
          <WaLink href={waLink(site)} label="404" className="btn-outline">Tanya tim kami</WaLink>
        </div>
        <p className="mt-12 font-display font-bold">Mungkin Anda mencari:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {[...services.map((s) => ({ href: `/layanan/${s.slug}`, label: s.title })), { href: '/portfolio', label: 'Portofolio' }, { href: '/insight', label: 'Insight' }].map((l) => (
            <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold hover:border-brand-500">{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
