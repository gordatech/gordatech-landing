import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Situs produksi boleh dirayapi (termasuk crawler AI agar GordaTech bisa dikutip di jawaban AI).
 * Preview Vercel (bukan domain produksi) diblokir agar tidak terjadi konten duplikat.
 */
export default function robots(): MetadataRoute.Robots {
  const production = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;
  if (!production) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Bingbot'], allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
