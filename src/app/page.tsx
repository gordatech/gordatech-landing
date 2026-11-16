import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ServicesList from '@/components/home/ServicesList';
import MarketplaceSpotlight from '@/components/home/MarketplaceSpotlight';
import FeaturedCases from '@/components/home/FeaturedCases';
import Process from '@/components/home/Process';
import Guarantees from '@/components/home/Guarantees';
import IdealClients from '@/components/home/IdealClients';
import Testimonials from '@/components/home/Testimonials';
import LatestInsights from '@/components/home/LatestInsights';
import HomeFaq from '@/components/home/HomeFaq';
import CtaBand from '@/components/ui/CtaBand';
import { getFaqs, getInsights, getPortfolios, getServices, getSite, getTestimonials } from '@/lib/api';
import { contentOf } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const c = contentOf(site);
  return pageMeta(site, { title: c.t('seo.home_title'), description: c.t('seo.home_description'), path: '/', absoluteTitle: true, image: c.img('seo.og_image') });
}

/** Alur beranda: hero → layanan → sorotan Marketplace Ads → karya & angka → cara kerja → alasan → untuk siapa → testimoni → insight → FAQ → CTA. */
export default async function HomePage() {
  const [site, services, portfolios, testimonials, insights, faqs] = await Promise.all([
    getSite(), getServices(), getPortfolios(), getTestimonials(true), getInsights('?per_page=3'), getFaqs('?service=global&home=1'),
  ]);
  const c = contentOf(site);
  const cases = [...portfolios.filter((p) => p.is_featured), ...portfolios.filter((p) => !p.is_featured)].slice(0, 6);

  return (
    <>
      <Hero site={site} portfolios={portfolios} />
      <ServicesList c={c} site={site} services={services} />
      <MarketplaceSpotlight c={c} site={site} />
      <FeaturedCases c={c} site={site} portfolios={cases} />
      <Process c={c} />
      <Guarantees c={c} />
      <IdealClients c={c} site={site} />
      <Testimonials c={c} items={testimonials} />
      <LatestInsights c={c} items={insights.data} />
      <HomeFaq c={c} site={site} faqs={faqs} />
      <CtaBand site={site} />
    </>
  );
}
