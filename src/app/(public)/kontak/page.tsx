"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, ExternalLink } from "lucide-react";
import axiosInstance from "@/lib/axios";

function ContactFormContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service_interest: "web",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const preMessage = searchParams.get("message") || "";
    const preInterest = searchParams.get("interest") || "web";
    if (preMessage || preInterest) {
      setFormData(prev => ({ ...prev, message: preMessage, service_interest: preInterest }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const c = { ...prev }; delete c[name]; return c; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: Record<string, string[]> = {};
    if (!formData.name) newErrors.name = ["Nama wajib diisi"];
    if (!formData.email) newErrors.email = ["Email wajib diisi"];
    if (!formData.phone) newErrors.phone = ["Nomor telepon wajib diisi"];
    if (!formData.message) newErrors.message = ["Pesan wajib diisi"];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const serviceLabels: Record<string, string> = {
        web: "Web Development",
        mobile: "Mobile Applications",
        design: "Service Design / CX",
        marketing: "Marketing & Growth",
        ai: "AI & Automation",
        support: "IT Support & Maintenance",
      };

      const serviceName = serviceLabels[formData.service_interest] || formData.service_interest;

      const messageText = `Halo GordaTech! 👋\n\nSaya ingin berkonsultasi:\n` +
        `- *Nama*: ${formData.name}\n` +
        `- *Email*: ${formData.email}\n` +
        `- *Perusahaan*: ${formData.company || "-"}\n` +
        `- *No. Telepon*: ${formData.phone}\n` +
        `- *Layanan*: ${serviceName}\n` +
        `- *Pesan*: ${formData.message}`;

      const waUrl = `https://wa.me/62818880497?text=${encodeURIComponent(messageText)}`;
      
      window.open(waUrl, "_blank");

      setIsSuccess(true);
      setFormData({ name: "", email: "", company: "", phone: "", service_interest: "web", message: "" });
    } catch (error: any) {
      setErrors({ global: ["Terjadi kesalahan teknis. Silakan hubungi kami via WhatsApp."] });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--bg-deepest)",
    border: "1px solid var(--text-ghost-val)",
    color: "var(--text-white-val)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: "10px",
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "var(--text-muted-val)",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

      {/* LEFT: Contact Info */}
      <div className="lg:col-span-4 flex flex-col gap-8">
        <div>
          <h3 className="text-xl font-extrabold mb-3" style={{ color: "var(--text-white-val)" }}>Kontak Langsung</h3>
          <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
            Tim konsultan GordaTech siap membantu Anda menemukan solusi terbaik. Hubungi kami sekarang atau kunjungi kantor kami.
          </p>
        </div>

        {/* Address */}
        <div
          className="p-5 rounded-2xl"
          style={{ background: "var(--bg-navy-card)", border: "1px solid var(--text-ghost-val)" }}
        >
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#42b2bf" }} />
            <div>
              <h4 className="font-extrabold text-sm mb-1" style={{ color: "var(--text-white-val)" }}>Kantor GordaTech</h4>
              <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
                Jl. Veteran Ps. 7 No.19, Helvetia, Kec. Labuhan Deli, Kabupaten Deli Serdang, Sumatera Utara 20241
              </p>
              <a
                href="https://maps.app.goo.gl/sHoexgqMaCYcQNQq5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold mt-2"
                style={{ color: "#42b2bf" }}
              >
                Buka di Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#42b2bf" }} />
            <a
              href={`https://wa.me/62818880497?text=${encodeURIComponent(
                "Halo GordaTech! 👋\n\nSaya ingin berkonsultasi mengenai solusi digital terbaik untuk mempercepat pertumbuhan bisnis saya. 📈\n\nBisa tolong bantu jadwalkan sesi diskusi? Terima kasih!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-[#42b2bf] transition-colors"
              style={{ color: "var(--text-white-val)" }}
            >
              +62 818-880-497
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#42b2bf" }} />
            <a
              href="mailto:gordatech@gmail.com"
              className="text-sm font-medium hover:text-[#42b2bf] transition-colors"
              style={{ color: "var(--text-white-val)" }}
            >
              gordatech@gmail.com
            </a>
          </div>
        </div>

        {/* Map Embed */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--text-ghost-val)", height: "220px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.7284!2d98.6456!3d3.6546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzknMjIuMSJOIDk4wrAzOCc0Mi4yIkU!5e0!3m2!1sen!2sid!4v1700000000000"
            width="100%"
            height="220"
            style={{ border: 0, filter: "brightness(0.95)" }}
            allowFullScreen={false}
            loading="lazy"
            title="Lokasi Kantor GordaTech"
          />
        </div>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/62818880497?text=${encodeURIComponent(
            "Halo GordaTech! 👋\n\nSaya ingin berkonsultasi langsung via WhatsApp mengenai solusi digital dan teknologi untuk bisnis saya. 🚀\n\nMohon informasi mengenai alur kerja samanya. Terima kasih banyak!"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
          style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.25)" }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.078-2.868-6.931C16.36 2.022 13.91 1.002 11.997 1c-5.41 0-9.821 4.404-9.824 9.808-.001 1.595.452 3.15 1.31 4.566L2.43 19.95l4.217-1.107L6.648 19.154z"/>
          </svg>
          Chat via WhatsApp Sekarang
        </a>
      </div>

      {/* RIGHT: Form */}
      <div
        className="lg:col-span-8 rounded-2xl p-8 md:p-10"
        style={{ background: "var(--bg-navy-card)", border: "1px solid var(--text-ghost-val)" }}
      >
        {isSuccess ? (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(66, 178, 191, 0.15)" }}>
              <CheckCircle className="w-8 h-8" style={{ color: "#42b2bf" }} />
            </div>
            <h3 className="text-2xl font-extrabold" style={{ color: "var(--text-white-val)" }}>Pesan Terkirim!</h3>
            <p className="text-sm font-light leading-relaxed max-w-sm" style={{ color: "var(--text-muted-val)" }}>
              Terima kasih telah menghubungi GordaTech. Tim konsultan kami akan merespons dalam waktu kurang dari 24 jam kerja.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 font-bold px-8 py-3 rounded-xl text-white text-sm transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="pb-5" style={{ borderBottom: "1px solid var(--text-ghost-val)" }}>
              <h3 className="text-xl font-extrabold" style={{ color: "var(--text-white-val)" }}>Formulir Konsultasi</h3>
              <p className="text-xs font-light mt-1" style={{ color: "var(--text-muted-val)" }}>Isi form di bawah — konsultan kami akan segera menghubungi Anda.</p>
            </div>

            {errors.global && (
              <div className="p-4 rounded-xl text-xs" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
                {errors.global[0]}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Nama Lengkap *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Budi Santoso" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(66, 178, 191, 0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(28, 34, 61, 0.08)")}
                />
                {errors.name && <p className="text-[10px] mt-1" style={{ color: "#fca5a5" }}>{errors.name[0]}</p>}
              </div>
              <div>
                <label style={labelStyle}>Alamat Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="budi@perusahaan.com" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(66, 178, 191, 0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(28, 34, 61, 0.08)")}
                />
                {errors.email && <p className="text-[10px] mt-1" style={{ color: "#fca5a5" }}>{errors.email[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Nama Perusahaan</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="PT Maju Bersama (opsional)" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(66, 178, 191, 0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(28, 34, 61, 0.08)")}
                />
              </div>
              <div>
                <label style={labelStyle}>No. WhatsApp</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="08123456789 (opsional)" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(66, 178, 191, 0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(28, 34, 61, 0.08)")}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Layanan yang Diminati</label>
              <select name="service_interest" value={formData.service_interest} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="web">Website &amp; Mobile App Development</option>
                <option value="marketing">Marketing Digital &amp; CRM Leads</option>
                <option value="ai">Otomatisasi AI &amp; Chatbot</option>
                <option value="infra">Managed IT &amp; Cyber Security</option>
                <option value="strategi">Strategi Digital &amp; Business Insight</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Ceritakan Kebutuhan Bisnis Anda *</label>
              <textarea
                name="message" required rows={5} value={formData.message} onChange={handleChange}
                placeholder="Contoh: Kami membutuhkan website e-commerce untuk toko batik kami yang sudah berdiri 5 tahun. Target kami adalah meningkatkan penjualan online hingga 3x lipat dalam 6 bulan."
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(66, 178, 191, 0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(28, 34, 61, 0.08)")}
              />
              {errors.message && <p className="text-[10px] mt-1" style={{ color: "#fca5a5" }}>{errors.message[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: isLoading ? "rgba(28, 34, 61, 0.08)" : "linear-gradient(135deg, #42b2bf, #323e7a)",
                boxShadow: isLoading ? "none" : "0 8px 24px rgba(66, 178, 191, 0.2)",
              }}
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</> : <><Send className="w-4 h-4" /> Kirim Formulir Konsultasi</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-20 min-h-screen" style={{ background: "var(--bg-dark)" }}>
      {/* Background glows */}
      <div className="fixed pointer-events-none" style={{ top: "10%", left: "-5%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(66,178,191,0.07) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div className="fixed pointer-events-none" style={{ bottom: "10%", right: "-5%", width: "35%", height: "45%", background: "radial-gradient(ellipse, rgba(50,62,122,0.07) 0%, transparent 65%)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-16">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>Hubungi Kami</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4" style={{ color: "var(--text-white-val)" }}>
            Mari{" "}
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Berkolaborasi
            </span>
          </h1>
          <p className="text-base font-light max-w-xl" style={{ color: "var(--text-muted-val)" }}>
            Jadwalkan sesi konsultasi gratis bersama tim ahli GordaTech dan temukan roadmap digital terbaik untuk bisnis Anda.
          </p>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{ color: "#42b2bf" }} /></div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}
