import Breadcrumbs from './Breadcrumbs';
import Frame from './Frame';
import TwoTone from './TwoTone';

/** Kepala halaman dalam: bingkai garis putus + label "[ … ]" + judul besar dua nada + pengantar. */
export default function PageHeader({ label, title, intro, crumbs, children }: {
  label?: string; title: string; intro?: string | null; crumbs: { name: string; path: string }[]; children?: React.ReactNode;
}) {
  return (
    <header className="container-gt pt-6">
      <Breadcrumbs items={crumbs} />
      <Frame className="mt-5 px-5 py-8 sm:px-10 sm:py-10 lg:px-12">
        {label && <p className="tag">{label}</p>}
        <h1 className="mt-4 max-w-5xl text-[2.3rem] text-ink sm:text-[3.1rem] lg:text-[3.7rem]"><TwoTone text={title} /></h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</p>}
        {children}
      </Frame>
    </header>
  );
}
