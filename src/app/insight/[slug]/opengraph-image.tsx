import { getInsight } from '@/lib/api';
import { ogImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Artikel Insight GordaTech';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const res = await getInsight((await params).slug);
  return ogImage({ label: res?.data.category?.name ?? 'Insight', title: res?.data.title ?? 'Insight GordaTech' });
}
