import Link from 'next/link';
import Icon from './Icon';
import TwoTone from './TwoTone';
import { contentOf, waLink } from '@/lib/site';
import type { SiteData } from '@/lib/types';

const POINTS = ['Sesi konsultasi tanpa biaya', 'Ruang lingkup tertulis sejak awal', 'Garansi purna-rilis 3 bulan', 'Kepemilikan penuh source code'];

/** Blok ajakan penutup berlatar teal logo (Admin → Konten situs → CTA penutup). */
export default function CtaBand({ site, context }: { site: SiteData; context?: string }) {
  const c = contentOf(site);
  const title = c.t('cta.title');
  if (!title) return null;
  return (
    <section className="py-12 sm:py-16" aria-labelledby="cta-title">
      <div className="container-gt">
        <div className="relative overflow-hidden rounded-xl bg-brand-500 px-6 py-10 text-ink sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              {c.t('cta.label') && <p className="tag tag-ink">{c.t('cta.label')}</p>}
              <h2 id="cta-title" className="mt-4 text-[2.1rem] sm:text-[2.8rem] lg:text-[3.4rem]">
                <TwoTone text={title} onTeal />
              </h2>
              {c.t('cta.text') && <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/85">{c.t('cta.text')}</p>}
            </div>
            <div>
              <ul className="grid gap-2.5 text-sm font-medium">
                {POINTS.map((p) => <li key={p} className="flex items-center gap-2.5"><Icon name="check" className="size-4" />{p}</li>)}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href={waLink(site, context)} target="_blank" rel="noopener" data-track-label="CTA penutup" className="btn-primary min-h-14 whitespace-nowrap px-7">
                  <Icon name="whatsapp" /> {c.t('cta.button', 'Konsultasi Gratis')}
                </a>
                {c.t('cta.button2') && (
                  <Link href={c.t('cta.button2_link', '/audit-gratis')} className="btn min-h-14 border border-ink/25 px-7 text-ink hover:border-ink hover:bg-white/20">
                    {c.t('cta.button2')} <Icon name="arrow-up-right" className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
