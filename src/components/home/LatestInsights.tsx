import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import SectionHead from '@/components/ui/SectionHead';
import InsightCard from '@/components/ui/InsightCard';
import type { Content } from './types';
import type { Insight } from '@/lib/types';

export default function LatestInsights({ c, items }: { c: Content; items: Insight[] }) {
  if (!items.length) return null;
  return (
    <section className="py-12 sm:py-16" aria-labelledby="insight-title">
      <div className="container-gt">
        <SectionHead id="insight-title" label={c.t('home.insights_label')} title={c.t('home.insights_title')}
          action={<Link href="/insight" className="btn-outline min-h-11 px-5 text-sm">Baca semua wawasan <Icon name="arrow-up-right" className="size-4" /></Link>} />
        <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">{items.slice(0, 3).map((a) => <InsightCard key={a.slug} a={a} />)}</div>
      </div>
    </section>
  );
}
