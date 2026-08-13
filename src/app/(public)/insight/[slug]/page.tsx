import React from "react";
import Link from "next/link";
import { fetchInsightDetail } from "@/lib/api";
import { Calendar, User, ArrowLeft, BookOpen, Clock } from "lucide-react";
import { Metadata } from "next";

interface Insight {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
  author: string;
}

const DEFAULT_INSIGHTS: Record<string, Insight> = {
  "5-strategi-digital-marketing-umkm-2026": {
    id: 1,
    title: "5 Strategi Digital Marketing Terbukti untuk Melejitkan Omzet UMKM di 2026",
    slug: "5-strategi-digital-marketing-umkm-2026",
    summary: "Pelajari strategi pemasaran digital esensial yang dapat diimplementasikan oleh UMKM untuk melipatgandakan omzet bisnis dengan biaya terjangkau.",
    content: `### Pendahuluan

Di era digital yang terus berkembang pesat ini, pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) dituntut untuk bergerak cepat dan dinamis. Pemasaran tradisional tidak lagi cukup untuk memenangkan persaingan pasar yang semakin kompetitif. Melalui strategi digital marketing yang tepat dan terukur, pelaku UMKM dapat menargetkan sasaran secara akurat, meningkatkan brand awareness, serta melipatgandakan konversi penjualan tanpa membutuhkan anggaran raksasa.

Berikut adalah 5 strategi digital marketing terbukti yang dapat langsung Anda implementasikan untuk memacu pertumbuhan bisnis di tahun 2026:

---

### 1. Pemasaran Konten (Content Marketing) yang Edukatif

Konsumen modern tidak suka langsung dijual secara agresif (hard-selling). Mereka lebih menyukai konten yang memberikan solusi atas masalah mereka. Buatlah artikel blog, panduan informatif, atau video tutorial singkat di media sosial (seperti TikTok atau Instagram Reels) yang mengedukasi audiens tentang cara menggunakan produk Anda, tips harian, atau wawasan industri.

* **Tips Praktis**: Jika Anda menjual produk kopi premium, buatlah konten tentang cara menyeduh kopi yang benar di rumah, tips membedakan jenis biji kopi, atau profil petani lokal di balik biji kopi Anda.

### 2. Search Engine Optimization (SEO) Lokal

Sebagian besar konsumen mencari produk atau layanan terdekat melalui mesin pencari Google. Pastikan bisnis Anda mudah ditemukan dengan mengoptimalkan SEO Lokal. Daftarkan profil bisnis Anda di Google Business Profile secara lengkap and akurat, serta gunakan kata kunci lokal pada halaman website Anda.

* **Tips Praktis**: Pastikan nama, alamat, nomor telepon (NAP), dan jam operasional Anda konsisten di seluruh internet. Mintalah pelanggan setia Anda memberikan ulasan bintang lima di Google Maps untuk memperkuat peringkat pencarian Anda.

### 3. Otomatisasi Lead & WhatsApp Marketing Terpadu

WhatsApp adalah saluran komunikasi utama di Indonesia. Menghubungkan website Anda dengan WhatsApp Business API resmi memungkinkan Anda merespons pertanyaan calon pelanggan dalam hitungan detik. Menggunakan chatbot berbasis AI (seperti GordaAI Support Suite) dapat membantu menyaring prospek panas secara otomatis, memberikan katalog produk secara real-time, bahkan memproses pemesanan secara mandiri.

* **Tips Praktis**: Kirimkan pesan follow-up otomatis kepada calon pembeli yang meninggalkan keranjang belanja mereka atau tawarkan kupon diskon khusus untuk pembelian berikutnya melalui pesan WhatsApp tersemat.

### 4. Iklan Kinerja (Performance Advertising) Berbayar

Pemasaran organik sangat penting, namun membutuhkan waktu untuk mendatangkan hasil. Untuk akselerasi yang cepat, gunakan iklan berbayar (Performance Ads) seperti Meta Ads (Facebook & Instagram) atau Google Ads. Mulailah dengan anggaran harian kecil, lakukan A/B testing pada materi kreatif iklan, dan targetkan audiens yang sangat spesifik berdasarkan minat, perilaku, dan lokasi geografis.

* **Tips Praktis**: Gunakan pixel tracking untuk merekam data pengunjung website Anda, lalu lakukan kampanye penargetan ulang (remarketing) kepada mereka yang sudah menunjukkan minat namun belum melakukan pembelian.

### 5. Analitik & Keputusan Berbasis Data

Kunci sukses digital marketing adalah evaluasi berkelanjutan. Jangan menebak-nebak taktik mana yang berhasil. Gunakan alat analitik gratis seperti Google Analytics untuk melacak dari mana pengunjung website Anda berasal, halaman mana yang paling sering dikunjungi, serta konten mana yang menghasilkan penjualan terbanyak.

* **Tips Praktis**: Sediakan waktu khusus setiap akhir bulan untuk mengulas metrik kinerja iklan dan konversi penjualan Anda. Alokasikan anggaran pemasaran Anda hanya pada saluran yang terbukti menghasilkan ROI (Return on Investment) tertinggi.

---

### Kesimpulan

Transformasi digital tidak harus rumit atau mahal. Dengan fokus pada 5 strategi esensial di atas, bisnis UMKM Anda dapat bersaing setara dengan korporasi besar dalam menjangkau pasar yang luas. GordaTech selalu siap mendampingi perjalanan digital Anda melalui solusi website kustom, integrasi AI chatbot WhatsApp resmi, hingga strategi pemasaran digital yang terukur untuk akselerasi pertumbuhan bisnis Anda. Hubungi tim konsultan kami sekarang untuk mendapatkan konsultasi gratis!`,
    category: "Digital Marketing",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-05-29T07:40:00Z",
    author: "GordaTech Admin"
  },
  "mengapa-website-nextjs-terbaik-seo": {
    id: 2,
    title: "Mengapa Website Next.js Adalah Pilihan Terbaik untuk Kecepatan dan SEO",
    slug: "mengapa-website-nextjs-terbaik-seo",
    summary: "Temukan alasan mengapa teknologi headless Next.js dapat meningkatkan peringkat SEO Google Anda secara signifikan dibandingkan platform tradisional.",
    content: `### Pendahuluan

Dalam dunia bisnis digital, kecepatan adalah mata uang utama. Halaman website yang memuat lambat bahkan selama beberapa detik saja dapat menyebabkan hilangnya calon konsumen potensial secara masif dan merusak peringkat pencarian Anda di Google. Algoritma Google modern menempatkan pengalaman pengguna, khususnya kecepatan rendering halaman (Core Web Vitals), sebagai salah satu sinyal peringkat terpenting.

Next.js, framework React enterprise yang populer di kalangan developer global, hadir sebagai solusi mutakhir untuk menghadirkan website super cepat, reaktif, dan sangat ramah SEO (Search Engine Optimization). Mari kita ulas mengapa Next.js merupakan investasi teknologi terbaik untuk platform digital bisnis Anda.

---

### 1. Server-Side Rendering (SSR) & Static Site Generation (SSG)

Platform React standar (Client-Side Rendering) mengirimkan halaman kosong ke browser dan mengandalkan JavaScript di perangkat pengguna untuk merender konten. Hal ini buruk untuk SEO karena crawler Google sering kali kesulitan merayapi konten dinamis yang dihasilkan di sisi klien.

Next.js menyelesaikan masalah ini secara elegan melalui **Server-Side Rendering (SSR)** dan **Static Site Generation (SSG)**:
* **Static Site Generation (SSG)**: Next.js merender seluruh halaman website Anda menjadi file HTML statis yang super ringan saat proses build. Halaman-halaman ini dapat didistribusikan secara global melalui CDN (Content Delivery Network) untuk pemuatan yang hampir instan (di bawah 0.5 detik).
* **Server-Side Rendering (SSR)**: Untuk halaman yang datanya sering berubah (seperti dashboard real-time atau katalog stok dinamis), Next.js merender konten di server pada setiap permintaan sebelum mengirimkan HTML yang sudah lengkap ke browser.

* Crawler mesin pencari menerima dokumen HTML yang sepenuhnya terisi teks sejak milidetik pertama, membuat proses pengindeksan kata kunci menjadi sangat cepat dan akurat.

### 2. Optimasi Gambar Otomatis (Next.js Image Component)

Gambar berukuran besar adalah penyebab utama website memuat lambat. Komponen bawaan Next.js secara otomatis mengoptimalkan ukuran file, mengubah format gambar menjadi format modern yang lebih efisien (seperti WebP atau AVIF), serta mengimplementasikan teknik lazy loading (memuat gambar hanya saat masuk ke area viewport pengguna).

* **Manfaat Nyata**: Menghemat penggunaan bandwidth server serta mempercepat skor LCP (Largest Contentful Paint) pada Core Web Vitals Anda.

### 3. Keamanan Tingkat Tinggi melalui Headless Architecture

Pada platform tradisional seperti WordPress, database internal dan sistem admin (CMS) berada di server yang sama dengan tampilan publik website. Hal ini membuat website rentan terhadap serangan peretasan SQL Injection atau brute force.

Dengan Next.js, Anda dapat mengimplementasikan arsitektur **headless** atau **decoupled**:
* Tampilan depan (storefront) Next.js Anda dipisahkan sepenuhnya dengan sistem database atau API internal (seperti database admin Laravel/Node.js).
* Server publik Next.js hanya menyajikan file statis yang aman dari serangan eksploitasi kode backend, memberikan ketenangan pikiran maksimal bagi bisnis dan pelanggan Anda.

### 4. Struktur Routing yang Bersih & SEO-Friendly Metadata

Next.js App Router mempermudah pembuatan struktur URL yang bersih, logis, dan ramah SEO. Mengonfigurasi meta tag dinamis, open graph tags (untuk tampilan media sosial), XML sitemap otomatis, hingga berkas sitemap dan robots dapat dilakukan dengan sangat mudah secara terstruktur.

* **Mengapa Ini Penting**: Memberikan kemudahan bagi mesin pencari untuk merayapi hierarki website Anda secara efisien, serta meningkatkan rasio klik (CTR) saat tautan dibagikan di platform sosial.

---

### Kesimpulan

Investasi pada website Next.js adalah investasi jangka panjang untuk kesuksesan digital bisnis Anda. Kombinasi kecepatan kilat, keamanan tangguh, dan performa SEO yang optimal akan membawa lebih banyak traffic organik yang berkonversi tinggi bagi bisnis Anda. Di GordaTech, kami berspesialisasi dalam merancang dan mengembangkan headless commerce serta website enterprise berbasis Next.js App Router yang future-proof. Hubungi tim ahli kami untuk mulai membangun platform digital masa depan Anda hari ini!`,
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-05-28T12:00:00Z",
    author: "GordaTech Team"
  },
  "otomatisasi-whatsapp-business-api-cs-247": {
    id: 3,
    title: "Otomatisasi WhatsApp Business API: Kunci CS 24/7 Tanpa Burnout",
    slug: "otomatisasi-whatsapp-business-api-cs-247",
    summary: "Bagaimana mengintegrasikan AI chatbot dengan WhatsApp Business API resmi untuk meningkatkan produktivitas pelayanan pelanggan Anda.",
    content: `### Pendahuluan

Bagi mayoritas konsumen di Indonesia, WhatsApp adalah saluran tercepat dan terpopuler untuk berinteraksi dengan bisnis. Kecepatan merespons pertanyaan pelanggan sering kali menjadi penentu utama apakah transaksi akan berhasil atau gagal. Namun, mengandalkan staf customer service (CS) secara manual memiliki keterbatasan fisik: waktu kerja terbatas, kelelahan mental saat merespons pertanyaan berulang, serta risiko pesan terlewat saat volume obrolan sedang tinggi.

**WhatsApp Business API resmi** yang dipadukan dengan otomatisasi kecerdasan buatan (AI) adalah solusi strategis untuk mengeliminasi batasan operasional tersebut. Mari pelajari bagaimana teknologi ini dapat mengamankan kepuasan pelanggan Anda secara berkelanjutan.

---

### 1. Respon Instan di Bawah 1 Detik, 24/7

Konsumen digital mengharapkan kepuasan instan. Dengan chatbot AI yang terhubung ke WhatsApp Business API resmi, bisnis Anda dapat menyapa dan menjawab pesan calon pembeli kapan saja — bahkan di tengah malam hari raya atau hari libur nasional. Waktu tunggu yang singkat meminimalisir kemungkinan calon pelanggan berpaling ke kompetitor Anda.

### 2. Eliminasi 80% Pertanyaan Berulang (FAQ Automation)

Hampir sebagian besar pesan yang masuk ke CS menanyakan hal yang sama: harga produk, ketersediaan stok, alamat toko, nomor rekening, atau status pengiriman barang. Chatbot pintar dapat menyaring dan menyelesaikan 80% pertanyaan berulang ini secara mandiri dengan cepat.

* **Dampak Positif**: Membebaskan staf CS manusia dari tugas rutin yang membosankan, sehingga mereka dapat memfokuskan energi penuh pada penanganan keluhan teknis bernilai tinggi atau negosiasi penjualan yang kompleks.

### 3. Integrasi Sistem Backend & ERP Real-Time

Tidak seperti WhatsApp Business biasa, versi API resmi memungkinkan integrasi sistem yang mendalam dengan basis data internal bisnis Anda:
* **Cek Stok Otomatis**: Chatbot dapat memeriksa database ERP real-time untuk memberi tahu pelanggan apakah suatu barang siap dikirim.
* **Pelacakan Pengiriman**: Menghubungkan API logistik untuk langsung mengirimkan nomor resi kurir dan update status posisi barang ke WhatsApp pelanggan.
* **Sinkronisasi CRM**: Setiap percakapan dan data kontak baru langsung terekam ke sistem CRM internal untuk bahan kampanye pemasaran terarah di masa depan.

### 4. Satu Nomor Resmi Centang Hijau (Verified Business)

WhatsApp Business API resmi memfasilitasi bisnis Anda untuk mendapatkan verifikasi resmi berupa **Centang Hijau (Green Tick)** di samping nama bisnis Anda. Hal ini meningkatkan kredibilitas, kepercayaan pelanggan, serta melindungi reputasi brand Anda dari penipuan nomor palsu yang mengatasnamakan bisnis Anda.

* **Fitur Multi-Agent**: Satu nomor WhatsApp resmi centang hijau tersebut dapat diakses oleh puluhan atau ratusan agen customer service Anda secara bersamaan melalui dasbor terpusat, mempermudah koordinasi tim.

---

### Kesimpulan

Otomatisasi WhatsApp Business API bukan lagi sekadar tren teknologi, melainkan infrastruktur wajib bagi bisnis yang ingin scale-up secara profesional. GordaTech hadir membantu bisnis Anda mengintegrasikan API WhatsApp resmi dengan bot AI cerdas (seperti GordaAI Support Suite) untuk memangkas biaya customer support dan meningkatkan kepuasan pelanggan secara nyata. Dapatkan sesi demo gratis dan konsultasikan kebutuhan WhatsApp automation bisnis Anda bersama tim kami sekarang!`,
    category: "AI Automation",
    image_url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80",
    created_at: "2026-05-27T10:00:00Z",
    author: "AI Specialist GordaTech"
  }
};

