import type { Metadata } from 'next';
import LegalPage from '@/components/ui/LegalPage';
import { getSite } from '@/lib/api';
import { contentOf } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Kebijakan Privasi', description: 'Bagaimana GordaTech mengumpulkan, memakai, dan melindungi data yang Anda kirim lewat situs ini.', path: '/kebijakan-privasi' });
}

export default async function Page() {
  const site = await getSite();
  return <LegalPage title="Kebijakan privasi" path="/kebijakan-privasi" md={contentOf(site).t('privacy.body')} updated={site.updated_at} />;
}
