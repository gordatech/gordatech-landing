"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Calendar, MessageSquare, Clock, ShieldCheck, FileText, ArrowRight } from "lucide-react";

interface SchemeDetail {
  id: string;
  badge: string;
  title: string;
  price: string;
  timeline: string;
  support: string;
  desc: string;
  features: string[];
  benefits: string[];
  target: string;
  ctaText: string;
  ctaLink: string;
  deliverables: string[];
  notes: string;
}

const DEFAULT_SCHEMES: SchemeDetail[] = [
  {
    id: "subscription",
    badge: "Kemitraan Bulanan",
    title: "Sewa & Langganan Operasional",
    price: "Mulai Rp 1.500.000 / bulan",
    timeline: "3 - 5 Hari Kerja",
    support: "WA Group Eksklusif, Respons < 4 Jam",
    desc: "Model berlangganan rutin untuk mendukung pemasaran digital, pembuatan konten visual, optimasi media sosial, dan pengelolaan iklan ads secara profesional demi pertumbuhan konversi leads secara konsisten.",
    features: [
      "Manajemen Akun Media Sosial (Instagram & Facebook)",
      "8 s/d 20 Desain Konten Kreatif & Copywriting per Bulan",
      "Setup Iklan FB/IG Ads & Optimasi Anggaran Kampanye",
      "Laporan Analisis Kinerja & Evaluasi Target Leads Bulanan"
    ],
    benefits: [
      "Membantu bisnis membangun kredibilitas brand (trust) secara konsisten di media sosial.",
      "Penargetan iklan yang terukur untuk mengalirkan prospek leads pembeli langsung ke WhatsApp.",
      "Komitmen durasi kerja fleksibel (3/6/12 bulan) dengan diskon progresif hingga 15%."
    ],
    target: "UKM, klinik kecantikan, kuliner, retail lokal, dan bisnis jasa berkembang yang ingin aktif promosi secara konsisten tanpa repot merekrut tim internal.",
    ctaText: "Simulasikan Anggaran",
    ctaLink: "/layanan",
    deliverables: [
      "Manajemen Instagram & Facebook",
      "Desain Konten & Copywriting",
      "Manajemen FB/IG Ads",
      "DM Automation Setup",
      "Laporan Cost per Lead (CPL)"
    ],
    notes: "Masa kontrak minimum 3 bulan. Biaya iklan bulanan ditanggung oleh klien."
  },
  {
    id: "onetime",
    badge: "One-Time Service",
    title: "Beli Lisensi & Proyek Kustom",
    price: "Sewa Rp 190.000/bln | Beli Lisensi Rp 6.000.000",
    timeline: "14 - 30 Hari Kerja",
    support: "3 Bulan Garansi Bug & Zoom Training",
    desc: "Pembuatan website profil, e-commerce headless Next.js, hingga sistem ERP/akuntansi kustom (seperti GoReport) secara sekali bayar dengan hak kepemilikan penuh source code 100%.",
    features: [
      "Desain Antarmuka Web Premium & Mobile-First yang Responsif",
      "Setup Kampanye Meta/Google Ads Tepat Sasaran & Tanpa Bocor Budget",
      "Hak Milik Penuh Source Code 100% (No Vendor Lock-in)",
      "Integrasi API WhatsApp Notifikasi, Custom Database, & Dasbor CRM"
    ],
    benefits: [
      "Mengamankan aset digital jangka panjang dengan kepemilikan penuh sistem tanpa biaya langganan bulanan tersembunyi.",
      "Desain kustom berkelas dunia yang mendongkrak konversi dan performa SEO di Google secara optimal.",
      "Dukungan masa garansi bug gratis selama 3 bulan pertama pascapeluncuran."
    ],
    target: "Distributor, kontraktor, yayasan, korporasi menengah, dan pemilik usaha ritel multi-cabang yang membutuhkan keandalan sistem kustom jangka panjang.",
    ctaText: "Lihat Jajaran Produk",
    ctaLink: "/produk",
    deliverables: [
      "Custom Next.js & Tailwind CSS UI",
      "Hosting Cloud & Setup Domain 1 Tahun",
      "Kepemilikan Source Code 100%",
      "Notifikasi WhatsApp Cloud API Integration",
      "Dasbor CRM Admin Panel"
    ],
    notes: "Garansi error gratis selama 3 bulan pertama. Penambahan modul kustom di masa mendatang dikenakan biaya per modul."
  },
  {
    id: "profitsharing",
    badge: "Bagi Hasil Profit",
    title: "Kemitraan Bagi Hasil Jangka Panjang",
    price: "Setup Awal Rp 1.500.000 + Bagi Hasil 10% - 15%",
    timeline: "7 - 10 Hari Kerja",
    support: "Rapat Koordinasi & Evaluasi Mingguan",
    desc: "Skema kerjasama zero-risk berbasis kinerja khusus bagi UKM potensial. Tim teknologi & marketing GordaTech bertanggung jawab penuh membiayai dan mengoptimasi funnel penjualan online Anda.",
    features: [
      "Pembuatan Landing Page Kampanye Khusus yang Siap Konversi",
      "Copywriting, Desain Visual Iklan, & Manajemen Ads Secara Penuh oleh Ahli",
      "Analisis Profit Margin & Target Leads Prospektif Harian",
      "Penyusunan Perjanjian Kerja Waktu (PKW) Hukum yang Sah"
    ],
    benefits: [
      "Kerjasama zero-risk: kami hanya mengambil komisi bagi hasil jika berhasil meningkatkan keuntungan bersih riil bisnis Anda.",
      "Seluruh pengerjaan teknis, konten promosi, dan operasional marketing ditangani penuh oleh tim ahli kami.",
      "Alokasi anggaran iklan yang dioptimalkan secara ketat untuk menekan biaya per lead."
    ],
    target: "UKM ritel online, produsen produk fisik berskala menengah, dan penyedia jasa dengan margin keuntungan sehat (minimal 30%) yang siap menangani lonjakan order.",
    ctaText: "Ajukan Kerjasama",
    ctaLink: "/kontak",
    deliverables: [
      "Landing Page Khusus Kampanye Iklan",
      "Setup Tracking Pixel & Leads CRM",
      "Penyusunan Strategi Margin Harga",
      "Copywriting & Desain Iklan Harian",
      "Penandatanganan Perjanjian PKW"
    ],
    notes: "Biaya setup awal Rp 1.500.000. Komisi bagi hasil dihitung bulanan dari peningkatan profit bersih riil."
  }
];