function parseBoldText(text: string) {
  const parts = text.split("**");
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="font-extrabold text-[#42b2bf]">{part}</strong>;
    }
    return part;
  });
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const rendered: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let inList = false;

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      rendered.push(
        <ul key={`list-${key}`} className="list-disc pl-6 my-5 flex flex-col gap-2.5" style={{ color: "var(--text-white-val)" }}>
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inList) {
        flushList(i);
        inList = false;
      }
      continue;
    }

    if (line.startsWith("###")) {
      flushList(i);
      inList = false;
      const text = line.substring(3).trim();
      rendered.push(
        <h3 key={i} className="text-xl font-black mt-10 mb-4 border-l-[3px] border-[#42b2bf] pl-3.5 leading-snug" style={{ color: "var(--text-white-val)" }}>
          {parseBoldText(text)}
        </h3>
      );
    } else if (line.startsWith("---")) {
      flushList(i);
      inList = false;
      rendered.push(<hr key={i} className="my-8" style={{ borderColor: "var(--text-ghost-val)" }} />);
    } else if (line.startsWith("*") || line.startsWith("-")) {
      inList = true;
      const text = line.substring(1).trim();
      listItems.push(
        <li key={i} className="text-sm font-light leading-relaxed" style={{ color: "var(--text-white-val)" }}>
          {parseBoldText(text)}
        </li>
      );
    } else {
      flushList(i);
      inList = false;
      rendered.push(
        <p key={i} className="text-sm font-light leading-relaxed mb-5" style={{ color: "var(--text-white-val)" }}>
          {parseBoldText(line)}
        </p>
      );
    }
  }

  flushList(lines.length);

  return <div className="article-body font-sans">{rendered}</div>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/insights`);
    if (res.ok) {
      const json = await res.json();
      const list = json.data || [];
      if (list.length > 0) {
        return list.map((item: any) => ({ slug: item.slug }));
      }
    }
  } catch (error) {
    console.error("Error generating static params for insight:", error);
  }
  return Object.keys(DEFAULT_INSIGHTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let insight = await fetchInsightDetail(slug);
  if (!insight) {
    insight = DEFAULT_INSIGHTS[slug] || null;
  }
  return {
    title: insight ? insight.title : "Artikel Insight",
    description: insight ? insight.summary : "Baca artikel insight dan strategi bisnis digital terpercaya di Gordatech.",
  };
}

export default async function InsightDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let insight = await fetchInsightDetail(slug);
  if (!insight) {
    insight = DEFAULT_INSIGHTS[slug] || null;
  }

  if (!insight) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center" style={{ background: "var(--bg-dark)" }}>
        <div className="text-center max-w-md p-6 border rounded-3xl bg-white" style={{ borderColor: "var(--text-ghost-val)" }}>
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-extrabold mb-2" style={{ color: "var(--text-white-val)" }}>Artikel Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mb-6 font-light leading-relaxed">Maaf, artikel yang Anda cari tidak dapat ditemukan atau telah dihapus oleh administrator.</p>
          <Link
            href="/insight"
            className="inline-flex items-center gap-2 bg-[#42b2bf] hover:bg-[#323e7a] text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-[0_4px_12px_rgba(66,178,191,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Insight
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen py-20 relative" style={{ background: "var(--bg-dark)" }}>
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "15%", right: "-5%", width: "45%", height: "55%", background: "radial-gradient(ellipse, rgba(91,142,240,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(60,174,185,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/insight"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 transition-colors text-slate-500 hover:text-[#42b2bf]"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Insight
        </Link>

        {/* Article Header */}
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[rgba(66,178,191,0.08)] border border-[#42b2bf]/20 inline-block mb-4" style={{ color: "#42b2bf" }}>
            {insight.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6" style={{ color: "var(--text-white-val)" }}>
            {insight.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold border-y py-4 mb-8" style={{ color: "var(--text-muted-val)", borderColor: "var(--text-ghost-val)" }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#42b2bf]" />
              {formatDate(insight.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#323e7a]" />
              {insight.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#42b2bf]" />
              5 Menit Bacaan
            </span>
          </div>
        </div>

        {/* Feature Banner Image */}
        <div
          className="w-full h-[240px] sm:h-[400px] rounded-3xl bg-cover bg-center mb-10 border shadow-sm"
          style={{ backgroundImage: `url(${insight.image_url})`, borderColor: "var(--text-ghost-val)" }}
        />

        {/* Content Body */}
        <div className="bg-white border rounded-3xl p-6 sm:p-10 shadow-sm" style={{ borderColor: "var(--text-ghost-val)" }}>
          <MarkdownRenderer content={insight.content} />
        </div>

      </div>
    </div>
  );
}
