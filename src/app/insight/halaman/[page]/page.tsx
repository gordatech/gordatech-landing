import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import InsightList from '@/components/ui/InsightList';
import { getCategories, getInsights, getSite } from '@/lib/api';
import { contentOf } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

const PER_PAGE = 12;
type Props = { params: Promise<{ page: string }> };

export async function generateStaticParams() {
  try {
    const { meta } = await getInsights(`?per_page=${PER_PAGE}`);
    return Array.from({ length: Math.max(0, meta.last_page - 1) }, (_, i) => ({ page: String(i + 2) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const site = await getSite();
  return pageMeta(site, { title: `Insight: Artikel Bisnis Digital (Halaman ${page})`, description: contentOf(site).t('insight.intro'), path: `/insight/halaman/${page}` });
}

export default async function InsightPage({ params }: Props) {
  const n = Number((await params).page);
  if (n === 1) permanentRedirect('/insight');
  if (!Number.isInteger(n) || n < 2) notFound();
  const [site, list, categories] = await Promise.all([getSite(), getInsights(`?per_page=${PER_PAGE}&page=${n}`), getCategories()]);
  if (!list.data.length) notFound();
  const c = contentOf(site);
  return (
    <>
      <PageHeader label={`Insight · halaman ${n}`} title={c.t('insight.title')} crumbs={[{ name: 'Insight', path: '/insight' }, { name: `Halaman ${n}`, path: `/insight/halaman/${n}` }]} />
      <InsightList list={list} categories={categories} base="/insight" />
    </>
  );
}