interface CooperationSchemesProps {
  initialData?: SchemeDetail[] | null;
}

export default function CooperationSchemes({ initialData }: CooperationSchemesProps) {
  const schemes = initialData || DEFAULT_SCHEMES;
  const [activeTab, setActiveTab] = useState<string>("subscription");

  const activeScheme = schemes.find((s) => s.id === activeTab) || schemes[0];

  return (
    <div className="py-20 relative" style={{ borderBottom: "1px solid rgba(66, 178, 191, 0.12)" }}>
      {/* Background glow specific to schemes section */}
      <div className="absolute pointer-events-none" style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "70%", height: "60%", background: "radial-gradient(circle, rgba(50,62,122,0.015) 0%, transparent 60%)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>Skema Kerjasama &amp; Kemitraan</p>
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            3 Model Kemitraan{" "}
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Tumbuh Bersama
            </span>
          </h2>
          <p className="text-base font-light max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
            Kami menyediakan fleksibilitas penuh agar Anda dapat memilih skema kemitraan yang paling cocok dengan model bisnis dan alur anggaran usaha Anda. Klik salah satu paket untuk melihat detail lengkap.
          </p>
        </div>

        {/* Schemes Select Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {schemes.map((scheme) => {
            const isSelected = activeTab === scheme.id;
            return (
              <div
                key={scheme.id}
                onClick={() => setActiveTab(scheme.id)}
                className="p-6 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between h-44 hover:-translate-y-1 relative overflow-hidden group shadow-sm"
                style={{
                  background: isSelected ? "rgba(66,178,191,0.06)" : "#ffffff",
                  borderColor: isSelected ? "#42b2bf" : "rgba(66, 178, 191, 0.12)",
                  boxShadow: isSelected ? "0 12px 30px rgba(66, 178, 191, 0.06)" : "0 4px 20px rgba(50, 62, 122, 0.02)",
                }}
              >
                {/* Active glow corner */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#42b2bf]/5 to-[#323e7a]/5 blur-xl pointer-events-none" />
                )}
                
                <div>
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-3.5"
                    style={{
                      color: isSelected ? "#42b2bf" : "rgba(50, 62, 122, 0.6)",
                      background: isSelected ? "rgba(66,178,191,0.08)" : "rgba(50, 62, 122, 0.03)",
                      border: isSelected ? "1px solid rgba(66,178,191,0.2)" : "1px solid rgba(66, 178, 191, 0.1)",
                    }}
                  >
                    {scheme.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-800 mb-1 group-hover:text-[#323e7a] transition-colors">{scheme.title}</h3>
                </div>
                
                <div className="flex items-center justify-between border-t pt-3.5" style={{ borderColor: "rgba(66, 178, 191, 0.12)" }}>
                  <p className="text-[11px] font-bold" style={{ color: "#42b2bf" }}>{scheme.price}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    isSelected ? "text-[#323e7a] translate-x-1" : "text-slate-500 group-hover:text-slate-850"
                  }`}>
                    Detail <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Panel (Full Container Width) */}
        <div
          className="p-8 md:p-10 rounded-[32px] border transition-all duration-500 flex flex-col gap-10 relative overflow-hidden"
          style={{
            background: "#ffffff",
            borderColor: "rgba(66, 178, 191, 0.15)",
            boxShadow: "0 25px 60px rgba(50, 62, 122, 0.03)",
          }}
        >
          {/* Decorative glows */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#42b2bf]/3 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#323e7a]/3 rounded-full blur-[100px] pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b" style={{ borderColor: "rgba(66, 178, 191, 0.12)" }}>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#42b2bf] block mb-2">{activeScheme.badge}</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{activeScheme.title}</h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-3 rounded-2xl bg-slate-50/50 border border-slate-200/40 flex items-center gap-2 shadow-sm">
                <Clock className="w-4 h-4 text-[#42b2bf]" />
                <div className="text-left">
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-semibold">Estimasi Setup</span>
                  <span className="text-xs font-bold text-slate-800 block">{activeScheme.timeline}</span>
                </div>
              </div>
              
              <div className="px-4 py-3 rounded-2xl bg-slate-50/50 border border-slate-200/40 flex items-center gap-2 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#323e7a]" />
                <div className="text-left">
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-semibold">Dukungan Teknis</span>
                  <span className="text-xs font-bold text-slate-800 block">{activeScheme.support}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
            {/* Left Column (Span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#42b2bf]" />
                  Ringkasan Kemitraan
                </h4>
                <p className="text-sm font-light leading-relaxed text-slate-650">
                  {activeScheme.desc}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#42b2bf]" />
                  Deliverables Utama &amp; Cakupan Kerja
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/40 shadow-sm">
                  {activeScheme.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-[#42b2bf] flex-shrink-0" />
                      {deliv}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#323e7a] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#323e7a]" />
                  Kelebihan &amp; Dampak Bisnis
                </h4>
                <ul className="flex flex-col gap-3">
                  {activeScheme.benefits.map((ben, i) => (
                    <li key={i} className="text-xs text-slate-600 font-light leading-relaxed flex items-start gap-2">
                      <span className="text-[#323e7a] mt-0.5 font-bold">•</span>
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl flex flex-col gap-4 bg-slate-50/50 border border-slate-200/40 shadow-sm">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-1">Target Usaha:</span>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {activeScheme.target}
                  </p>
                </div>
                
                {activeScheme.notes && (
                  <div className="pt-3 border-t border-slate-200/40">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#42b2bf] block mb-1">Ketentuan Skema:</span>
                    <p className="text-[11px] font-light text-slate-600 leading-relaxed">
                      {activeScheme.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderColor: "rgba(66, 178, 191, 0.12)" }}>
            <div className="text-left w-full sm:w-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1">Estimasi Anggaran</span>
              <span className="text-xl font-black text-slate-900" style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {activeScheme.price}
              </span>
            </div>

            <Link
              href={activeScheme.ctaLink}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer sweep-shine"
              style={{
                background: "linear-gradient(135deg, #42b2bf, #323e7a)",
                boxShadow: "0 8px 24px rgba(50, 62, 122, 0.28), 0 2px 6px rgba(66, 178, 191, 0.18)",
              }}
            >
              <MessageSquare className="w-4 h-4" />
              {activeScheme.ctaText} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
