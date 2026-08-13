"use client";

import React, { useState } from "react";
import { ShoppingBag, Cpu, Users, Truck, CheckCircle2, MessageSquare, Globe, Briefcase, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import ProductGallery from "./ProductGallery";

interface Product {
  id: number;
  name: string;
  desc: string;
  icon: string | React.ElementType;
  tags: string[];
  features: string[];
  specs: string;
  accentColor: string;
  sewa_price?: number;
  beli_price?: number;
  images?: string[];
}

interface ProductListClientProps {
  initialProducts: Product[];
  defaultProducts: Product[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingBag,
  Cpu,
  Users,
  Truck,
  Globe,
  Briefcase,
  MessageSquare,
};

function formatPrice(price?: number) {
  if (price === undefined || price === null || price === 0) return "Hubungi Kami";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function getSewaLink(name: string, price?: number) {
  const priceStr = price ? `${formatPrice(price)}/bulan` : "Sewa Bulanan";
  return `https://wa.me/62818880497?text=${encodeURIComponent(
    `Halo GordaTech! 👋\n\nSaya tertarik untuk menyewa (SaaS) produk berikut:\n📦 Produk: *${name}*\n💰 Paket Sewa: *${priceStr}*\n\nBagaimana langkah pendaftaran, syarat, serta jadwal demo aplikasinya? Terima kasih!`
  )}`;
}

function getBeliLink(name: string, price?: number) {
  const priceStr = price ? `${formatPrice(price)}` : "Beli Lisensi";
  return `https://wa.me/62818880497?text=${encodeURIComponent(
    `Halo GordaTech! 👋\n\nSaya berminat untuk membeli lisensi penuh (Source Code) produk berikut:\n📦 Produk: *${name}*\n💰 Harga Lisensi: *${priceStr}*\n\nBoleh minta info detail modul, dokumentasi teknis, serta panduan instalasinya? Terima kasih!`
  )}`;
}

export default function ProductListClient({ initialProducts, defaultProducts }: ProductListClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [detailGalleryIndex, setDetailGalleryIndex] = useState(0);

  // Swipe refs for mobile swipe gesture detection in the lightbox
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const showNext = () => {
    if (lightboxIndex === null || !selectedProduct?.images) return;
    setLightboxIndex(prev => (prev !== null ? (prev + 1) % selectedProduct.images!.length : null));
  };

  const showPrev = () => {
    if (lightboxIndex === null || !selectedProduct?.images) return;
    setLightboxIndex(prev => (prev !== null ? (prev - 1 + selectedProduct.images!.length) % selectedProduct.images!.length : null));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // initialize
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      showNext();
    } else if (diff < -50) {
      showPrev();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, selectedProduct]);

  React.useEffect(() => {
    if (lightboxIndex !== null || selectedProduct !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, selectedProduct]);

  const displayProducts = initialProducts.length > 0 ? initialProducts : defaultProducts;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayProducts.map((prod: any) => {
          const Icon = typeof prod.icon === "string" ? (ICON_MAP[prod.icon] || ShoppingBag) : prod.icon;
          return (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProduct(prod);
                setDetailGalleryIndex(0);
              }}
              className="prod-card rounded-2xl p-8 flex flex-col justify-between cursor-pointer group"
              style={{
                background: "var(--bg-navy-card)",
                border: `1px solid rgba(${prod.accentColor === "#42b2bf" ? "66,178,191" : "50,62,122"},0.15)`,
              }}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${prod.accentColor}22, ${prod.accentColor}18)`, border: `1px solid ${prod.accentColor}33` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: prod.accentColor }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-[var(--text-white-val)] group-hover:text-cyan-600 transition-colors">{prod.name}</h2>
                        <span className="text-[10px] bg-cyan-500/10 text-cyan-600 font-bold px-2 py-0.5 rounded-full border border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all">
                          Lihat Detail
                        </span>
                      </div>
                      <span
                        className="text-[9px] uppercase tracking-widest font-extrabold"
                        style={{ color: prod.accentColor }}
                      >
                        {prod.tags[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-light leading-relaxed mb-7" style={{ color: "var(--text-muted-val)" }}>
                  {prod.desc}
                </p>

                {/* Interactive Gallery */}
                {prod.images && prod.images.length > 0 && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <ProductGallery images={prod.images} accentColor={prod.accentColor} />
                  </div>
                )}

                {/* Features */}
                <div className="mb-7">
                  <p className="text-[10px] uppercase tracking-[0.18em] font-extrabold mb-3" style={{ color: prod.accentColor, opacity: 0.8 }}>
                    Fitur & Keunggulan
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {prod.features.slice(0, 3).map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-medium" style={{ color: "var(--text-muted-val)" }}>
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: prod.accentColor }} />
                        {feat}
                      </li>
                    ))}
                    {prod.features.length > 3 && (
                      <li className="text-[10px] font-bold tracking-wide mt-1 cursor-pointer hover:underline" style={{ color: prod.accentColor }}>
                        +{prod.features.length - 3} Fitur Lainnya...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Pricing Matrix */}
                <div className="mb-7 grid grid-cols-2 gap-4 p-4 rounded-xl" style={{ background: "var(--bg-deepest)", border: "1px solid var(--text-ghost-val)" }}>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-0.5">Sewa Cloud (SaaS)</span>
                    <span className="text-sm font-black text-[var(--text-white-val)]">
                      {formatPrice(prod.sewa_price)}
                      <span className="text-[10px] font-normal text-slate-500">/bln</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-0.5">Beli Lisensi (Full Code)</span>
                    <span className="text-sm font-black text-[var(--text-white-val)]">
                      {formatPrice(prod.beli_price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-5 pt-5" style={{ borderTop: "1px solid var(--text-ghost-val)" }}>
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-extrabold mb-1" style={{ color: "var(--text-muted-val)", opacity: 0.6 }}>Stack Teknologi</p>
                  <p className="text-xs font-medium" style={{ color: "var(--text-muted-val)" }}>{prod.specs}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={getSewaLink(prod.name, prod.sewa_price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-center sewa-btn"
                    style={{
                      background: `rgba(28, 34, 61, 0.02)`,
                      border: `1px solid ${prod.accentColor}55`,
                      color: prod.accentColor,
                      ["--hover-bg" as any]: `${prod.accentColor}10`,
                      ["--hover-border" as any]: prod.accentColor,
                    }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Sewa Sekarang
                  </a>
                  <a
                    href={getBeliLink(prod.name, prod.beli_price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl text-xs text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-center"
                    style={{
                      background: `linear-gradient(135deg, ${prod.accentColor}, ${prod.accentColor === "#42b2bf" ? "#323e7a" : "#42b2bf"})`,
                      boxShadow: `0 4px 14px ${prod.accentColor}25`,
                    }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Beli Lisensi
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL MODAL OVERLAY */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white border border-[rgba(66,178,191,0.15)] rounded-[32px] w-full max-w-5xl max-h-[90vh] flex flex-col relative shadow-[0_24px_80px_rgba(50,62,122,0.1)] overflow-y-auto md:overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glows inside modal */}
            <div className="absolute pointer-events-none rounded-full" style={{ top: "-10%", left: "-10%", width: "40%", height: "40%", background: `radial-gradient(circle, ${selectedProduct.accentColor}08 0%, transparent 70%)`, filter: "blur(50px)" }} />
            <div className="absolute pointer-events-none rounded-full" style={{ bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: `radial-gradient(circle, rgba(50,62,122,0.04) 0%, transparent 70%)`, filter: "blur(50px)" }} />

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full transition-colors border border-[rgba(66,178,191,0.15)] z-20 cursor-pointer backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Fixed Header */}
            <div className="p-6 md:p-8 flex justify-between items-start border-b border-[rgba(66,178,191,0.12)] relative z-10 bg-white/80 backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: selectedProduct.accentColor }}>
                    Detail Produk Aplikasi
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-400">
                    {selectedProduct.tags[0]}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{selectedProduct.name}</h3>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 scrollbar-thin">
              
              {/* Left Column: Larger Interactive Image Gallery & Lightbox Trigger (Span 7) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {/* Browser Mockup Frame */}
                    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col shadow-lg shadow-black/5">
                      {/* Browser Header Bar */}
                      <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="bg-white border border-slate-200 rounded-md px-10 py-1 text-[9px] font-medium text-slate-400 tracking-wide select-none truncate max-w-[200px] md:max-w-[300px]">
                          {selectedProduct.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.gordatech.com
                        </div>
                        <div className="w-10" /> {/* Spacer */}
                      </div>
                      
                      {/* Main Active Image Display */}
                      <div 
                        onClick={() => setLightboxIndex(detailGalleryIndex)}
                        className="w-full aspect-video relative bg-slate-100 flex items-center justify-center cursor-zoom-in group overflow-hidden"
                      >
                        <img
                           src={selectedProduct.images[detailGalleryIndex]}
                          alt={`${selectedProduct.name} Detail`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                          <div className="bg-white/95 border border-[rgba(66,178,191,0.15)] px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                            <Maximize2 className="w-3.5 h-3.5" />
                            Perbesar Mockup Gambar
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 border border-slate-200">
                          {detailGalleryIndex + 1} / {selectedProduct.images.length}
                        </div>
                      </div>
                    </div>

                    {/* Thumbnails Row */}
                    <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-thin">
                      {selectedProduct.images.map((img, idx) => {
                        const isActive = idx === detailGalleryIndex;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onMouseEnter={() => setDetailGalleryIndex(idx)}
                            onClick={() => setDetailGalleryIndex(idx)}
                            className="w-20 h-12 md:w-24 md:h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 bg-slate-100 cursor-pointer relative"
                            style={{
                              borderColor: isActive ? selectedProduct.accentColor : "rgba(66,178,191,0.1)",
                              opacity: isActive ? 1 : 0.45,
                              transform: isActive ? "scale(1.05) translateY(-2px)" : "none",
                              boxShadow: isActive ? `0 6px 16px ${selectedProduct.accentColor}15` : "none",
                            }}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-200 bg-slate-50 text-slate-400 gap-2">
                    <ShoppingBag className="w-10 h-10 stroke-1" />
                    <span className="text-xs font-light">Belum ada gambar pendukung produk ini</span>
                  </div>
                )}
              </div>

              {/* Right Column: Detailed Text & Specs (Span 5) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Description block */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#323e7a] font-bold">Deskripsi Ringkas</h4>
                  <p className="text-sm font-normal leading-relaxed text-slate-700 bg-slate-50/50 border border-[rgba(66,178,191,0.12)] p-5 rounded-2xl shadow-inner">
                    {selectedProduct.desc}
                  </p>
                </div>

                {/* Features list */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#323e7a] font-black">Fitur & Keunggulan Utama</h4>
                  <div className="bg-slate-50/50 border border-[rgba(66,178,191,0.12)] p-5 rounded-2xl flex flex-col gap-3.5 shadow-inner">
                    {selectedProduct.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs font-medium text-slate-750">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${selectedProduct.accentColor}15` }}>
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: selectedProduct.accentColor }} />
                        </div>
                        <span className="leading-relaxed font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#323e7a] font-bold">Pilihan Skema Pembelian</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* SaaS Card */}
                    <div className="p-4.5 rounded-2xl bg-slate-50/50 border border-[rgba(66,178,191,0.12)] flex flex-col justify-between gap-1 shadow-sm relative overflow-hidden group/price">
                      <div className="absolute top-0 right-0 bg-[#42b2bf]/10 text-[#42b2bf] text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-bl-xl border-l border-b border-slate-200">
                        Cloud SaaS
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 font-bold">Sewa Bulanan</span>
                        <p className="text-2xl font-black text-slate-800 mt-1">
                          {formatPrice(selectedProduct.sewa_price)}
                          <span className="text-[10px] font-normal text-slate-400">/bln</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Beli Card */}
                    <div className="p-4.5 rounded-2xl bg-slate-50/50 border border-[rgba(66,178,191,0.12)] flex flex-col justify-between gap-1 shadow-sm relative overflow-hidden group/price">
                      <div className="absolute top-0 right-0 bg-[#323e7a]/10 text-[#323e7a] text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-bl-xl border-l border-b border-slate-200">
                        Full Code
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 font-bold">Beli Lisensi</span>
                        <p className="text-2xl font-black text-slate-800 mt-1">
                          {formatPrice(selectedProduct.beli_price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 md:p-8 border-t border-[rgba(66,178,191,0.12)] flex flex-col sm:flex-row gap-4 items-center justify-between relative z-10 bg-white">
              <div className="hidden sm:block text-left">
                <span className="text-[9px] uppercase tracking-widest font-black text-slate-500 block mb-0.5">Stack Teknologi</span>
                <span className="text-xs font-semibold text-slate-600">{selectedProduct.specs}</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href={getSewaLink(selectedProduct.name, selectedProduct.sewa_price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-center"
                  style={{
                    background: `rgba(28, 34, 61, 0.05)`,
                    border: `1px solid ${selectedProduct.accentColor}55`,
                    color: selectedProduct.accentColor,
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Sewa Sekarang
                </a>
                <a
                  href={getBeliLink(selectedProduct.name, selectedProduct.beli_price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-xs text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-center"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProduct.accentColor}, ${selectedProduct.accentColor === "#42b2bf" ? "#323e7a" : "#42b2bf"})`,
                    boxShadow: `0 4px 14px ${selectedProduct.accentColor}20`,
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Beli Lisensi
                </a>
              </div>
            </div>
          </div>
             {/* FULL-SCREEN IMAGE LIGHTBOX OVERLAY WITH TOUCH AND KEYBOARD SLIDER */}
      {lightboxIndex !== null && selectedProduct && selectedProduct.images && (
        <div 
          className="fixed inset-0 z-[60] bg-slate-950/96 backdrop-blur-lg flex flex-col justify-between select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background click listener to close */}
          <div className="absolute inset-0 cursor-zoom-out z-10" onClick={() => setLightboxIndex(null)} />

          {/* Elegant Top Bar (Counter + Close Button aligned to screen margins) */}
          <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-10 z-50 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none">
            {/* Left side: Product Name & Image Counter */}
            <div className="flex flex-col gap-0.5 select-none pointer-events-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: selectedProduct.accentColor }}>
                {selectedProduct.name}
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Gambar {lightboxIndex + 1} dari {selectedProduct.images.length}
              </span>
            </div>
            
            {/* Right side: Close button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all border border-slate-800/60 hover:border-slate-700 cursor-pointer pointer-events-auto shadow-lg backdrop-blur-md"
              aria-label="Tutup Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Navigation Button (Desktop only) */}
          {selectedProduct.images.length > 1 && (
            <button 
              onClick={showPrev}
              className="hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-white transition-all z-50 cursor-pointer shadow-lg hover:scale-105 backdrop-blur-md"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Navigation Button (Desktop only) */}
          {selectedProduct.images.length > 1 && (
            <button 
              onClick={showNext}
              className="hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-white transition-all z-50 cursor-pointer shadow-lg hover:scale-105 backdrop-blur-md"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Centered Image Display */}
          <div className="relative w-full h-full flex items-center justify-center pt-24 pb-12 px-6 md:px-24 z-40 pointer-events-none">
            <div className="relative max-w-full max-h-full flex items-center justify-center pointer-events-auto">
              <img
                src={selectedProduct.images[lightboxIndex]}
                alt={`${selectedProduct.name} Preview ${lightboxIndex + 1}`}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[95vw] max-h-[72vh] md:max-w-[90vw] md:max-h-[80vh] object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.95)] border border-slate-800/50 select-none animate-lightbox-zoom"
              />
            </div>
          </div>
        </div>
      )}   </div>
      )}
    </>
  );
}
