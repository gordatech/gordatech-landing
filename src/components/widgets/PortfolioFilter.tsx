'use client';

import { useState } from 'react';

/** Filter studi kasus per layanan di sisi klien. Semua kartu tetap ada di HTML (bisa dirayapi Google). */
export default function PortfolioFilter({ services, children }: {
  services: { slug: string; title: string; count: number }[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState('semua');
  return (
    <div data-filter={active}>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter layanan">
        {[{ slug: 'semua', title: 'Semua', count: services.reduce((n, s) => n + s.count, 0) }, ...services].map((s) => (
          <button key={s.slug} type="button" aria-pressed={active === s.slug} onClick={() => setActive(s.slug)}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${active === s.slug ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'}`}>
            {s.title} <span className={active === s.slug ? 'text-white/60' : 'text-ink-muted'}>{s.count}</span>
          </button>
        ))}
      </div>
      <style>{active === 'semua' ? '' : `[data-cat]:not([data-cat="${active.replace(/[^a-z0-9-]/g, '')}"]){display:none}`}</style>
      {children}
    </div>
  );
}
