import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

/** Breadcrumb tampil + BreadcrumbList JSON-LD. Item terakhir = halaman saat ini. */
export default function Breadcrumbs({ items, dark = false }: { items: { name: string; path: string }[]; dark?: boolean }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${dark ? 'text-white/70' : 'text-ink-muted'}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className={dark ? 'hover:text-white' : 'hover:text-ink'}>Beranda</Link></li>
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {i === items.length - 1 ? (
                <span aria-current="page" className={`line-clamp-1 ${dark ? 'text-white' : 'text-ink'}`}>{it.name}</span>
              ) : (
                <Link href={it.path} className={dark ? 'hover:text-white' : 'hover:text-ink'}>{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
