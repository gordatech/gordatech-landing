import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InsightCard, { InsightCover } from '@/components/ui/InsightCard';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import WaLink from '@/components/ui/WaLink';
import CtaBand from '@/components/ui/CtaBand';
import { getInsight, getInsights, getSite } from '@/lib/api';
import { extractFaqs, renderMarkdown } from '@/lib/markdown';
import { redirectOrNotFound } from '@/lib/redirects';
import { abs, articleSchema, faqSchema, pageMeta } from '@/lib/seo';
import { dateID, initials, waLink } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    return (await getInsights('?per_page=60')).data.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, res] = await Promise.all([getSite(), getInsight(slug)]);
  if (!res) return {};
  const a = res.data;
  return pageMeta(site, {
    title: a.seo.title || a.title, description: a.seo.description || a.excerpt, path: `/insight/${a.slug}`, type: 'article',
    image: a.cover?.url ?? abs(`/insight/${a.slug}/opengraph-image`), publishedTime: a.published_at, modifiedTime: a.updated_at, absoluteTitle: !!a.seo.title,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [site, res] = await Promise.all([getSite(), getInsight(slug)]);
  if (!res) return redirectOrNotFound(`/insight/${slug}`);
  const { data: a, meta } = res;
  const { html, toc } = renderMarkdown(a.content);
  const faqs = extractFaqs(a.content);
  const service = a.services?.[0];
  const updated = a.updated_at.slice(0, 10) !== a.published_at.slice(0, 10);

  return (
    <>
      <article>
        <header className="border-b border-line bg-paper">
          <div className="container-gt pb-10 pt-8">
            <Breadcrumbs items={[{ name: 'Insight', path: '/insight' }, ...(a.category ? [{ name: a.category.name, path: `/insight/kategori/${a.category.slug}` }] : []), { name: a.title, path: `/insight/${a.slug}` }]} />
            <div className="mt-8 max-w-4xl">
              {a.category && <Link href={`/insight/kategori/${a.category.slug}`} className="tag py-2 hover:text-ink">{a.category.name}</Link>}
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.9rem]">{a.title}</h1>
              <p className="mt-5 text-lg text-ink-soft">{a.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
                {a.author && <Link href={`/penulis/${a.author.slug}`} className="inline-flex min-h-10 items-center font-semibold text-ink hover:text-brand-600">{a.author.name}</Link>}
                <span>Terbit <time dateTime={a.published_at}>{dateID(a.published_at)}</time></span>
                {updated && <span>Diperbarui <time dateTime={a.updated_at}>{dateID(a.updated_at)}</time></span>}
                <span className="inline-flex items-center gap-1"><Icon name="clock" className="size-4" />{a.reading_minutes} menit baca</span>
              </p>
            </div>
          </div>
        </header>

        <div className="container-gt grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
          <div className="min-w-0">
            {a.cover && <InsightCover a={a} priority className="mb-10" />}
            {toc.length >= 3 && (
              <nav aria-label="Daftar isi" className="mb-10 rounded-lg border border-line bg-paper p-5 lg:hidden">
                <p className="font-display font-bold">Daftar isi</p>
                <ol className="mt-3 space-y-1.5 text-[0.95rem]">{toc.filter((t) => t.level === 2).map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-ink-soft hover:text-ink">{t.text}</a></li>)}</ol>
              </nav>
            )}
            <div className="prose-gt" dangerouslySetInnerHTML={{ __html: html }} />

            {service && (
              <aside className="mt-10 rounded-xl bg-brand-500 p-6 text-ink sm:p-8">
                <p className="tag tag-ink">Layanan terkait</p>
                <p className="mt-3 font-display text-2xl font-semibold">{service.title}</p>
                <p className="mt-3 text-ink/85">{service.excerpt}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <WaLink href={waLink(site, service.title)} label={`Artikel: ${a.slug}`} className="btn-primary">Konsultasi gratis</WaLink>
                  <Link href={`/layanan/${service.slug}`} className="btn border border-ink/25 hover:border-ink">Lihat layanan</Link>
                </div>
              </aside>
            )}

            {a.author && (
              <div className="mt-10 flex gap-4 border-t border-line pt-8">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-lg font-bold text-ink" aria-hidden="true">{initials(a.author.name)}</span>
                <div>
                  <p className="text-sm text-ink-muted">Ditulis oleh</p>
                  <Link href={`/penulis/${a.author.slug}`} className="font-display text-lg font-bold hover:text-brand-600">{a.author.name}</Link>
                  {a.author.bio && <p className="mt-1 text-[0.95rem] text-ink-soft">{a.author.bio}</p>}
                </div>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {toc.length >= 3 && (
                <nav aria-label="Daftar isi">
                  <p className="font-display font-bold">Daftar isi</p>
                  <ol className="mt-3 space-y-2 border-l border-line text-sm">
                    {toc.map((t) => <li key={t.id} className={t.level === 3 ? 'pl-7' : 'pl-4'}><a href={`#${t.id}`} className="text-ink-soft hover:text-ink">{t.text}</a></li>)}
                  </ol>
                </nav>
              )}
              <div className="card p-5">
                <p className="font-display font-bold">Butuh bantuan langsung?</p>
                <p className="mt-2 text-sm text-ink-soft">Tim kami di Medan siap menjawab lewat WhatsApp.</p>
                <WaLink href={waLink(site, a.title)} label="Sidebar artikel" className="btn-wa mt-4 w-full min-h-11 text-sm">Chat WhatsApp</WaLink>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {meta.related.length > 0 && (
        <section className="border-t border-line bg-paper py-16" aria-labelledby="artikel-terkait">
          <div className="container-gt">
            <p className="tag">Insight</p>
            <h2 id="artikel-terkait" className="mt-4 text-[2rem] sm:text-[2.6rem]">Baca juga</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">{meta.related.map((r) => <InsightCard key={r.slug} a={r} />)}</div>
          </div>
        </section>
      )}
      <CtaBand site={site} context={service?.title} />
      <JsonLd data={articleSchema(a, a.cover?.url ?? abs(`/insight/${a.slug}/opengraph-image`))} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
