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
  title: "Adrián Kervin — Desarrollo Web & Estrategia UX",
  description:
    "Portfolio de Adrián Kervin. Especialista en Desarrollo Web y Estrategia UX.",
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
