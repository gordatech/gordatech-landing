'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Next.js tidak menggulir saat tautan menuju halaman yang sedang dibuka (mis. klik logo di beranda,
 * atau "Portofolio" saat di /portfolio). Komponen ini menangani semua tautan internal seperti itu:
 * halaman digulir halus ke atas (instan bila pengguna memilih "kurangi gerakan").
 */
export default function SamePageScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.hash) return;
      const strip = (p: string) => p.replace(/\/+$/, '') || '/';
      if (strip(url.pathname) !== strip(pathname) || url.search !== location.search) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    };
    // Fase capture: berjalan sebelum handler Link Next.js (yang memanggil preventDefault).
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [pathname]);
  return null;
}
