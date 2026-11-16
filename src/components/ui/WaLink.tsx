import Icon from './Icon';

/** Tombol/tautan WhatsApp. data-track dibaca pelacak global (event click_whatsapp). */
export default function WaLink({ href, children, className = 'btn-wa', label }: {
  href: string; children: React.ReactNode; className?: string; label?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className} data-track="whatsapp" data-track-label={label}>
      <Icon name="whatsapp" className="size-5" />
      {children}
    </a>
  );
}
