"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, PhoneCall, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  "tentang": "GordaTech adalah agensi digital marketing & teknologi terpercaya di Sumatera Utara. Kami berspesialisasi dalam Web Development (Next.js/React/Laravel), AI & WhatsApp Automation, Pemasaran Digital, serta IT Managed Services. Misi kami adalah menghadirkan solusi teknologi kustom yang secara langsung meningkatkan pendapatan bisnis Anda.",
  "sewa": "Sangat mudah! Anda bisa mengklik tombol 'Hubungi Kami' di menu navigasi, mengisi formulir di halaman Kontak, atau melakukan simulasi anggaran di Kalkulator Anggaran halaman Layanan. Kami juga menawarkan opsi Sewa Cloud (SaaS) bulanan yang sangat terjangkau maupun opsi Beli Lisensi penuh.",
  "layanan": "Layanan utama kami meliputi:\n1. **Digital Product & Platform**: Pembuatan Website, E-commerce, & Aplikasi Mobile.\n2. **AI Automation**: Integrasi WhatsApp API resmi centang hijau & AI Chatbot.\n3. **Marketing & Growth**: Pengelolaan Meta Ads, Google Ads, & optimasi SEO.\n4. **IT Managed Services**: Pemeliharaan sistem, audit jaringan, & cloud server AWS/GCP.",
  "harga": "Investasi proyek kami sangat transparan: Paket Sewa Cloud (SaaS) bulanan mulai dari Rp 1.5 Juta/bulan, dan Paket Beli Lisensi kustom mulai dari Rp 3 Juta. Detail lengkap serta simulasi biaya dapat Anda lakukan di Kalkulator Anggaran pada halaman Layanan kami!",
};

