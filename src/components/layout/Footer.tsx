import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Logo from './Logo';
import { contentOf, setting, waLink } from '@/lib/site';
import type { SiteData } from '@/lib/types';

const SOCIAL_ICON: Record<string, string> = { instagram: 'instagram', facebook: 'facebook', linkedin: 'linkedin', tiktok: 'tiktok', youtube: 'youtube' };
const LINKS: [string, string][] = [
  ['/tentang', 'Tentang Kami'], ['/portfolio', 'Portofolio'], ['/produk', 'Produk Aplikasi'], ['/kerja-sama', 'Skema Kerja Sama'],
  ['/insight', 'Insight & Artikel'], ['/audit-gratis', 'Audit Website Gratis'], ['/kontak', 'Hubungi Kami'],
];

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="tag-dark">{children}</p>;
}

export default function Footer({ site }: { site: SiteData }) {
  const c = contentOf(site);
  const s = (k: string) => setting(site, k);
  const social = Object.entries(site.settings['social.links'] || {});
  return (
    <footer className="bg-night pb-24 text-white/70 lg:pb-0">
      <div className="container-gt">
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-[3.4rem]">
            Punya ide besar? <span className="text-white/45">Mari wujudkan bersama.</span>
          </p>
          <a href={waLink(site)} target="_blank" rel="noopener" data-track-label="Footer CTA" className="btn-teal min-h-14 shrink-0 px-7">
            <Icon name="whatsapp" /> Mulai Percakapan <Icon name="arrow-up-right" className="size-4" />
          </a>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div>
            <Logo site={site} dark />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">{c.t('footer.about')}</p>
            {social.length > 0 && (
              <ul className="mt-6 flex gap-2.5">
                {social.map(([k, url]) => (
                  <li key={k}>
                    <a href={url} target="_blank" rel="noopener" className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-brand-500 hover:text-brand-500">
                      <Icon name={SOCIAL_ICON[k] ?? 'arrow-up-right'} className="size-[1.1rem]" label={`${k} GordaTech`} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-label="Layanan">
            <Heading>Layanan</Heading>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {site.navigation.services.map((sv) => <li key={sv.slug}><Link href={`/layanan/${sv.slug}`} className="hover:text-white">{sv.title}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Tautan cepat">
            <Heading>Jelajahi</Heading>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {LINKS.map(([h, l]) => <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>)}
            </ul>
          </nav>
          <div>
            <Heading>Kantor</Heading>
            <address className="mt-5 space-y-4 text-[0.95rem] not-italic">
              <p className="flex gap-3"><Icon name="map-pin" className="mt-0.5 size-5 text-brand-500" />
                <span>{s('address.full')}{s('address.maps_url') && <a href={s('address.maps_url')} target="_blank" rel="noopener" className="mt-1 block text-sm font-semibold text-brand-500 hover:underline">Buka di Google Maps</a>}</span></p>
              <p className="flex gap-3"><Icon name="phone" className="mt-0.5 size-5 text-brand-500" />
                <a href={waLink(site)} target="_blank" rel="noopener" data-track-label="Footer" className="hover:text-white">{s('contact.phone')}</a></p>
              <p className="flex gap-3"><Icon name="email" className="mt-0.5 size-5 text-brand-500" />
                <a href={`mailto:${s('contact.email')}`} className="break-all hover:text-white">{s('contact.email')}</a></p>
              <p className="flex gap-3"><Icon name="clock" className="mt-0.5 size-5 text-brand-500" />{s('contact.hours')}</p>
            </address>
          </div>
        </div>

        {site.navigation.local_pages.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 py-5 text-sm">
            <span className="font-semibold text-white">Layanan di Medan:</span>
            {site.navigation.local_pages.map((p) => <Link key={p.slug} href={`/${p.slug}`} className="hover:text-white">{p.title.split(/ (di|yang|:) /)[0]}</Link>)}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-sm">
          <p>© {new Date().getFullYear()} {c.t('footer.copyright', 'GordaTech.')}</p>
          <p className="flex gap-6"><Link href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link><Link href="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></p>
        </div>
      </div>
    </footer>
  );
}
