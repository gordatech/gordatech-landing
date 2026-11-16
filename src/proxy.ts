import { NextResponse, type NextRequest } from 'next/server';

/**
 * URL lama situs statis: /portfolio?selected=slug (modal) → /portfolio/slug (halaman studi kasus baru), 301.
 * Redirect lain dari Admin → Redirect 301 ditangani di halaman (lib/redirects.ts) agar proxy tetap ringan.
 */
export function proxy(request: NextRequest) {
  const selected = request.nextUrl.searchParams.get('selected');
  if (selected && /^[a-z0-9-]{1,200}$/.test(selected)) {
    return NextResponse.redirect(new URL(`/portfolio/${selected}`, request.url), 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/portfolio'] };