const AI_KNOWLEDGE_BASE = [
  {
    category: "greeting",
    keywords: ["halo", "hai", "pagi", "siang", "sore", "malam", "assalamualaikum", "permisi", "hey"],
    responses: [
      "Halo! 👋 Selamat datang di GordaTech. Saya GordaAI, asisten virtual pintar Anda. Ada yang bisa saya bantu hari ini mengenai pembuatan website, strategi pemasaran digital, atau otomatisasi AI untuk bisnis Anda?",
      "Halo! Senang bertemu dengan Anda. Saya GordaAI. Saya siap membantu menjawab pertanyaan Anda seputar teknologi, web development, digital ads, IT support, dan solusi automasi bisnis dari GordaTech. Apa yang ingin Anda diskusikan?"
    ]
  },
  {
    category: "identity",
    keywords: ["siapa kamu", "siapa anda", "nama kamu", "gordaai", "gorda ai", "fungsi kamu", "bisa apa"],
    responses: [
      "Saya adalah GordaAI, asisten kecerdasan buatan (virtual assistant) dari GordaTech. Tugas saya adalah membantu Anda memahami berbagai solusi digital, memberikan informasi teknis seputar produk kami, membantu simulasi kalkulator anggaran, serta memberikan saran dasar seputar digital marketing dan sistem IT bisnis."
    ]
  },
  {
    category: "web_dev",
    keywords: ["website", "web", "app", "aplikasi", "next.js", "nextjs", "laravel", "react", "tailwind", "android", "ios", "flutter", "mobile", "frontend", "backend", "headless", "coding", "programmer", "developer", "pos", "e-commerce", "toko online"],
    responses: [
      "Di GordaTech, kami memiliki spesialisasi tinggi dalam membangun platform website dan aplikasi mobile kustom berkelas enterprise:\n\n1. **Web Development**: Kami merekomendasikan **Next.js** (front-end headless) digabung dengan **Laravel** atau **Node.js** (back-end API) untuk menghasilkan performa web super cepat (LCP < 0.5 detik) dan SEO-friendly.\n2. **Mobile Apps**: Kami mengembangkan aplikasi Android & iOS menggunakan Flutter atau React Native yang stabil dan adaptif.\n3. **Sistem Kustom**: Kami berpengalaman membuat POS kasir, e-commerce, hingga ERP pergudangan.\n\nSemua kode sumber (source code) adalah 100% milik Anda secara penuh, dan kami memberikan jaminan bebas bug."
    ]
  },
  {
    category: "ai_automation",
    keywords: ["ai", "otomatisasi", "automation", "chatbot", "bot", "openai", "chatgpt", "nlp", "whatsapp business", "api resmi", "centang hijau", "green tick", "webhook", "integration", "integrasi"],
    responses: [
      "Otomatisasi bisnis adalah spesialisasi unggulan kami. Kami mengintegrasikan **WhatsApp Business API resmi** dengan kecerdasan buatan (AI chatbot) untuk mengotomatisasi CS bisnis Anda 24/7 tanpa burnout.\n\nChatbot AI kami mampu menyaring 80% pertanyaan berulang secara otomatis, mendeteksi niat (intent) pelanggan secara natural, menyajikan katalog interaktif, hingga menyinkronkan data langsung ke CRM internal Anda secara real-time. Ini memotong beban operasional hingga 60%!"
    ]
  },
  {
    category: "marketing_seo",
    keywords: ["marketing", "pemasaran", "iklan", "ads", "facebook", "instagram", "meta", "google ads", "seo", "gbp", "google maps", "growth", "penjualan", "leads", "konversi", "promosi", "sosmed", "social media"],
    responses: [
      "Pemasaran digital terukur adalah kunci pertumbuhan omzet yang konsisten. GordaTech mengelola kampanye pemasaran digital ujung-ke-ujung:\n\n1. **Performance Advertising**: Kami mengelola iklan Meta Ads & Google Ads bertarget tinggi dengan fokus ketat pada optimasi ROI.\n2. **SEO & GBP**: Kami melakukan optimasi SEO komprehensif pada website serta Google Business Profile agar bisnis Anda muncul di halaman pertama Google Maps dan pencarian organik.\n3. **Lead Management**: Kami merancang corong penjualan (sales funnel) otomatis agar setiap leads yang masuk dari iklan langsung dikonversi secara cepat."
    ]
  },
  {
    category: "it_support",
    keywords: ["it support", "maintenance", "jaringan", "wifi", "lan", "router", "troubleshooting", "malware", "virus", "server", "cloud", "aws", "gcp", "security", "keamanan", "cyber security", "firewall", "downtime", "pemeliharaan", "komputer", "laptop", "printer"],
    responses: [
      "GordaTech juga bertindak sebagai departemen IT eksternal Anda melalui layanan **IT Managed Services**:\n\n- **Troubleshooting & Maintenance**: Pemeliharaan berkala PC, laptop, server, dan printer kantor.\n- **Network Audit**: Instalasi, optimasi, dan pengamanan jaringan LAN/Wi-Fi kantor untuk kelancaran operasional harian.\n- **Cloud & Cyber Security**: Pemantauan uptime cloud (AWS/GCP), setup firewall, proteksi malware, dan backup otomatis untuk menjamin downtime sistem mendekati nol persen."
    ]
  },
  {
    category: "pricing",
    keywords: ["harga", "biaya", "murah", "mahal", "anggaran", "rupiah", "rp", "price", "paket", "tarif", "langganan", "investasi"],
    responses: [
      "Biaya investasi teknologi di GordaTech sangat transparan dan fleksibel:\n\n- **Paket Sewa Cloud (SaaS)**: Mulai dari **Rp 1.5 Juta/bulan** (termasuk hosting, cloud server enterprise, maintenance, support, dan update fitur gratis).\n- **Paket Beli Lisensi (Kustom)**: Mulai dari **Rp 3 Juta** hingga **Rp 12 Juta** (sekali bayar, source code 100% milik Anda, tanpa biaya tahunan tersembunyi).\n\nAnda dapat mensimulasikan kebutuhan fitur dan anggaran secara interaktif menggunakan *Kalkulator Anggaran* di Halaman Layanan kami!"
    ]
  },
  {
    category: "cooperation",
    keywords: ["kerjasama", "skema", "cara kerja", "sewa", "beli", "kontrak", "bagi hasil", "profit sharing", "kemitraan"],
    responses: [
      "Kami menawarkan 3 skema kerjasama yang transparan dan dapat disesuaikan dengan skala bisnis Anda:\n\n1. **Pemasaran/Dukungan Bulanan (Sewa Cloud/SaaS)**: Pembayaran bulanan terjangkau untuk sistem siap pakai dan pemeliharaan penuh.\n2. **Proyek One-Time (Beli Lisensi)**: Pengembangan website/aplikasi kustom sesuai blueprint bisnis Anda dengan serah terima source code penuh.\n3. **Skema Bagi Hasil (Profit Sharing)**: Skema bebas risiko di mana kami mengelola sistem dan pemasaran digital Anda, dan kompensasi didasarkan pada persentase penjualan produk yang berhasil direalisasikan secara online."
    ]
  },
  {
    category: "portfolio",
    keywords: ["portofolio", "studi kasus", "klien", "contoh", "proyek", "yang pernah dibuat", "pengalaman", "bukti"],
    responses: [
      "Kami telah meluncurkan 50+ proyek sukses untuk UMKM hingga korporasi:\n\n- **JJUPVC & Las Medan**: Optimalisasi kampanye digital Meta Ads yang melipatgandakan closing rate hingga 3.5x lipat.\n- **LKP Metronics**: Corong perolehan peserta baru secara online yang mendongkrak pendaftaran kursus sebesar 150%.\n- **Midea Service Center Medan**: Dukungan IT Managed Services dengan jaminan stabilitas sistem dan network uptime 99.98%.\n- **CV IBAS & CV Ronald Motor**: Pengembangan sistem POS kasir dan gadai berbasis web kustom yang terintegrasi secara real-time."
    ]
  },
  {
    category: "contact_location",
    keywords: ["alamat", "lokasi", "helvetia", "medan", "deli serdang", "kantor", "peta", "maps", "kontak", "nomor", "email", "telepon", "wa", "whatsapp", "gordatech@gmail.com"],
    responses: [
      "Kantor fisik GordaTech beralamat di:\n📍 *Jl. Veteran Ps. 7 No.19, Helvetia, Kec. Labuhan Deli, Kabupaten Deli Serdang, Sumatera Utara 20241*.\n\nAnda dapat menghubungi kami melalui:\n- 📞 Telepon/WhatsApp: **+62 818-880-497**\n- ✉️ Email resmi: **gordatech@gmail.com**\n\nUntuk berdiskusi langsung secara tatap muka, silakan jadwalkan janji temu terlebih dahulu dengan tim kami!"
    ]
  },
  {
    category: "guarantee",
    keywords: ["garansi", "bug", "error", "aman", "security", "ownership", "vendor lock-in", "maintenance", "support"],
    responses: [
      "Di GordaTech, keamanan dan kepemilikan aset klien adalah prioritas nomor satu. Kami menjamin:\n- **Garansi Bebas Bug**: Kami memperbaiki kendala teknis atau error sistem tanpa biaya tambahan selama masa kerjasama.\n- **Kepemilikan Penuh**: Pada skema Beli Lisensi, seluruh source code, database, dan akun cloud adalah milik Anda 100% (bebas vendor lock-in).\n- **Uptime SLA 99.9%**: Cloud infrastructure kami di AWS/GCP dimonitor secara proaktif untuk mencegah server down."
    ]
  }
];

