import type { MetadataRoute } from 'next';
import { getInsights, getSitemap } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

/** Semua URL publik dengan lastmod nyata dari database (bukan new Date()). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const s = await getSitemap();
  const latest = (rows: { updated_at: string }[]) => rows.map((r) => r.updated_at).sort().at(-1);
  const url = (path: string) => SITE_URL + path;
  const staticPages: [string, number, string | undefined][] = [
    ['/', 1, latest([...s.services, ...s.portfolios, ...s.insights])],
    ['/layanan', 0.9, latest(s.services)],
    ['/portfolio', 0.8, latest(s.portfolios)],
    ['/insight', 0.8, latest(s.insights)],
    ['/produk', 0.6, latest(s.products)],
    ['/kerja-sama', 0.6, undefined],
    ['/audit-gratis', 0.7, undefined],
    ['/tentang', 0.5, undefined],
    ['/kontak', 0.6, undefined],
    ['/kebijakan-privasi', 0.2, undefined],
    ['/syarat-ketentuan', 0.2, undefined],
  ];

  let pages = 1;
  try {
    pages = (await getInsights('?per_page=12')).meta.last_page;
  } catch { /* abaikan */ }

  return [
    ...staticPages.map(([path, priority, lastModified]) => ({ url: url(path), priority, ...(lastModified ? { lastModified } : {}) })),
    ...s.local_pages.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.9 })),
    ...s.services.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.9 })),
    ...s.portfolios.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.7 })),
    ...s.products.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.6 })),
    ...s.insights.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.7, ...(p.image ? { images: [p.image] } : {}) })),
    ...s.insight_categories.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.5 })),
    ...s.authors.map((p) => ({ url: url(p.path), lastModified: p.updated_at, priority: 0.3 })),
    ...Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ url: url(`/insight/halaman/${i + 2}`), priority: 0.3 })),
  ];
}
