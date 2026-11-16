import Icon from './Icon';
import WaLink from './WaLink';
import PortfolioCard from './PortfolioCard';
import InsightCard from './InsightCard';
import FaqList from './FaqList';
import Prose from './Prose';
import { waLink } from '@/lib/site';
import type { Service, SiteData } from '@/lib/types';

const PROMISES = ['Konsultasi & analisis kebutuhan tanpa biaya', 'Ruang lingkup & linimasa tertulis', 'Kepemilikan penuh akun & aset', 'Garansi purna-rilis 3 bulan', 'Respons di bawah 4 jam kerja'];

/** Isi landing page layanan, dipakai /layanan/[slug] dan halaman lokal /[slug]. */
export default function ServiceBody({ site, service, intro }: { site: SiteData; service: Service; intro?: React.ReactNode }) {
  return (
    <>
      <section className="py-12 sm:py-16">
        <div className="container-gt grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            {intro}
            {service.features && service.features.length > 0 && (
              <>
                <p className="tag">Cakupan layanan</p>
                <h2 className="mt-4 text-[2rem] sm:text-[2.6rem]">Cakupan yang Anda terima</h2>
                <ol className="mt-10 border-t border-ink/15">
                  {service.features.map((f, i) => (
                    <li key={f.title} className="grid gap-2 border-b border-ink/15 py-6 sm:grid-cols-[4rem_1fr]">
                      <span className="num">({String(i + 1).padStart(2, '0')})</span>
                      <div>
                        <h3 className="text-xl">{f.title}</h3>
                        {f.description && <p className="mt-2 text-[0.98rem] text-ink-muted">{f.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {service.body && <Prose md={service.body} className="mt-10" />}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-xl bg-brand-500 p-7 text-ink">
              <p className="tag relative tag-ink">Ringkasan</p>
              <p className="relative mt-3 font-display text-2xl font-semibold leading-tight">{service.title}</p>
              <dl className="relative mt-6 divide-y divide-ink/15 border-y border-ink/15 text-[0.95rem]">
                {service.timeline && <div className="flex justify-between gap-4 py-3.5"><dt className="text-ink/85">Estimasi waktu</dt><dd className="text-right font-semibold">{service.timeline}</dd></div>}
                {service.result && <div className="flex justify-between gap-4 py-3.5"><dt className="text-ink/85">Hasil</dt><dd className="text-right font-semibold">{service.result}</dd></div>}
              </dl>
              <WaLink href={waLink(site, service.title)} label={`Layanan ${service.title}`} className="btn-primary relative mt-6 w-full">Konsultasi gratis</WaLink>
            </div>
            <ul className="mt-6 space-y-2.5 text-[0.95rem] text-ink-soft">
              {PROMISES.map((x) => <li key={x} className="flex gap-2.5"><Icon name="seal" className="mt-0.5 size-5 text-brand-600" />{x}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      {service.portfolios && service.portfolios.length > 0 && (
        <section className="border-t border-line py-12 sm:py-16" aria-labelledby="kasus-terkait">
          <div className="container-gt">
            <p className="tag">Studi kasus</p>
            <h2 id="kasus-terkait" className="mt-4 text-[2rem] sm:text-[2.6rem]">Karya {service.title} untuk klien kami</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{service.portfolios.slice(0, 3).map((p) => <PortfolioCard key={p.slug} p={p} />)}</div>
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <section className="border-t border-line py-12 sm:py-16" aria-labelledby="faq-layanan">
          <div className="container-gt grid gap-10 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <p className="tag">Tanya jawab</p>
              <h2 id="faq-layanan" className="mt-4 text-[2rem] sm:text-[2.4rem]">Pertanyaan seputar {service.title}</h2>
            </div>
            <FaqList faqs={service.faqs} />
          </div>
        </section>
      )}

      {service.insights && service.insights.length > 0 && (
        <section className="border-t border-line py-12 sm:py-16" aria-labelledby="bacaan">
          <div className="container-gt">
            <p className="tag">Insight</p>
            <h2 id="bacaan" className="mt-4 text-[2rem] sm:text-[2.4rem]">Wawasan terkait</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">{service.insights.map((a) => <InsightCard key={a.slug} a={a} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
