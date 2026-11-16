import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { contentOf, initials, waLink } from '@/lib/site';
import type { Portfolio, SiteData } from '@/lib/types';

/** "Ubah klik jadi *klien*" → kata di antara * diberi stabilo teal. */
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <span key={i} className="relative whitespace-nowrap">
            <span className="absolute inset-x-[-0.08em] bottom-[0.08em] -z-10 h-[0.32em] rounded-sm bg-brand-500/45" aria-hidden="true" />
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * Hero beranda: hook + subjudul + CTA + bukti kepercayaan di kiri; foto tim dengan kartu hasil studi kasus
 * (data nyata dari admin) dan kartu keahlian di kanan.
 */
export default function Hero({ site, portfolios }: { site: SiteData; portfolios: Portfolio[] }) {
  const c = contentOf(site);
  const photo = c.img('hero.image_main');
  const clients = portfolios.filter((p) => p.client_name);
  const count = site.stats.clients || clients.length;
  const withMetric = (p: Portfolio) => p.cover && (p.metrics ?? []).some((m) => /\d/.test(m.value));
  const showcase = portfolios.find((p) => p.is_featured && withMetric(p)) ?? portfolios.find(withMetric);
  const metric = showcase?.metrics?.find((m) => /\d/.test(m.value));
  const logos = clients.filter((p) => p.client_logo).slice(0, 4);
  const skills = c.lines('hero.skills');

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f2f8f9_0%,#ffffff_75%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgb(22_28_51/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_80%)]" />

      <div className="container-gt grid grid-cols-1 items-center gap-12 pb-12 pt-8 sm:pt-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pb-16 lg:pt-12">
        {/* Kiri: hook */}
        <div>
          {c.t('hero.badge') && (
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.82rem] font-medium text-ink shadow-[0_1px_2px_rgb(22_28_51/0.06)]">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-700/50 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-green-700" />
              </span>
              {c.t('hero.badge')}
            </p>
          )}
          {c.t('hero.eyebrow') && <p className="tag mt-7 block">{c.t('hero.eyebrow')}</p>}
          <h1 id="hero-title" className="relative z-0 mt-4 text-[2.7rem] leading-[1.02] text-ink sm:text-[3.9rem] lg:text-[3.9rem] xl:text-[4.3rem]">
            <Highlight text={c.t('hero.title')} />
          </h1>
          {c.t('hero.subtitle') && <p className="mt-7 max-w-xl text-[1.08rem] leading-relaxed text-ink-muted sm:text-lg">{c.t('hero.subtitle')}</p>}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={waLink(site)} target="_blank" rel="noopener" data-track-label="Hero" className="btn-primary min-h-14 px-7 text-base shadow-[0_12px_24px_-12px_rgb(37_46_92/0.6)]">
              <Icon name="whatsapp" /> {c.t('hero.cta', 'Konsultasi Gratis')}
            </a>
            {c.t('hero.cta2') && (
              <Link href={c.t('hero.cta2_link', '/portfolio')} className="btn-outline min-h-14 px-7 text-base">
                {c.t('hero.cta2')} <Icon name="arrow-right" className="size-4" />
              </Link>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-7">
            {count > 0 && (
              <div className="flex items-center gap-3">
                <span className="flex -space-x-2.5" aria-hidden="true">
                  {(logos.length ? logos : clients.slice(0, 4)).map((p) => (
                    <span key={p.slug} className="grid size-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-white text-[0.65rem] font-bold text-ink shadow-sm">
                      {p.client_logo ? <Image src={p.client_logo.thumb} alt="" width={40} height={40} className="size-full object-contain p-1" /> : initials(p.client_name ?? '')}
                    </span>
                  ))}
                </span>
                <p className="text-sm leading-tight text-ink-muted"><strong className="block font-display text-lg font-semibold text-ink">{count}+</strong>{c.t('hero.trusted', 'klien di Sumatera Utara')}</p>
              </div>
            )}
            <ul className="grid gap-2 text-sm font-medium text-ink-soft">
              {c.lines('hero.points').map((pt) => <li key={pt} className="flex items-center gap-2"><Icon name="seal" className="size-4 text-brand-600" />{pt}</li>)}
            </ul>
          </div>
        </div>

        {/* Kanan: visual + bukti */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="relative ml-auto aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[4/5] bg-paper shadow-[0_40px_80px_-40px_rgb(22_28_51/0.45)] sm:w-[88%]">
            {photo && <Image src={photo} alt="Tim GordaTech bekerja bersama klien" fill priority sizes="(min-width: 1024px) 40vw, 90vw" quality={72} className="object-cover" />}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(16_23_46/0.55)_100%)]" aria-hidden="true" />
            {c.t('hero.image_badge') && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink">
                <Icon name="map-pin" className="size-3.5 text-brand-600" />{c.t('hero.image_badge')}
              </span>
            )}
          </div>

          {skills.length > 0 && (
            <div className="hero-float relative -mt-16 ml-0 w-[17rem] rounded-xl bg-brand-500 p-5 text-ink shadow-[0_24px_48px_-24px_rgb(22_28_51/0.5)] sm:absolute sm:left-0 sm:top-[14%] sm:mt-0">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em]">{c.t('hero.skills_title', 'Satu tim untuk')}</p>
              <ul className="mt-3 space-y-2 text-[0.92rem] font-medium">
                {skills.map((s) => <li key={s} className="flex items-center gap-2"><Icon name="check" className="size-4" />{s}</li>)}
              </ul>
            </div>
          )}

          {showcase && metric && (
            <Link href={`/portfolio/${showcase.slug}`}
                  className="hero-float-slow group relative mt-4 flex w-full max-w-[24rem] items-center gap-4 rounded-xl border border-line bg-white p-4 shadow-[0_24px_48px_-24px_rgb(22_28_51/0.45)] transition-transform hover:-translate-y-1 sm:absolute sm:-bottom-6 sm:left-[6%] sm:mt-0">
              {showcase.cover && (
                <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-paper">
                  <Image src={showcase.cover.thumb} alt="" fill sizes="64px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-brand-600">{c.t('hero.case_label', 'Hasil klien')}</span>
                <span className="mt-1 block font-display text-[1.7rem] font-semibold leading-none tracking-[-0.03em] text-ink">{metric.value}</span>
                <span className="mt-1 block truncate text-sm text-ink-muted">{metric.label} · {showcase.client_name}</span>
              </span>
              <span className="ml-auto grid size-9 shrink-0 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-brand-500" aria-hidden="true">
                <Icon name="arrow-up-right" className="size-4" />
              </span>
            </Link>
          )}
        </div>
      </div>

      {clients.length > 0 && (
        <div className="container-gt pb-6">
          <div className="flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center md:gap-8">
            <p className="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink-muted">Dipercaya oleh</p>
            <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
              <ul className="marquee-track flex w-max items-center gap-12">
                {[...clients, ...clients].map((p, i) => (
                  <li key={`${p.slug}-${i}`} aria-hidden={i >= clients.length || undefined} className="flex items-center gap-12">
                    <Link href={`/portfolio/${p.slug}`} tabIndex={i >= clients.length ? -1 : undefined}
                          className="inline-flex min-h-11 items-center whitespace-nowrap font-display text-lg font-semibold tracking-tight text-ink-muted transition-colors hover:text-ink">
                      {p.client_name}
                    </Link>
                    <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
