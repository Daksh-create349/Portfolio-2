"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/data/portfolioData";
import { GithubIcon } from "./Icons";
import {
  Volume2,
  Sliders,
  Waves,
  ShieldAlert,
  Radio,
  Filter,
  Globe,
  Cpu,
  GitBranch,
  ShieldCheck,
  Sparkles,
  FileCode,
  Bot,
  Mic,
  Network,
  Award,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

// Map icon strings to Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Volume2,
  Sliders,
  Waves,
  ShieldAlert,
  Radio,
  Filter,
  Globe,
  Cpu,
  GitBranch,
  ShieldCheck,
  Sparkles,
  FileCode,
  Bot,
  Mic,
  Network,
  Award,
};

const CATEGORIES = [
  "Show all",
  "Audio DSP",
  "Geospatial",
  "DevSecOps",
  "AI & Agentics",
] as const;

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("Show all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "Show all") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" aria-labelledby="works-title" className="overflow-x-clip px-6 md:px-10 py-12">
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5">
        {/* Top Decorative Line with Dot Caps */}
        <div aria-hidden="true" className="pointer-events-none relative h-px">
          <div className="absolute -inset-x-[129px] top-0 h-px bg-foreground/10" />
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col gap-6 px-4 pb-12 pt-20 md:px-10 lg:pt-28">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
              <span className="size-2 rounded-full bg-blue-500" />
              <span>Flagship Case Studies</span>
            </div>
            <h2 id="works-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Works.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Architected systems built for scale, precision, and production resilience—bridging raw algorithms, client-side DSP, and DevSecOps into polished products.
            </p>
          </div>

          <div role="group" aria-label="Filter works" className="flex flex-wrap gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isSelected}
                  className={`inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium outline-none transition-all cursor-pointer ${
                    isSelected
                      ? "bg-foreground text-background shadow-md dark:ring-1 dark:ring-white/20"
                      : "bg-background text-foreground/80 hover:bg-secondary border border-border/70 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="text-xs font-mono text-muted-foreground">
            Showing {filteredProjects.length} of {PROJECTS.length} flagship productions
          </p>
        </div>
      </div>

      {/* Flagship Project Articles */}
      <div className="flex flex-col gap-24">
        {filteredProjects.map((project) => (
          <article key={project.id} aria-labelledby={`showcase-${project.id}`}>
            {/* Project Header */}
            <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5">
              <div aria-hidden="true" className="pointer-events-none relative h-px">
                <div className="absolute -inset-x-[129px] top-0 h-px bg-foreground/10" />
                <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
                  <span className="size-1 rounded-full bg-foreground" />
                </span>
                <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
                  <span className="size-1 rounded-full bg-foreground" />
                </span>
              </div>

              <header className="px-4 pb-8 pt-16 md:px-10 lg:pt-24">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-mono font-medium text-foreground border border-border/60">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>{project.stats}</span>
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    Year {project.year}
                  </span>
                </div>

                <h3
                  id={`showcase-${project.id}`}
                  className="text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold tracking-tight max-w-4xl leading-tight"
                >
                  {project.title}
                </h3>
                <p className="text-lg sm:text-xl text-muted-foreground font-normal mt-3 max-w-3xl leading-relaxed">
                  {project.headline}
                </p>

                <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-4 font-mono">
                  {project.tags.map((tag) => (
                    <li key={tag} className="px-2.5 py-1 rounded-md bg-secondary/60 border border-border/40">
                      {tag}
                    </li>
                  ))}
                </ul>
              </header>
            </div>

            {/* Split Showcase Card & Info */}
            <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-4 py-6 md:px-8">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
                  {/* Left Column: Authentic Product Interface Preview */}
                  <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-secondary/40 border border-border/70 p-4 sm:p-6 shadow-sm transition-all hover:border-foreground/20 hover:shadow-xl">
                    {/* Modern App Window Frame */}
                    <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-rose-500/80" />
                        <span className="size-3 rounded-full bg-amber-500/80" />
                        <span className="size-3 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 text-xs font-mono text-muted-foreground truncate font-medium">
                          {project.title.split("—")[0]}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-background border border-border/40">
                        Production Release
                      </span>
                    </div>

                    {/* High-Resolution Product Screenshot */}
                    <div className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden border border-border/60 bg-neutral-950 shadow-inner">
                      <img
                        src={project.image}
                        alt={`${project.title} interface preview`}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    {/* Clean Bottom Product Summary Bar */}
                    <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40 text-xs font-mono text-muted-foreground">
                      <span className="text-foreground font-medium flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        {project.category}
                      </span>
                      <span>Verified Architecture</span>
                    </div>
                  </div>

                  {/* Right Column: Clean Narrative Card */}
                  <div className="flex flex-col justify-between gap-6 rounded-[24px] bg-secondary/30 border border-border/60 p-6 sm:p-8">
                    <div className="space-y-4">
                      <div className="rounded-[18px] bg-background border border-border/70 p-6 shadow-sm">
                        <p className="text-base sm:text-lg leading-relaxed text-foreground font-normal">
                          &ldquo;{project.description}&rdquo;
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Role &amp; Ownership
                          </span>
                          <p className="font-semibold text-foreground text-sm sm:text-base">{project.role}</p>
                        </div>

                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                            Key Impact &amp; Engineering
                          </span>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.impactText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions: Direct Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:opacity-90 shadow-sm"
                        >
                          <span>Explore {project.title.split("—")[0].trim()}</span>
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors shadow-sm"
                        >
                          <GithubIcon className="size-4" />
                          <span>View Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4 Architectural Highlight Pillar Cards */}
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4">
                  {project.architectureHighlights.map((hl) => {
                    const IconComponent = ICON_MAP[hl.iconName] || Sparkles;

                    return (
                      <li
                        key={hl.title}
                        className="group/card flex flex-col justify-between gap-6 rounded-[20px] border border-border/60 bg-secondary/30 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-background hover:border-foreground/20 hover:shadow-md cursor-default"
                      >
                        <div className="inline-flex size-10 items-center justify-center rounded-xl bg-background border border-border/70 text-foreground group-hover/card:scale-105 transition-transform duration-200">
                          <IconComponent className="size-5 text-foreground" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-base font-semibold tracking-tight text-foreground">
                            {hl.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {hl.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
