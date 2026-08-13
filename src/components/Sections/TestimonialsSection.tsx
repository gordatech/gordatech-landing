'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

const FALLBACK_TESTIMONIALS = [
  {
    quote: "GordaTech membantu digitalisasi total sistem administrasi LKP Metronics. Proses pendaftaran siswa, pembayaran, hingga ujian kini 100% online dan otomatis. Downtime sistem berkurang drastis.",
    name: "Dr. Ir. H. Syahrial, M.Si.",
    role: "Direktur LKP Metronics",
    initial: "S",
    color: "#42b2bf",
    metric: "100% Online",
  },
  {
    quote: "Sistem ERP kustom dari GordaTech sangat membantu operasional kami. Pengendalian inventaris dan pencatatan transaksi kini real-time. Tim teknis mereka sangat responsif.",
    name: "Ronald Siahaan",
    role: "Pemilik CV Ronald Motor",
    initial: "R",
    color: "#6366f1",
    metric: "Real-Time System",
  },
  {
    quote: "Penjualan UPVC kami meningkat lebih dari 65% dalam 3 bulan pertama berkat optimasi sales funnel yang tepat sasaran. Investasi terbaik yang pernah kami lakukan.",
    name: "Hendry",
    role: "Direktur JJUPVC Medan",
    initial: "H",
    color: "#10b981",
    metric: "+65% Revenue",
  },
];

interface TestimonialsSectionProps {
  portfolios?: any[];
}

export default function TestimonialsSection({ portfolios }: TestimonialsSectionProps) {
  // Filter portfolio items that have "show_testimonial_on_homepage" set to true
  // and contain testimonial text and author.
  const activeTestimonials = portfolios && portfolios.length > 0
    ? portfolios.filter((p: any) => p.show_testimonial_on_homepage && p.testimonial_text && p.testimonial_author)
    : [];

  const displayTestimonials = activeTestimonials.length > 0
    ? activeTestimonials.map((p: any, idx: number) => {
        const colors = ["#42b2bf", "#6366f1", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
        return {
          quote: p.testimonial_text,
          name: p.testimonial_author,
          role: p.testimonial_role || "Mitra GordaTech",
          initial: p.testimonial_author ? p.testimonial_author.charAt(0).toUpperCase() : "M",
          color: colors[idx % colors.length],
          metric: p.testimonial_metric || "Mitra Sukses",
        };
      })
    : FALLBACK_TESTIMONIALS;

  return (
    <section className="py-12 md:py-14 bg-white relative overflow-hidden">
      <div className="mesh-blob" style={{ top: '-6%', right: '10%', width: '28vw', height: '28vw', background: 'radial-gradient(circle, rgba(66,178,191,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[1]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Mitra Sukses</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Mereka Sudah<br/>
              <span className="gorda-gradient-text">Merasakan Hasilnya</span>
            </h2>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayTestimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
            <TiltCard max={4} className="gt-card h-full">
            <div className="p-7 flex flex-col group h-full">
              {/* Metric badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{ background: t.color + "12", color: t.color }}
                >
                  {t.metric}
                </span>
                <Quote className="w-5 h-5 text-slate-200" />
              </div>

              {/* Quote */}
              <p className="text-[13.5px] text-slate-650 font-light leading-relaxed italic flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, s) => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div
                  className="icon-chip w-9 h-9 rounded-full text-white font-black text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, '--chip-glow': t.color + '66' } as React.CSSProperties}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">{t.name}</p>
                  <p className="text-[11px] text-slate-450">{t.role}</p>
                </div>
              </div>
            </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}