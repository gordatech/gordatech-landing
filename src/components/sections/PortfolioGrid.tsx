"use client";

import React, { useState } from "react";
import { X, ExternalLink, TrendingUp, HelpCircle, Info, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface PortfolioGridProps {
  initialPortfolios: Portfolio[];
}

const CATEGORIES = ["Semua", "Pertumbuhan Penjualan & Marketing", "Digital Platform & Sistem Bisnis", "IT Support & Maintenance", "Strategi Bisnis & System Planning"];

export default function PortfolioGrid({ initialPortfolios }: PortfolioGridProps) {
  const [selectedPort, setSelectedPort] = useState<Portfolio | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(9);

  React.useEffect(() => {
    setVisibleCount(9);
  }, [activeCategory]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const selectedSlug = params.get("selected");
      if (selectedSlug) {
        const port = initialPortfolios.find(p => p.slug === selectedSlug);
        if (port) setSelectedPort(port);
      }
    }
  }, [initialPortfolios]);

  const filtered = activeCategory === "Semua"
    ? initialPortfolios
    : initialPortfolios.filter(p => p.category === activeCategory);

  const displayedPortfolios = filtered.slice(0, visibleCount);

  return (
    <div>
      {/* Filter Tabs — dark theme */}
      <div className="flex flex-wrap items-center gap-2.5 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-5 py-2 rounded-full text-xs font-bold transition-all duration-250 cursor-pointer"
            style={
              activeCategory === cat
                ? {
                    background: "linear-gradient(135deg, #42b2bf, #323e7a)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(66,178,191,0.35), 0 2px 6px rgba(50,62,122,0.20)",
                  }
                : {
                    background: "rgba(50, 62, 122, 0.03)",
                    border: "1px solid rgba(66, 178, 191, 0.15)",
                    color: "rgba(50, 62, 122, 0.7)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedPortfolios.map((port) => (
            <motion.div
              layout
              key={port.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.28 }}
              onClick={() => setSelectedPort(port)}
              className="group h-[380px] rounded-2xl overflow-hidden relative cursor-pointer"
              style={{ border: "1px solid var(--text-ghost-val)" }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${port.image_url})` }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)" }}
              />
              {/* Hover teal shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(66,178,191,0.15) 0%, transparent 60%)" }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end z-10 gap-2">
                <span
                  className="text-[9px] font-extrabold uppercase tracking-[0.18em]"
                  style={{ color: "#42b2bf" }}
                >
                  {port.category}
                </span>
                <h3 className="text-xl font-black text-white leading-tight">{port.name}</h3>
                {port.client_name && (
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Klien: {port.client_name}
                  </span>
                )}
                {/* Hover CTA */}
                <div
                  className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: "#42b2bf" }}
                >
                  Lihat Studi Kasus
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {filtered.length > visibleCount && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="px-8 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:bg-[#323e7a] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #42b2bf, #323e7a)",
              boxShadow: "0 4px 16px rgba(66,178,191,0.25)",
            }}
          >
            Lihat Portofolio Lainnya
          </button>
        </div>
      )}

      {/* Detail Modal */}
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
              style={{ background: "rgba(28,34,61,0.25)", backdropFilter: "blur(12px)" }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full max-w-5xl rounded-2xl overflow-y-auto md:overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[88vh]"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(66, 178, 191, 0.15)",
                boxShadow: "0 40px 100px rgba(50, 62, 122, 0.05)",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedPort(null)}
                className="absolute top-4 right-4 p-2 rounded-xl z-30 cursor-pointer transition-all hover:scale-105"
                style={{ background: "rgba(15, 23, 42, 0.04)", border: "1px solid rgba(66, 178, 191, 0.15)", color: "#334155" }}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left — image + metrics */}
              <div
                className="md:col-span-5 relative flex flex-col justify-between p-8 md:p-10 min-h-[340px] md:min-h-0"
                style={{ backgroundImage: `url(${selectedPort.image_url})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(50, 62, 122, 0.4) 0%, rgba(28, 34, 61, 0.95) 100%)" }} />

                {/* Top tags */}
                <div className="relative z-10 flex flex-col gap-2">
                  <span
                    className="self-start text-[9px] font-extrabold uppercase tracking-[0.16em] px-3 py-1 rounded-full"
                    style={{ background: "rgba(66,178,191,0.2)", border: "1px solid rgba(66,178,191,0.4)", color: "#42b2bf" }}
                  >
                    {selectedPort.category}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight mt-1">{selectedPort.name}</h3>
                  {selectedPort.client_name && (
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                      Klien: {selectedPort.client_name}
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="relative z-10 mt-8">
                  <h4
                    className="text-[10px] font-extrabold uppercase tracking-[0.18em] mb-3 flex items-center gap-1.5"
                    style={{ color: "#42b2bf" }}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Hasil Nyata (ROI)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPort.metrics && Object.keys(selectedPort.metrics).length > 0 ? (
                      Object.entries(selectedPort.metrics).map(([key, val]) => (
                        <div
                          key={key}
                          className="p-3.5 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                          <span className="text-xl font-black block" style={{ color: "#42b2bf" }}>{val}</span>
                          <span className="text-[9px] uppercase tracking-wider font-bold block mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{key}</span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Efisiensi terverifikasi</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right — narrative */}
              <div className="md:col-span-7 p-8 md:p-10 md:overflow-y-auto flex flex-col gap-7">
                {/* Challenge */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,146,60,0.12)", border: "1px solid rgba(251,146,60,0.2)", color: "#fb923c" }}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(50, 62, 122, 0.6)" }}>Tantangan Klien</h4>
                    <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(15, 23, 42, 0.8)" }}>{selectedPort.challenge}</p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(66,178,191,0.12)", border: "1px solid rgba(66,178,191,0.2)", color: "#42b2bf" }}>
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(50, 62, 122, 0.6)" }}>Solusi GordaTech</h4>
                    <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(15, 23, 42, 0.8)" }}>{selectedPort.work}</p>
                  </div>
                </div>

                {/* Result */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399" }}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(50, 62, 122, 0.6)" }}>Dampak &amp; Hasil Nyata</h4>
                    <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(15, 23, 42, 0.8)" }}>{selectedPort.result}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 mt-2" style={{ borderTop: "1px solid rgba(66, 178, 191, 0.10)" }}>
                  <a
                    href={`https://wa.me/62818880497?text=${encodeURIComponent(`Halo GordaTech! 👋 Saya tertarik dengan studi kasus: ${selectedPort.name}. Ingin konsultasi mengenai solusi serupa untuk bisnis saya.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                     className="w-full flex items-center justify-center gap-2.5 font-bold py-3.5 rounded-xl text-sm text-white transition-all hover:-translate-y-0.5 sweep-shine"
                     style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", boxShadow: "0 8px 24px rgba(66,178,191,0.40), 0 3px 8px rgba(50,62,122,0.20)" }}
                  >
                    {/* WA Icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
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
    </div>
  );
}
