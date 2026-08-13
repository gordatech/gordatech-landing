"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

interface Insight {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
  author: string;
}

const CATEGORIES = ["Semua", "Digital Marketing", "Web Development", "AI Automation", "IT & Technology"];

interface InsightListClientProps {
  initialInsights: Insight[];
}

export default function InsightListClient({ initialInsights }: InsightListClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  const filtered = activeCategory === "Semua"
    ? initialInsights
    : initialInsights.filter(ins => ins.category === activeCategory);

  const displayedInsights = filtered.slice(0, visibleCount);

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen py-20" style={{ background: "var(--bg-dark)" }}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: "45%", height: "55%", background: "radial-gradient(ellipse, rgba(91,142,240,0.07) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(60,174,185,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <style>{`
        .ins-card { transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; }
        .ins-card:hover { transform: translateY(-5px); border-color: #42b2bf !important; box-shadow: 0 16px 40px rgba(28, 34, 61, 0.08); }
        .ins-card:hover .ins-img { transform: scale(1.03); }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>
            Insight &amp; Blog GordaTech
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight" style={{ color: "var(--text-white-val)" }}>
            Wawasan Bisnis &amp;{" "}
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Strategi Teknologi.
            </span>
          </h1>
          <p className="text-base font-light max-w-2xl leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
            Temukan panduan praktis, artikel SEO-friendly, dan studi kasus digital marketing terbaru untuk mempercepat skala transformasi bisnis Anda di era modern.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-250 cursor-pointer"
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #42b2bf, #323e7a)",
                      color: "#fff",
                      boxShadow: "0 4px 16px rgba(66, 178, 191, 0.25)",
                    }
                  : {
                      background: "var(--bg-navy-card)",
                      border: "1px solid var(--text-ghost-val)",
                      color: "var(--text-muted-val)",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-3xl" style={{ borderColor: "var(--text-ghost-val)" }}>
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h4 className="text-lg font-extrabold mb-1" style={{ color: "var(--text-white-val)" }}>Belum Ada Artikel</h4>
            <p className="text-sm font-light text-slate-500">Tidak ada artikel Insight dalam kategori ini saat ini.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedInsights.map((ins) => (
                <div
                  key={ins.id}
                  className="ins-card rounded-2xl overflow-hidden bg-white flex flex-col justify-between"
                  style={{ border: "1px solid var(--text-ghost-val)" }}
                >
                  <div>
                    {/* Banner Image */}
                    <div className="h-48 overflow-hidden relative">
                      <div
                        className="ins-img absolute inset-0 bg-cover bg-center transition-transform duration-700"
                        style={{ backgroundImage: `url(${ins.image_url})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-transparent to-transparent opacity-10" />
                      <span
                        className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                        style={{
                          background: "linear-gradient(135deg, rgba(66, 178, 191, 0.85), rgba(50, 62, 122, 0.85))",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {ins.category}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-7 flex flex-col gap-3">
                      <h3 className="text-lg font-black leading-snug line-clamp-2 transition-colors" style={{ color: "var(--text-white-val)" }}>
                        {ins.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed line-clamp-3" style={{ color: "var(--text-muted-val)" }}>
                        {ins.summary}
                      </p>
                    </div>
                  </div>

                  {/* Metadata & CTA Footer */}
                  <div className="px-7 pb-7 pt-4 flex flex-col gap-4" style={{ borderTop: "1px solid var(--text-ghost-val)" }}>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#42b2bf]" />
                        {formatDate(ins.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#323e7a]" />
                        {ins.author}
                      </span>
                    </div>

                    <Link
                      href={`/insight/${ins.slug}`}
                      className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest group pt-1 mt-1 border-t border-slate-100"
                      style={{ color: "#42b2bf" }}
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-8 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[0_8px_24px_rgba(66,178,191,0.15)]"
                  style={{
                    background: "linear-gradient(135deg, #42b2bf, #323e7a)",
                  }}
                >
                  Lihat Lainnya
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
