import Icon from '@/components/ui/Icon';
import FaqList from '@/components/ui/FaqList';
import TwoTone from '@/components/ui/TwoTone';
import type { Content } from './types';
import { waLink } from '@/lib/site';
import type { Faq, SiteData } from '@/lib/types';

export default function HomeFaq({ c, site, faqs }: { c: Content; site: SiteData; faqs: Faq[] }) {
  if (!faqs.length) return null;
  return (
    <section className="border-t border-line py-12 sm:py-16" aria-labelledby="faq-title">
      <div className="container-gt grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="tag">{c.t('home.faq_label')}</p>
          <h2 id="faq-title" className="mt-4 text-[1.95rem] text-ink sm:text-[2.5rem] lg:text-[3rem]"><TwoTone text={c.t('home.faq_title')} /></h2>
          {c.t('home.faq_intro') && <p className="mt-5 max-w-sm text-ink-muted">{c.t('home.faq_intro')}</p>}
          <a href={waLink(site, 'pertanyaan seputar layanan')} target="_blank" rel="noopener" data-track-label="FAQ" className="btn-primary mt-6">
            <Icon name="whatsapp" /> Diskusikan dengan tim kami
          </a>
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}
