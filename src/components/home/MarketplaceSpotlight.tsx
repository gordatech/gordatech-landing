import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import TwoTone from '@/components/ui/TwoTone';
import type { Content } from './types';
import { waLink } from '@/lib/site';
import type { SiteData } from '@/lib/types';

/** Sorotan keahlian Marketplace Ads (TikTok Ads, Shopee Ads, optimasi toko). Admin → Konten situs → Beranda: Marketplace Ads. */
export default function MarketplaceSpotlight({ c, site }: { c: Content; site: SiteData }) {
  if (!c.on('mkt.on') || !c.t('mkt.title')) return null;
  const img = c.img('mkt.image');
  const cards = [
    { icon: 'tiktok', title: c.t('mkt.tiktok_title'), points: c.lines('mkt.tiktok_points') },
    { icon: 'storefront', title: c.t('mkt.shopee_title'), points: c.lines('mkt.shopee_points') },
    { icon: 'trend-up', title: c.t('mkt.optim_title'), points: c.lines('mkt.optim_points') },
  ].filter((x) => x.title);

  return (
    <section className="py-12 sm:py-16" aria-labelledby="mkt-title">
      <div className="container-gt">
        <div className="relative isolate overflow-hidden rounded-2xl bg-night px-5 py-10 text-white sm:px-10 sm:py-12 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.55fr_0.65fr] lg:items-center lg:gap-10">
            <div>
              {c.t('mkt.label') && <p className="tag-dark">{c.t('mkt.label')}</p>}
              <h2 id="mkt-title" className="mt-4 text-[1.9rem] leading-[1.06] sm:text-[2.3rem] lg:text-[2.6rem]"><TwoTone text={c.t('mkt.title')} dark /></h2>
              {c.t('mkt.text') && <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-white/70">{c.t('mkt.text')}</p>}

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {cards.map((x) => (
                  <div key={x.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="grid size-10 place-items-center rounded-full bg-brand-500 text-ink"><Icon name={x.icon} className="size-5" /></span>
                    <h3 className="mt-4 text-[1.05rem] text-white">{x.title}</h3>
                    <ul className="mt-3 space-y-2 text-[0.88rem] leading-snug text-white/70">
                      {x.points.map((p) => <li key={p} className="flex gap-2"><Icon name="check" className="mt-0.5 size-3.5 text-brand-500" />{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={waLink(site, 'audit toko marketplace (TikTok Shop / Shopee)')} target="_blank" rel="noopener" data-track-label="Marketplace Ads" className="btn-teal min-h-13 px-6">
                  <Icon name="whatsapp" /> {c.t('mkt.button', 'Minta Audit Toko Gratis')}
                </a>
                {c.t('mkt.button2') && (
                  <Link href={c.t('mkt.button2_link', '/layanan/marketplace-ads')} className="btn min-h-13 border border-white/20 px-6 text-white hover:border-white/60">
                    {c.t('mkt.button2')} <Icon name="arrow-up-right" className="size-4" />
                  </Link>
                )}
              </div>
            </div>

            {img && (
              <div className="relative mx-auto hidden w-full max-w-sm lg:block lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5">
                  <Image src={img} alt="Belanja online di aplikasi marketplace" fill sizes="(min-width: 1024px) 30vw, 90vw" quality={70} className="object-cover" />
                </div>
                <span className="absolute -left-3 top-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lg"><Icon name="tiktok" className="size-4" /> TikTok Shop</span>
                <span className="absolute -right-3 bottom-10 inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-ink shadow-lg"><Icon name="storefront" className="size-4" /> Shopee Ads</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
