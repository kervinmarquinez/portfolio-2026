import type { Metadata } from "next";
import CaseStudy from "./CaseStudy";

export const metadata: Metadata = {
  title: "Alfonso López Abogado — Adrián Kervin",
  description: "Caso de estudio: identidad digital y estrategia web para Alfonso López Abogado en la Costa del Sol.",
};

export default function Page() {
  return <CaseStudy />;
}
