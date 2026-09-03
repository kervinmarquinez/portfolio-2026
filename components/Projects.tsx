"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Project = {
  slug: string;
  period: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
};

// Structural data (slug / image / crop) lives here; copy comes from messages.
const projectAssets = [
  {
    slug: "dailynookcoffee",
    image: "/images/daily-nook-coffee-proyecto.webp",
    imagePosition: "object-center",
  },
  {
    slug: "alfonsolopezabogado",
    image: "/images/alfonso-lopez-abogado-proyecto.webp",
    imagePosition: "object-top",
  },
];

function CornerBrackets({ children }: { children: React.ReactNode }) {
  const corner = "absolute w-3 h-3 border-ink/70";
  return (
    <div className="relative px-5 py-3 bg-paper/92 backdrop-blur-sm">
      <span className={`${corner} top-1.5 left-1.5 border-t border-l`} />
      <span className={`${corner} top-1.5 right-1.5 border-t border-r`} />
      <span className={`${corner} bottom-1.5 left-1.5 border-b border-l`} />
      <span className={`${corner} bottom-1.5 right-1.5 border-b border-r`} />
      {children}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const rawPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    rawPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPos({ ...rawPos.current }));
  }, []);

  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/${project.slug}`}
      aria-label={t("viewProjectAria", { title: project.title })}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 rounded-sm"
    >
      {/* Project index label */}
      <div className="flex items-center gap-4 mb-5 md:mb-6">
        <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">
          {project.period}
        </span>
        <div className="flex-1 h-px bg-ink/10" />
        <span className="font-sans text-[10px] tracking-[0.2em] text-muted tabular-nums">
          {number}
        </span>
      </div>

      {/* Image area */}
      <div
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden aspect-[16/9] md:aspect-[2.4/1] bg-ink cursor-none"
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className={`object-cover ${project.imagePosition} group-hover:scale-[1.02] transition-transform duration-700`}
          sizes="(max-width: 768px) 100vw, 1152px"
          priority={index === 0}
        />

        {/* Follower cursor label */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-10"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: hovered ? "opacity 0.2s ease" : "opacity 0.15s ease",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            className="-translate-x-1/2 -translate-y-1/2"
            style={{
              transition: "transform 0.08s linear",
            }}
          >
            <CornerBrackets>
              <span className="font-sans text-xs tracking-[0.18em] text-ink uppercase whitespace-nowrap">
                {t("viewProject")}
              </span>
            </CornerBrackets>
          </div>
        </div>

        {/* Bottom overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Project meta */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-8 items-start">
        <div>
          <h2 className="font-display font-semibold italic text-3xl md:text-4xl xl:text-5xl text-ink leading-[1.05] tracking-tight mb-3 group-hover:opacity-70 transition-opacity duration-300">
            {project.title}
          </h2>
          <p className="font-sans text-base text-ink/60 leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-end pt-8">
          <span
            aria-hidden="true"
            className="font-sans text-xs tracking-[0.2em] text-ink/30 uppercase group-hover:text-ink/70 group-hover:translate-x-1 transition-all duration-300"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Array<{
    title: string;
    period: string;
    description: string;
    imageAlt: string;
  }>;

  const projects: Project[] = projectAssets.map((asset, i) => ({
    ...asset,
    title: items[i].title,
    period: items[i].period,
    description: items[i].description,
    imageAlt: items[i].imageAlt,
  }));

  return (
    <section id="proyectos" aria-labelledby="proyectos-heading" className="relative py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 id="proyectos-heading" className="sr-only">{t("heading")}</h2>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] text-muted uppercase">
            {t("label")}
          </span>
          <div className="flex-1 h-px bg-ink/10" />
        </div>

        {/* Project list */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
