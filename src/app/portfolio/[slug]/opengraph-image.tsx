import { getPortfolio } from '@/lib/api';
import { ogImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Studi kasus GordaTech';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const res = await getPortfolio((await params).slug);
  const m = res?.data.metrics?.[0];
  return ogImage({ label: m ? `${m.label}: ${m.value}` : 'Studi kasus', title: res?.data.title ?? 'Studi kasus GordaTech', footer: res?.data.client_name ? `Klien: ${res.data.client_name}` : undefined });
}
