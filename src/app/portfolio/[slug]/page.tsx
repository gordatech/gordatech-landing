import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CaseCover from '@/components/ui/CaseCover';
import PortfolioCard from '@/components/ui/PortfolioCard';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import WaLink from '@/components/ui/WaLink';
import { getPortfolio, getPortfolios, getSite, safeParams } from '@/lib/api';
import { redirectOrNotFound } from '@/lib/redirects';
import { caseStudySchema, pageMeta } from '@/lib/seo';
import { contentOf, initials, waLink } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => safeParams(() => getPortfolios(), (p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, res] = await Promise.all([getSite(), getPortfolio(slug)]);
  if (!res) return {};
  const p = res.data;
  return pageMeta(site, { title: p.seo.title || `Studi Kasus ${p.client_name ?? p.title}`, description: p.seo.description || p.summary || p.title, path: `/portfolio/${p.slug}`, image: p.cover?.url, absoluteTitle: !!p.seo.title, type: 'article' });
}

/** Teks dari admin: paragraf dipisah baris kosong; baris berawalan "- " menjadi daftar. */
function parse(text?: string | null) {
  const lines = (text ?? '').split(/\r?\n/);
  const list = lines.filter((l) => /^\s*[-•]\s+/.test(l)).map((l) => l.replace(/^\s*[-•]\s+/, '').trim());
  const paras = lines.filter((l) => !/^\s*[-•]\s+/.test(l)).join('\n').split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
  return { paras, list };
}

