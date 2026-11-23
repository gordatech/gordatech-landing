import 'server-only';
import { notFound, permanentRedirect, redirect, unstable_rethrow } from 'next/navigation';
import { getRedirects } from './api';

/**
 * Dipanggil saat data detail tidak ditemukan: cek daftar Redirect 301 dari admin dulu
 * (mis. artikel duplikat yang sudah digabung), baru 404.
 */
export async function redirectOrNotFound(path: string): Promise<never> {
  try {
    const hit = (await getRedirects()).find((r) => r.from === path || r.from === path.replace(/\/$/, ''));
    if (hit) {
      if (hit.status === 302) redirect(hit.to);
      permanentRedirect(hit.to);
    }
  } catch (e) {
    // Redirect & sinyal render-dinamis dari Next harus diteruskan; error API lain → 404 biasa.
    unstable_rethrow(e);
  }
  notFound();
}
