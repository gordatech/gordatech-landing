"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-[95] w-11 h-11 rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
      }`}
      style={{
        background: "rgba(5, 10, 24, 0.8)",
        border: "1px solid rgba(66, 178, 191, 0.3)",
        boxShadow: "0 6px 20px rgba(66, 178, 191, 0.15)",
        color: "#42b2bf",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.borderColor = "rgba(50, 62, 122, 0.6)";
        e.currentTarget.style.background = "#42b2bf";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(66, 178, 191, 0.35)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#42b2bf";
        e.currentTarget.style.borderColor = "rgba(66, 178, 191, 0.3)";
        e.currentTarget.style.background = "rgba(5, 10, 24, 0.8)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(66, 178, 191, 0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      title="Kembali ke Atas"
      aria-label="Kembali ke Atas"
    >
      <ChevronUp className="w-5 h-5 transition-transform duration-300" />
    </button>
  );
}
