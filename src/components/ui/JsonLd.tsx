/** <script type="application/ld+json"> aman (escape "<" agar tidak bisa menutup tag script). */
export default function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
