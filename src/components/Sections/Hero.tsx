'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, ChevronRight, Check, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

interface HeroProps {
  title?: string;
  desc?: string;
  tagline?: string;
  rotatingWords?: string;
  portfolios?: any[];
}

export default function Hero({ title, desc, tagline, rotatingWords, portfolios }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [mounted, setMounted] = useState(false);

  // GordaConsole states
  const [step, setStep] = useState(1);
  const [painPoint, setPainPoint] = useState("");
  const [solutionInterest, setSolutionInterest] = useState("");
  const [tier, setTier] = useState("");
  const [showResult, setShowResult] = useState(false);

  const painPoints = [
    { id: "sales", text: "Penjualan online stagnan & sepi pembeli" },
    { id: "manual", text: "Proses administrasi internal masih manual & lambat" },
    { id: "downtime", text: "Sistem aplikasi sering error & downtime" },
    { id: "expertise", text: "Keterbatasan tim ahli IT & tim marketing internal" },
  ];

  const solutions = [
    { id: "web", text: "Website & Mobile App Development" },
    { id: "marketing", text: "Pemasaran Digital & CRM Leads" },
    { id: "ai", text: "Otomatisasi Chatbot & Model AI" },
    { id: "infra", text: "Managed IT Services & Cyber Security" },
  ];

  const tiers = [
    { id: "umkm", text: "UMKM Mandiri (Siap Ekspansi Online)" },
    { id: "startup", text: "Bisnis Berkembang / Skala Menengah" },
    { id: "enterprise", text: "Perusahaan Besar / Skala Enterprise" },
  ];

  const RELATION_MAP: Record<string, string[]> = {
    sales: ["web", "marketing", "ai"],
    manual: ["web", "ai"],
    downtime: ["web", "infra"],
    expertise: ["web", "marketing", "ai", "infra"],
  };

  const defaultWords = ['Brands.', 'Products.', 'Revenue.', 'Growth.'];
  const rotatingWordsList = rotatingWords
    ? rotatingWords.split(',').map(w => w.trim()).filter(Boolean)
    : defaultWords;

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % rotatingWordsList.length);
        setFade(true);
      }, 380);
    }, 2600);
    return () => clearInterval(id);
  }, [rotatingWordsList.length]);

  const handleNext = () => (step < 3 ? setStep(step + 1) : setShowResult(true));
  const reset = () => { setStep(1); setPainPoint(""); setSolutionInterest(""); setTier(""); setShowResult(false); };

  const getResult = () => {
    let solutionName = "Custom Platform Architecture", timeframe = "4-8 Minggu", estCost = "Konsultasikan";
    if (solutionInterest === "web") {
      solutionName = "High-Performance Web Platform";
      timeframe = tier === "umkm" ? "2-3 Minggu" : tier === "startup" ? "4-6 Minggu" : "8-12 Minggu";
      estCost = tier === "umkm" ? "Sewa Rp 190rb/bln | Beli Rp 6Jt" : tier === "startup" ? "Mulai Rp 10Jt" : "Custom Quote";
    } else if (solutionInterest === "marketing") {
      solutionName = "Growth Funnel & Leads Automation";
      timeframe = "3-5 Minggu";
      estCost = tier === "umkm" ? "Mulai Rp 1.500.000/bulan" : "Mulai Rp 2.500.000/bulan";
    } else if (solutionInterest === "ai") {
      solutionName = "Otomatisasi Bot & Integrasi AI";
      timeframe = "4-8 Minggu";
      estCost = tier === "umkm" ? "Mulai Rp 1.500.000" : "Mulai Rp 5.000.000";
    } else if (solutionInterest === "infra") {
      solutionName = "Managed IT & Uptime Guard";
      timeframe = "Pemeliharaan Rutin";
      estCost = tier === "umkm" ? "Mulai Rp 1.500.000/bulan" : "Custom SLA";
    }
    return { solutionName, timeframe, estCost };
  };

  const { solutionName, timeframe, estCost } = getResult();
  const isDisabled = (step === 1 && !painPoint) || (step === 2 && !solutionInterest) || (step === 3 && !tier);
  const waMessage = encodeURIComponent(
    `Halo GordaTech! 👋✨\n\nSaya tertarik dengan hasil rekomendasi GordaConsole berikut:\n\n🚀 Solusi: *${solutionName}*\n💼 Skala Bisnis: *${tier}*\n⏱️ Estimasi Launch: *${timeframe}*\n\nBolehkah saya menjadwalkan sesi konsultasi awal gratis untuk membahas ini lebih lanjut? Terima kasih! 🙏`
  );
  const prefilledUrl = `https://wa.me/62818880497?text=${waMessage}`;

  const mainWaMessage = encodeURIComponent(
    `Halo GordaTech! 👋✨\n\nSaya tertarik berkonsultasi mengenai solusi digital untuk meningkatkan bisnis saya. 🚀📈\n\nBolehkah saya menjadwalkan sesi diskusi awal gratis? Terima kasih banyak! 🙏`
  );
  const mainWaUrl = `https://wa.me/62818880497?text=${mainWaMessage}`;

  const activeClients = portfolios && portfolios.length > 0
    ? portfolios.filter((p: any) => p.client_logo_url || p.client_name).map((p: any) => p.client_name || p.name)
    : ['JJUPVC Medan', 'LKP Metronics', 'Midea Service Center', 'CV IBAS', 'Bengkel Las Medan', 'CV Ronald Motor'];

  const marqueeItems = [...activeClients, ...activeClients, ...activeClients, ...activeClients];

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white" style={{ minHeight: '94vh', paddingTop: 'var(--nav-height, 88px)' }}>

      {/* Soft radiant mesh backdrop */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #f3f8f9 0%, #ffffff 45%, #ffffff 100%)' }} />
      <div className="mesh-blob animate-mesh-drift" style={{ top: '-12%', left: '-8%', width: '46vw', height: '46vw', background: 'radial-gradient(circle, rgba(66,178,191,0.22) 0%, transparent 70%)' }} />
      <div className="mesh-blob animate-mesh-drift" style={{ top: '8%', right: '-10%', width: '38vw', height: '38vw', background: 'radial-gradient(circle, rgba(50,62,122,0.16) 0%, transparent 70%)', animationDelay: '2s' }} />
      <div className="mesh-blob" style={{ bottom: '-15%', left: '30%', width: '50vw', height: '30vw', background: 'radial-gradient(ellipse, rgba(66,178,191,0.10) 0%, transparent 70%)' }} />

      {/* Dot grid motif */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(50,62,122,0.10) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
      }} />

      {/* Main content */}
      <div className="relative z-[2] w-full max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* LEFT COLUMN: Agency Copywriting */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

            {/* Tagline Eyebrow */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full float-chip"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s', transform: mounted ? 'translateY(0)' : 'translateY(8px)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#42b2bf' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#42b2bf' }} />
              </span>
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: '#323e7a' }}>
                {tagline || "Your Trusted Digital Partner"}
              </span>
            </div>

            {/* Heading utama GordaTech */}
            <h1
              className="font-display font-black tracking-tight leading-[1.08] text-slate-900"
              style={{
                fontSize: 'clamp(2.5rem, 4.8vw, 3.9rem)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              }}
            >
              {title || "We Build Digital"}
              <br />
              <span
                className="inline-block gorda-gradient-text"
                style={{
                  transition: 'opacity 0.38s ease, transform 0.38s ease',
                  opacity: fade ? 1 : 0,
                  transform: fade ? 'translateY(0)' : 'translateY(-10px)',
                }}
              >
                {rotatingWordsList[wordIndex]}
              </span>
            </h1>

            {/* Paragraf Deskripsi */}
            <p
              className="text-[15.5px] leading-[1.7] text-slate-500 font-light max-w-[560px]"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}
            >
              {desc || "Akselerasikan pertumbuhan bisnis Anda dengan produk digital berkinerja tinggi. Kami merancang website, sistem kustom, dan otomatisasi AI yang berfokus penuh pada peningkatan konversi dan ROI nyata."}
            </p>

            {/* Tombol Call-to-Action */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full sm:w-auto"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease 0.5s' }}
            >
              <a
                href={mainWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d w-full sm:w-auto px-8 py-4 rounded-2xl text-[11px] font-extrabold uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-center sweep-shine"
                style={{ background: 'linear-gradient(135deg, #42b2bf, #323e7a)' }}
              >
                Mulai Konsultasi Gratis
                <ArrowUpRight size={15} className="w-4 h-4" />
              </a>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-[11px] font-extrabold uppercase tracking-widest transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border text-center text-slate-700 border-slate-200 bg-white hover:border-[#42b2bf] hover:text-[#323e7a] hover:shadow-md"
              >
                <Play size={12} fill="currentColor" style={{ opacity: 0.7 }} />
                Lihat Portofolio
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: GordaConsole v2.1 Configurator — tilting 3D console */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end perspective-1200">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[440px]"
            >
              {/* Floating micro badges for depth */}
              <div className="hidden md:flex items-center gap-2 float-chip px-3.5 py-2.5 absolute -left-9 -top-7 z-20 animate-float" style={{ '--float-rot': '-3deg' } as CSSProperties}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(145deg,#42b2bf33,#42b2bf0a)', color: '#2a8f9c' }}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10.5px] font-bold text-slate-700 whitespace-nowrap">100% Ownership</span>
              </div>
              <div className="hidden md:flex items-center gap-2 float-chip px-3.5 py-2.5 absolute -right-9 -bottom-7 z-20 animate-float" style={{ animationDelay: '1.4s', '--float-rot': '3deg' } as CSSProperties}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(145deg,#f59e0b33,#f59e0b0a)', color: '#b3760a' }}>
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10.5px] font-bold text-slate-700 whitespace-nowrap">SLA Respon &lt;4 Jam</span>
              </div>

              <TiltCard max={6} className="rounded-[24px]">
                <div className="w-full glass-panel rounded-[24px] overflow-hidden">
                  {/* Header: Mock Tab / Console Frame */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-900/5 bg-white/40">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3 h-3" style={{ color: '#42b2bf' }} />
                      <span className="text-[9px] font-mono tracking-widest uppercase font-bold" style={{ color: '#42b2bf' }}>GordaConsole v2.1</span>
                    </div>
                  </div>

                  {/* Wizard Content Panel */}
                  <div className="p-6 min-h-[300px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      {!showResult ? (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.22 }}
                          className="flex flex-col gap-4"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#42b2bf' }}>
                                Konfigurator Bisnis
                              </span>
                              <span className="text-[10.5px] font-mono font-bold text-slate-400">
                                Langkah {step} dari 3
                              </span>
                            </div>

                            <h4 className="text-[15px] md:text-base font-bold text-slate-900 leading-snug mt-1">
                              {step === 1
                                ? "Apa kendala atau tantangan utama bisnis Anda saat ini?"
                                : step === 2
                                ? "Jenis solusi digital apa yang ingin Anda prioritaskan?"
                                : "Berapa skala atau kategori operasional bisnis Anda?"
                              }
                            </h4>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            {(step === 1 ? painPoints : step === 2 ? solutions : tiers).map((item) => {
                              const isSelected = step === 1 ? painPoint === item.id : step === 2 ? solutionInterest === item.id : tier === item.id;
                              const isDisabledOption = step === 2 && painPoint && !RELATION_MAP[painPoint]?.includes(item.id);

                              const handleSelect = () => {
                                if (isDisabledOption) return;
                                if (step === 1) {
                                  setPainPoint(item.id);
                                  if (solutionInterest && !RELATION_MAP[item.id]?.includes(solutionInterest)) {
                                    setSolutionInterest("");
                                  }
                                } else if (step === 2) {
                                  setSolutionInterest(item.id);
                                } else {
                                  setTier(item.id);
                                }
                              };

                              let classes = "w-full text-left px-4 py-3.5 rounded-xl text-xs font-semibold transition-all duration-200 border flex justify-between items-center group/opt ";

                              if (isSelected) {
                                classes += "bg-[rgba(66,178,191,0.10)] border-[#42b2bf] text-[#2a8f9c] shadow-[0_6px_16px_-6px_rgba(66,178,191,0.35)] cursor-pointer";
                              } else if (isDisabledOption) {
                                classes += "bg-transparent border-slate-100 text-slate-300 cursor-not-allowed opacity-60";
                              } else {
                                classes += "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:translate-x-1 cursor-pointer";
                              }

                              return (
                                <button
                                  key={item.id}
                                  onClick={handleSelect}
                                  disabled={!!isDisabledOption}
                                  className={classes}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                      isSelected
                                        ? "border-[#42b2bf] bg-[#42b2bf]"
                                        : "border-slate-300 bg-transparent group-hover/opt:border-slate-400"
                                    }`}>
                                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                                    </div>
                                    <span>{item.text}</span>
                                  </div>
                                  {isDisabledOption && (
                                    <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200 flex-shrink-0 ml-2">
                                      Tidak Relevan
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Step Actions footer */}
                          <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                            {step > 1 && (
                              <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                              >
                                Sebelumnya
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={isDisabled}
                              className="btn-3d ml-auto flex items-center gap-1.5 px-6 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all cursor-pointer sweep-shine"
                              style={isDisabled
                                ? { background: "#e2e8f0", color: "#94a3b8", cursor: "not-allowed", boxShadow: 'none' }
                                : { background: "linear-gradient(135deg, #42b2bf, #323e7a)" }
                              }
                            >
                              {step === 3 ? "Analisis Solusi" : "Lanjutkan"}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="wizard-result"
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col gap-4 text-center w-full"
                        >
                          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 icon-chip" style={{ background: 'linear-gradient(145deg,#42b2bf28,#42b2bf08)', '--chip-glow': 'rgba(66,178,191,0.4)' } as CSSProperties}>
                            <CheckCircle2 className="w-6 h-6" style={{ color: '#2a8f9c' }} />
                          </div>

                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: '#42b2bf' }}>Analisis Blueprint Sistem</p>
                            <h4 className="text-base font-black text-slate-900 leading-tight">{solutionName}</h4>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-2 text-left">
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 block mb-0.5">Estimasi Launch</span>
                              <span className="text-xs font-bold text-slate-700 block">{timeframe}</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 block mb-0.5">Estimasi Budget</span>
                              <span className="text-xs font-bold block" style={{ color: "#2a8f9c" }}>{estCost}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 mt-4">
                            <a
                              href={prefilledUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-3d w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 cursor-pointer sweep-shine"
                              style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}
                            >
                              Kirim Form Konsultasi
                            </a>

                            <button
                              type="button"
                              onClick={reset}
                              className="text-[10px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer border border-transparent hover:border-slate-200 py-2 rounded-xl transition-all bg-slate-50 hover:bg-slate-100"
                            >
                              Reset &amp; Coba Lagi
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

        </div>

        {/* Logo Bergerak (Marquee) Klien */}
        <div
          className="mt-16 pt-7 border-t border-slate-900/[0.06] flex items-center gap-5 overflow-hidden"
          style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.7s' }}
        >
          <span className="text-[9px] font-mono flex-shrink-0 uppercase tracking-[0.12em] text-slate-400">
            Trusted by
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="marquee-track">
              {marqueeItems.map((name, i) => (
                <span key={i} className="text-[11px] font-bold text-slate-400/70 whitespace-nowrap pr-[60px] uppercase tracking-wide font-mono">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
