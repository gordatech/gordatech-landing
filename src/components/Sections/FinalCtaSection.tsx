'use client';

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function FinalCtaSection() {
  const trust = ["Konsultasi Gratis 30 Menit", "Kemitraan Transparan", "3 Bulan Garansi Bug", "Source Code 100% Milik Anda"];

  return (
    <section className="py-12 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Big dark card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0a192f 100%)",
            boxShadow: "0 30px 70px -20px rgba(15,23,42,0.45), 0 10px 30px -10px rgba(66,178,191,0.18)",
          }}
        >
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[70%] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(66,178,191,0.15) 0%, transparent 65%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-0 right-0 w-[40%] h-[50%] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at bottom right, rgba(50,62,122,0.25) 0%, transparent 65%)", filter: "blur(60px)" }} />

          {/* Top teal line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(66,178,191,0.6) 50%, transparent)" }} />

          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider mb-8"
                style={{ background: "rgba(66,178,191,0.12)", border: "1px solid rgba(66,178,191,0.3)", color: "#42b2bf" }}>
                Siap Mulai?
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Ubah Bisnis Anda<br/>
                Menjadi{" "}
                <span style={{
                  background: "linear-gradient(135deg, #42b2bf, #6ea8f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                }}>
                  Mesin Penjualan
                </span>
              </h2>

              <p className="text-sm text-white/50 font-light leading-relaxed mb-8 max-w-md">
                Jadwalkan sesi konsultasi 1-on-1 gratis 30 menit. Dapatkan cetak biru digital untuk menekan biaya operasional dan melejitkan profit bisnis Anda.
              </p>

              {/* Trust items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {trust.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[12.5px] font-medium text-white/50">
                    <Check className="w-4 h-4 text-[#42b2bf] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/62818880497?text=${encodeURIComponent("Halo GordaTech! 👋✨\n\nSaya ingin menjadwalkan sesi konsultasi 1-on-1 gratis untuk membahas cetak biru digital & roadmap bisnis saya. 🚀📈\n\nBisa tolong bantu jadwalkan? Terima kasih banyak! 🙏")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d w-full py-5 rounded-2xl text-sm font-bold text-white text-center flex items-center justify-center gap-2 group sweep-shine transition-all hover:-translate-y-0.5 pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #42b2bf, #323e7a)",
                }}
              >
                Mulai Konsultasi Gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/portfolio"
                className="w-full py-5 rounded-2xl text-sm font-bold text-center flex items-center justify-center border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                Lihat Portofolio Kami
              </Link>

              <p className="text-center text-[11px] text-white/25 mt-2">
                Tidak ada komitmen. Tidak ada tekanan. Hanya solusi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
