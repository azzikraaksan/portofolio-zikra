import type { Metadata, Viewport } from "next";
import { Host_Grotesk, Instrument_Serif, JetBrains_Mono, Pacifico } from "next/font/google";
import { Intro } from "@/components/intro";
import { Motion } from "@/components/motion";
import "./globals.css";

const host = Host_Grotesk({ variable: "--font-host", subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });
const script = Pacifico({ variable: "--font-script", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Zikra", template: "%s · Zikra" },
  description:
    "Azzikra Ramadhanti Aksan, a full stack developer (React, TypeScript, Laravel, Go) in Yogyakarta who builds AlurKerja, a multi-tenant workflow platform for enterprises.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1919" },
  ],
};

// Intro tampil di setiap pemuatan penuh (termasuk refresh), kecuali bagi yang memilih kurangi gerak.
// Pindah halaman lewat tautan tidak memuat ulang layout, jadi tidak mengulang intro.
const boot =
  "var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t}catch(e){}try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-intro')}else{d.classList.add('has-intro')}}catch(e){d.classList.add('no-intro')}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${host.variable} ${serif.variable} ${mono.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="sr-only fixed top-4 left-4 z-50 rounded-full bg-(--ink) px-5 py-3 text-(--ground)">
          Skip to content
        </a>
        <Intro />
        {children}
        <Motion />
      </body>
    </html>
  );
}
