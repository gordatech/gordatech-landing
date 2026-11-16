'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track, setAdsSendTo } from '@/lib/track';

/** Pelacakan klik WhatsApp di seluruh situs + page_view saat navigasi klien. */
export default function ClickTracker({ adsSendTo }: { adsSendTo: string }) {
  const pathname = usePathname();

  useEffect(() => setAdsSendTo(adsSendTo), [adsSendTo]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="wa.me/"], a[href^="tel:"], a[href^="mailto:"]');
      if (!a) return;
      const kind = a.href.includes('wa.me/') ? 'click_whatsapp' : a.href.startsWith('tel:') ? 'click_phone' : 'click_email';
      track(kind, { label: a.dataset.trackLabel || document.title, page_path: location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    window.dataLayer?.push({ event: 'page_view_spa', page_path: pathname });
  }, [pathname]);

  return null;
}
