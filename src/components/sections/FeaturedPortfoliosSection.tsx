"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/widgets/TiltCard";

interface Portfolio {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  challenge: string;
  work: string;
  result: string;
  metrics: Record<string, string> | null;
  client_name: string | null;
  is_featured: boolean;
}

interface FeaturedPortfoliosSectionProps {
  portfolios: Portfolio[];
}

export default function FeaturedPortfoliosSection({ portfolios }: FeaturedPortfoliosSectionProps) {
  const [selectedPort, setSelectedPort] = useState<Portfolio | null>(null);

  // We display at most 3 featured portfolios on the homepage for clean visual balance
  const featuredList = portfolios.filter(p => p.is_featured).slice(0, 3);

  if (featuredList.length === 0) {
    return null; // Don't render anything if there are no featured portfolios
  }

  return (
    <section className="py-12 md:py-14 relative overflow-hidden bg-var(--bg-dark)" style={{ background: "var(--bg-dark)" }}>
      {/* Background glow filters */}
      <div className="absolute pointer-events-none" style={{ top: "30%", right: "-10%", width: "45%", height: "55%", background: "radial-gradient(circle, rgba(66,178,191,0.03) 0%, transparent 60%)", filter: "blur(80px)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "20%", left: "-10%", width: "45%", height: "55%", background: "radial-gradient(circle, rgba(50,62,122,0.03) 0%, transparent 60%)", filter: "blur(85px)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, rgba(66,178,191,0.1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>
              Studi Kasus
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Portofolio Pilihan &<br />
              <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Dampak Sukses Klien
              </span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest transition-colors group text-slate-500 hover:text-[#42b2bf] self-start md:self-end"
          >
            Lihat Semua Portofolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredList.map((port, idx) => (
            <motion.div
              key={port.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
            <TiltCard max={5} className="rounded-2xl shadow-[0_20px_45px_-20px_rgba(50,62,122,0.35)]">
            <div
              onClick={() => setSelectedPort(port)}
              className="group h-[380px] rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-350 flex flex-col justify-end"
              style={{ border: "1px solid rgba(66, 178, 191, 0.15)" }}
            >
              {/* Image background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${port.image_url})` }}
              />
              
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.55) 50%, rgba(15, 23, 42, 0.15) 100%)" }}
              />
              
              {/* Hover teal shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(66,178,191,0.2) 0%, transparent 60%)" }}
              />

              {/* Tag indicator */}
              <div className="absolute top-4 left-4 z-10">
                <span 
                  className="text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white bg-cyan-500/80 backdrop-blur shadow-sm border border-cyan-400/20"
                >
                  Featured
                </span>
              </div>

              {/* Content bottom */}
              <div className="relative p-7 z-10 flex flex-col gap-2">
                <span
                  className="text-[9px] font-extrabold uppercase tracking-[0.18em]"
                  style={{ color: "#42b2bf" }}
                >
                  {port.category}
                </span>
                
                <h3 className="text-xl font-black text-white leading-tight mb-0.5 group-hover:text-cyan-200 transition-colors">
                  {port.name}
                </h3>
                
                {port.client_name && (
                  <span className="text-xs font-medium text-slate-400/90">
                    Partner: {port.client_name}
                  </span>
                )}
                
                {/* Hover CTA Link */}
                <div
                  className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider mt-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: "#42b2bf" }}
                >
                  Lihat Studi Kasus
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal (Shared Design) */}
      <AnimatePresence>
        {selectedPort && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPort(null)}
              className="absolute inset-0"
              style={{ background: "rgba(28,34,61,0.3)", backdropFilter: "blur(12px)" }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-5xl rounded-2xl overflow-y-auto md:overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-12 max-h-[88vh] bg-white border border-cyan-500/10 shadow-[0_40px_100px_rgba(50,62,122,0.08)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPort(null)}
                className="absolute top-4 right-4 p-2 rounded-xl z-20 cursor-pointer transition-all hover:scale-105 bg-slate-100/80 hover:bg-slate-200/80 text-slate-800 border border-slate-200/30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Sidebar — Image & ROI metrics */}
              <div
                className="md:col-span-5 relative flex flex-col justify-between p-8 md:p-10 min-h-[280px] md:min-h-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedPort.image_url})` }}
              >
                {/* Visual Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-950/95" />

                <div className="relative z-10 flex flex-col gap-2">
                  <span
                    className="self-start text-[9px] font-extrabold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-450"
                    style={{ color: "#42b2bf" }}
                  >
                    {selectedPort.category}
                  </span>
                  
                  <h3 className="text-2xl font-black text-white leading-tight mt-1">
                    {selectedPort.name}
                  </h3>
                  
                  {selectedPort.client_name && (
                    <span className="text-xs font-medium text-slate-400">
                      Klien: {selectedPort.client_name}
                    </span>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="relative z-10 mt-8">
                  <h4
                    className="text-[10px] font-extrabold uppercase tracking-[0.18em] mb-3 text-cyan-400"
                  >
                    Hasil Nyata (ROI)
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPort.metrics && Object.keys(selectedPort.metrics).length > 0 ? (
                      Object.entries(selectedPort.metrics).map(([key, val]) => (
                        <div
                          key={key}
                          className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                          <span className="text-xl font-black block text-cyan-400" style={{ color: "#42b2bf" }}>
                            {val}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider font-bold block mt-0.5 text-slate-400">
                            {key}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 p-3.5 rounded-xl text-center bg-white/5 border border-white/10">
                        <span className="text-xs text-slate-400">Efisiensi & Kepuasan Maksimal</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Side 📑 Narratives */}
              <div className="md:col-span-7 p-8 md:p-10 md:overflow-y-auto flex flex-col gap-8 max-h-none md:max-h-[88vh]">
                
                {/* Challenge */}
                <div className="pl-4 border-l-2 border-orange-400">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] mb-1.5 text-slate-400">
                    Tantangan Klien
                  </h4>
                  <p className="text-sm leading-relaxed font-light text-slate-700">
                    {selectedPort.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="pl-4 border-l-2 border-[#42b2bf]">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] mb-1.5 text-slate-400">
                    Solusi GordaTech
                  </h4>
                  <p className="text-sm leading-relaxed font-light text-slate-700">
                    {selectedPort.work}
                  </p>
                </div>

                {/* Result */}
                <div className="pl-4 border-l-2 border-emerald-400">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] mb-1.5 text-slate-400">
                    Hasil &amp; Dampak Nyata
                  </h4>
                  <p className="text-sm leading-relaxed font-light text-slate-700">
                    {selectedPort.result}
                  </p>
                </div>

                {/* CTA Call Action */}
                <div className="pt-5 mt-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/62818880497?text=${encodeURIComponent(`Halo GordaTech! 👋 Saya melihat studi kasus '${selectedPort.name}' di halaman utama. Tertarik konsultasi solusi serupa untuk bisnis saya.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 font-bold py-3.5 rounded-xl text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sweep-shine"
                    style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", boxShadow: "0 8px 24px rgba(66,178,191,0.3)" }}
                  >
                    {/* WhatsApp Icon SVG */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Ingin Solusi Seperti Ini? Chat Sekarang
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
