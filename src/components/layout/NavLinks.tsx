'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';

type Svc = { title: string; slug: string; icon: string };

/** Menu desktop: Layanan (panel dropdown) + tautan utama. Dropdown terbuka saat hover/klik, tertutup saat Esc/klik di luar. */
export default function NavLinks({ nav, services }: { nav: { href: string; label: string }[]; services: Svc[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  const item = (active: boolean) =>
    `relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.93rem] font-medium transition-colors ${active ? 'bg-paper text-ink' : 'text-ink-soft hover:bg-paper hover:text-ink'}`;

  return (
    <nav aria-label="Menu utama" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        <li ref={wrap} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
          <button type="button" aria-expanded={open} aria-controls="menu-layanan" onClick={() => setOpen((o) => !o)}
                  className={item(isActive('/layanan') || isActive('/kerja-sama'))}>
            Layanan <Icon name="caret-down" className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <div id="menu-layanan" hidden={!open}
               className="absolute left-1/2 top-full z-50 w-[36rem] -translate-x-1/2 pt-3">
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_48px_-24px_rgb(22_28_51/0.35)]">
              <ul className="grid grid-cols-2 gap-1 p-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/layanan/${s.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg p-3 text-[0.92rem] font-medium text-ink hover:bg-paper">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name={s.icon} className="size-4" /></span>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-4 border-t border-line bg-paper px-6 py-3.5 text-sm">
                <Link href="/kerja-sama" onClick={() => setOpen(false)} className="font-semibold text-ink hover:text-brand-600">Skema kerja sama</Link>
                <Link href="/layanan" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-brand-600">Semua layanan <Icon name="arrow-right" className="size-4" /></Link>
              </div>
            </div>
          </div>
        </li>
        {nav.map((n) => (
          <li key={n.href}>
            <Link href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} className={item(isActive(n.href))}>{n.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
