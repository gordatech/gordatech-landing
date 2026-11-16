/** Judul dua baris: "Baris pertama | baris kedua" → baris kedua berwarna lembut. */
export function splitTitle(text: string): [string, string] {
  const [a, ...rest] = text.split('|');
  return [a.trim(), rest.join('|').trim()];
}

export const plainTitle = (text: string) => text.replace(/\s*\|\s*/g, ' ').trim();

/** onTeal: baris kedua navy (kontras ≥ 4:1 di atas teal logo). */
export default function TwoTone({ text, dark = false, onTeal = false, breakLine = true }: { text: string; dark?: boolean; onTeal?: boolean; breakLine?: boolean }) {
  const [a, b] = splitTitle(text);
  if (!b) return <>{a}</>;
  return (
    <>
      {a}
      {breakLine ? <br className="hidden sm:block" /> : null}{' '}
      <span className={dark ? 'text-white/55' : onTeal ? 'text-navy-500' : 'text-ink-muted'}>{b}</span>
    </>
  );
}
