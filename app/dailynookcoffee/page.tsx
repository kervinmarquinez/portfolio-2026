import type { Metadata } from "next";
import CaseStudy from "./CaseStudy";

export const metadata: Metadata = {
  title: "Daily Nook Coffee",
  description:
    "Caso de estudio UX/UI: Daily Nook Coffee — The Nook Grounds, un resort para amantes del café de especialidad ambientado en haciendas colombianas entre cafetales. Proyecto final del Curso Especialista UX/UI en La Hauss.",
  alternates: {
    canonical: "https://adriankervin.com/dailynookcoffee",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://adriankervin.com/dailynookcoffee",
    title: "Daily Nook Coffee — Adrián Kervin",
    description:
      "Caso de estudio UX/UI: The Nook Grounds, un resort para amantes del café de especialidad entre cafetales colombianos. Investigación, diseño y prototipo en Figma.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Daily Nook Coffee — Caso de estudio UX/UI por Adrián Kervin",
      },
    ],
  },
};

export default function Page() {
  return <CaseStudy />;
}
