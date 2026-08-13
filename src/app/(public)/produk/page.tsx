import React from "react";
import { ShoppingBag, Cpu, Users, Truck, CheckCircle2, MessageSquare, Globe, Briefcase } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import { Metadata } from "next";
import ProductListClient from "@/components/product/ProductListClient";

export const metadata: Metadata = {
  title: "Produk Aplikasi",
  description: "Eksplorasi jajaran produk aplikasi digital kelas enterprise buatan Gordatech yang andal, scalable, dan siap pakai untuk bisnis Anda.",
};


interface Product {
  id: number;
  name: string;
  desc: string;
  icon: string;
  tags: string[];
  features: string[];
  specs: string;
  accentColor: string;
  sewa_price?: number;
  beli_price?: number;
  images?: string[];
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 5,
    name: "GoReport (GordaReport)",
    desc: "Platform ERP manajemen keuangan, penagihan invoice, pencatatan transaksi cashflow, manajemen proposal, inventori barang, dan laporan laba rugi terpadu untuk efisiensi bisnis.",
    icon: "Briefcase",
    tags: ["Finance & ERP", "Billing Platform", "Laravel ERP"],
    features: [
      "Manajemen Klien & Proyek (Task Management) terpadu",
      "Invoice Generator & Billing (Ekspor ke PDF & Lacak Pelunasan)",
      "Pencatatan Transaksi & Hutang, serta Inventori/Kategori Barang",
      "Laporan Laba Rugi (Profit & Loss) real-time untuk audit berkala",
    ],
    specs: "Laravel Blade + Livewire + Tailwind CSS + PostgreSQL/MySQL",
    accentColor: "#323e7a",
    sewa_price: 190000,
    beli_price: 6000000,
  },
];

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

export default async function ProductsPage() {
  const dbProducts = await fetchProducts();
  const displayProducts = dbProducts.length > 0 ? dbProducts : DEFAULT_PRODUCTS;
  return (
    <div className="min-h-screen py-20" style={{ background: "var(--bg-dark)" }}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: "40%", height: "55%", background: "radial-gradient(ellipse, rgba(60,174,185,0.07) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "38%", height: "50%", background: "radial-gradient(ellipse, rgba(91,142,240,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <style>{`
        .prod-card { transition: transform 0.3s, box-shadow 0.3s; }
        .prod-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(28, 34, 61, 0.08); }
        .sewa-btn { transition: background-color 0.2s, border-color 0.2s; }
        .sewa-btn:hover { background-color: var(--hover-bg) !important; border-color: var(--hover-border) !important; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>Produk Aplikasi</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight" style={{ color: "var(--text-white-val)" }}>
            Solusi Siap Pakai,{" "}
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Langsung Berdampak.
            </span>
          </h1>
          <p className="text-base font-light max-w-2xl leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
            Produk aplikasi enterprise dari GordaTech dirancang dengan keandalan tinggi untuk mempercepat transformasi operasional internal dan digitalisasi penjualan bisnis Anda.
          </p>
        </div>

        {/* Product List Client Wrapper */}
        <ProductListClient 
          initialProducts={dbProducts} 
          defaultProducts={DEFAULT_PRODUCTS} 
        />
      </div>
    </div>
  );
}
