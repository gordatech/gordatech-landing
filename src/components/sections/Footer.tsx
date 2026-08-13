"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Strategi Bisnis & Customer", path: "/layanan" },
    { name: "Marketing, Sales & Growth", path: "/layanan" },
    { name: "Digital Product & Platform", path: "/layanan" },
    { name: "Automation & Intelligent AI", path: "/layanan" },
    { name: "IT Support & Maintenance", path: "/layanan" },
  ];

  const quickLinks = [
    { name: "Tentang Kami", path: "/tentang" },
    { name: "Portofolio Proyek", path: "/portfolio" },
    { name: "Produk Aplikasi", path: "/produk" },
    { name: "Insight & Artikel", path: "/insight" },
    { name: "Hubungi Kami", path: "/kontak" },
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/gordatech",
      label: "Instagram",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/gordatech",
      label: "Facebook",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="pt-20 pb-10 mt-auto transition-colors duration-300"
      style={{ background: "var(--bg-dark)", color: "rgba(50, 62, 122, 0.65)", borderTop: "1px solid rgba(66, 178, 191, 0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        {/* Column 1: Company Info */}
        <div className="flex flex-col gap-6">
          <Logo height={40} darkMode={false} />
          <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(28, 34, 61, 0.6)" }}>
            Your Trusted Digital Partner. Kami mengakselerasi pertumbuhan bisnis Anda melalui teknologi mutakhir, strategi pemasaran terukur, dan inovasi digital berkelanjutan.
          </p>
          {/* Social Links — Instagram & Facebook only */}
          <div className="flex items-center gap-3 mt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="icon-chip w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(66, 178, 191, 0.15)", color: "rgba(50, 62, 122, 0.6)", '--chip-glow': 'rgba(66,178,191,0.3)' } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#42b2bf";
                  e.currentTarget.style.borderColor = "rgba(66, 178, 191, 0.4)";
                  e.currentTarget.style.background = "rgba(66, 178, 191, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(50, 62, 122, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(66, 178, 191, 0.1)";
                  e.currentTarget.style.background = "rgba(50, 62, 122, 0.03)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Solutions */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] mb-6" style={{ color: "#1c223d" }}>
            Solusi Digital
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            {services.map((srv, idx) => (
              <li key={idx}>
                <Link
                  href={srv.path}
                  className="font-light transition-all duration-200"
                  style={{ color: "rgba(50, 62, 122, 0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#42b2bf")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(50, 62, 122, 0.75)")}
                >
                  {srv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] mb-6" style={{ color: "#1c223d" }}>
            Tautan Cepat
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.path}
                  className="font-light transition-all duration-200"
                  style={{ color: "rgba(50, 62, 122, 0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#42b2bf")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(50, 62, 122, 0.75)")}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-5 text-sm">
          <h4 className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: "#1c223d" }}>
            Hubungi Kami
          </h4>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#42b2bf" }} />
            <div>
              <p className="font-light leading-relaxed" style={{ color: "rgba(50, 62, 122, 0.75)" }}>
                Jl. Veteran Ps. 7 No.19, Helvetia, Kec. Labuhan Deli, Kabupaten Deli Serdang, Sumatera Utara 20241
              </p>
              <a
                href="https://maps.app.goo.gl/sHoexgqMaCYcQNQq5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold mt-1.5 transition-colors"
                style={{ color: "rgba(66, 178, 191, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#42b2bf")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(66, 178, 191, 0.7)")}
              >
                Buka di Google Maps
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#42b2bf" }} />
            <a
              href={`https://wa.me/62818880497?text=${encodeURIComponent(
                "Halo GordaTech! 👋\n\nSaya ingin berkonsultasi mengenai solusi digital terbaik untuk bisnis saya. 💼\n\nBolehkah saya mendapatkan info lebih lanjut? Terima kasih!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors"
              style={{ color: "rgba(50, 62, 122, 0.75)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#42b2bf")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(50, 62, 122, 0.75)")}
            >
              +62 818-880-497
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#42b2bf" }} />
            <a
              href="mailto:gordatech@gmail.com"
              className="font-medium transition-colors"
              style={{ color: "rgba(50, 62, 122, 0.75)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#42b2bf")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(50, 62, 122, 0.75)")}
            >
              gordatech@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        style={{ borderTop: "1px solid rgba(66, 178, 191, 0.12)", color: "rgba(50, 62, 122, 0.55)" }}
      >
        <p>&copy; {currentYear} GordaTech. Hak Cipta Dilindungi Undang-Undang.</p>
        <div className="flex items-center gap-5">
          <Link href="/tentang" className="transition-colors hover:opacity-70">Kebijakan Privasi</Link>
          <Link href="/tentang" className="transition-colors hover:opacity-70">Syarat &amp; Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
}
