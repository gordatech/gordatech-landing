import Image from 'next/image';
import Link from 'next/link';
import { contentOf } from '@/lib/site';
import type { SiteData } from '@/lib/types';

/**
 * Logo: ikon (unggahan Admin → Identitas & logo, atau emblem rusa bawaan) + nama brand + slogan sebagai teks.
 * Nama "GordaTech" ditampilkan dua warna: GORDA (teal) + TECH (navy).
 */
export default function Logo({ site, dark = false }: { site: SiteData; dark?: boolean }) {
  const c = contentOf(site);
  const icon = c.img('brand.logo');
  const name = c.t('brand.name', 'GordaTech').trim() || 'GordaTech';
  const tagline = c.t('brand.tagline');
  const split = /^gorda\s*tech$/i.test(name);
  return (
    <Link href="/" className="flex min-h-11 shrink-0 items-center gap-2.5">
      {icon ? (
        <Image src={icon} alt="" width={56} height={56} className="h-11 w-auto max-w-12 object-contain" priority />
      ) : (
        <Image src="/logo-emblem.png" alt="" width={33} height={44} className="h-11 w-auto" priority />
      )}
      <span className="flex flex-col leading-none">
        <span className="font-brand text-[1.12rem] font-bold uppercase tracking-[0.02em]">
          {split ? (
            <><span className={dark ? 'text-brand-500' : 'text-brand-600'}>GORDA</span><span className={dark ? 'text-white' : 'text-navy-500'}>TECH</span></>
          ) : (
            <span className={dark ? 'text-white' : 'text-navy-500'}>{name}</span>
          )}
        </span>
        {tagline && (
          <span className={`mt-1 whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.1em] sm:tracking-[0.13em] ${dark ? 'text-white/60' : 'text-ink-muted'}`}>{tagline}</span>
        )}
      </span>
      <span className="sr-only">, ke beranda</span>
    </Link>
  );
}