function Paras({ items }: { items: string[] }) {
  return <>{items.map((t) => <p key={t} className="mt-4 text-[1.06rem] leading-[1.8] text-ink-soft first:mt-0">{t}</p>)}</>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [site, res] = await Promise.all([getSite(), getPortfolio(slug)]);
  if (!res) return redirectOrNotFound(`/portfolio/${slug}`);
  const { data: p, meta } = res;
  const c = contentOf(site);

  const challenge = parse(p.challenge);
  const solution = parse(p.solution);
  const result = parse(p.result);
  const metrics = (p.metrics ?? []).filter((m) => /\d/.test(m.value));
  const facts = [['Klien', p.client_name], ['Industri', p.industry], ['Layanan', p.service?.title], ['Lokasi', p.location]].filter(([, v]) => v) as [string, string][];
  const sections = [
    { id: 'tantangan', title: 'Tantangan', show: challenge.paras.length > 0 },
    { id: 'pendekatan', title: 'Pendekatan & lingkup pekerjaan', show: solution.paras.length + solution.list.length > 0 },
    { id: 'hasil', title: 'Hasil', show: result.paras.length > 0 || metrics.length > 0 },
  ].filter((s) => s.show);
  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');

  return (
    <>
      <header className="container-gt pt-6">
        <Breadcrumbs items={[{ name: 'Portofolio', path: '/portfolio' }, { name: p.client_name ?? p.title, path: `/portfolio/${p.slug}` }]} />
        <div className="mt-8 max-w-4xl sm:mt-10">
          <p className="tag">{p.service?.title ?? 'Studi kasus'}</p>
          <h1 className="mt-5 text-[2.2rem] text-ink sm:text-[3rem] lg:text-[3.6rem]">{p.title}</h1>
          {p.summary && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted sm:text-xl">{p.summary}</p>}
        </div>
        {facts.length > 0 && (
          <dl className={`mt-8 grid grid-cols-2 border-y border-ink/15 sm:mt-10 ${facts.length >= 4 ? "lg:grid-cols-4" : facts.length === 3 ? "lg:grid-cols-3" : ""}`}>
            {facts.map(([k, v], i) => (
              <div key={k} className={`py-5 pr-4 ${i % 2 === 1 ? 'pl-5 border-l border-ink/15' : ''} ${i >= 2 ? 'border-t border-ink/15 lg:border-t-0' : ''} lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0`}>
                <dt className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-muted">{k}</dt>
                <dd className="mt-1.5 font-semibold leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {p.cover && (
          <CaseCover p={p} priority sizes="(min-width: 1280px) 1180px, 100vw" ratio="aspect-[16/10] sm:aspect-[21/9]" className="mt-10" />
        )}
      </header>

      <section className="py-12 sm:py-16">
        <div className="container-gt grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <div className="min-w-0 max-w-3xl space-y-12">
            {challenge.paras.length > 0 && (
              <section id="tantangan" aria-labelledby="h-tantangan" className="scroll-mt-28">
                <p className="num">({num('tantangan')})</p>
                <h2 id="h-tantangan" className="mt-3 text-[1.8rem] sm:text-[2.2rem]">Tantangan</h2>
                <div className="mt-6"><Paras items={challenge.paras} /></div>
              </section>
            )}

            {solution.paras.length + solution.list.length > 0 && (
              <section id="pendekatan" aria-labelledby="h-pendekatan" className="scroll-mt-28">
                <p className="num">({num('pendekatan')})</p>
                <h2 id="h-pendekatan" className="mt-3 text-[1.8rem] sm:text-[2.2rem]">Pendekatan & lingkup pekerjaan</h2>
                <div className="mt-6"><Paras items={solution.paras} /></div>
                {solution.list.length > 0 && (
                  <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                    {solution.list.map((item) => (
                      <li key={item} className="flex gap-3 bg-white p-5 text-[0.98rem] leading-snug text-ink">
                        <Icon name="check" className="mt-0.5 size-4 text-brand-600" />{item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {(result.paras.length > 0 || metrics.length > 0) && (
              <section id="hasil" aria-labelledby="h-hasil" className="scroll-mt-28">
                <p className="num">({num('hasil')})</p>
                <h2 id="h-hasil" className="mt-3 text-[1.8rem] sm:text-[2.2rem]">Hasil</h2>
                <div className="mt-6"><Paras items={result.paras} /></div>
                {metrics.length > 0 && (
                  <div className="mt-10">
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-muted">{c.t('case.metrics_title', 'Indikator hasil')}</p>
                    <dl className={`mt-4 grid border-t border-ink/15 ${metrics.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                      {metrics.map((m) => (
                        <div key={m.label} className="flex flex-col-reverse gap-1 border-b border-ink/15 py-5 sm:pr-6">
                          <dt className="text-sm text-ink-muted">{m.label}</dt>
                          <dd className="font-display text-[2.2rem] font-semibold leading-none tracking-[-0.03em] text-ink">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                    {c.t('case.metrics_note') && <p className="mt-4 text-sm text-ink-muted">{c.t('case.metrics_note')}</p>}
                  </div>
                )}
              </section>
            )}

            {p.testimonial && (
              <figure className="border-l-2 border-brand-500 pl-6 sm:pl-8">
                <blockquote className="font-display text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[1.6rem]">“{p.testimonial.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm">
                  <span className="grid size-11 place-items-center rounded-full bg-ink font-display font-semibold text-white" aria-hidden="true">{initials(p.testimonial.author)}</span>
                  <span><span className="block font-semibold text-ink">{p.testimonial.author}</span>{p.testimonial.role && <span className="text-ink-muted">{p.testimonial.role}</span>}</span>
                </figcaption>
              </figure>
            )}

            {p.images && p.images.length > 0 && (
              <section aria-labelledby="h-dok">
                <h2 id="h-dok" className="text-[1.6rem]">Dokumentasi</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {p.images.map((img) => (
                    <a key={img.url} href={img.url} target="_blank" rel="noopener" className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-paper">
                      <Image src={img.thumb} alt={img.alt || p.title} fill sizes="(min-width: 640px) 30vw, 100vw" quality={70} className="object-cover" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {sections.length > 1 && (
              <nav aria-label="Isi studi kasus" className="hidden lg:block">
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-muted">Isi studi kasus</p>
                <ol className="mt-4 border-t border-line">
                  {sections.map((s, i) => (
                    <li key={s.id} className="border-b border-line">
                      <a href={`#${s.id}`} className="flex min-h-12 items-center gap-4 text-[0.95rem] text-ink-soft hover:text-ink">
                        <span className="num">{String(i + 1).padStart(2, '0')}</span>{s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="rounded-xl border border-line bg-paper p-6">
              <p className="font-display text-xl font-semibold leading-tight">{c.t('case.cta_title', 'Punya tantangan serupa?')}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{c.t('case.cta_text')}</p>
              <WaLink href={waLink(site, `kebutuhan serupa dengan studi kasus ${p.client_name ?? p.title}`)} label="Studi kasus" className="btn-primary mt-5 w-full">
                {c.t('case.cta_button', 'Jadwalkan Sesi Strategi')}
              </WaLink>
              {p.service && (
                <Link href={`/layanan/${p.service.slug}`} className="mt-4 block py-2 text-sm font-semibold leading-relaxed text-ink underline decoration-brand-500 decoration-2 underline-offset-4 hover:decoration-ink">
                  Layanan {p.service.title} <Icon name="arrow-up-right" className="inline size-4 align-[-3px]" />
                </Link>
              )}
            </div>
            {p.project_url && (
              <a href={p.project_url} target="_blank" rel="noopener" className="btn-outline w-full">Lihat hasil karya <Icon name="arrow-up-right" className="size-4" /></a>
            )}
          </aside>
        </div>
      </section>

      {meta.related.length > 0 && (
        <section className="border-t border-line bg-paper py-12 sm:py-16" aria-labelledby="kasus-lain">
          <div className="container-gt">
            <p className="tag">Portofolio</p>
            <h2 id="kasus-lain" className="mt-4 text-[2rem] sm:text-[2.6rem]">Studi kasus lainnya</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">{meta.related.map((r) => <PortfolioCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}
      <CtaBand site={site} context={p.service?.title} />
      <JsonLd data={caseStudySchema(p)} />
    </>
  );
}
