import { getService } from '@/lib/api';
import { ogImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Layanan GordaTech';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = await getService((await params).slug);
  return ogImage({ label: s?.title ?? 'Layanan', title: s?.headline || s?.title || 'Layanan GordaTech' });
}
