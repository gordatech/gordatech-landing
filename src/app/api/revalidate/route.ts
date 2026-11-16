import { revalidateTag } from 'next/cache';

const KNOWN = ['all', 'site', 'services', 'portfolios', 'testimonials', 'products', 'insights', 'faqs', 'schemes', 'local-pages', 'redirects'];

/**
 * Webhook dari Laravel (FrontendRevalidator) setiap admin menyimpan data.
 * POST {"tags": ["services"]} + header x-revalidate-secret.
 * expire: 0 → cache langsung kedaluwarsa, pengunjung berikutnya melihat konten baru.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { tags = [] } = (await req.json().catch(() => ({}))) as { tags?: string[] };
  const valid = tags.filter((t) => KNOWN.includes(t));
  for (const tag of valid) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: valid, at: new Date().toISOString() });
}
