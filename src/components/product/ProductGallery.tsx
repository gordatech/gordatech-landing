"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  accentColor: string;
}

export default function ProductGallery({ images, accentColor }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3.5 mb-6">
      {/* Main Large Image */}
      <div 
        className="w-full h-[200px] md:h-[220px] rounded-2xl overflow-hidden relative border bg-slate-950/20 transition-all duration-300"
        style={{ borderColor: `${accentColor}25` }}
      >
        <img
          src={images[activeIndex]}
          alt="Preview Produk"
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-slate-900/75 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-white tracking-wider">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className="w-14 h-10 md:w-16 md:h-11 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 border-2 bg-slate-900 cursor-pointer relative"
              style={{
                borderColor: isActive ? accentColor : "transparent",
                opacity: isActive ? 1 : 0.6,
                transform: isActive ? "scale(1.03)" : "none",
                boxShadow: isActive ? `0 4px 12px ${accentColor}20` : "none",
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
  );
}
