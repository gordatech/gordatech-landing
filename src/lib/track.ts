// Event konversi ke GTM (dataLayer), GA4/Ads (gtag), dan Meta Pixel (fbq) — mana saja yang terpasang.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

let adsSendTo = '';
export const setAdsSendTo = (v: string) => { adsSendTo = v; };

const PIXEL: Record<string, string> = {
  click_whatsapp: 'Contact', click_phone: 'Contact', generate_lead: 'Lead', audit_request: 'Lead',
};

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  window.gtag?.('event', event, params);
  if (PIXEL[event]) window.fbq?.('track', PIXEL[event], params);
  if (adsSendTo && ['generate_lead', 'audit_request'].includes(event)) {
    window.gtag?.('event', 'conversion', { send_to: adsSendTo, });
  }
}

/** UTM dari URL pertama kunjungan (disimpan di sessionStorage) untuk dilampirkan ke lead. */
export function utm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const p = new URLSearchParams(location.search);
    const keys = ['source', 'medium', 'campaign', 'term', 'content'];
    const fresh = Object.fromEntries(keys.map((k) => [k, p.get(`utm_${k}`) ?? '']).filter(([, v]) => v));
    if (Object.keys(fresh).length) sessionStorage.setItem('gt_utm', JSON.stringify(fresh));
    return Object.keys(fresh).length ? fresh : JSON.parse(sessionStorage.getItem('gt_utm') || '{}');
  } catch {
    return {};
  }
}
