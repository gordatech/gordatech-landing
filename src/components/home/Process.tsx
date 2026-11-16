import SectionHead from '@/components/ui/SectionHead';
import type { Content } from './types';

/** Metode kerja: empat langkah dalam garis waktu horizontal (konsultasi → audit → eksekusi & optimasi → pendampingan). */
export default function Process({ c }: { c: Content }) {
  const steps = [1, 2, 3, 4]
    .map((n) => ({ title: c.t(`step${n}.title`), desc: c.t(`step${n}.desc`), note: c.t(`step${n}.note`) }))
    .filter((s) => s.title);
  return (
    <section className="py-12 sm:py-16" aria-labelledby="proses-title">
      <div className="container-gt">
        <SectionHead id="proses-title" label={c.t('process.label')} title={c.t('process.title')} intro={c.t('process.intro')} />
        <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-ink/15 lg:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-semibold text-white ring-8 ring-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.note && <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">{s.note}</span>}
              </div>
              <h3 className="mt-5 text-[1.35rem] text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
