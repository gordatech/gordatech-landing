'use client';

import React from "react";
import { Search, FileText, Layers, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/widgets/TiltCard";

const STEPS = [
  { icon: Search,     num: "01", color: "#42b2bf" },
  { icon: FileText,   num: "02", color: "#6366f1" },
  { icon: Layers,     num: "03", color: "#f59e0b" },
  { icon: ShieldCheck,num: "04", color: "#10b981" },
];

export default function HowWeWorkSection({ settings }: { settings?: any }) {
  const steps = STEPS.map((s, i) => ({
    ...s,
    title: settings?.[`step${i+1}_title`] || ["Audit & Analisis Bisnis","Cetak Biru & Perancangan","Pembangunan & QA","Peluncuran & Pendampingan"][i],
    desc:  settings?.[`step${i+1}_desc`]  || [
      "Pemetaan mendalam terhadap kendala operasional, kebocoran budget, dan proses manual yang memperlambat bisnis Anda.",
      "Menyusun skema arsitektur sistem (SRS) dan roadmap digital marketing dengan estimasi timeline yang realistis.",
      "Rekayasa teknologi standar global dengan pengujian QA/QC menyeluruh untuk performa maksimal dan keamanan penuh.",
      "Dukungan penuh pasca-peluncuran, garansi bug gratis, dan rapat evaluasi berkala demi hasil yang terus optimal.",
    ][i],
  }));

  return (
    <section className="py-12 md:py-14 bg-white relative overflow-hidden">
      <div className="mesh-blob" style={{ top: '10%', right: '-6%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(66,178,191,0.07) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[1]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Metodologi Kerja</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              4 Langkah Menuju<br/>
              <span className="gorda-gradient-text">Hasil Terukur</span>
            </h2>
          </div>
        </div>

        {/* Step cards — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.09 }}
              >
                <TiltCard max={4} className="gt-card group h-full">
                  <div className="p-8 flex flex-col gap-6 relative h-full">
                    {/* Big decorative number */}
                    <span
                      className="absolute top-5 right-6 text-7xl font-black leading-none select-none pointer-events-none"
                      style={{ color: step.color, opacity: 0.07 }}
                    >
                      {step.num}
                    </span>

                    {/* Icon */}
                    <div
                      className="icon-chip w-11 h-11"
                      style={{ background: `linear-gradient(145deg, ${step.color}2e, ${step.color}0a)`, color: step.color, '--chip-glow': step.color + '55' } as React.CSSProperties}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.color }}>
                        Langkah {step.num}
                      </span>
                      <h4 className="text-[15px] font-bold text-slate-900 leading-snug">{step.title}</h4>
                    </div>

                    <p className="text-xs text-slate-500 font-light leading-relaxed flex-1">{step.desc}</p>

                    {/* Step progress line */}
                    <div className="h-[2px] rounded-full w-10 group-hover:w-20 transition-all duration-300"
                      style={{ background: step.color }} />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
