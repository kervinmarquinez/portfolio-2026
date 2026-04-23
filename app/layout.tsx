import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adriankervin.com"),
  title: {
    default: "Adrián Kervin — Desarrollo Web & Estrategia UX",
    template: "%s — Adrián Kervin",
  },
  description:
    "Portfolio de Adrián Kervin. Especialista en Desarrollo Web y Estrategia UX. Convierto ideas en productos web que la gente usa, disfruta y recomienda.",
  keywords: [
    "Adrián Kervin",
    "Desarrollo Web",
    "Estrategia UX",
    "Diseño Web",
    "Frontend",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Adrián Kervin", url: "https://adriankervin.com" }],
  creator: "Adrián Kervin",
  alternates: {
    canonical: "https://adriankervin.com",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://adriankervin.com",
    siteName: "Adrián Kervin",
    title: "Adrián Kervin — Desarrollo Web & Estrategia UX",
    description:
      "Portfolio de Adrián Kervin. Especialista en Desarrollo Web y Estrategia UX. Convierto ideas en productos web que la gente usa, disfruta y recomienda.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Adrián Kervin — Desarrollo Web & Estrategia UX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrián Kervin — Desarrollo Web & Estrategia UX",
    description:
      "Portfolio de Adrián Kervin. Especialista en Desarrollo Web y Estrategia UX.",
    images: ["/images/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${syne.variable}`}>
      <body className="cursor-none">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:font-sans focus:text-sm focus:rounded-full focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
