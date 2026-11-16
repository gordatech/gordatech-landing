/** Bingkai garis putus dengan penanda sudut kotak kecil (gaya gambar kerja). */
export default function Frame({ children, className = '', as: Tag = 'div' }: { children: React.ReactNode; className?: string; as?: 'div' | 'section' | 'header' }) {
  return (
    <Tag className={`frame ${className}`}>
      <span aria-hidden="true" className="frame-corner -left-[4px] -top-[4px]" />
      <span aria-hidden="true" className="frame-corner -right-[4px] -top-[4px]" />
      <span aria-hidden="true" className="frame-corner -bottom-[4px] -left-[4px]" />
      <span aria-hidden="true" className="frame-corner -bottom-[4px] -right-[4px]" />
      {children}
    </Tag>
  );
}
