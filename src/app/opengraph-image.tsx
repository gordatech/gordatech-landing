import { ogImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'GordaTech Medan: website, sistem bisnis & digital marketing';

export default function Image() {
  return ogImage({ label: 'Software house & agensi digital Medan', title: 'Website & sistem bisnis yang mendatangkan pelanggan.' });
}
