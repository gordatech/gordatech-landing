'use client';

/**
 * Halaman error global: menggantikan root layout, jadi TIDAK boleh memanggil API.
 * Tanpa file ini Next membangun /_global-error lewat root layout (fetch ke API) dan build gagal bila API sesaat putus.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, minHeight: '100dvh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui, sans-serif', background: '#fff', color: '#111' }}>
        <main style={{ textAlign: 'center', padding: 24, maxWidth: 480 }}>
          <h1 style={{ fontSize: 28, margin: '0 0 12px' }}>Terjadi kesalahan</h1>
          <p style={{ margin: '0 0 24px', color: '#555' }}>Maaf, halaman gagal dimuat. Silakan coba lagi beberapa saat lagi.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => reset()} style={{ padding: '10px 20px', borderRadius: 8, border: 0, background: '#111', color: '#fff', cursor: 'pointer' }}>
              Coba lagi
            </button>
            <a href="/" style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ccc', color: '#111', textDecoration: 'none' }}>
              Ke beranda
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
