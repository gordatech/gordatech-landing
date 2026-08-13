import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  height?: number;
  href?: string;
  showSubtitle?: boolean;
  darkMode?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Logo({ className = "", height = 36, href = "/", showSubtitle = true, darkMode = false, onClick }: LogoProps) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Isolated stag emblem image */}
      <img
        src="/logo-emblem.png"
        alt="GordaTech Logo"
        style={{ height: `${height}px` }}
        className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        draggable={false}
      />
      {/* Brand text rendering with native HTML elements */}
      <div className="flex flex-col justify-center leading-none text-left">
        <span className="text-xl font-black tracking-tight flex items-center">
          <span className="text-brand-teal font-extrabold">GORDA</span>
          <span className={`font-black ${darkMode ? "text-white" : "text-brand-navy"}`}>TECH</span>
        </span>
        {showSubtitle && (
          <span
            className="text-[7.5px] uppercase tracking-[0.16em] font-extrabold mt-1 font-sans"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : undefined }}
          >
            {!darkMode && <span className="text-brand-navy/40">Your Trusted Digital Partner</span>}
            {darkMode && "Your Trusted Digital Partner"}
          </span>
        )}
      </div>
    </Link>
  );
}
