import type { NextConfig } from 'next';

// Gambar dilayani dari admin panel Laravel (APP_URL/storage/...). Host diambil dari GORDATECH_API_URL.
const api = new URL(process.env.GORDATECH_API_URL || 'http://localhost:8000/api/v1');
const isLocalApi = ['localhost', '127.0.0.1'].includes(api.hostname);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: api.protocol.replace(':', '') as 'http' | 'https', hostname: api.hostname, port: api.port, pathname: '/storage/**' }],
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80],
    // Next 16 memblokir optimasi gambar dari IP lokal; hanya diizinkan saat API berjalan di localhost (pengembangan).
    dangerouslyAllowLocalIP: isLocalApi,
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
};

export default nextConfig;
