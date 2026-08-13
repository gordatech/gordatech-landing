import React from "react";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { fetchPortfolios } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Proyek",
  description: "Jelajahi portofolio studi kasus transformasi digital kami. Lihat bukti nyata hasil kerja kami untuk UMKM, startup, dan korporasi di Indonesia.",
};


interface Portfolio {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  challenge: string;
  work: string;
  result: string;
  metrics: Record<string, string> | null;
  client_name: string | null;
  is_featured: boolean;
}

const DEFAULT_PORTFOLIOS: Portfolio[] = [
  {
    id: 1,
    name: "Bengkel Minimalis Las Medan",
    slug: "bengkel-minimalis-las-medan",
    category: "Pertumbuhan Penjualan & Marketing",
    image_url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    challenge: "Bengkel Minimalis Las Medan menghadapi tantangan penetrasi pasar karena penjualan sepenuhnya bergantung pada pelanggan offline dan rekomendasi mulut ke mulut. Aktivitas pemasaran digital tidak terarah, media sosial tidak terkelola secara strategis, identitas visual brand tidak konsisten, serta tidak adanya kanal komunikasi digital yang andal untuk mengonversi ketertarikan menjadi pemesanan.",
    work: "GordaTech merancang solusi digital terpadu dengan merumuskan strategi pemasaran digital terarah. Kami mengadopsi pengelolaan media sosial yang agresif, mendesain ulang identitas visual brand (logo modern & konten kreatif), melakukan setup serta optimasi WhatsApp Business API, merancang kampanye iklan digital bertarget tinggi, serta mengintegrasikan alur promosi langsung ke sistem manajemen prospek.",
    result: "Transformasi digital ini sukses memposisikan bengkel sebagai pilihan utama dengan citra brand kelas premium yang tepercaya. Akun media sosial bertransformasi menjadi saluran promosi aktif 24/7, alur komunikasi dengan calon pembeli berjalan lebih cepat dan terstruktur, serta kampanye iklan digital menghasilkan prospek terukur yang secara signifikan melipatgandakan konversi penjualan bengkel.",
    metrics: {
      "Jangkauan Pasar": "10x Lipat",
      "Prospek Online": "+140%",
      "Closing Rate": "3.5x Lipat"
    },
    client_name: "Bengkel Minimalis Las",
    is_featured: true
  },
  {
    id: 2,
    name: "JJUPVC",
    slug: "jjupvc",
    category: "Pertumbuhan Penjualan & Marketing",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    challenge: "JJUPVC mengalami hambatan dalam mengonversi ketertarikan calon pembeli produk UPVC premium menjadi deal penjualan. Pemasaran digital tidak konsisten, branding visual belum memancarkan kualitas produk kelas atas, tim admin penjualan kesulitan merespons prospek secara efisien, serta banyak peluang closing terbuang karena tidak adanya alur komunikasi chat yang terstandarisasi.",
    work: "Kami mengimplementasikan strategi optimasi digital komprehensif: menyusun ulang strategi digital marketing, menyegarkan identitas visual (konten kreatif berkualitas tinggi), menata konfigurasi WhatsApp Business terintegrasi, memberikan pelatihan intensif teknik komunikasi closing bagi admin penjualan, merancang kampanye iklan digital bertarget, serta merumuskan standar alur penanganan prospek.",
    result: "Brand JJUPVC kini tampil dengan citra enterprise yang berwibawa dan tepercaya. Saluran media sosial aktif menghasilkan prospek berkualitas tinggi, admin penjualan mampu mengonversi obrolan menjadi kesepakatan secara taktis berkat panduan closing GordaTech, dan efektivitas iklan digital meningkat drastis dengan penurunan rasio pesan yang terabaikan.",
    metrics: {
      "Konversi Leads": "+185%",
      "Tingkat Closing": "4.2x Lipat",
      "Waktu Respon": "-60%"
    },
    client_name: "JJUPVC",
    is_featured: true
  },
  {
    id: 3,
    name: "LKP Metronics Medan",
    slug: "lkp-metronics-medan",
    category: "Pertumbuhan Penjualan & Marketing",
    image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    challenge: "Sebagai lembaga kursus siap kerja terkemuka, LKP Metronics menghadapi inkonsistensi jumlah pendaftar baru setiap periode ajaran. Visibilitas lembaga masih terbatas pada area geografis lokal tertentu, media sosial belum dimanfaatkan untuk membangun wibawa akademik, serta tidak adanya corong perolehan peserta (acquisition funnel) berbasis digital yang terukur.",
    work: "GordaTech membangun cetak biru pemasaran digital terpadu: merumuskan strategi penargetan audiens yang presisi, mendesain ulang media sosial sebagai platform edukasi & promosi interaktif, meluncurkan kampanye iklan digital bertarget tinggi untuk rekrutmen program siap kerja, merancang alur registrasi dari tanya-jawab hingga pendaftaran resmi, serta memperkuat pemosisian (positioning) LKP Metronics.",
    result: "Kampanye digital ini berhasil mendongkrak reputasi dan jangkauan geografis LKP Metronics hingga ke tingkat regional. Media sosial aktif mendatangkan prospek secara organik, proses pendaftaran peserta baru berjalan rapi dan otomatis, serta jumlah pendaftar program siap kerja mengalami peningkatan berkelanjutan secara signifikan di setiap angkatan.",
    metrics: {
      "Peserta Baru": "+150%",
      "Jangkauan Iklan": "50,000+",
      "Pendaftaran Online": "+210%"
    },
    client_name: "LKP Metronics",
    is_featured: true
  },
  {
    id: 4,
    name: "Midea Service Center (DSC Medan)",
    slug: "midea-service-center-dsc-medan",
    category: "IT Support & Maintenance",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    challenge: "Sebagai pusat perbaikan resmi Midea Medan yang melayani ratusan pelanggan per hari, stabilitas sistem adalah mutlak. Gangguan perangkat keras, kelambatan jaringan lokal, atau masalah sistem operasi (OS) langsung menghentikan proses administrasi penginputan klaim, menghambat koordinasi teknisi, dan merusak skor kepuasan pelanggan (CSAT) karena antrean yang memanjang.",
    work: "Kami menghadirkan solusi IT Managed Services komprehensif: melakukan pemeliharaan perangkat komputer dan laptop operasional secara berkala, melakukan audit & perbaikan total infrastruktur jaringan internal (LAN/Wi-Fi), memberikan dukungan teknis darurat on-site dan remote super cepat, serta menerapkan pemantauan proaktif untuk mengeliminasi kendala teknis sebelum memengaruhi layanan.",
    result: "Stabilitas operasional Midea Service Center kini terjamin pada level tertinggi dengan waktu downtime mendekati nol persen. Gangguan jaringan lokal berhasil ditangani secara instan, masa pakai perangkat kerja operasional meningkat, dan tim layanan administrasi dapat bekerja dengan produktivitas penuh tanpa interupsi teknis yang merugikan.",
    metrics: {
      "Sistem Uptime": "99.98%",
      "Kecepatan Respon": "<15 Menit",
      "Downtime": "-90%"
    },
    client_name: "Midea Medan",
    is_featured: true
  },
  {
    id: 5,
    name: "PT Alfa Best Sumatera",
    slug: "pt-alfa-best-sumatera",
    category: "IT Support & Maintenance",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    challenge: "PT Alfa Best Sumatera memiliki ketergantungan yang sangat tinggi pada infrastruktur IT dan jaringan kantor untuk mendukung aktivitas logistik sehari-hari. Tanpa adanya divisi IT internal khusus, perusahaan rentan terhadap masalah jaringan lambat, komputer operasional yang sering crash, infeksi malware, dan downtime jaringan yang dapat melumpuhkan produktivitas seluruh tim.",
    work: "GordaTech bertindak sebagai departemen IT eksternal tepercaya: melakukan pemeliharaan rutin seluruh unit PC, laptop, dan printer kantor, menangani troubleshooting hardware, software, dan kelambatan jaringan secara berkala, mengonfigurasi arsitektur jaringan yang aman, menyediakan tim support teknis on-site & remote, serta memasang sistem pencegahan gangguan.",
    result: "Seluruh infrastruktur komputasi PT Alfa Best Sumatera kini terpelihara dengan sangat rapi dan aman. Risiko kerusakan perangkat keras berkurang secara signifikan karena pencegahan dini, produktivitas kerja karyawan meningkat tajam berkat performa komputer yang cepat, dan operasional bisnis perusahaan berjalan lancar tanpa kendala IT yang mengganggu.",
    metrics: {
      "Stabilitas Jaringan": "99.95%",
      "Indeks Produktivitas": "+45%",
      "Resolusi Masalah": "<20 Menit"
    },
    client_name: "PT Alfa Best Sumatera",
    is_featured: true
  },
  {
    id: 6,
    name: "PT Wira Pradana Mukti",
    slug: "pt-wira-pradana-mukti",
    category: "IT Support & Maintenance",
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    challenge: "PT Wira Pradana Mukti menghadapi tantangan pengelolaan IT operasional yang tidak merata. Kerusakan sistem komputer dan gangguan koneksi internet sering kali menghambat alur kerja administrasi kantor, sementara ketiadaan staf IT internal yang siaga membuat penanganan masalah membutuhkan waktu berhari-hari, mengganggu efisiensi bisnis.",
    work: "Kami mengimplementasikan paket IT Support and Maintenance enterprise: melakukan pemeliharaan berkala sistem operasi dan perangkat keras, menangani troubleshooting sistem secara instan, melakukan instalasi dan pengaturan optimal perangkat IT baru, menguji keamanan jaringan secara periodik, serta menyediakan layanan siaga teknisi darurat.",
    result: "Layanan IT managed ini berhasil menjamin kelancaran operasional harian kantor tanpa hambatan teknis. Kerusakan sistem dapat dideteksi dan dicegah sejak dini, downtime bisnis berkurang drastis hingga nol persen, dan seluruh tim perusahaan dapat fokus pada pertumbuhan bisnis inti dengan dukungan infrastruktur IT yang sangat andal.",
    metrics: {
      "Uptime Operasional": "99.9%",
      "Pencegahan Kendala": "85%",
      "Downtime Bisnis": "0%"
    },
    client_name: "PT Wira Pradana Mukti",
    is_featured: true
  },
  {
    id: 7,
    name: "PT Alpine Resources Commodities",
    slug: "pt-alpine-resources-commodities",
    category: "Digital Platform & Sistem Bisnis",
    image_url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    challenge: "Sebagai perusahaan komoditas impor-ekspor, PT Alpine Resources menghadapi tantangan kompleksitas pelacakan inventaris gudang dan dokumentasi kepabeanan (bea cukai). Pencatatan logistik yang tidak terintegrasi menimbulkan risiko tinggi terjadinya selisih data stok fisik, keterlambatan laporan kepabeanan, serta kurangnya transparansi audit real-time.",
    work: "GordaTech membangun aplikasi sistem berbasis web kustom (Custom Web App). Sistem ini mendigitalisasi total alur keluar-masuk barang secara real-time, mengintegrasikan dokumen ekspor-impor dan administrasi bea cukai ke dalam satu platform terpusat yang aman, serta menyusun dashboard pelaporan otomatis yang transparan bagi manajemen.",
    result: "Aplikasi web ini menghadirkan transparansi penuh dan akurasi 100% pada catatan inventaris logistik perusahaan. Risiko selisih stok berhasil dieliminasi, pengurusan dokumen bea cukai berjalan jauh lebih cepat karena data yang rapi, dan jajaran manajemen memiliki visibilitas real-time yang akurat untuk mendukung pengambilan keputusan strategis.",
    metrics: {
      "Akurasi Inventaris": "100%",
      "Kecepatan Audit": "5x Lebih Cepat",
      "Visibilitas Stok": "Real-Time"
    },
    client_name: "PT Alpine Resources",
    is_featured: true
  },
  {
    id: 8,
    name: "CV Ronald Motor",
    slug: "cv-ronald-motor",
    category: "Digital Platform & Sistem Bisnis",
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    challenge: "CV Ronald Motor mengelola bisnis penjualan, pembelian, serta layanan pegadaian sepeda motor yang dinamis. Pembukuan manual yang terpisah-pisah menimbulkan penumpukan kertas kerja, risiko salah catat saldo piutang gadai, kesulitan rekapitulasi profit bulanan, serta ketidakmampuan memantau arus kas kasir harian secara instan.",
    work: "Kami merancang dan mengembangkan aplikasi Point of Sales (POS) berbasis web kustom yang terintegrasi. Aplikasi ini mendigitalisasi total proses pencatatan transaksi jual-beli motor, menyusun modul kalkulator bunga dan jatuh tempo gadai otomatis, memusatkan pendataan inventaris motor secara real-time, serta membangun fitur laporan otomatis.",
    result: "Implementasi POS kustom ini merevolusi efisiensi CV Ronald Motor. Seluruh transaksi terekam secara sistematis dengan akurasi keuangan 100%. Laporan laba rugi dan pembukuan bulanan dapat diakses secara instan, serta manajemen memiliki kontrol penuh atas perputaran arus kas dan jaminan gadai secara transparan.",
    metrics: {
      "Akurasi Keuangan": "100%",
      "Waktu Rekapitulasi": "Instan",
      "Kontrol Arus Kas": "Real-Time"
    },
    client_name: "CV Ronald Motor",
    is_featured: true
  },
  {
    id: 9,
    name: "CV IBAS",
    slug: "cv-ibas",
    category: "Digital Platform & Sistem Bisnis",
    image_url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    challenge: "CV IBAS mengoperasikan perdagangan dengan volume transaksi harian yang padat. Kendala utama mereka adalah pengelolaan stok ribuan barang yang masih manual, tidak adanya standarisasi pembuatan invoice penjualan, rekapitulasi omzet yang memakan waktu berjam-jam, serta sering terjadi selisih stok fisik saat stok opname bulanan.",
    work: "GordaTech mengembangkan aplikasi kasir POS berbasis web super reaktif: mengintegrasikan database produk terpusat, merancang sistem pencatatan transaksi penjualan instan dengan barcode, membangun modul invoice otomatis, mendesain generator laporan penjualan berkala, serta melakukan kustomisasi agar sesuai dengan proses bisnis CV IBAS.",
    result: "Aplikasi POS reaktif ini mempercepat waktu checkout pelanggan hingga 70% and mengeliminasi kesalahan input kasir secara total. Seluruh data barang tersinkronisasi otomatis saat transaksi terjadi, invoice tercetak secara profesional, dan laporan omzet harian kini tersedia secara instan untuk mempercepat pembukuan bisnis.",
    metrics: {
      "Kecepatan Checkout": "+70%",
      "Kesalahan Input": "0%",
      "Akurasi Stok": "100%"
    },
    client_name: "CV IBAS",
    is_featured: true
  },
  {
    id: 10,
    name: "CV Tiga Saudara Teknik",
    slug: "cv-tiga-saudara-teknik",
    category: "Digital Platform & Sistem Bisnis",
    image_url: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=800&q=80",
    challenge: "Sebagai pemasok sparepart SPBU berskala besar, CV Tiga Saudara Teknik menghadapi kompleksitas tinggi dalam mengendalikan persediaan suku cadang presisi. Pencatatan manual memicu risiko selisih stok fisik yang fatal, pembuatan invoice tagihan proyek lambat, serta proses monitoring performa penjualan mingguan memakan banyak waktu.",
    work: "Kami mendesain dan meluncurkan aplikasi POS & Inventory berbasis web khusus: membangun modul manajemen inventaris sparepart SPBU, mengintegrasikan alur pembuatan invoice penawaran dan tagihan instan, mendesain dasbor analisis penjualan berkala (mingguan/bulanan), serta menyesuaikan antarmuka sesuai alur operasional gudang.",
    result: "Pengendalian persediaan sparepart kini berjalan dengan akurasi 100% dan transparan. Transaksi penjualan tercatat rapi, pencetakan invoice berlangsung instan dan profesional, serta tim manajemen dapat mengulas laporan kinerja penjualan bulanan secara otomatis guna mempercepat restocking suku cadang terlaris.",
    metrics: {
      "Akurasi Persediaan": "100%",
      "Waktu Pembukuan": "-85%",
      "Pemantauan Bisnis": "24/7 Live"
    },
    client_name: "CV Tiga Saudara Teknik",
    is_featured: true
  },
  {
    id: 11,
    name: "Balai Harta Peninggalan (BHP) Medan",
    slug: "balai-harta-peninggalan-bhp-medan",
    category: "Strategi Bisnis & System Planning",
    image_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    challenge: "BHP Medan (kementerian Hukum dan HAM) mengelola Uang Pihak Ketiga (UPK) dalam volume masif. Namun, alur pelayanan kerja belum terstandardisasi secara baku, proses bisnis belum terdokumentasi formal sesuai regulasi terbaru, serta tidak adanya blueprint arsitektur sistem digital yang solid untuk dikembangkan menjadi aplikasi nasional.",
    work: "GordaTech bertindak sebagai konsultan analis proses bisnis: melakukan audit mendalam proses layanan UPK, menyusun dokumen Standar Operasional Prosedur (SOP) formal terstruktur, memetakan diagram alur kerja (workflow) yang patuh regulasi, merancang mockup antarmuka sistem UPK (UX/UI Blueprint), serta menyusun dokumentasi teknis.",
    result: "Cetak biru proses bisnis dan SOP UPK BHP Medan kini telah terstandardisasi secara formal dan diakui secara nasional. Mockup sistem yang kami rancang berhasil menjadi acuan baku (blueprint) bagi tim pengembang di BHP Pusat untuk merilis sistem aplikasi pengelolaan UPK yang terintegrasi di seluruh Indonesia.",
    metrics: {
      "Standardisasi SOP": "100% Sukses",
      "Cetak Biru Mockup": "Ready",
      "Kesiapan Sistem": "Lengkap"
    },
    client_name: "BHP Medan Kemenkumham",
    is_featured: true
  }
];

export default async function PortfolioPage() {
  const portfolios = await fetchPortfolios();
  const displayPortfolios = portfolios.length > 0 ? portfolios : DEFAULT_PORTFOLIOS;

  return (
    <div className="min-h-screen py-20" style={{ background: "var(--bg-dark)" }}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "8%", right: "-5%", width: "45%", height: "55%", background: "radial-gradient(ellipse, rgba(91,142,240,0.07) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(60,174,185,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4" style={{ color: "#42b2bf" }}>
            Portofolio & Studi Kasus
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight" style={{ color: "var(--text-white-val)" }}>
            Dampak Nyata yang{" "}
            <span style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Sudah Kami Buktikan.
            </span>
          </h1>
          <p className="text-base font-light max-w-2xl leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
            Eksplorasi proyek-proyek GordaTech yang menghadirkan dampak finansial nyata, efisiensi operasional, dan otomasi kecerdasan buatan untuk berbagai skala bisnis.
          </p>
        </div>

        <PortfolioGrid initialPortfolios={displayPortfolios} />
      </div>
    </div>
  );
}
