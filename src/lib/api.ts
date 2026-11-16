import 'server-only';
import { cache } from 'react';
import type {
  Category, Faq, Insight, LocalPage, Paginated, Portfolio, Product, Scheme, Service, SiteData, SitemapData, Testimonial, Author,
} from './types';

/**
 * Klien GordaTech API v1 (admin-panel/api-docs.md). Hanya berjalan di server: API key tidak pernah sampai ke browser.
 * Setiap fetch diberi tag cache; Laravel memanggil /api/revalidate dengan tag yang sama saat admin menyimpan data.
 */
const BASE = (process.env.GORDATECH_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');
const KEY = process.env.GORDATECH_API_KEY || '';
// Produksi: cache 1 jam + webhook revalidate dari admin. Dev lokal: tanpa cache agar perubahan admin langsung terlihat.
const REVALIDATE = process.env.NODE_ENV === 'development' ? 0 : 3600;

export class NotFound extends Error {}

/** Respons terakhir yang berhasil per path: dipakai bila API sesaat gagal (server baru menyala, restart, MySQL belum siap). */
const lastGood = new Map<string, unknown>();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Saat `next build` (mis. di Vercel), koneksi ke hosting API bisa diputus sesaat (ECONNRESET, rate limit/firewall).
 * Satu fetch gagal = seluruh build gagal, jadi saat build kita mencoba lebih sabar; saat runtime tetap cepat.
 */
const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build';
const BACKOFF_MS = IS_BUILD ? [1000, 2000, 4000, 8000, 12000] : [400, 1200];

async function get<T>(path: string, tags: string[]): Promise<T> {
  let lastError: unknown;
  // Percobaan ulang untuk error jaringan, timeout, dan HTTP 5xx/429 (jeda + sedikit acak agar tidak serempak).
  for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
    if (attempt) await sleep(BACKOFF_MS[attempt - 1] + Math.floor(Math.random() * 300));
    try {
      const res = await fetch(BASE + path, {
        // User-Agent eksplisit: sebagian firewall hosting (ModSecurity/Imunify) memblokir UA bawaan Node.
        headers: { 'X-Api-Key': KEY, Accept: 'application/json', 'User-Agent': 'GordaTech-Web/1.0 (Next.js)' },
        next: { revalidate: REVALIDATE, tags: ['all', ...tags] },
        signal: AbortSignal.timeout(20_000),
      });
      if (res.status === 404) throw new NotFound(path);
      if (res.status >= 500 || res.status === 429) {
        lastError = new Error(`GordaTech API ${path} → HTTP ${res.status}`);
        continue;
      }
      if (!res.ok) throw new Error(`GordaTech API ${path} → HTTP ${res.status}`);
      const json = (await res.json()) as T;
      lastGood.set(path, json);
      return json;
    } catch (e) {
      if (e instanceof NotFound) throw e;
      if (e instanceof Error && /HTTP 4\d\d/.test(e.message) && !/HTTP 429/.test(e.message)) throw e;
      lastError = e;
    }
  }
  if (lastGood.has(path)) {
    console.warn(`[api] ${path} gagal, memakai data terakhir yang berhasil:`, lastError instanceof Error ? lastError.message : lastError);
    return lastGood.get(path) as T;
  }
  throw lastError instanceof Error ? lastError : new Error(`GordaTech API ${path} gagal`);
}

/** null bila 404 (untuk halaman detail → notFound / redirect). */
async function maybe<T>(p: Promise<T>): Promise<T | null> {
  try {
    return await p;
  } catch (e) {
    if (e instanceof NotFound) return null;
    throw e;
  }
}

const enc = encodeURIComponent;

export const getSite = cache(() => get<{ data: SiteData }>('/site', ['site']).then((r) => r.data));
export const getSitemap = () => get<{ data: SitemapData }>('/sitemap', ['services', 'portfolios', 'products', 'insights', 'local-pages']).then((r) => r.data);
export const getRedirects = cache(() => get<{ data: { from: string; to: string; status: number }[] }>('/redirects', ['redirects']).then((r) => r.data));

export const getServices = cache(() => get<{ data: Service[] }>('/services', ['services']).then((r) => r.data));
export const getService = cache((slug: string) => maybe(get<{ data: Service }>(`/services/${enc(slug)}`, ['services']).then((r) => r.data)));

export const getPortfolios = cache((query = '') => get<{ data: Portfolio[] }>(`/portfolios${query}`, ['portfolios']).then((r) => r.data));
export const getPortfolio = cache((slug: string) =>
  maybe(get<{ data: Portfolio; meta: { related: Portfolio[] } }>(`/portfolios/${enc(slug)}`, ['portfolios'])));

export const getTestimonials = cache((home = false) => get<{ data: Testimonial[] }>(`/testimonials${home ? '?home=1' : ''}`, ['testimonials']).then((r) => r.data));

export const getInsights = cache((query = '') => get<Paginated<Insight>>(`/insights${query}`, ['insights']));
export const getInsight = cache((slug: string) => maybe(get<{ data: Insight; meta: { related: Insight[] } }>(`/insights/${enc(slug)}`, ['insights'])));
export const getCategories = cache(() => get<{ data: Category[] }>('/insight-categories', ['insights']).then((r) => r.data));
export const getAuthor = cache((slug: string) => maybe(get<{ data: Author }>(`/authors/${enc(slug)}`, ['insights']).then((r) => r.data)));

export const getFaqs = cache((query = '') => get<{ data: Faq[] }>(`/faqs${query}`, ['faqs']).then((r) => r.data));
export const getProducts = cache(() => get<{ data: Product[] }>('/products', ['products']).then((r) => r.data));
export const getProduct = cache((slug: string) => maybe(get<{ data: Product }>(`/products/${enc(slug)}`, ['products']).then((r) => r.data)));
export const getSchemes = cache(() => get<{ data: Scheme[] }>('/cooperation-schemes', ['schemes']).then((r) => r.data));
export const getLocalPages = cache(() => get<{ data: LocalPage[] }>('/local-pages', ['local-pages']).then((r) => r.data));
export const getLocalPage = cache((slug: string) => maybe(get<{ data: LocalPage }>(`/local-pages/${enc(slug)}`, ['local-pages']).then((r) => r.data)));

/** Untuk generateStaticParams: kegagalan API saat build tidak menggagalkan build (halaman dibuat saat diakses). */
export async function safeParams<T>(fn: () => Promise<T[]>, map: (x: T) => Record<string, string>) {
  try {
    return (await fn()).map(map);
  } catch {
    return [];
  }
}

/** Kirim lead ke Laravel (dipakai route handler /api/lead). */
export async function postLead(body: unknown, visitor: { ip?: string | null; agent?: string | null }) {
  const res = await fetch(BASE + '/leads', {
    method: 'POST',
    headers: {
      'X-Api-Key': KEY, Accept: 'application/json', 'Content-Type': 'application/json',
      ...(visitor.ip ? { 'X-Visitor-Ip': visitor.ip } : {}),
      ...(visitor.agent ? { 'X-Visitor-Agent': visitor.agent.slice(0, 255) } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  return { status: res.status, json: await res.json().catch(() => ({ message: 'Gagal mengirim.' })) };
}
