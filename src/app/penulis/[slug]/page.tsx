import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import InsightCard from '@/components/ui/InsightCard';
import JsonLd from '@/components/ui/JsonLd';
import { getAuthor, getInsights, getSite } from '@/lib/api';
import { redirectOrNotFound } from '@/lib/redirects';
import { abs, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => [{ slug: 'gordatech' }];
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, a] = await Promise.all([getSite(), getAuthor(slug)]);
  if (!a) return {};
  return pageMeta(site, { title: `${a.name}: Penulis Insight`, description: a.bio || `Artikel dari ${a.name}.`, path: `/penulis/${slug}` });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const [a, list] = await Promise.all([getAuthor(slug), getInsights(`?author=${encodeURIComponent(slug)}&per_page=60`)]);
  if (!a) return redirectOrNotFound(`/penulis/${slug}`);
  return (
    <>
      <PageHeader label={a.role ?? 'Penulis'} title={a.name} intro={a.bio} crumbs={[{ name: 'Insight', path: '/insight' }, { name: a.name, path: `/penulis/${slug}` }]}>
        <p className="mt-6 text-sm text-ink-muted">{a.insights_count} artikel diterbitkan</p>
      </PageHeader>
      <section className="py-14">
        <div className="container-gt grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{list.data.map((x) => <InsightCard key={x.slug} a={x} headingLevel={2} />)}</div>
      </section>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'ProfilePage', url: abs(`/penulis/${slug}`),
        mainEntity: { '@type': slug === 'gordatech' ? 'Organization' : 'Person', name: a.name, description: a.bio ?? undefined, ...(a.linkedin_url ? { sameAs: [a.linkedin_url] } : {}) },
      }} />
    </>
  );
}
