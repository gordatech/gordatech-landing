// Tipe data dari GordaTech API v1 (lihat admin-panel/api-docs.md).

export type Media = { url: string; thumb: string; alt: string | null; width: number | null; height: number | null } | null;

/** Lebar/tinggi tampilan untuk tinggi tertentu, mengikuti rasio asli gambar. */
export const sized = (m: NonNullable<Media>, h: number) => ({ width: m.width && m.height ? Math.round((m.width / m.height) * h) : h * 3, height: h });
export type Seo = { title: string | null; description: string | null };

export interface SiteData {
  settings: Record<string, string> & { 'social.links': Record<string, string> };
  content: Record<string, unknown>;
  stats: { services: number; portfolios: number; clients: number; insights: number; products: number };
  navigation: {
    services: { title: string; slug: string; icon: string }[];
    local_pages: { title: string; slug: string; city: string }[];
  };
  updated_at: string | null;
}

export interface Feature { title: string; description: string | null }

export interface Faq { id: number; question: string; answer: string; service_id: number | null; show_on_home: boolean }

export interface Testimonial {
  id: number;
  author: string;
  role: string | null;
  company: string | null;
  quote: string;
  metric: string | null;
  photo: Media;
  show_on_home: boolean;
  portfolio?: { title: string; slug: string; client_logo: Media } | null;
}

export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  service?: { id: number; title: string; slug: string } | null;
  client_name: string | null;
  client_logo: Media;
  industry: string | null;
  location: string | null;
  cover: Media;
  summary: string | null;
  challenge?: string | null;
  solution?: string | null;
  result: string | null;
  project_url: string | null;
  is_featured: boolean;
  completed_at: string | null;
  metrics?: { label: string; value: string }[];
  images?: NonNullable<Media>[];
  testimonial?: Testimonial | null;
  seo: Seo;
  updated_at: string;
}

export interface Author {
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  photo: Media;
  website_url: string | null;
  linkedin_url: string | null;
  insights_count?: number;
}

export interface Insight {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover: Media;
  category?: { name: string; slug: string } | null;
  author?: Author | null;
  services?: { title: string; slug: string; excerpt: string }[];
  focus_keyword: string | null;
  is_featured: boolean;
  reading_minutes: number;
  word_count?: number;
  published_at: string;
  updated_at: string;
  seo: Seo;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  headline: string | null;
  excerpt: string;
  body?: string | null;
  icon: string;
  result: string | null;
  timeline: string | null;
  cover: Media;
  sort_order: number;
  features?: Feature[];
  portfolios_count?: number;
  faqs?: Faq[];
  portfolios?: Portfolio[];
  insights?: Insight[];
  local_pages?: { title: string; slug: string; city: string }[];
  seo: Seo;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  tagline: string | null;
  excerpt: string;
  body?: string | null;
  icon: string;
  accent_color: string;
  tags: string[];
  features: string[];
  tech_stack: string | null;
  cover: Media;
  images?: NonNullable<Media>[];
  demo_url: string | null;
  seo: Seo;
  updated_at: string;
}

export interface Scheme {
  code: string;
  badge: string | null;
  title: string;
  timeline: string | null;
  support: string | null;
  description: string | null;
  features: string[];
  benefits: string[];
  deliverables: string[];
  target: string | null;
  cta_text: string | null;
  notes: string | null;
}

export interface LocalPage {
  id: number;
  title: string;
  slug: string;
  city: string;
  intro: string;
  body?: string | null;
  service?: Service | null;
  seo: Seo;
  updated_at: string;
}

export interface Category { name: string; slug: string; description: string | null; insights_count: number; seo: Seo; updated_at: string }

export interface Paginated<T> {
  data: T[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

export interface SitemapData {
  services: { path: string; updated_at: string }[];
  portfolios: { path: string; updated_at: string }[];
  products: { path: string; updated_at: string }[];
  insights: { path: string; updated_at: string; image: string | null; title: string }[];
  insight_categories: { path: string; updated_at: string }[];
  authors: { path: string; updated_at: string }[];
  local_pages: { path: string; updated_at: string }[];
}
