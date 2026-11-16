import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { waLink } from '@/lib/site';
import type { SiteData } from '@/lib/types';

/** Bar CTA melayang di HP: WhatsApp + portofolio. */
export default function MobileCta({ site }: { site: SiteData }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t border-line bg-white p-3 lg:hidden">
      <a href={waLink(site)} target="_blank" rel="noopener" data-track-label="Bar HP" className="btn-primary min-h-12 px-4">
        <Icon name="whatsapp" /> Konsultasi Gratis
      </a>
      <Link href="/portfolio" className="btn-teal min-h-12 px-5">Karya Kami</Link>
    </div>
  );
}
