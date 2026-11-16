import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import SectionHead from '@/components/ui/SectionHead';
import { splitTitle } from '@/components/ui/TwoTone';
import type { Content } from './types';
import { hrefOf, isExternal } from '@/lib/site';
import type { Service, SiteData } from '@/lib/types';

/** Daftar layanan bernomor (01)–(06) + mosaik gambar 2×2 + blok teal "Mulai Kolaborasi". */
export default function ServicesList({ c, site, services }: { c: Content; site: SiteData; services: Service[] }) {
  const mosaic = [1, 2, 3, 4].map((n) => c.img(`home.mosaic${n}`)).filter((x): x is string => !!x);
  const [ctaA, ctaB] = splitTitle(c.t('home.cta_block', 'Mulai | Kolaborasi'));
  const ctaHref = hrefOf(site, c.t('home.cta_block_link', 'wa'), 'kolaborasi baru');

  return (
    <section className="py-12 sm:py-16" aria-labelledby="layanan-title">
      <div className="container-gt">
        <SectionHead id="layanan-title" label={c.t('home.services_label')} title={c.t('home.services_title')} intro={c.t('home.services_intro')}
          action={<Link href="/layanan" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline decoration-brand-500 decoration-2 underline-offset-4 hover:decoration-ink">Jelajahi semua keahlian <Icon name="arrow-up-right" className="size-4" /></Link>} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <div className="grid grid-cols-2 content-start gap-3 lg:sticky lg:top-28 lg:self-start">
            {mosaic.map((src, i) => (
              <div key={src} className={`relative aspect-square overflow-hidden rounded-lg bg-paper ${i > 1 ? 'hidden sm:block' : ''}`}>
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 22vw, 50vw" quality={65} className="object-cover" />
              </div>
            ))}
            <a href={ctaHref} {...(isExternal(ctaHref) ? { target: '_blank', rel: 'noopener' } : {})} data-track-label="Blok Mulai Kolaborasi"
               className="group relative col-span-2 flex min-h-36 items-end justify-between overflow-hidden rounded-lg bg-brand-500 p-6 text-ink transition-colors hover:bg-brand-300">
              <span className="relative font-display text-[2rem] font-semibold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[2.4rem]">
                {ctaA}{ctaB && <><br />{ctaB}</>}
              </span>
              <span className="relative grid size-12 place-items-center rounded-full bg-ink text-white transition-transform group-hover:rotate-45"><Icon name="arrow-up-right" /></span>
            </a>
          </div>

          <ol className="border-t border-ink/15">
            {services.map((s, i) => (
              <li key={s.slug} className="group relative border-b border-ink/15">
                <Link href={`/layanan/${s.slug}`} className="grid grid-cols-[1fr_auto] items-start gap-x-4 py-5 sm:grid-cols-[4rem_1fr_auto]">
                  <span className="num hidden pt-1.5 sm:block">({String(i + 1).padStart(2, '0')})</span>
                  <span>
                    <span className="num mb-1 block sm:hidden">({String(i + 1).padStart(2, '0')})</span>
                    <span className="block font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[1.6rem]">{s.title}</span>
                    <span className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-muted sm:line-clamp-none">{s.excerpt}</span>
                  </span>
                  <span className="mt-1 grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-brand-500 group-hover:bg-brand-500" aria-hidden="true">
                    <Icon name="arrow-up-right" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
