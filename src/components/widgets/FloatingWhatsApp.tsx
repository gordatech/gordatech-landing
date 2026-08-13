"use client";

import React, { useState, useEffect } from "react";

const WA_NUMBER = "62818880497";
const WA_MESSAGE = "Halo GordaTech! 👋 Saya ingin konsultasi gratis mengenai solusi digital untuk bisnis saya. Bisa bantu saya?";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
      if (window.scrollY <= 300) setShowBubble(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isVisible && !dismissed) {
      t = setTimeout(() => setShowBubble(true), 1800);
    }
    return () => clearTimeout(t);
  }, [isVisible, dismissed]);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <div
      className={`fixed bottom-24 right-6 z-[90] flex flex-col items-end gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Greeting Bubble — hidden on mobile */}
      <div
        className={`hidden sm:block relative transition-all duration-300 origin-bottom-right ${
          showBubble && !dismissed
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-2 pointer-events-none"
        }`}
      >
        <div
          className="rounded-2xl py-3 px-4 shadow-xl"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
            maxWidth: "200px",
          }}
        >
          <button
            onClick={() => { setShowBubble(false); setDismissed(true); }}
            className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold cursor-pointer hover:opacity-60"
            style={{ background: "rgba(0,0,0,0.1)", color: "#555" }}
          >
            ✕
          </button>
          <p className="text-xs font-bold mb-0.5 pr-4" style={{ color: "#111" }}>GordaTech CS 👋</p>
          <p className="text-[11px] leading-relaxed" style={{ color: "#666" }}>
            Butuh solusi digital? Kami siap bantu gratis!
          </p>
          {/* Tail */}
          <div
            className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45"
            style={{ borderRight: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          />
        </div>
      </div>

      {/* Main Button — compact circle with label on desktop */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => { if (!dismissed) setShowBubble(true); }}
        title="Chat via WhatsApp"
        className="flex items-center justify-center sm:justify-start gap-2.5 rounded-full cursor-pointer select-none transition-all duration-300 hover:scale-105 w-11 h-11 sm:w-auto sm:h-auto p-0 sm:py-2.5 sm:px-4 sm:pl-3"
        style={{
          background: "#25D366",
          boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
        }}
      >
        {/* Pulse ring + WA icon */}
        <div className="relative flex-shrink-0 w-8 h-8">
          <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
          <div className="relative w-8 h-8 flex items-center justify-center z-10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </div>
        {/* Text — only shown sm+ */}
        <div className="hidden sm:flex flex-col leading-none">
          <span className="text-[9px] font-semibold text-white/75 uppercase tracking-wider">Tanya Kami</span>
          <span className="text-[12px] font-black text-white">Chat Sekarang</span>
        </div>
      </a>
    </div>
  );
}
