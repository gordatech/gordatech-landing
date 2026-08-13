import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/widgets/ScrollToTop";
import AIChatbot from "@/components/widgets/AIChatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gordatech - Your Trusted Digital Partner",
    template: "%s | Gordatech - Your Trusted Digital Partner",
  },
  description: "GordaTech adalah agensi digital marketing dan teknologi terpercaya di Sumatera Utara. Spesialis web development, SEO, iklan digital, otomatisasi AI, dan IT managed services untuk UMKM, startup, dan korporasi.",
  keywords: [
    "agensi digital marketing", "web development Medan", "digital marketing Sumatera Utara",
    "pembuatan website profesional", "SEO Indonesia", "otomatisasi AI bisnis",
    "GordaTech", "IT managed services", "chatbot WhatsApp bisnis",
    "digital agency Medan", "transformasi digital UMKM", "e-commerce development"
  ],
  authors: [{ name: "GordaTech", url: "https://gordatech.com" }],
  creator: "GordaTech",
  publisher: "GordaTech",
  metadataBase: new URL("https://gordatech.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://gordatech.com",
    siteName: "GordaTech",
    title: "Gordatech - Your Trusted Digital Partner",
    description: "Solusi digital lengkap: web development, digital marketing, AI automation, dan IT managed services untuk akselerasi bisnis Anda.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GordaTech — Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gordatech - Your Trusted Digital Partner",
    description: "Solusi digital lengkap untuk bisnis Anda: web, marketing, AI, IT.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add Google Search Console verification code here
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`} style={{ colorScheme: 'dark' }}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <AIChatbot />
      </body>
    </html>
  );
}
