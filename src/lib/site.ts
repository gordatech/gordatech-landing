import type { SiteData } from './types';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gordatech.com').replace(/\/$/, '');

/** Pembaca Konten situs (admin → Konten situs). String kosong = sengaja disembunyikan admin. */
export function contentOf(site: SiteData) {
  const c = site.content;
  return {
    t: (key: string, fallback = '') => (typeof c[key] === 'string' ? (c[key] as string) : fallback),
    lines: (key: string) => (Array.isArray(c[key]) ? (c[key] as string[]) : []),
    pairs: (key: string) => (Array.isArray(c[key]) ? (c[key] as { title: string; text: string }[]) : []),
    on: (key: string) => c[key] === true,
    img: (key: string) => (typeof c[key] === 'string' && c[key] ? (c[key] as string) : null),
  };
}

export function setting(site: SiteData, key: string): string {
  const v = site.settings[key];
  return typeof v === 'string' ? v : '';
}

/** Tautan WhatsApp dengan pesan terisi sesuai konteks halaman. */
export function waLink(site: SiteData, context?: string): string {
  const number = setting(site, 'contact.whatsapp') || '62818880497';
  const intro = contentOf(site).t('wa.intro', 'Halo GordaTech, saya mau konsultasi.');
  const text = context ? `${intro.replace(/[.\s]+$/, '')} soal ${context}.` : intro;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function waRaw(site: SiteData, text: string): string {
  return `https://wa.me/${setting(site, 'contact.whatsapp') || '62818880497'}?text=${encodeURIComponent(text)}`;
}

export const dateID = (iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  iso ? new Intl.DateTimeFormat('id-ID', { ...opts, timeZone: 'Asia/Jakarta' }).format(new Date(iso)) : '';

/** "/kontak" → link internal; "wa" → WhatsApp; URL absolut dibiarkan. */
export function hrefOf(site: SiteData, value: string, context?: string): string {
  if (!value || value === 'wa') return waLink(site, context);
  return value;
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
}
