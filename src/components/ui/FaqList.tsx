import JsonLd from './JsonLd';
import { faqSchema } from '@/lib/seo';

/** Akordeon FAQ bergaris (tanpa JavaScript) + FAQPage JSON-LD. */
export default function FaqList({ faqs, schema = true }: { faqs: { question: string; answer: string }[]; schema?: boolean }) {
  if (!faqs.length) return null;
  return (
    <>
      <div className="border-t border-line">
        {faqs.map((f, i) => (
          <details key={f.question} open={i === 0} className="group border-b border-line">
            <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left font-display text-[1.1rem] font-semibold tracking-[-0.01em] text-ink">
              <span className="flex gap-4"><span className="num mt-0.5 w-7 shrink-0">{String(i + 1).padStart(2, '0')}</span>{f.question}</span>
              <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors group-open:border-brand-500 group-open:bg-brand-500" aria-hidden="true">
                <span className="absolute h-0.5 w-3 rounded bg-current" />
                <span className="absolute h-3 w-0.5 rounded bg-current transition-transform group-open:scale-y-0" />
              </span>
            </summary>
            <p className="pb-6 pl-11 pr-12 text-[0.98rem] leading-relaxed text-ink-muted">{f.answer}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
