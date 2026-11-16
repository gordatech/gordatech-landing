import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import InsightList from '@/components/ui/InsightList';
import CtaBand from '@/components/ui/CtaBand';
import { getCategories, getInsights, getSite } from '@/lib/api';
import { contentOf } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

const PER_PAGE = 12;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Insight: Website, SEO, Digital Ads & Teknologi Bisnis', description: contentOf(site).t('insight.intro'), path: '/insight' });
}

export default async function InsightIndex() {
  const [site, list, categories] = await Promise.all([getSite(), getInsights(`?per_page=${PER_PAGE}&page=1`), getCategories()]);
  const c = contentOf(site);
  return (
    <>
      <PageHeader label="Insight" title={c.t('insight.title')} intro={c.t('insight.intro')} crumbs={[{ name: 'Insight', path: '/insight' }]} />
      <InsightList list={list} categories={categories} base="/insight" />
      <CtaBand site={site} />
    </>
  );
}
