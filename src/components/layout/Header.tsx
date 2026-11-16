import Link from 'next/link';
import Logo from './Logo';
import MobileNav from './MobileNav';
import NavLinks from './NavLinks';
import Icon from '@/components/ui/Icon';
import { contentOf, hrefOf, waLink } from '@/lib/site';
import type { SiteData } from '@/lib/types';

/** Menu utama di samping dropdown Layanan. Kerja sama ada di dalam dropdown Layanan; Kontak di sisi kanan. */
export const NAV = [
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/produk', label: 'Produk' },
  { href: '/insight', label: 'Insight' },
  { href: '/tentang', label: 'Tentang' },
];

/** Daftar lengkap untuk menu HP. */
const MOBILE_NAV = [{ href: '/layanan', label: 'Layanan' }, ...NAV, { href: '/kerja-sama', label: 'Kerja Sama' }, { href: '/kontak', label: 'Kontak' }];

export default function Header({ site }: { site: SiteData }) {
  const c = contentOf(site);
  const announce = c.on('announce.on') && c.t('announce.text');
  const cta = c.t('header.cta', 'Konsultasi Gratis');
  return (
    <>
      {announce && (
        <div className="bg-brand-500 text-sm text-ink">
          <div className="container-gt flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
            <span>{c.t('announce.text')}</span>
            {c.t('announce.link_label') && (
              <Link href={hrefOf(site, c.t('announce.link'), 'pengumuman')} className="font-semibold underline underline-offset-4 hover:no-underline">
                {c.t('announce.link_label')}
              </Link>
            )}
          </div>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="container-gt grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-6">
          <Logo site={site} />
          <div className="flex justify-center">
            <NavLinks nav={NAV} services={site.navigation.services} />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/kontak" className="hidden min-h-11 items-center px-3 text-[0.93rem] font-medium text-ink-soft hover:text-ink xl:inline-flex">Kontak</Link>
            <a href={waLink(site)} target="_blank" rel="noopener" data-track-label="Header" className="btn-primary hidden min-h-11 px-5 text-sm lg:inline-flex">
              <Icon name="whatsapp" className="size-4" /> {cta}
            </a>
            <MobileNav nav={MOBILE_NAV} services={site.navigation.services} waHref={waLink(site)} cta={cta} />
          </div>
        </div>
      </header>
    </>
  );
}
