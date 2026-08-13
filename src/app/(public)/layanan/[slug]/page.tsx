import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Briefcase, Globe } from "lucide-react";
import { fetchServices, fetchPortfolios } from "@/lib/api";
import { Metadata } from "next";

interface Service {
  id: number;
  title: string;
  slug: string;
  desc: string;
  icon: string;
  items: string[];
  result: string;
}

interface Portfolio {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  metrics: Record<string, string>;
  client_name: string;
}

const DEFAULT_SERVICES: Service[] = [
  { id: 1, title: "Strategi Bisnis & Customer", slug: "strategi", desc: "Membantu merancang peta jalan digital dan riset pelanggan mendalam untuk efisiensi pertumbuhan bisnis.", icon: "Users", items: ["Customer Strategy", "Business & Market Insight", "Customer Journey Mapping"], result: "Arah bisnis jelas & keputusan lebih tepat" },
  { id: 2, title: "Marketing, Sales & Growth", slug: "marketing", desc: "Meningkatkan penjualan secara konsisten melalui taktik pemasaran berbayar dan pengelolaan lead otomatis.", icon: "TrendingUp", items: ["Performance Advertising", "Social Media Marketing", "Sales Funnel & Lead Management"], result: "Penjualan lebih konsisten & terukur" },
  { id: 3, title: "Digital Product & Platform", slug: "platform", desc: "Membangun platform website, e-commerce, dan aplikasi mobile yang scalable dan berperforma tinggi.", icon: "Globe", items: ["Web Development", "Mobile Applications", "Digital Commerce Platforms"], result: "Operasional rapi & siap scale" },
  { id: 4, title: "Customer Experience & Service", slug: "cx", desc: "Mendesain ekosistem layanan pelanggan dan loyalitas yang memperkuat keterikatan dengan brand.", icon: "Layout", items: ["Service Design", "CX Strategy", "Loyalty Systems"], result: "Kepuasan & loyalitas meningkat" },
  { id: 5, title: "Automation & Intelligent AI", slug: "ai", desc: "Mengintegrasikan kecerdasan buatan dan otomatisasi proses untuk memangkas biaya operasional.", icon: "Cpu", items: ["AI & Machine Learning", "Process Automation", "IoT Solutions"], result: "Efisiensi naik & risiko berkurang" },
  { id: 6, title: "IT Support & Maintenance", slug: "it", desc: "Pendampingan teknis berkelanjutan, cloud infrastruktur, dan keamanan cyber untuk stabilitas sistem.", icon: "ShieldCheck", items: ["Managed IT Services", "Network Security", "Cloud Infrastructure"], result: "Downtime berkurang signifikan" },
];

const PORTFOLIO_CATEGORY_MAP: Record<string, string> = {
  "strategi": "Strategi Bisnis & System Planning",
  "strategi-bisnis-customer": "Strategi Bisnis & System Planning",
  "marketing": "Pertumbuhan Penjualan & Marketing",
  "marketing-sales-growth": "Pertumbuhan Penjualan & Marketing",
  "platform": "Digital Platform & Sistem Bisnis",
  "digital-product-platform": "Digital Platform & Sistem Bisnis",
  "it": "IT Support & Maintenance",
  "it-support-maintenance": "IT Support & Maintenance",
  "ai": "Digital Platform & Sistem Bisnis",
  "automation-intelligent-ai": "Digital Platform & Sistem Bisnis",
  "cx": "Strategi Bisnis & System Planning",
  "customer-experience-service": "Strategi Bisnis & System Planning"
};

async function getServiceDetails(slug: string): Promise<Service | null> {
  const services = await fetchServices();
  const list = services.length > 0 ? (services as Service[]) : DEFAULT_SERVICES;
  return list.find((s) => s.slug === slug) || null;
}

export async function generateStaticParams() {
  try {
    const services = await fetchServices();
    const list = services.length > 0 ? services : DEFAULT_SERVICES;
    return list.map((s: any) => ({ slug: s.slug }));
  } catch (error) {
    console.error("Error generating static params for layanan:", error);
    return DEFAULT_SERVICES.map((s) => ({ slug: s.slug }));
  }
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = await getServiceDetails(slug);

  return {
    title: service ? `${service.title} | Layanan` : "Detail Layanan",
    description: service ? service.desc : "Pelajari detail layanan teknologi dan digital marketing premium di GordaTech.",
  };
}

