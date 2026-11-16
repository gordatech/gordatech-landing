import type { Metadata } from 'next';
import type { Faq, Insight, Portfolio, Product, Service, SiteData } from './types';
import { SITE_URL, contentOf, setting } from './site';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const abs = (path: string) => (path.startsWith('http') ? path : SITE_URL + (path.startsWith('/') ? path : `/${path}`));

/** Metadata per halaman: judul unik, deskripsi, canonical absolut, Open Graph & Twitter. */
export function pageMeta(site: SiteData, opts: {
  title: string; description: string; path: string; image?: string | null; type?: 'website' | 'article';
  publishedTime?: string; modifiedTime?: string; noindex?: boolean; absoluteTitle?: boolean;
}): Metadata {
  const suffix = contentOf(site).t('seo.title_suffix', 'GordaTech Medan');
  const title = opts.absoluteTitle || opts.title.includes('GordaTech') ? opts.title : `${opts.title} | ${suffix}`;
  const description = opts.description.length > 160 ? opts.description.slice(0, 157).replace(/\s+\S*$/, '') + '…' : opts.description;
  const images = opts.image ? [{ url: opts.image, width: 1200, height: 630, alt: opts.title }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(opts.path) },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: opts.type ?? 'website',
      url: abs(opts.path),
      title,
      description,
      siteName: 'GordaTech',
      locale: 'id_ID',
      ...(images ? { images } : {}),
      ...(opts.type === 'article' ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
  };
}

/** Organization + LocalBusiness (ProfessionalService) + WebSite — dipasang di layout. */
export function orgSchema(site: SiteData) {
  const s = (k: string) => setting(site, k);
  const sameAs = Object.values(site.settings['social.links'] || {}).concat(s('social.gbp') ? [s('social.gbp')] : []);
  const hours = s('contact.hours_spec').split(',').map((h) => h.trim()).filter(Boolean);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: s('org.name') || 'GordaTech',
      ...(s('org.legal_name') ? { legalName: s('org.legal_name') } : {}),
      ...(s('org.founded') ? { foundingDate: s('org.founded') } : {}),
      url: SITE_URL,
      logo: abs('/icon.png'),
      image: abs('/opengraph-image'),
      description: contentOf(site).t('seo.home_description'),
      slogan: contentOf(site).t('brand.tagline'),
      telephone: s('contact.phone'),
      email: s('contact.email'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: s('address.street'),
        addressLocality: s('address.city').replace(/^Kota\s+/i, '') || 'Medan',
        addressRegion: s('address.region'),
        postalCode: s('address.postal'),
        addressCountry: 'ID',
      },
      ...(s('address.lat') && s('address.lng')
        ? { geo: { '@type': 'GeoCoordinates', latitude: Number(s('address.lat')), longitude: Number(s('address.lng')) } }
        : {}),
      ...(s('address.maps_url') ? { hasMap: s('address.maps_url') } : {}),
      ...(hours.length ? { openingHours: hours } : {}),
      areaServed: s('address.area_served').split(',').map((a) => a.trim()).filter(Boolean).map((name) => ({ '@type': 'Place', name })),
      contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: s('contact.phone'), email: s('contact.email'), areaServed: 'ID', availableLanguage: ['id', 'en'] }],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE_URL,
      name: 'GordaTech',
      inLanguage: 'id-ID',
      publisher: { '@id': ORG_ID },
    },
  ];
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Beranda', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: Pick<Faq, 'question' | 'answer'>[]) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
}

export function serviceSchema(s: Service, path: string, areaServed = 'Medan') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.excerpt,
    url: abs(path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: areaServed },
    ...(s.features?.length
      ? { hasOfferCatalog: { '@type': 'OfferCatalog', name: s.title, itemListElement: s.features.map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: f.title, description: f.description ?? undefined } })) } }
      : {}),
  };
}

export function articleSchema(a: Insight, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.seo.description || a.excerpt,
    image: [image],
    datePublished: a.published_at,
    dateModified: a.updated_at,
    inLanguage: 'id-ID',
    mainEntityOfPage: abs(`/insight/${a.slug}`),
    ...(a.word_count ? { wordCount: a.word_count } : {}),
    ...(a.category ? { articleSection: a.category.name } : {}),
    ...(a.focus_keyword ? { keywords: a.focus_keyword } : {}),
    author: a.author
      ? { '@type': a.author.slug === 'gordatech' ? 'Organization' : 'Person', name: a.author.name, url: abs(`/penulis/${a.author.slug}`) }
      : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function caseStudySchema(p: Portfolio) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.summary ?? p.seo.description ?? '',
    url: abs(`/portfolio/${p.slug}`),
    dateModified: p.updated_at,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(p.client_name ? { about: { '@type': 'Organization', name: p.client_name } } : {}),
    ...(p.testimonial
      ? { review: { '@type': 'Review', reviewBody: p.testimonial.quote, author: { '@type': 'Person', name: p.testimonial.author }, itemReviewed: { '@id': ORG_ID } } }
      : {}),
  };
}

export function productSchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    description: p.excerpt,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: abs(`/produk/${p.slug}`),
    ...(p.cover ? { image: p.cover.url } : {}),
    publisher: { '@id': ORG_ID },
  };
}
