import Image from 'next/image';
import { sized, type Portfolio } from '@/lib/types';

/**
 * Visual studi kasus. Ada sampul → foto. Tidak ada → panel teal bermerek: logo klien + angka hasil utama.
 */
export default function CaseCover({ p, priority = false, sizes = '(min-width: 1024px) 33vw, 100vw', className = '', ratio = 'aspect-[4/3]' }: {
  p: Portfolio; priority?: boolean; sizes?: string; className?: string; ratio?: string;
}) {
  if (p.cover) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-paper ${ratio} ${className}`}>
        <Image src={p.cover.url} alt={p.cover.alt || p.title} fill sizes={sizes} priority={priority} quality={70}
               className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
    );
  }
  const m = p.metrics?.[0];
  return (
    <div className={`relative flex flex-col justify-between overflow-hidden rounded-lg bg-brand-500 p-6 text-ink ${ratio} ${className}`}>
      {p.client_logo ? (
        <span className="grid h-14 w-fit max-w-[60%] place-items-center rounded-md bg-white px-3 py-2">
          <Image src={p.client_logo.thumb} alt={p.client_logo.alt || `Logo ${p.client_name}`} {...sized(p.client_logo, 36)} className="h-auto max-h-9 w-auto max-w-full object-contain" />
        </span>
      ) : (
        <span className="font-display text-lg font-semibold">{p.client_name ?? 'Klien GordaTech'}</span>
      )}
      {m && (
        <div>
          <p className={`font-display font-semibold leading-none ${m.value.length > 9 ? 'text-3xl' : 'text-5xl'}`}>{m.value}</p>
          <p className="mt-2 text-sm font-medium text-ink/85">{m.label}</p>
        </div>
      )}
    </div>
  );
}