export default async function ServiceDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = await getServiceDetails(slug);

  if (!service) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center" style={{ background: "var(--bg-dark)" }}>
        <div className="text-center max-w-md p-6 border rounded-3xl bg-white" style={{ borderColor: "var(--text-ghost-val)" }}>
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-extrabold mb-2" style={{ color: "var(--text-white-val)" }}>Layanan Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mb-6 font-light leading-relaxed">Maaf, layanan yang Anda cari tidak dapat ditemukan atau telah dihapus.</p>
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 bg-[#42b2bf] hover:bg-[#323e7a] text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-[0_4px_12px_rgba(66,178,191,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Layanan
          </Link>
        </div>
      </div>
    );
  }

  // Fetch and filter portfolios
  const portfolios = await fetchPortfolios();
  const targetCategory = PORTFOLIO_CATEGORY_MAP[slug] || "";
  const relatedPortfolios = portfolios.filter(
    (p: Portfolio) => p.category === targetCategory
  );

  const getWhatsAppLink = (title: string) => {
    return `https://wa.me/62818880497?text=${encodeURIComponent(`Halo GordaTech! 👋 Saya tertarik untuk mendiskusikan lebih lanjut tentang layanan "${title}". Bisa jadwalkan sesi konsultasi gratis?`)}`;
  };

  return (
    <div className="min-h-screen py-20" style={{ background: "var(--bg-dark)" }}>
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: "40%", height: "55%", background: "radial-gradient(ellipse, rgba(91,142,240,0.07) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "35%", height: "50%", background: "radial-gradient(ellipse, rgba(60,174,185,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/layanan"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 transition-colors text-slate-400 hover:text-[#42b2bf]"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Layanan
        </Link>

        {/* Header Section */}
        <div className="mb-14 pb-8 border-b" style={{ borderColor: "var(--text-ghost-val)" }}>
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[rgba(66,178,191,0.08)] border border-[#42b2bf]/20 inline-block mb-4" style={{ color: "#42b2bf" }}>
            Layanan GordaTech
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-5" style={{ color: "var(--text-white-val)" }}>
            {service.title}
          </h1>
          <p className="text-base font-light leading-relaxed max-w-3xl" style={{ color: "var(--text-muted-val)" }}>
            {service.desc}
          </p>
        </div>

        {/* Two-Column Detail Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Sub-services (Left) */}
          <div className="md:col-span-8 bg-white border rounded-3xl p-8" style={{ borderColor: "var(--text-ghost-val)" }}>
            <h3 className="text-sm font-extrabold uppercase tracking-wider mb-6 pb-3 border-b" style={{ borderColor: "var(--text-ghost-val)", color: "var(--text-white-val)" }}>
              Cakupan Modul &amp; Keahlian Teknis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#42b2bf" }} />
                  <div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-white-val)" }}>{item}</h4>
                    <p className="text-xs font-light" style={{ color: "var(--text-muted-val)" }}>
                      Implementasi modular, terukur, dan aman sesuai standar pengembangan global.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Result & CTA (Right) */}
          <div className="md:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Metric Box */}
            <div className="p-7 rounded-3xl border text-center" style={{ background: "rgba(66,178,191,0.05)", borderColor: "rgba(66,178,191,0.2)" }}>
              <p className="text-[9px] uppercase tracking-widest font-black mb-1.5" style={{ color: "#42b2bf" }}>Target Hasil Nyata Klien</p>
              <h4 className="text-lg font-black" style={{ color: "var(--text-white-val)" }}>{service.result}</h4>
            </div>

            {/* Direct CTA */}
            <div className="p-7 rounded-3xl border flex flex-col gap-5" style={{ background: "var(--bg-navy-card)", borderColor: "var(--text-ghost-val)" }}>
              <h4 className="font-extrabold text-xs uppercase tracking-wider" style={{ color: "var(--text-white-val)" }}>Konsultasikan Kebutuhan Anda</h4>
              <p className="text-[11px] font-light leading-normal" style={{ color: "var(--text-muted-val)" }}>
                Jadwalkan panggilan konsultasi gratis bersama Lead Architect kami untuk menyusun blueprint teknis bisnis Anda.
              </p>
              <a
                href={getWhatsAppLink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[0_8px_24px_rgba(66,178,191,0.15)] flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #42b2bf, #323e7a)",
                }}
              >
                <MessageSquare className="w-4 h-4" />
                Mulai Diskusi Gratis
              </a>
            </div>

          </div>

        </div>

        {/* Related Portfolios Grid */}
        {relatedPortfolios.length > 0 && (
          <div className="pt-12 border-t" style={{ borderColor: "var(--text-ghost-val)" }}>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2.5" style={{ color: "var(--text-white-val)" }}>
              <Briefcase className="w-5 h-5 text-[#323e7a]" />
              Studi Kasus Keberhasilan Terkait
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPortfolios.map((port: Portfolio) => (
                <div
                  key={port.id}
                  className="rounded-2xl overflow-hidden bg-white border flex flex-col justify-between"
                  style={{ borderColor: "var(--text-ghost-val)" }}
                >
                  <div>
                    {/* Thumbnail */}
                    <div
                      className="h-44 bg-cover bg-center"
                      style={{ backgroundImage: `url(${port.image_url})` }}
                    />
                    
                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2">
                      <h4 className="font-extrabold text-sm leading-snug line-clamp-1" style={{ color: "var(--text-white-val)" }}>{port.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#42b2bf" }}>
                        Klien: {port.client_name}
                      </p>
                      
                      {/* Metric Tag */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {Object.entries(port.metrics).map(([k, v]) => (
                          <span key={k} className="text-[9px] font-bold bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Read Case Link */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                    <Link
                      href={`/portfolio?selected=${port.slug}`}
                      className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#42b2bf] hover:opacity-85"
                    >
                      <span>Lihat Detail Studi Kasus</span>
                      <Globe className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