function getAIResponse(userText: string): string {
  const normalized = userText.toLowerCase().trim();
  
  // 1. Check if user is asking about specific keywords from our knowledge base
  let matchedResponses: string[] = [];
  
  for (const item of AI_KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => normalized.includes(kw))) {
      const randomResponse = item.responses[Math.floor(Math.random() * item.responses.length)];
      matchedResponses.push(randomResponse);
    }
  }

  // 2. If matched, construct a combined response
  if (matchedResponses.length > 0) {
    return matchedResponses.join("\n\n---\n\n");
  }

  // 3. Fallback AI Consulting Responses based on sub-intents
  if (normalized.includes("jual") || normalized.includes("dagang") || normalized.includes("laris") || normalized.includes("sepi") || normalized.includes("omzet") || normalized.includes("laku")) {
    return "Meningkatkan penjualan atau omzet di era sekarang memerlukan pendekatan 'Omnichannel'. Pertama, Anda harus memiliki landing page yang cepat dan persuasif. Kedua, lakukan penargetan iklan berbayar (seperti Meta Ads) ke target audiens yang spesifik. Ketiga, otomatisasi tindak lanjut pesan pelanggan agar tidak ada yang terabaikan. Apakah bisnis Anda saat ini sudah menggunakan website penjualan atau masih berjualan secara manual?";
  }
  
  if (normalized.includes("bikin") || normalized.includes("buat") || normalized.includes("belajar") || normalized.includes("buat apa") || normalized.includes("teknologi") || normalized.includes("paling cepat")) {
    return "Untuk membangun platform digital modern, pemilihan teknologi sangat krusial. Next.js saat ini diakui secara global sebagai standar terbaik karena kecepatannya merender halaman secara statis (Static Site Generation), yang sangat disukai algoritma Google untuk optimasi SEO. Di sisi backend, Laravel atau Node.js menawarkan skalabilitas tinggi. Bagaimana rencana pengembangan aplikasi bisnis Anda?";
  }

  if (normalized.includes("terima kasih") || normalized.includes("thanks") || normalized.includes("oke") || normalized.includes("ok") || normalized.includes("siap") || normalized.includes("nuhun") || normalized.includes("makasih")) {
    return "Sama-sama! Senang bisa membantu memberikan wawasan untuk Anda. Jika ada hal lain seputar solusi digital, pembuatan web, iklan online, atau IT support yang ingin Anda tanyakan, silakan beri tahu saya. Saya selalu di sini siap membantu.";
  }

  // 4. Ultimate Fallback (General smart AI consulting response)
  return "Pertanyaan yang sangat menarik! Sebagai asisten AI GordaTech, saya menyarankan untuk merumuskan arsitektur sistem dan strategi pemasaran digital yang matang sebelum mulai mendevelop. \n\nApakah Anda ingin mengetahui lebih lanjut mengenai:\n- Estimasi biaya & waktu pengerjaan?\n- Keunggulan teknologi Next.js untuk SEO?\n- Cara kerja otomatisasi chatbot AI WhatsApp resmi?\n- Atau ingin melihat contoh studi kasus portofolio kami?\n\nSilakan tuliskan topik yang menarik minat Anda!";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show button on scroll
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

  useEffect(() => {
    // First message from bot
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Halo! 👋 Saya GordaAI, asisten virtual GordaTech. Saya siap menjawab pertanyaan Anda mengenai pembuatan website, otomatisasi AI, digital marketing, atau estimasi harga proyek.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom on new messages
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // 2. Trigger typing animation and response
    setIsTyping(true);
    setTimeout(() => {
      const botText = getAIResponse(text);

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: botText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSelectFAQ = (key: string, label: string) => {
    // 1. Send user message with option text
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: label,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Trigger bot response
    setIsTyping(true);
    setTimeout(() => {
      const response = FAQ_RESPONSES[key] || "Maaf, silakan tanyakan pertanyaan lain.";
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* 1. Floating Toggle Button with Greeting Bubble */}
      <div
        className={`fixed bottom-6 right-6 z-[95] flex flex-col items-end gap-3 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        {/* Greeting Bubble — shown on all screens including mobile */}
        <div
          className={`relative transition-all duration-300 origin-bottom-right ${
            showBubble && !dismissed
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-2 pointer-events-none"
          }`}
        >
          <div
            className="rounded-2xl py-3 px-4 shadow-xl text-left"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(66, 178, 191, 0.3)",
              boxShadow: "0 8px 28px rgba(66, 178, 191, 0.15)",
              maxWidth: "200px",
              backdropFilter: "blur(12px)",
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); setDismissed(true); }}
              className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold cursor-pointer hover:opacity-60"
              style={{ background: "rgba(28, 34, 61, 0.06)", color: "var(--text-white-val)" }}
            >
              ✕
            </button>
            <p className="text-xs font-bold mb-0.5 pr-4 flex items-center gap-1.5" style={{ color: "var(--text-white-val)" }}>
              GordaAI 👋
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted-val)" }}>
              Ada yang bisa saya bantu? Tanya GordaAI sekarang!
            </p>
            {/* Tail */}
            <div
              className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRight: "1px solid rgba(66, 178, 191, 0.3)",
                borderBottom: "1px solid rgba(66, 178, 191, 0.3)",
              }}
            />
          </div>
        </div>

        {/* Main Button */}
        <button
          onClick={() => { setIsOpen(true); setShowBubble(false); }}
          title="Tanya GordaAI"
          className="flex items-center justify-center sm:justify-start gap-2.5 rounded-full cursor-pointer select-none transition-all duration-300 hover:scale-105 w-11 h-11 sm:w-auto sm:h-auto p-0 sm:py-2.5 sm:px-4 sm:pl-3 text-white border"
          style={{
            background: "linear-gradient(135deg, #42b2bf, #323e7a)",
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: "0 6px 24px rgba(66, 178, 191, 0.35)",
          }}
        >
          {/* Sparkle icon + pulse ping */}
          <div className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
            <Sparkles className="w-4.5 h-4.5 text-white z-10" />
          </div>

          {/* Text labels — only shown sm+ */}
          <div className="hidden sm:flex flex-col leading-none text-left pr-1">
            <span className="text-[9px] font-semibold text-white/75 uppercase tracking-wider">TANYA AI</span>
            <span className="text-[12px] font-black text-white">GordaAI Chat</span>
          </div>
        </button>
      </div>

      {/* 2. Chat Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-[100] w-full sm:w-[400px] shadow-2xl flex flex-col transition-transform duration-500 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--bg-navy-card)",
          borderLeft: "1px solid var(--text-ghost-val)",
        }}
      >
        {/* Header */}
        <div
          className="p-5 flex items-center justify-between border-b"
          style={{
            borderColor: "var(--text-ghost-val)",
            background: "rgba(28, 34, 61, 0.02)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)" }}>
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm flex items-center gap-1.5" style={{ color: "var(--text-white-val)" }}>
                GordaAI Support
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </h3>
              <p className="text-[10px] font-medium" style={{ color: "var(--text-muted-val)" }}>Demo Asisten Otomatisasi AI</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors"
            style={{ borderColor: "var(--text-ghost-val)", color: "var(--text-white-val)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-4">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isBot ? "self-start" : "self-end flex-row-reverse"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                    isBot ? "bg-[#42b2bf]" : "bg-[#323e7a]"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className="rounded-2xl p-4 text-xs leading-relaxed font-light"
                  style={{
                    background: isBot ? "var(--bg-deepest)" : "rgba(66, 178, 191, 0.08)",
                    border: `1px solid ${isBot ? "var(--text-ghost-val)" : "rgba(66, 178, 191, 0.2)"}`,
                    color: "var(--text-white-val)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 self-start items-center max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-[#42b2bf] text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 text-xs flex items-center gap-1.5"
                style={{ background: "var(--bg-deepest)", border: "1px solid var(--text-ghost-val)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Options Block */}
        <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: "var(--text-ghost-val)", background: "rgba(28, 34, 61, 0.02)" }}>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1">Pertanyaan Umum (FAQ)</span>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "tentang", label: "Tentang GordaTech" },
              { key: "layanan", label: "Layanan Teknologi" },
              { key: "harga", label: "Harga Pembuatan Web" },
              { key: "sewa", label: "Cara Sewa / Kerja Sama" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleSelectFAQ(opt.key, opt.label)}
                className="px-3.5 py-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer hover:bg-[#42b2bf]/5 hover:border-[#42b2bf]/40"
                style={{ borderColor: "var(--text-ghost-val)", color: "#42b2bf" }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="p-5 border-t flex items-center gap-2"
          style={{ borderColor: "var(--text-ghost-val)", background: "var(--bg-dark)" }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis pesan Anda..."
            className="flex-grow border px-4 py-3 rounded-xl text-xs outline-none transition-colors"
            style={{
              background: "var(--bg-deepest)",
              borderColor: "var(--text-ghost-val)",
              color: "var(--text-white-val)",
            }}
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #42b2bf, #323e7a)", color: "#fff" }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Call human CTA footer */}
        <div
          className="p-3 border-t text-center text-[10px] flex items-center justify-center gap-1.5"
          style={{ borderColor: "var(--text-ghost-val)", background: "rgba(37,211,102,0.06)" }}
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
          <span style={{ color: "var(--text-muted-val)" }}>Butuh respons langsung manusia?</span>
          <a
            href={`https://wa.me/62818880497?text=${encodeURIComponent(
              "Halo GordaTech! 👋\n\nSaya sedang mengobrol dengan GordaAI di website dan ingin berdiskusi lebih lanjut dengan tim Customer Service (manusia) mengenai solusi digital untuk bisnis saya. 💬\n\nBisa tolong bantu saya? Terima kasih!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#25D366] hover:underline"
          >
            Hubungi CS WhatsApp
          </a>
        </div>

      </div>
    </>
  );
}
