import TwoTone from './TwoTone';

/** Kepala section: label "[ … ]" + judul besar dua nada + pengantar/aksi di kanan. */
export default function SectionHead({ label, title, intro, dark = false, action, id, align = 'left' }: {
  label?: string; title: string; intro?: string; dark?: boolean; action?: React.ReactNode; id?: string; align?: 'left' | 'center';
}) {
  const center = align === 'center';
  return (
    <div className={`grid gap-6 ${center ? 'justify-items-center text-center' : 'lg:grid-cols-[1.5fr_1fr] lg:items-end'}`}>
      <div className={center ? 'max-w-3xl' : 'max-w-3xl'}>
        {label && <p className={dark ? 'tag-dark' : 'tag'}>{label}</p>}
        <h2 id={id} className={`mt-4 text-[1.95rem] sm:text-[2.5rem] lg:text-[3rem] ${dark ? 'text-white' : 'text-ink'}`}><TwoTone text={title} dark={dark} /></h2>
      </div>
      {(intro || action) && (
        <div className={`flex max-w-md flex-col gap-5 ${center ? 'items-center' : 'items-start lg:justify-self-end'}`}>
          {intro && <p className={`text-[1.02rem] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-muted'}`}>{intro}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
