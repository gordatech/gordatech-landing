import Icon from '@/components/ui/Icon';
import SectionHead from '@/components/ui/SectionHead';
import type { Content } from './types';

const ICONS = ['users-three', 'target', 'chats', 'list-checks', 'map-pin', 'key'];

/** Kenapa GordaTech: enam alasan memilih kami dibanding penyedia lain, di atas latar gelap. */
export default function Guarantees({ c }: { c: Content }) {
  const items = [1, 2, 3, 4, 5, 6]
    .map((n, i) => ({ title: c.t(`guarantee${n}.title`), desc: c.t(`guarantee${n}.desc`), icon: ICONS[i] }))
    .filter((g) => g.title);
  if (!items.length) return null;
  return (
    <section className="bg-night py-12 text-white sm:py-16" aria-labelledby="jaminan-title">
      <div className="container-gt">
        <SectionHead id="jaminan-title" label={c.t('guarantee.label')} title={c.t('guarantee.title')} dark />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <li key={g.title} className="flex gap-4 bg-night p-6 sm:p-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-500 text-ink"><Icon name={g.icon} className="size-5" /></span>
              <div>
                <h3 className="text-lg text-white">{g.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{g.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
