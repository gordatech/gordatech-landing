import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import LeadForm from '@/components/forms/LeadForm';
import Icon from '@/components/ui/Icon';
import { getSite } from '@/lib/api';
import { contentOf, setting } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Audit Website Gratis Medan: Kecepatan, SEO & Konversi', description: contentOf(site).t('audit.intro'), path: '/audit-gratis' });
}

export default async function AuditPage() {
  const site = await getSite();
  const c = contentOf(site);
  return (
    <>
      <PageHeader label="Gratis" title={c.t('audit.title')} intro={c.t('audit.intro')} crumbs={[{ name: 'Audit website gratis', path: '/audit-gratis' }]} />
      <section className="py-10 sm:py-12">
        <div className="container-gt grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl">Yang kami periksa</h2>
            <ol className="mt-6 space-y-5">
              {c.pairs('audit.points').map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-brand-50 text-sm font-medium text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                  <span><span className="block font-display text-lg font-bold">{p.title}</span><span className="text-ink-soft">{p.text}</span></span>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex gap-2 rounded-lg bg-paper p-4 text-[0.95rem]"><Icon name="lightning" className="mt-0.5 size-5 text-brand-600" />{c.t('audit.no_site')}</p>
          </div>
          <div className="card p-6 sm:p-8">
            <LeadForm type="audit" fields={['company', 'website_url', 'message']} button={c.t('audit.button', 'Kirim permintaan audit')} success={c.t('audit.success')}
                      privacy={c.t('contact.privacy')} waNumber={setting(site, 'contact.whatsapp')} messageLabel="Target atau kendala website" messagePlaceholder="Mis. ingin lebih banyak chat dari Google" />
          </div>
        </div>
      </section>
    </>
  );
}
