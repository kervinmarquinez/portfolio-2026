import type { Metadata } from "next";
import CaseStudy from "./CaseStudy";

export const metadata: Metadata = {
  title: "Alfonso López Abogado",
  description: "Caso de estudio: identidad digital y estrategia web para Alfonso López Abogado en la Costa del Sol.",
  alternates: {
    canonical: "https://adriankervin.com/alfonsolopezabogado",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://adriankervin.com/alfonsolopezabogado",
    title: "Alfonso López Abogado — Adrián Kervin",
    description: "Caso de estudio: identidad digital y estrategia web para Alfonso López Abogado en la Costa del Sol.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Alfonso López Abogado — Caso de estudio por Adrián Kervin",
      },
    ],
  },
};

export default function Page() {
  return <CaseStudy />;
}
