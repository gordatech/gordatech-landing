"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Layanan", path: "/layanan" },
    { name: "Portofolio", path: "/portfolio" },
    { name: "Produk", path: "/produk" },
    { name: "Tentang Kami", path: "/tentang" },
    { name: "Insight", path: "/insight" },
  ];

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const waMessage = encodeURIComponent(
    "Halo GordaTech! 👋✨\n\nSaya berkunjung ke website Anda dan ingin berkonsultasi mengenai solusi digital terbaik untuk bisnis saya. 🚀📈\n\nBisa tolong bantu jadwalkan sesi diskusi gratis? Terima kasih banyak! 🙏"
  );
  const waUrl = `https://wa.me/62818880497?text=${waMessage}`;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: scrolled ? "1px solid rgba(15, 23, 42, 0.07)" : "1px solid rgba(15, 23, 42, 0.03)",
        boxShadow: scrolled ? "0 8px 30px -12px rgba(50, 62, 122, 0.14)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Logo height={38} darkMode={false} onClick={handleLogoClick} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="relative text-sm font-medium tracking-wide py-1 transition-all duration-200"
              style={{
                color: isActive(link.path) ? "#42b2bf" : "rgba(50, 62, 122, 0.75)",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) e.currentTarget.style.color = "#323e7a";
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) e.currentTarget.style.color = "rgba(50, 62, 122, 0.75)";
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #42b2bf, #323e7a)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d hidden sm:flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 group sweep-shine text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}
          >
            Konsultasi Gratis
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg md:hidden transition-all"
            style={{
              background: "rgba(50, 62, 122, 0.05)",
              border: "1px solid rgba(66, 178, 191, 0.15)",
              color: "rgba(50, 62, 122, 0.75)",
            }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "#ffffff",
              borderTop: "1px solid rgba(66, 178, 191, 0.12)",
            }}
          >
            <div className="px-6 py-7 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium"
                  style={{
                    color: isActive(link.path) ? "#42b2bf" : "rgba(50, 62, 122, 0.75)",
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="btn-3d w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-sm text-white sweep-shine cursor-pointer"
                style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}
              >
                Konsultasi Gratis
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
