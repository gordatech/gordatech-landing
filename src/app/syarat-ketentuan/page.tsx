import type { Metadata } from 'next';
import LegalPage from '@/components/ui/LegalPage';
import { getSite } from '@/lib/api';
import { contentOf } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return pageMeta(site, { title: 'Syarat & Ketentuan', description: 'Ketentuan penawaran, pembayaran bertahap, kepemilikan source code, dan garansi layanan GordaTech.', path: '/syarat-ketentuan' });
}

export default async function Page() {
  const site = await getSite();
  return <LegalPage title="Syarat & ketentuan" path="/syarat-ketentuan" md={contentOf(site).t('terms.body')} updated={site.updated_at} />;
}
