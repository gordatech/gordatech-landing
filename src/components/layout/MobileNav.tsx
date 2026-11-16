'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { List, WhatsappLogo, X } from '@phosphor-icons/react/dist/ssr';

/** Menu HP: laci layar penuh, tertutup saat tautan diklik / Esc. */
export default function MobileNav({ nav, services, waHref, cta }: {
  nav: { href: string; label: string }[]; services: { title: string; slug: string }[]; waHref: string; cta: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="ml-auto lg:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu-hp"
              className="grid size-11 place-items-center rounded-full border border-line text-ink">
        <List className="size-5" weight="bold" aria-label="Buka menu" />
      </button>
      {open && (
        <div id="menu-hp" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex h-[72px] items-center justify-between border-b border-line px-4">
            <span className="tag">Menu</span>
            <button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-line">
              <X className="size-5" weight="bold" aria-label="Tutup menu" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Menu HP">
            <ul className="divide-y divide-line">
              {nav.map((n, i) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="flex min-h-14 items-baseline gap-4 font-display text-2xl font-semibold tracking-tight">
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>{n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="tag mt-8">Layanan</p>
            <ul className="mt-3 grid gap-1">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/layanan/${s.slug}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-ink-soft">{s.title}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line p-4">
            <a href={waHref} target="_blank" rel="noopener" data-track="whatsapp" data-track-label="Menu HP" className="btn-primary w-full">
              <WhatsappLogo className="size-5" weight="bold" aria-hidden="true" /> {cta}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
