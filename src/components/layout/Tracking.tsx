import Script from 'next/script';
import ClickTracker from './ClickTracker';
import { setting } from '@/lib/site';
import type { SiteData } from '@/lib/types';

const valid = (v: string, re: RegExp) => (re.test(v) ? v : '');

/**
 * Tag pelacakan dari Admin → Kontak & pelacakan. Dimuat setelah halaman interaktif agar tidak menghambat LCP.
 * - GTM bila diisi (GA4/Ads sebaiknya dikonfigurasi di dalam GTM).
 * - Tanpa GTM: gtag.js untuk GA4 dan/atau Google Ads.
 * - Meta Pixel bila diisi.
 */
export default function Tracking({ site }: { site: SiteData }) {
  const gtm = valid(setting(site, 'tracking.gtm_id'), /^GTM-[A-Z0-9]{4,10}$/);
  const ga4 = valid(setting(site, 'tracking.ga4_id'), /^G-[A-Z0-9]{6,14}$/);
  const ads = valid(setting(site, 'tracking.gads_id'), /^AW-[0-9]{6,14}$/);
  const adsLabel = setting(site, 'tracking.gads_lead_label').replace(/[^A-Za-z0-9_-]/g, '');
  const pixel = valid(setting(site, 'tracking.meta_pixel_id'), /^[0-9]{10,20}$/);
  const gtagId = !gtm ? ga4 || ads : '';

  return (
    <>
      {gtm && (
        <>
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="GTM" /></noscript>
        </>
      )}
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${ga4 ? `gtag('config','${ga4}');` : ''}${ads ? `gtag('config','${ads}');` : ''}`}</Script>
        </>
      )}
      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}</Script>
      )}
      <ClickTracker adsSendTo={ads && adsLabel ? `${ads}/${adsLabel}` : ''} />
    </>
  );
}
