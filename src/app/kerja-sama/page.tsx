import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import Icon from '@/components/ui/Icon';
import WaLink from '@/components/ui/WaLink';
import CtaBand from '@/components/ui/CtaBand';
import { getSchemes, getSite } from '@/lib/api';
import { contentOf, waLink } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Model Kemitraan: Langganan, Kustom & Jangka Panjang', description: contentOf(site).t('schemes.intro'), path: '/kerja-sama' });
}

/** Tiga model kemitraan; kartu tengah ditonjolkan. Yang tampil: deskripsi, "Yang Anda terima", "Cocok untuk", mulai & dukungan. */
export default async function KerjaSamaPage() {
  const [site, schemes] = await Promise.all([getSite(), getSchemes()]);
  const c = contentOf(site);
  return (
    <>
      <PageHeader label="Kerja sama" title={c.t('schemes.title')} intro={c.t('schemes.intro')} crumbs={[{ name: 'Skema kerja sama', path: '/kerja-sama' }]} />
      <section className="py-10 sm:py-14">
        <div className="container-gt grid gap-5 lg:grid-cols-3">
          {schemes.map((s, i) => {
            const hi = i === 1;
            const muted = hi ? 'text-ink/85' : 'text-ink-muted';
            return (
              <article key={s.code} className={`flex flex-col rounded-xl p-6 sm:p-7 ${hi ? 'bg-brand-500 text-ink' : 'border border-line bg-white'}`}>
                <div className="flex items-center justify-between gap-3">
                  {s.badge && <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hi ? 'bg-white text-ink' : 'bg-brand-50 text-brand-600'}`}>{s.badge}</span>}
                  <span className={`num ${hi ? 'text-ink' : ''}`}>({String(i + 1).padStart(2, '0')})</span>
                </div>
                <h2 className="mt-5 text-[1.6rem] leading-tight">{s.title}</h2>
                {s.description && <p className={`mt-3 text-[0.97rem] leading-relaxed ${muted}`}>{s.description}</p>}

                {s.deliverables.length > 0 && (
                  <div className={`mt-6 border-t pt-5 ${hi ? 'border-ink/15' : 'border-line'}`}>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em]">Yang Anda terima</p>
                    <ul className="mt-3 space-y-2.5 text-[0.95rem]">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5"><Icon name="check-circle" className={`mt-0.5 size-[1.1rem] ${hi ? '' : 'text-brand-600'}`} />{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {s.target && (
                  <p className={`mt-5 text-sm leading-relaxed ${muted}`}><span className="font-semibold text-ink">Cocok untuk: </span>{s.target}</p>
                )}

                <dl className={`mt-5 grid gap-2 rounded-lg p-4 text-sm ${hi ? 'bg-white/35' : 'bg-paper'}`}>
                  {s.timeline && <div className="flex justify-between gap-3"><dt className={muted}>Mulai dalam</dt><dd className="text-right font-semibold">{s.timeline}</dd></div>}
                  {s.support && <div className="flex justify-between gap-3"><dt className={muted}>Dukungan</dt><dd className="text-right font-semibold">{s.support}</dd></div>}
                </dl>

                <div className="mt-auto pt-6">
                  <WaLink href={waLink(site, `model kemitraan ${s.title}`)} label={`Skema ${s.code}`} className="btn-primary w-full">{s.cta_text || 'Diskusikan kemitraan ini'}</WaLink>
                  {s.notes && <p className={`mt-3 text-center text-xs leading-relaxed ${muted}`}>{s.notes}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
