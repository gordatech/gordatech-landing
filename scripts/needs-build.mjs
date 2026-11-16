// Keluar dengan kode 1 bila build produksi perlu dibuat ulang (belum ada build, atau kode lebih baru dari build terakhir).
// Dipakai start-all.bat agar `next build` hanya dijalankan saat ada perubahan kode.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const marker = join(root, '.next', 'BUILD_ID');
if (!existsSync(marker)) process.exit(1);
const built = statSync(marker).mtimeMs;

const newer = (p) => {
  if (!existsSync(p)) return false;
  const st = statSync(p);
  if (st.isFile()) return st.mtimeMs > built;
  return readdirSync(p).some((f) => newer(join(p, f)));
};
const watch = ['src', 'public', 'assets', 'next.config.ts', 'package.json', 'package-lock.json', '.env.local', 'postcss.config.mjs'];
process.exit(watch.some((w) => newer(join(root, w))) ? 1 : 0);
