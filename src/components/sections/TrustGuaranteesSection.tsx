'use client';

import React from 'react';
import { ShieldCheck, Zap, Key, LifeBuoy, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TiltCard from '@/components/widgets/TiltCard';

interface TrustGuaranteesSectionProps { settings?: any; }

const ITEMS = [
  { icon: Key,         color: "#42b2bf", stat: "100%", label: "Kepemilikan Kode" },
  { icon: Zap,         color: "#f59e0b", stat: "Ads Optimal",  label: "Iklan Tepat Sasaran" },
  { icon: LifeBuoy,    color: "#6366f1", stat: "<4 Jam",label: "SLA Respon Kerja" },
  { icon: ShieldCheck, color: "#10b981", stat: "3 Bln", label: "Garansi Bug Gratis" },
];

export default function TrustGuaranteesSection({ settings }: TrustGuaranteesSectionProps) {
  const guarantees = [
    {
      title: settings?.guarantee1_title || "100% Kepemilikan Source Code",
      tagline: settings?.guarantee1_tagline || "No Vendor Lock-In",
      desc: settings?.guarantee1_desc || "Hak milik penuh kode sumber proyek digital Anda sejak hari pertama peluncuran. Tanpa biaya tersembunyi atau ikatan kepemilikan sepihak.",
      icon: Key, color: "#42b2bf",
      points: settings?.guarantee1_points
        ? settings.guarantee1_points.split(',').map((p: string) => p.trim()).filter(Boolean)
        : ["Source code 100% diserahkan","Hak paten & lisensi penuh milik Anda","Bebas migrasi hosting kapan saja"],
    },
    {
      title: settings?.guarantee2_title || "Garansi Iklan Tepat Sasaran & Optimasi Budget",
      tagline: settings?.guarantee2_tagline || "Precision Ads & Budget Optimization Guarantee",
      desc: settings?.guarantee2_desc || "Kami menjamin setup kampanye iklan digital Anda (Meta & Google Ads) dikonfigurasi menggunakan riset penargetan audiens yang presisi dan optimasi biaya harian guna meminimalkan kebocoran anggaran pemasaran Anda.",
      icon: Zap, color: "#f59e0b",
      points: settings?.guarantee2_points
        ? settings.guarantee2_points.split(',').map((p: string) => p.trim()).filter(Boolean)
        : ["Setup iklan target audiens presisi","Optimasi biaya per prospek (CPL)","Proteksi dari kebocoran budget iklan"],
    },
    {
      title: settings?.guarantee3_title || "SLA Respon Hari Kerja < 4 Jam",
      tagline: settings?.guarantee3_tagline || "Priority Support SLA",
      desc: settings?.guarantee3_desc || "Dukungan operasional pasca-rilis melalui grup WhatsApp koordinasi eksklusif dengan jaminan respon kurang dari 4 jam selama jam kerja (Senin - Jumat, 09:00 - 17:00).",
      icon: LifeBuoy, color: "#6366f1",
      points: settings?.guarantee3_points
        ? settings.guarantee3_points.split(',').map((p: string) => p.trim()).filter(Boolean)
        : ["Grup WhatsApp koordinasi khusus","Respon kendala di bawah 4 jam kerja","Prioritas penanganan kendala sistem"],
    },
    {
      title: settings?.guarantee4_title || "3 Bulan Garansi Bebas Bug",
      tagline: settings?.guarantee4_tagline || "Free Bug-Free Assurance",
      desc: settings?.guarantee4_desc || "Proteksi penuh 90 hari setelah sistem live. Semua bug dan error diselesaikan gratis tanpa tambahan biaya.",
      icon: ShieldCheck, color: "#10b981",
      points: settings?.guarantee4_points
        ? settings.guarantee4_points.split(',').map((p: string) => p.trim()).filter(Boolean)
        : ["Pemantauan error rutin","Perbaikan bug gratis 3 bulan","Update patch keamanan berkala"],
    },
  ];

  return (
    <section className="py-12 md:py-14 relative overflow-hidden" style={{ background: "#f8fafc" }}>
      <div className="mesh-blob" style={{ top: '-8%', left: '20%', width: '40vw', height: '26vw', background: 'radial-gradient(ellipse, rgba(50,62,122,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[1]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="section-label">Komitmen & Garansi GordaTech</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Kemitraan Tanpa Risiko.<br/>
              <span className="gorda-gradient-text">Garansi Hasil Nyata.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-light max-w-xs leading-relaxed md:text-right">
            Kami mengeliminasi risiko dengan jaminan transparansi dan performa penuh.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
              >
                <TiltCard max={3.5} className="gt-card h-full">
                <div className="p-7 group h-full">
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100">
                  <div className="icon-chip w-11 h-11 flex-shrink-0"
                    style={{ background: `linear-gradient(145deg, ${g.color}2e, ${g.color}0a)`, color: g.color, '--chip-glow': g.color + '55' } as React.CSSProperties}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9.5px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{g.tagline}</span>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{g.title}</h3>
                  </div>
                </div>
                <p className="text-[13px] font-light text-slate-500 leading-relaxed mb-5">{g.desc}</p>
                <div className="flex flex-col gap-2">
                  {g.points.map((pt: string, idx: number) => (
                    <span key={idx} className="flex items-center gap-2 text-[12.5px] font-medium text-slate-600">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: g.color }} />
                      {pt}
                    </span>
                  ))}
                </div>
                </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a 
            href={`https://wa.me/62818880497?text=${encodeURIComponent("Halo GordaTech! 👋✨\n\nSaya ingin berkonsultasi mengenai proyek digital bebas risiko dengan jaminan garansi & komitmen penuh GordaTech. 🛡️💼\n\nBolehkah saya jadwalkan sesi konsultasi gratis? Terima kasih banyak! 🙏")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#42b2bf] hover:text-[#323e7a] transition-colors group cursor-pointer"
          >
            Konsultasikan Proyek Tanpa Risiko
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
