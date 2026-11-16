import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import InsightList from '@/components/ui/InsightList';
import CtaBand from '@/components/ui/CtaBand';
import { getCategories, getInsights, getSite, safeParams } from '@/lib/api';
import { redirectOrNotFound } from '@/lib/redirects';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => safeParams(getCategories, (c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, cats] = await Promise.all([getSite(), getCategories()]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return {};
  return pageMeta(site, { title: cat.seo.title || `${cat.name}: Artikel & Panduan`, description: cat.seo.description || cat.description || cat.name, path: `/insight/kategori/${slug}`, absoluteTitle: !!cat.seo.title });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [site, cats] = await Promise.all([getSite(), getCategories()]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return redirectOrNotFound(`/insight/kategori/${slug}`);
  const list = await getInsights(`?category=${encodeURIComponent(slug)}&per_page=60`);
  return (
    <>
      <PageHeader label="Kategori insight" title={cat.name} intro={cat.description} crumbs={[{ name: 'Insight', path: '/insight' }, { name: cat.name, path: `/insight/kategori/${slug}` }]} />
      <InsightList list={list} categories={cats} base={`/insight/kategori/${slug}`} activeCategory={slug} />
      <CtaBand site={site} />
    </>
  );
}
