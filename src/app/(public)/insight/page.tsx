import React from "react";
import { fetchInsights } from "@/lib/api";
import InsightListClient from "./InsightListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wawasan & Artikel",
  description: "Temukan artikel, berita, dan tips seputar bisnis digital dari GordaTech.",
};

const DEFAULT_INSIGHTS = [
  {
    id: 1,
    title: "5 Strategi Digital Marketing Terbukti untuk Melejitkan Omzet UMKM di 2026",
    slug: "5-strategi-digital-marketing-umkm-2026",
    summary: "Pelajari strategi pemasaran digital esensial yang dapat diimplementasikan oleh UMKM untuk melipatgandakan omzet bisnis dengan biaya terjangkau.",
    content: "",
    category: "Digital Marketing",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-05-29T07:40:00Z",
    author: "GordaTech Admin"
  },
  {
    id: 2,
    title: "Mengapa Website Next.js Adalah Pilihan Terbaik untuk Kecepatan dan SEO",
    slug: "mengapa-website-nextjs-terbaik-seo",
    summary: "Temukan alasan mengapa teknologi headless Next.js dapat meningkatkan peringkat SEO Google Anda secara signifikan dibandingkan platform tradisional.",
    content: "",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-05-28T12:00:00Z",
    author: "GordaTech Team"
  },
  {
    id: 3,
    title: "Otomatisasi WhatsApp Business API: Kunci CS 24/7 Tanpa Burnout",
    slug: "otomatisasi-whatsapp-business-api-cs-247",
    summary: "Bagaimana mengintegrasikan AI chatbot dengan WhatsApp Business API resmi untuk meningkatkan produktivitas pelayanan pelanggan Anda.",
    content: "",
    category: "AI Automation",
    image_url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-05-27T10:00:00Z",
    author: "AI Specialist GordaTech"
  }
];

export default async function InsightListPage() {
  let insights = [];
  try {
    insights = await fetchInsights();
  } catch (error) {
    console.error("Error fetching insights at build time:", error);
  }

  if (!insights || insights.length === 0) {
    insights = DEFAULT_INSIGHTS;
  }

  return <InsightListClient initialInsights={insights} />;
}
