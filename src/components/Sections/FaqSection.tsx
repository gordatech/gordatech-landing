"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FAQItem { id?: number; question: string; answer: string; order?: number; }

const STATIC_FAQS: FAQItem[] = [
  { question: "Berapa lama estimasi waktu pengerjaan untuk satu proyek?", answer: "Waktu pengerjaan bergantung pada kompleksitas. Untuk landing page UMKM biasanya 1–3 minggu, sedangkan platform sistem bisnis kustom seperti POS, ERP, atau integrasi AI membutuhkan 4–12 minggu. Kami selalu melampirkan timeline roadmap yang detail sejak awal proyek." },
  { question: "Apakah source code menjadi hak milik penuh klien?", answer: "Ya, 100%! Seluruh kode sumber, aset desain, konfigurasi cloud server, dan akun integrasi WhatsApp API menjadi hak milik mutlak perusahaan Anda sejak serah terima proyek selesai. Kami tidak memberlakukan vendor lock-in atau biaya tersembunyi." },
  { question: "Bagaimana dengan keamanan data dan garansi pascapeluncuran?", answer: "Keamanan data adalah prioritas utama kami. Setiap aplikasi menggunakan arsitektur headless terpisah, enkripsi end-to-end, SSL/HTTPS, dan firewall berlapis. Kami memberikan garansi bebas bug gratis selama 3 bulan pertama pascapeluncuran." },
  { question: "Bagaimana skema pembayaran yang berlaku?", answer: "Kami menerapkan skema termin (milestones): Down Payment 40% untuk memulai proyek, 40% setelah progress inti selesai (UAT), dan pelunasan 20% saat serah terima resmi." },
  { question: "Apakah bisa mengembangkan fitur kustom di masa mendatang?", answer: "Tentu bisa! Kami membangun platform menggunakan teknologi global terstandarisasi (Next.js, PostgreSQL, dll.) dengan struktur modular. Sistem Anda bisa ditingkatkan oleh tim internal maupun bersama GordaTech kapan saja." },
];

interface FaqSectionProps { faqs?: FAQItem[]; }

export default function FaqSection({ faqs = [] }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const activeFaqs = faqs && faqs.length > 0 ? faqs : STATIC_FAQS;

  return (
    <section className="py-12 md:py-14 relative overflow-hidden" style={{ background: "#f8fafc" }}>
      <div className="mesh-blob" style={{ bottom: '-10%', left: '-6%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(66,178,191,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Header + CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <p className="section-label">Tanya Jawab Umum</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-5">
                Ada<br/>Pertanyaan?<br/>
                <span className="gorda-gradient-text">Kami Jawab.</span>
              </h2>
              <p className="text-sm font-light text-slate-500 leading-relaxed">
                Kami mengedepankan keterbukaan informasi demi kemitraan yang sehat dan saling percaya.
              </p>
            </div>
            <div className="mt-10 hidden lg:block">
              <a
                href={`https://wa.me/62818880497?text=${encodeURIComponent("Halo GordaTech! 👋✨\n\nSaya sedang membaca Tanya Jawab (FAQ) di website Anda, dan saya memiliki pertanyaan tambahan mengenai proses kerjasama / teknis. 💬🛠️\n\nBisa tolong dibantu? Terima kasih banyak! 🙏")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white gorda-btn sweep-shine cursor-pointer"
                style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}
              >
                Tanya Langsung Tim Kami
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-2">
              {activeFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen ? "#ffffff" : "rgba(255,255,255,0.7)",
                      border: isOpen ? "1px solid #42b2bf" : "1px solid #e2e8f0",
                      boxShadow: isOpen ? "0 16px 34px -14px rgba(50,62,122,0.22), 0 6px 14px -8px rgba(66,178,191,0.18)" : "none",
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="text-[14.5px] font-semibold text-slate-800">{faq.question}</span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          background: isOpen ? "rgba(66,178,191,0.1)" : "#f1f5f9",
                          color: isOpen ? "#42b2bf" : "#94a3b8",
                        }}
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-0 text-[13.5px] text-slate-500 leading-relaxed font-light border-t border-slate-100">
                            <div className="pt-4">{faq.answer}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 lg:hidden">
              <a
                href={`https://wa.me/62818880497?text=${encodeURIComponent("Halo GordaTech! 👋✨\n\nSaya sedang membaca Tanya Jawab (FAQ) di website Anda, dan saya memiliki pertanyaan tambahan mengenai proses kerjasama / teknis. 💬🛠️\n\nBisa tolong dibantu? Terima kasih banyak! 🙏")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white sweep-shine cursor-pointer"
                style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}
              >
                Tanya Langsung Tim Kami
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
