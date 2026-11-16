import PageHeader from './PageHeader';
import Prose from './Prose';
import { dateID } from '@/lib/site';

export default function LegalPage({ title, path, md, updated }: { title: string; path: string; md: string; updated: string | null }) {
  return (
    <>
      <PageHeader title={title} crumbs={[{ name: title, path }]}>
        {updated && <p className="mt-4 text-sm text-ink-muted">Terakhir diperbarui {dateID(updated)}</p>}
      </PageHeader>
      <section className="py-14"><div className="container-gt"><Prose md={md} /></div></section>
    </>
  );
}
