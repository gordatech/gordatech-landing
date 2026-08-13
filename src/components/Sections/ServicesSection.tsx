'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Users, TrendingUp, Globe, Layout, Cpu, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";

const ICON_MAP: Record<string, React.ElementType> = {
  Users, TrendingUp, Globe, Layout, Cpu, ShieldCheck,
};

const DEFAULT_SERVICES = [
  {
    id: 1, title: "Strategi Bisnis & Customer", slug: "strategi-bisnis-customer",
    desc: "Merancang peta jalan digital, riset pasar, dan strategi pelanggan untuk pertumbuhan bisnis yang efisien.",
    icon: "Users", tag: "Strategy", color: "#6366f1",
  },
  {
    id: 2, title: "Marketing, Sales & Growth", slug: "marketing-sales-growth",
    desc: "Iklan berbayar presisi tinggi, otomasi lead, dan funnel penjualan untuk meningkatkan revenue secara konsisten.",
    icon: "TrendingUp", tag: "Growth", color: "#f59e0b",
  },
  {
    id: 3, title: "Digital Product & Platform", slug: "digital-product-platform",
    desc: "Website, e-commerce, dan aplikasi mobile berkelas enterprise yang scalable dan cepat.",
    icon: "Globe", tag: "Development", color: "#42b2bf",
  },
  {
    id: 4, title: "Customer Experience", slug: "customer-experience-service",
    desc: "Desain ekosistem layanan pelanggan dan program loyalitas untuk memperkuat keterikatan brand.",
    icon: "Layout", tag: "CX", color: "#ec4899",
  },
  {
    id: 5, title: "Automation & Intelligent AI", slug: "automation-intelligent-ai",
    desc: "Integrasi AI, chatbot cerdas, dan otomasi proses bisnis untuk efisiensi operasional maksimal.",
    icon: "Cpu", tag: "AI & Automation", color: "#10b981",
  },
  {
    id: 6, title: "IT Support & Maintenance", slug: "it-support-maintenance",
    desc: "Managed IT, keamanan siber, dan infrastruktur cloud untuk menjamin uptime sistem 24/7.",
    icon: "ShieldCheck", tag: "Infrastructure", color: "#323e7a",
  },
];

interface ServicesSectionProps { services?: any[] }

export default function ServicesSection({ services = [] }: ServicesSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  // Merge with defaults to pick up color/icon if services from DB lack them
  const displayServices = (services.length > 0 ? services : DEFAULT_SERVICES).map((s: any) => {
    const def = DEFAULT_SERVICES.find(d => d.slug === s.slug) || DEFAULT_SERVICES[0];
    return { ...def, ...s };
  });

  return (
    <section className="py-12 md:py-14 relative overflow-hidden" style={{ background: "#f8fafc" }}>
      <div className="mesh-blob" style={{ top: '-4%', left: '-6%', width: '32vw', height: '32vw', background: 'radial-gradient(circle, rgba(50,62,122,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[1]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Solusi Unggulan</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Layanan yang Mendorong<br/>
              <span className="gorda-gradient-text">Pertumbuhan Nyata</span>
            </h2>
          </div>
          <Link
            href="/layanan"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors self-end group"
          >
            Semua Layanan
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayServices.slice(0, 6).map((srv: any, idx) => {
            const IconComp = ICON_MAP[srv.icon] ?? Globe;
            const isHov = hovered === idx;
            const color: string = srv.color || "#42b2bf";

            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
              >
                <TiltCard max={4} className="gt-card h-full">
                  <Link
                    href={`/layanan/${srv.slug}`}
                    className="group block p-7 h-full relative overflow-hidden rounded-[inherit]"
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Top accent line on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                      style={{
                        background: isHov ? `linear-gradient(90deg, ${color}, ${color}44)` : "transparent",
                      }}
                    />

                    {/* Icon & Title Header side-by-side with border bottom */}
                    <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100">
                      <div
                        className="icon-chip w-11 h-11 flex-shrink-0"
                        style={{
                          background: `linear-gradient(145deg, ${color}2e, ${color}0a)`,
                          color: color,
                          '--chip-glow': color + '55',
                        } as React.CSSProperties}
                      >
                        <IconComp className="w-[18px] h-[18px]" />
                      </div>
                      <div>
                        <h4 className="text-[14.5px] font-extrabold text-slate-900 leading-snug group-hover:text-[#42b2bf] transition-colors">
                          {srv.title}
                        </h4>
                        <span className="text-[9.5px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wide">
                          {srv.tag}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-slate-500 font-light leading-relaxed mb-6">{srv.desc}</p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 mt-auto">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider transition-colors"
                        style={{ color: isHov ? color : "#94a3b8" }}
                      >
                        Pelajari
                      </span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: isHov ? color : "#94a3b8" }}
                      />
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/layanan" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:border-[#42b2bf] hover:text-[#42b2bf] transition-colors">
            Semua Layanan <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
