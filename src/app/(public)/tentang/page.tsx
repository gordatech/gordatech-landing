import React from "react";
import Link from "next/link";
import { fetchLandingPage, fetchCooperationSchemes } from "@/lib/api";
import { Award, Target, Eye, HeartHandshake, Cpu, ShieldCheck, TrendingUp, Users, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import CooperationSchemes from "@/components/CooperationSchemes";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Ketahui lebih dalam mengenai visi, misi, dan nilai-nilai GordaTech sebagai mitra tepercaya akselerasi transformasi digital bisnis Anda.",
};


const PRINCIPLES = [
  { icon: Award, title: "Keandalan Kelas Enterprise", desc: "Setiap baris kode, infrastruktur cloud, dan sistem keamanan kami dirancang dengan standar tinggi untuk memastikan uptime maksimal dan performa platform yang andal." },
  { icon: TrendingUp, title: "Inovasi Berbasis Hasil (ROI)", desc: "Teknologi terbaik harus menghasilkan nilai bisnis riil. Solusi kami ditargetkan secara langsung untuk meningkatkan konversi penjualan dan efisiensi operasional bisnis Anda." },
  { icon: HeartHandshake, title: "Lisensi Penuh & Bebas Lock-in", desc: "Melalui skema Beli Lisensi, Anda memegang hak kepemilikan 100% source code, aset desain, dan database tanpa biaya tahunan tersembunyi (No Vendor Lock-in)." },
  { icon: Users, title: "Kemitraan Jangka Panjang", desc: "Kami bukan sekadar vendor teknologi biasa. Kami mendampingi Anda pascapeluncuran untuk menjamin roadmap digitalisasi dan promosi berjalan secara berkesinambungan." },
  { icon: Cpu, title: "Fleksibilitas Investasi (Sewa & Beli)", desc: "Kami meruntuhkan batas digitalisasi UKM dengan menyediakan opsi Sewa Cloud (SaaS) bulanan yang sangat terjangkau hingga opsi Beli Lisensi penuh untuk bisnis mandiri." },
  { icon: ShieldCheck, title: "Skema Kerjasama Transparan", desc: "Menghadirkan 3 pilihan model kerjasama yang terstruktur: Pemasaran Bulanan, Proyek One-Time kustom, dan Skema Bagi Hasil (Profit Sharing) zero-risk." },
];

const STATS = [
  { v: "50+", l: "Proyek Berhasil Diluncurkan" },
  { v: "99.9%", l: "Uptime Rata-rata Sistem" },
  { v: "5+", l: "Tahun di Industri" },
  { v: "4.9★", l: "Rating Kepuasan Klien" },
];

