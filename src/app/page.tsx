import React from "react";
import Hero from "@/components/Sections/Hero";
import HowWeWorkSection from "@/components/Sections/HowWeWorkSection";
import ServicesSection from "@/components/Sections/ServicesSection";
import FeaturedPortfoliosSection from "@/components/Sections/FeaturedPortfoliosSection";
import FaqSection from "@/components/Sections/FaqSection";
import FinalCtaSection from "@/components/Sections/FinalCtaSection";
import TestimonialsSection from "@/components/Sections/TestimonialsSection";
import IdealClientsSection from "@/components/Sections/IdealClientsSection";
import TrustGuaranteesSection from "@/components/Sections/TrustGuaranteesSection";
import { fetchLandingPage, fetchServices, fetchPortfolios, fetchFAQs } from "@/lib/api";


export default async function HomePage() {
  const settings = await fetchLandingPage();
  const services = await fetchServices();
  const portfolios = await fetchPortfolios();
  const faqs = await fetchFAQs();

  // Pick customized texts or default fallback
  const heroTitle = settings.hero_title || "Solusi Digital Lengkap Untuk Bisnis Anda.";
  const heroDesc = settings.hero_desc || "GordaTech membantu transformasi digital bisnis Anda dengan solusi kustom berkelas dunia. Dari web platform hingga otomatisasi AI.";
  const heroTagline = settings.hero_tagline || "Your Trusted Digital Partner";
  const heroRotatingWords = settings.hero_rotating_words || "Brands., Products., Revenue., Growth.";

  return (
    <div className="relative">
      {/* 1. Hero Section + Interactive Configurator */}
      <Hero 
        title={heroTitle} 
        desc={heroDesc} 
        tagline={heroTagline} 
        rotatingWords={heroRotatingWords} 
        portfolios={portfolios} 
      />

      {/* 2. Workflow Steps */}
      <HowWeWorkSection settings={settings} />

      {/* 4. Service Previews */}
      <ServicesSection services={services} />

      {/* Klien Ideal Kami */}
      <IdealClientsSection settings={settings} />

      {/* Trust Guarantees Showcase */}
      <TrustGuaranteesSection settings={settings} />

      {/* Featured Portfolios Section */}
      <FeaturedPortfoliosSection portfolios={portfolios} />



      {/* Client Testimonials reviews */}
      <TestimonialsSection portfolios={portfolios} />

      {/* Accordion FAQ questions */}
      <FaqSection faqs={faqs} />

      {/* Closing conversion Final CTA banner */}
      <FinalCtaSection />
    </div>
  );
}
