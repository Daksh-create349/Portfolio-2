"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolioData";
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
  Loader2,
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
    <section id="work" aria-labelledby="works-title" className="overflow-x-clip px-6 md:px-10">
      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5">
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
        <div className="flex flex-col gap-6 px-4 pb-10 pt-20 md:px-10 lg:pt-28">
          <h2 id="works-title" className="text-3xl font-medium leading-tight md:text-4xl text-foreground">
            Works.
          </h2>

          <div role="group" aria-label="Filter works" className="flex flex-wrap gap-2 md:gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isSelected}
                  className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium outline-none transition-all cursor-pointer ${
                    isSelected
                      ? "bg-foreground text-background shadow-md dark:ring-1 dark:ring-white/20"
                      : "bg-background text-foreground/80 hover:bg-secondary border border-border/60 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="text-xs font-mono text-muted-foreground">
            Showing {filteredProjects.length} of {PROJECTS.length} flagship projects
          </p>
        </div>
      </div>

      {/* Flagship Project Articles */}
      <div className="flex flex-col gap-20">
        {filteredProjects.map((project) => (
          <article key={project.id} aria-labelledby={`showcase-${project.id}`}>
            {/* Project Header */}
            <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5">
              <div aria-hidden="true" className="pointer-events-none relative h-px">
                <div className="absolute -inset-x-[129px] top-0 h-px bg-foreground/10" />
                <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
                  <span className="size-1 rounded-full bg-foreground" />
                </span>
                <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
                  <span className="size-1 rounded-full bg-foreground" />
                </span>
              </div>

              <header className="px-4 pb-8 pt-16 font-medium md:px-10 lg:pt-24">
                <h3
                  id={`showcase-${project.id}`}
                  className="text-2xl leading-snug md:text-3xl text-foreground font-semibold max-w-4xl tracking-tight"
                >
                  {project.title}. {project.headline}
                </h3>
                <ul className="flex flex-wrap gap-2 text-xs leading-loose text-muted-foreground mt-2 font-mono">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </header>
            </div>

            {/* Split Showcase Card & Info */}
            <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5 px-4 py-8 md:px-8">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                  {/* Left Column: Visual Mockup Container */}
                  <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[24px] bg-secondary/80 border border-border/50 p-6 lg:min-h-[520px]">
                    {/* Atmospheric Glow */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent" />

                    {/* Interactive Frame / Mockup Surface */}
                    <div className="relative rounded-[20px] bg-background/90 border border-border/80 p-4 shadow-inner overflow-hidden">
                      <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="size-3 rounded-full bg-rose-500/80" />
                          <span className="size-3 rounded-full bg-amber-500/80" />
                          <span className="size-3 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 text-xs font-mono text-muted-foreground truncate">
                            {project.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground uppercase">
                          {project.year}
                        </span>
                      </div>

                      {/* Mockup Dynamic Content */}
                      <div className="relative aspect-[16/10] w-full rounded-[14px] bg-neutral-950 p-4 flex flex-col justify-between overflow-hidden text-neutral-100 font-mono text-xs">
                        <div className="flex justify-between items-center text-[11px] text-neutral-400">
                          <span>SYSTEM: READY</span>
                          <span className="text-emerald-400">STATUS: VERIFIED</span>
                        </div>

                        {/* Visualizer Art for Project */}
                        <div className="flex flex-col items-center justify-center gap-3 my-auto">
                          <div className="flex items-center gap-1.5 h-12">
                            {Array.from({ length: 18 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 rounded-full bg-emerald-400/80 animate-pulse"
                                style={{
                                  height: `${20 + Math.sin(i * 0.7) * 20 + (i % 3) * 6}px`,
                                  animationDelay: `${i * 120}ms`,
                                  animationDuration: "1.4s",
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-neutral-300 tracking-wide text-center">
                            {project.category} Core Pipeline Processing
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-800 pt-2">
                          <span>ENGINE: DAKSH-SRIVASTAVA</span>
                          <span>LATENCY: ZERO-OVERHEAD</span>
                        </div>
                      </div>

                      {/* Prompt Bar Simulator */}
                      <div className="mt-4 flex gap-2 border-t border-border/40 pt-4">
                        <p className="flex h-10 min-w-0 flex-1 items-center rounded-xl bg-secondary/80 px-3.5 text-xs font-mono text-muted-foreground shadow-sm truncate">
                          <span>{project.promptExample}</span>
                        </p>
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/80 shadow-sm"
                        >
                          <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        </span>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="relative flex justify-between items-center text-xs font-mono text-foreground/80 pt-2">
                      <span className="font-semibold">{project.stats}</span>
                      <span>Year: {project.year}</span>
                    </div>
                  </div>

                  {/* Right Column: Narrative Card */}
                  <div className="flex flex-col justify-between gap-8 rounded-[24px] bg-secondary/50 border border-border/50 p-6 md:p-8">
                    <div className="rounded-[20px] bg-background border border-border/70 p-6 shadow-sm">
                      <p className="text-base sm:text-lg leading-relaxed text-foreground font-normal">
                        &ldquo;{project.description}&rdquo;
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 text-sm leading-relaxed">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground block mb-0.5">
                          Role:
                        </span>
                        <p className="font-medium text-foreground">{project.role}</p>
                      </div>

                      <div>
                        <span className="font-mono text-xs text-muted-foreground block mb-0.5">
                          Impact &amp; Architecture:
                        </span>
                        <p className="text-muted-foreground text-xs leading-normal">
                          {project.impactText}
                        </p>
                      </div>

                      {/* Explore Button */}
                      <div className="pt-2">
                        <a
                          href={project.demoUrl || project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center overflow-hidden bg-primary px-6 py-3 text-primary-foreground font-medium text-sm rounded-full shadow-md hover:scale-[1.02] transition-transform"
                        >
                          <span className="inline-flex items-center gap-2">
                            Explore {project.title.split("—")[0]}
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Architectural Highlight Pillar Cards */}
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
                  {project.architectureHighlights.map((hl) => {
                    const IconComponent = ICON_MAP[hl.iconName] || Sparkles;

                    return (
                      <li
                        key={hl.title}
                        className="group/card flex flex-col justify-between gap-12 rounded-[24px] border border-border/60 bg-secondary/40 p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-background hover:border-foreground/20 hover:shadow-lg cursor-default"
                      >
                        <div className="inline-flex size-11 items-center justify-center rounded-xl bg-background border border-border/70 text-foreground group-hover/card:scale-110 group-hover/card:-rotate-6 transition-transform duration-300">
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

