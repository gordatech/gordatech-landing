import Icon from '@/components/ui/Icon';
import SectionHead from '@/components/ui/SectionHead';
import type { Content } from './types';
import { waLink } from '@/lib/site';
import type { SiteData } from '@/lib/types';

const ICONS = ['storefront', 'rocket', 'buildings'];

/** Tiga profil klien: UMKM · Startup · Perusahaan. Kartu tengah berlatar teal. */
export default function IdealClients({ c, site }: { c: Content; site: SiteData }) {
  const clients = [1, 2, 3].map((n) => ({ title: c.t(`client${n}.title`), desc: c.t(`client${n}.desc`), features: c.lines(`client${n}.features`) })).filter((x) => x.title);
  if (!clients.length) return null;
  return (
    <section className="py-12 sm:py-16" aria-labelledby="klien-title">
      <div className="container-gt">
        <SectionHead id="klien-title" label={c.t('home.clients_label')} title={c.t('home.clients_title')} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {clients.map((x, i) => {
            const hi = i === 1;
            return (
              <article key={x.title} className={`flex flex-col rounded-xl p-6 sm:p-7 ${hi ? 'bg-brand-500 text-ink' : 'border border-line bg-white'}`}>
                <div className="flex items-center justify-between">
                  <span className={`grid size-12 place-items-center rounded-full ${hi ? 'bg-white' : 'bg-brand-50'} text-ink`}><Icon name={ICONS[i]} className="size-5" /></span>
                  <span className={`num ${hi ? 'text-ink' : ''}`}>({String(i + 1).padStart(2, '0')})</span>
                </div>
                <h3 className="mt-6 text-[1.5rem]">{x.title}</h3>
                <p className={`mt-3 text-[0.97rem] leading-relaxed ${hi ? 'text-ink/85' : 'text-ink-muted'}`}>{x.desc}</p>
                <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-6 text-[0.95rem] ${hi ? 'border-ink/15' : 'border-line text-ink-soft'}`}>
                  {x.features.map((f) => <li key={f} className="flex gap-2.5"><Icon name="check" className={`mt-1 size-4 ${hi ? '' : 'text-brand-600'}`} />{f}</li>)}
                </ul>
                <a href={waLink(site, x.title)} target="_blank" rel="noopener" data-track-label={`Klien: ${x.title}`}
                   className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-2 underline-offset-4 ${hi ? 'decoration-ink' : 'decoration-brand-500 hover:decoration-ink'}`}>
                  Rancang strategi bersama kami <Icon name="arrow-up-right" className="size-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
