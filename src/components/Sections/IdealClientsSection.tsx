'use client';

import React from 'react';
import Link from 'next/link';
import { Store, Rocket, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

interface IdealClientsSectionProps { settings?: any; }

export default function IdealClientsSection({ settings }: IdealClientsSectionProps) {
  const clients = [
    {
      title: settings?.client1_title || "UMKM & Brand Lokal",
      subtitle: settings?.client1_subtitle || "Siap Naik Kelas & Ekspansi",
      icon: Store, color: "#42b2bf",
      features: settings?.client1_features
        ? settings.client1_features.split(',').map((f: string) => f.trim()).filter(Boolean)
        : ["Ingin beralih dari cara konvensional ke digital","Butuh website profesional & WA marketing","Ingin omzet meningkat via iklan digital","Anggaran investasi pemasaran yang fleksibel"],
      desc: settings?.client1_desc || "Kami membantu membangun brand identity, landing page cepat, dan otomasi WhatsApp untuk melipatgandakan closing penjualan.",
      ctaText: settings?.client1_cta || "Mulai Akselerasi UMKM",
    },
    {
      title: settings?.client2_title || "Startup & Bisnis Berkembang",
      subtitle: settings?.client2_subtitle || "Scale-Up Tanpa Overhead IT",
      icon: Rocket, color: "#6366f1",
      features: settings?.client2_features
        ? settings.client2_features.split(',').map((f: string) => f.trim()).filter(Boolean)
        : ["Memerlukan web app / mobile app kustom","Ingin integrasi sistem penjualan & CRM","Butuh rilis produk cepat ke pasar (MVP)","Enggan merekrut & mengelola tim IT in-house"],
      desc: settings?.client2_desc || "GordaTech sebagai partner teknologi merancang sistem backend/frontend handal, modular, aman, dan siap skala.",
      ctaText: settings?.client2_cta || "Konsultasi Scale-Up",
    },
    {
      title: settings?.client3_title || "Perusahaan & Enterprise",
      subtitle: settings?.client3_subtitle || "Otomatisasi & Jaminan Uptime",
      icon: Building2, color: "#0f172a",
      features: settings?.client3_features
        ? settings.client3_features.split(',').map((f: string) => f.trim()).filter(Boolean)
        : ["Butuh otomatisasi proses bisnis via AI","Ingin integrasi API antar sistem warisan","Menuntut jaminan SLA uptime 99.9%","Butuh audit keamanan & pemeliharaan berkala"],
      desc: settings?.client3_desc || "Integrasi AI chatbot cerdas, audit performa server, dan jaminan stabilitas sistem operasional 24/7.",
      ctaText: settings?.client3_cta || "Hubungi Enterprise Desk",
    },
  ];

  return (
    <section className="py-12 md:py-14 bg-white relative overflow-hidden">
      <div className="mesh-blob" style={{ bottom: '-10%', right: '-8%', width: '34vw', height: '34vw', background: 'radial-gradient(circle, rgba(66,178,191,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[1]">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="section-label">Kecocokan Profil Bisnis</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Kami Hadir untuk<br/>
            <span className="gorda-gradient-text">Bisnis Seperti Anda</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clients.map((c, i) => {
            const Icon = c.icon;
            const waMessage = encodeURIComponent(
              `Halo GordaTech! 👋✨\n\nSaya tertarik berkonsultasi mengenai solusi digital untuk kategori:\n💼 *${c.title}* (${c.subtitle})\n\nBolehkah saya menjadwalkan sesi diskusi awal gratis? Terima kasih banyak! 🙏`
            );
            const waUrl = `https://wa.me/62818880497?text=${waMessage}`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <TiltCard max={4} className="gt-card h-full">
                <div className="p-7 flex flex-col group h-full">
                {/* Icon + Title */}
                <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-100">
                  <div
                    className="icon-chip w-11 h-11 flex-shrink-0"
                    style={{ background: `linear-gradient(145deg, ${c.color}2e, ${c.color}0a)`, color: c.color, '--chip-glow': c.color + '55' } as React.CSSProperties}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{c.title}</h3>
                    <span className="text-[10.5px] text-slate-400 font-medium">{c.subtitle}</span>
                  </div>
                </div>

                <p className="text-[13px] font-light text-slate-500 leading-relaxed mb-5">{c.desc}</p>

                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {c.features.map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-[12.5px] text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: c.color }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-wider text-center transition-all duration-200 border flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{
                    borderColor: c.color + "30",
                    color: c.color,
                    background: c.color + "06",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = c.color;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = c.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = c.color + "06";
                    e.currentTarget.style.color = c.color;
                    e.currentTarget.style.borderColor = c.color + "30";
                  }}
                >
                  {c.ctaText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
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