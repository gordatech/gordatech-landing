import React from "react";
import Link from "next/link";
import { Users, TrendingUp, Globe, Layout, Cpu, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { fetchServices } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Kami",
  description: "Gordatech menawarkan solusi teknologi lengkap: Web Development, Digital Marketing, AI Automation, dan IT Managed Services untuk akselerasi pertumbuhan bisnis Anda.",
};

interface Service {
  id: number;
  title: string;
  slug: string;
  desc: string;
  icon: string;
  items: string[];
  result: string;
}

const DEFAULT_SERVICES: Service[] = [
  { id: 1, title: "Strategi Bisnis & Customer", slug: "strategi", desc: "Membantu merancang peta jalan digital dan riset pelanggan mendalam untuk efisiensi pertumbuhan bisnis.", icon: "Users", items: ["Customer Strategy", "Business & Market Insight", "Customer Journey Mapping"], result: "Arah bisnis jelas & keputusan lebih tepat" },
  { id: 2, title: "Marketing, Sales & Growth", slug: "marketing", desc: "Meningkatkan penjualan secara konsisten melalui taktik pemasaran berbayar dan pengelolaan lead otomatis.", icon: "TrendingUp", items: ["Performance Advertising", "Social Media Marketing", "Sales Funnel & Lead Management"], result: "Penjualan lebih konsisten & terukur" },
  { id: 3, title: "Digital Product & Platform", slug: "platform", desc: "Membangun platform website, e-commerce, dan aplikasi mobile yang scalable dan berperforma tinggi.", icon: "Globe", items: ["Web Development", "Mobile Applications", "Digital Commerce Platforms"], result: "Operasional rapi & siap scale" },
  { id: 4, title: "Customer Experience & Service", slug: "cx", desc: "Mendesain ekosistem layanan pelanggan dan loyalitas yang memperkuat keterikatan dengan brand.", icon: "Layout", items: ["Service Design", "CX Strategy", "Loyalty Systems"], result: "Kepuasan & loyalitas meningkat" },
  { id: 5, title: "Automation & Intelligent AI", slug: "ai", desc: "Mengintegrasikan kecerdasan buatan dan otomatisasi proses untuk memangkas biaya operasional.", icon: "Cpu", items: ["AI & Machine Learning", "Process Automation", "IoT Solutions"], result: "Efisiensi naik & risiko berkurang" },
  { id: 6, title: "IT Support & Maintenance", slug: "it", desc: "Pendampingan teknis berkelanjutan, cloud infrastruktur, dan keamanan cyber untuk stabilitas sistem.", icon: "ShieldCheck", items: ["Managed IT Services", "Network Security", "Cloud Infrastructure"], result: "Downtime berkurang signifikan" },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Users, TrendingUp, Globe, Layout, Cpu, ShieldCheck,
};

function getWhatsAppLink(title: string) {
  return `https://wa.me/62818880497?text=${encodeURIComponent(`Halo GordaTech! ?? Saya ingin konsultasi mengenai layanan: ${title}. Bisa bantu saya?`)}`;
}

export default async function ServicesPage() {
  const services = await fetchServices();
  const displayServices: Service[] = services.length > 0 ? (services as Service[]) : DEFAULT_SERVICES;

  return (
    <div className="min-h-screen py-24 bg-slate-50">
      {/* Soft color ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "15%", right: "-5%", width: "42%", height: "55%", background: "radial-gradient(ellipse, rgba(66,178,191,0.06) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "38%", height: "50%", background: "radial-gradient(ellipse, rgba(50,62,122,0.04) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <style>{`
        .srv-card { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s; }
        .srv-card:hover { transform: translateY(-4px); border-color: rgba(66, 178, 191, 0.25) !important; box-shadow: 0 16px 40px rgba(28, 34, 61, 0.06); }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4 text-[#42b2bf]">Solusi Unggulan</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight text-slate-900">
            Layanan Kami untuk<br />
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Mempercepat Pertumbuhan Bisnis.
            </span>
          </h1>
          <p className="text-base font-light max-w-2xl leading-relaxed text-slate-500">
            Kami mengintegrasikan strategi, kreativitas, dan teknologi modern untuk memacu efisiensi serta profitabilitas bisnis Anda secara konsisten dan terukur.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayServices.map((srv, idx) => {
            const Icon = ICON_MAP[srv.icon] ?? Globe;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={srv.id}
                className="srv-card rounded-2xl p-8 flex flex-col justify-between bg-white border border-slate-100"
              >
                <div>
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isEven ? "rgba(66,178,191,0.08)" : "rgba(50,62,122,0.08)",
                        border: `1px solid rgba(${isEven ? "66,178,191" : "50,62,122"},0.2)`,
                        color: isEven ? "#42b2bf" : "#323e7a",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold leading-tight text-slate-850">{srv.title}</h2>
                  </div>

                  <p className="text-sm font-light leading-relaxed mb-6 text-slate-500">
                    {srv.desc}
                  </p>

                  {/* Sub-services */}
                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-extrabold mb-3 text-slate-400">
                      Sub-Layanan Utama
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {srv.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isEven ? "#42b2bf" : "#323e7a" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-slate-100">
                  <div className="px-3.5 py-2 rounded-lg" style={{ background: isEven ? "rgba(66, 178, 191, 0.05)" : "rgba(50, 62, 122, 0.05)", border: `1px solid rgba(${isEven ? "66, 178, 191" : "50, 62, 122"},0.1)` }}>
                    <p className="text-[8px] uppercase tracking-widest font-extrabold mb-0.5 text-slate-400">Hasil Nyata</p>
                    <p className="text-xs font-bold text-slate-700">{srv.result}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/layanan/${srv.slug}`}
                      className="text-xs font-bold uppercase tracking-widest transition-all hover:text-[#42b2bf] text-slate-600 flex items-center gap-1 group"
                    >
                      Detail Layanan 
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                    <a
                      href={getWhatsAppLink(srv.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold px-4 py-2.5 rounded-lg text-xs text-white whitespace-nowrap flex-shrink-0"
                      style={{
                        background: isEven ? "linear-gradient(135deg, #42b2bf, #323e7a)" : "linear-gradient(135deg, #323e7a, #42b2bf)",
                        boxShadow: `0 4px 14px rgba(${isEven ? "66, 178, 191" : "50, 62, 122"},0.15)`,
                      }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Konsultasi
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}