export default async function AboutPage() {
  const settings = await fetchLandingPage();
  const schemesData = await fetchCooperationSchemes();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      {/* Ambient glows — CSS only, no event handlers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "5%", right: "-5%", width: "45%", height: "55%", background: "radial-gradient(ellipse, rgba(91,142,240,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(60,174,185,0.06) 0%, transparent 65%)", filter: "blur(70px)" }} />
      </div>

      {/* ── Hero ── */}
      <div className="py-24 relative" style={{ borderBottom: "1px solid var(--text-ghost-val)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-5" style={{ color: "#42b2bf" }}>Tentang GordaTech</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 max-w-3xl leading-tight" style={{ color: "var(--text-white-val)" }}>
            Kami Bukan Sekadar{" "}
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Agensi Teknologi.
            </span>
          </h1>
          <p className="text-lg font-light leading-relaxed max-w-2xl" style={{ color: "var(--text-muted-val)" }}>
            GordaTech lahir dari hasrat mendalam untuk menjembatani kesenjangan antara potensi bisnis Indonesia dan kekuatan teknologi global. Kami hadir sebagai katalis transformasi digital yang nyata — bukan hanya membangun produk, tetapi membangun masa depan bisnis Anda.
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="py-16 relative" style={{ borderBottom: "1px solid var(--text-ghost-val)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-black mb-2" style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.v}</p>
              <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--text-muted-val)" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Vision & Mission ── */}
      <div className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white border" style={{ borderColor: "var(--text-ghost-val)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}>
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "#42b2bf" }}>Visi Kami</p>
                <h3 className="text-lg font-extrabold" style={{ color: "var(--text-white-val)" }}>Arah Masa Depan</h3>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
              {settings.about_vision || "Menjadi agensi digital terdepan di Sumatera dan Indonesia yang diakui atas inovasi tanpa henti, keandalan sistem yang terbukti, serta dampak pertumbuhan bisnis yang terukur and nyata bagi setiap klien kami."}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border" style={{ borderColor: "var(--text-ghost-val)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}>
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "#323e7a" }}>Misi Kami</p>
                <h3 className="text-lg font-extrabold" style={{ color: "var(--text-white-val)" }}>Komitmen Nyata</h3>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
              {settings.about_mission || "Menghadirkan solusi teknologi kustom yang tidak hanya estetis, tetapi secara langsung meningkatkan pendapatan, memangkas biaya operasional, dan memperkuat daya saing bisnis klien kami di era digital yang terus berevolusi."}
            </p>
          </div>
        </div>
      </div>

      {/* ── Cooperation Schemes Section ── */}
      <CooperationSchemes initialData={schemesData} />

      {/* ── Why Choose Us — CSS hover only, no JS events ── */}
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>Keunggulan Kami</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: "var(--text-white-val)" }}>
              Mengapa{" "}
              <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Memilih GordaTech?
              </span>
            </h2>
            <p className="text-base font-light max-w-xl mx-auto" style={{ color: "var(--text-muted-val)" }}>
              {settings.about_why_us || "Karena kami memahami bahwa investasi teknologi harus menghasilkan nilai bisnis yang nyata — bukan sekadar produk digital yang indah tetapi tidak berdampak."}
            </p>
          </div>

          <style>{`
            .principle-card {
              background: var(--bg-navy-card);
              border: 1px solid var(--text-ghost-val);
              border-radius: 16px;
              padding: 28px;
              transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
            }
            .principle-card:hover {
              background: rgba(66, 178, 191, 0.02);
              border-color: rgba(66, 178, 191, 0.3);
              transform: translateY(-4px);
              box-shadow: 0 12px 30px rgba(28, 34, 61, 0.06);
            }
            .principle-icon {
              width: 44px; height: 44px; border-radius: 12px;
              display: flex; align-items: center; justify-content: center;
              background: linear-gradient(135deg, rgba(66, 178, 191, 0.08), rgba(50, 62, 122, 0.08));
              border: 1px solid rgba(66, 178, 191, 0.15);
              color: #42b2bf; margin-bottom: 20px;
              transition: transform 0.3s;
            }
            .principle-card:hover .principle-icon { transform: scale(1.08); }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRINCIPLES.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="principle-card">
                  <div className="principle-icon">
                    <Icon style={{ width: 20, height: 20 }} />
                  </div>
                  <h4 className="text-base font-extrabold mb-2" style={{ color: "var(--text-white-val)" }}>{p.title}</h4>
                  <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted-val)" }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom Contact & Location CTA ── */}
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border"
            style={{ borderColor: "rgba(66, 178, 191, 0.15)" }}
          >
            {/* Left: Contact info */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-2" style={{ color: "#42b2bf" }}>Kantor GordaTech</p>
                <h3 className="text-2xl font-black mb-1" style={{ color: "var(--text-white-val)" }}>Temukan Kami di Sini</h3>
                <p className="text-sm font-light" style={{ color: "var(--text-muted-val)" }}>Kunjungi kantor kami atau hubungi langsung via WhatsApp.</p>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#42b2bf" }} />
                  <div>
                    <p style={{ color: "var(--text-muted-val)" }}>Jl. Veteran Ps. 7 No.19, Helvetia, Kec. Labuhan Deli, Kabupaten Deli Serdang, Sumatera Utara 20241</p>
                    <a
                      href="https://www.google.com/maps/place/Gorda+Tech/@3.6465808,98.6575312,16.5z/data=!4m6!3m5!1s0x30312d005339863b:0xe17f6240c0a664d3!8m2!3d3.6469548!4d98.6572848!16s%2Fg%2F11ld864f0l"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold mt-1.5"
                      style={{ color: "#42b2bf" }}
                    >
                      Buka di Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#42b2bf" }} />
                  <span style={{ color: "var(--text-muted-val)" }}>+62 818-880-497</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#42b2bf" }} />
                  <a href="mailto:gordatech@gmail.com" style={{ color: "var(--text-muted-val)" }}>gordatech@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Right: CTA buttons */}
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/62818880497?text=Halo%20GordaTech!%20%F0%9F%91%8B%20Saya%20ingin%20konsultasi%20gratis%20mengenai%20solusi%20digital%20untuk%20bisnis%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.25)" }}
              >
                {/* WA Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Konsultasi Gratis via WhatsApp
              </a>
              <Link
                href="/kontak"
                className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(28, 34, 61, 0.03)", border: "1px solid var(--text-ghost-val)", color: "var(--text-white-val)" }}
              >
                Isi Formulir Konsultasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
