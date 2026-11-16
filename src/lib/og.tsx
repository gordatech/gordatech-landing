import 'server-only';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

let fonts: Promise<{ brand: Buffer; display: Buffer; sans: Buffer; emblem: string }> | null = null;
const load = () =>
  (fonts ??= Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/montserrat-latin-700-normal.woff')),
    readFile(join(process.cwd(), 'assets/fonts/inter-tight-latin-600-normal.woff')),
    readFile(join(process.cwd(), 'assets/fonts/inter-latin-500-normal.woff')),
    readFile(join(process.cwd(), 'public/logo-emblem.png'), 'base64'),
  ]).then(([brand, display, sans, emblem]) => ({ brand, display, sans, emblem: `data:image/png;base64,${emblem}` })));

/** Gambar bagikan 1200×630 bermerek: label, judul besar, baris bawah domain. */
export async function ogImage({ label, title, footer = 'gordatech.com · Medan' }: { label: string; title: string; footer?: string }) {
  const { brand, display, sans, emblem } = await load();
  const size = title.length > 70 ? 52 : title.length > 45 ? 62 : 72;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#161c3a', color: '#fff',
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emblem} width={44} height={59} alt="" />
          <span style={{ fontFamily: 'Brand', fontSize: 30, letterSpacing: 1 }}><span style={{ color: '#42b2bf' }}>GORDA</span>TECH</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span style={{ fontFamily: 'Sans', fontSize: 26, color: '#8fd3dc', textTransform: 'uppercase', letterSpacing: 3 }}>{label}</span>
          <span style={{ fontFamily: 'Display', fontSize: size, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Sans', fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>
          <span>{footer}</span>
          <span style={{ color: '#161c3a', background: '#42b2bf', padding: '6px 16px', borderRadius: 6 }}>Konsultasi gratis</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: 'Brand', data: brand, weight: 700, style: 'normal' }, { name: 'Display', data: display, weight: 600, style: 'normal' }, { name: 'Sans', data: sans, weight: 500, style: 'normal' }] },
  );
}
