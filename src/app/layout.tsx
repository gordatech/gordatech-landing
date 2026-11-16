import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileCta from '@/components/layout/MobileCta';
import Tracking from '@/components/layout/Tracking';
import SamePageScroll from '@/components/layout/SamePageScroll';
import Chatbot from '@/components/widgets/ChatbotLazy';
import JsonLd from '@/components/ui/JsonLd';
import { getFaqs, getServices, getSite } from '@/lib/api';
import { orgSchema } from '@/lib/seo';
import { SITE_URL, contentOf, setting, waLink } from '@/lib/site';

const display = Inter_Tight({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-inter-tight', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
/** Wordmark GORDATECH: Gotham Bold (berlisensi) bila tersedia, Montserrat Bold sebagai pengganti terdekat. */
const brand = Montserrat({ subsets: ['latin'], weight: ['700'], variable: '--font-montserrat', display: 'swap' });

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const c = contentOf(site);
  const verify = (k: string) => setting(site, k) || undefined;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.t('seo.home_title', 'GordaTech Medan'), template: `%s | ${c.t('seo.title_suffix', 'GordaTech Medan')}` },
    description: c.t('seo.home_description'),
    applicationName: 'GordaTech',
    authors: [{ name: 'GordaTech', url: SITE_URL }],
    creator: 'GordaTech',
    formatDetection: { telephone: false },
    openGraph: { siteName: 'GordaTech', locale: 'id_ID', type: 'website' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    verification: {
      google: verify('verify.google'),
      other: { ...(verify('verify.bing') ? { 'msvalidate.01': verify('verify.bing')! } : {}), ...(verify('verify.meta') ? { 'facebook-domain-verification': verify('verify.meta')! } : {}) },
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [site, services, faqs] = await Promise.all([getSite(), getServices(), getFaqs('?service=global')]);
  const c = contentOf(site);
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} ${brand.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#isi" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow">Lompat ke isi</a>
        <Header site={site} />
        <main id="isi" className="flex-1">{children}</main>
        <Footer site={site} />
        <MobileCta site={site} />
        {c.on('chat.on') && (
          <Chatbot kb={{
            title: c.t('chat.title', 'Asisten GordaTech'), greeting: c.t('chat.greeting'), fallback: c.t('chat.fallback'), waHref: waLink(site),
            faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
            services: services.map((s) => ({ title: s.title, excerpt: s.excerpt, slug: s.slug })),
            contact: { address: setting(site, 'address.full'), phone: setting(site, 'contact.phone'), email: setting(site, 'contact.email'), hours: setting(site, 'contact.hours') },
          }} />
        )}
        <JsonLd data={orgSchema(site)} />
        <Tracking site={site} />
        <SamePageScroll />
      </body>
    </html>
  );
}
