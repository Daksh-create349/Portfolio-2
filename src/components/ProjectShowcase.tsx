"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";
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
  Terminal,
  Activity,
  Layers,
  Zap,
} from "lucide-react";

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
  "Audio Systems",
  "Geospatial",
  "DevSecOps",
  "AI & Agentics",
] as const;

// Deep technical specs for each flagship project (pure content)
const TECHNICAL_SPECS: Record<
  string,
  { label: string; value: string; badge?: string }[]
> = {
  sonaura: [
    { label: "Audio Pipeline", value: "Web Audio API Intercept Node Graph" },
    { label: "Spatial Acoustics", value: "HRTF 5.1 Matrix (Haas-effect binaural delays)" },
    { label: "Equalizer Architecture", value: "10-Band Parametric with real-time FFT" },
    { label: "Transient Dynamics", value: "-1 dB Brickwall Limiter (20:1 ratio ceiling)" },
    { label: "Client Latency", value: "< 1.8ms overhead, zero external drivers", badge: "Ultra Low" },
    { label: "Store Release", value: "Officially launched on Microsoft Edge Store", badge: "Production" },
  ],
  aquila: [
    { label: "Telemetry Ingestion", value: "Doppler Radar (dBZ) + Sentinel-2 SAR backscatter" },
    { label: "Topographic Correction", value: "COPERNICUS DEM + HAND drainage topography" },
    { label: "Predictive Window", value: "XGBoost 5-day distributed precipitation forecaster" },
    { label: "Digital Twin Engine", value: "WebGL Cesium 3D with 8 dynamic GeoJSON layers" },
    { label: "Target Hackathon", value: "Smart India Hackathon 2026 (PS 26071 — MoES/IMD)", badge: "SIH 2026" },
    { label: "Rendering Rate", value: "60 FPS rendering under heavy GIS vector load", badge: "WebGL" },
  ],
  guardian: [
    { label: "DAG Traversal Engine", value: "Full commit tree traversal across active & orphan commits" },
    { label: "Scoring Model", value: "Non-linear contextual vulnerability weighting" },
    { label: "Noise Reduction", value: "70% false-positive suppression vs naive grep scanners", badge: "-70% Noise" },
    { label: "File AST Parsing", value: "TypeScript, Python, and Jupyter Notebooks (.ipynb)" },
    { label: "Security Gates", value: "One-click pre-commit hooks & desktop terminal wizard" },
    { label: "Platform Stack", value: "FastAPI, React 19, Celery, Redis, Docker", badge: "Full-Stack" },
  ],
  hypermind: [
    { label: "Multimodal Foundation", value: "Google Gemini 2.5 Flash / Pro" },
    { label: "Speech Engine", value: "Gemini Live bidirectional WebSocket streaming" },
    { label: "Dynamic Compilation", value: "Generative UI rendering ReactFlow concept mindmaps" },
    { label: "Pedagogical Modes", value: "Socratic devil's advocate debate & dynamic MCQs" },
    { label: "Real-time Telemetry", value: "Concept mastery tracking with Recharts analytics", badge: "Adaptive" },
    { label: "Deployment", value: "Production live at hypermind-official.vercel.app", badge: "Live" },
  ],
};

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("Show all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "Show all") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" aria-labelledby="works-title" className="overflow-x-clip px-6 md:px-10 py-16">
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
        <ScrollReveal className="flex flex-col gap-6 px-4 pb-12 pt-20 md:px-10 lg:pt-28">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
              <Zap className="size-3.5 text-blue-500" />
              <span>Flagship Case Studies</span>
            </div>
            <h2 id="works-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Works.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Architected systems built for scale, mathematical precision, and production resilience—bridging raw algorithms, client-side architecture, and DevSecOps into polished products.
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
        </ScrollReveal>
      </div>

      {/* Flagship Project Articles */}
      <div className="flex flex-col gap-28">
        {filteredProjects.map((project, projectIdx) => {
          const specs = TECHNICAL_SPECS[project.id] || [];

          return (
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

                <ScrollReveal className="px-4 pb-8 pt-16 md:px-10 lg:pt-24">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-mono font-medium text-foreground border border-border/60">
                      <CheckCircle2 className="size-3.5 text-foreground/70" />
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
                      <li key={tag} className="px-3 py-1 rounded-md bg-secondary/60 border border-border/40">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>

              {/* Pure Content Showcase: Technical Specifications & Narrative */}
              <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-4 py-6 md:px-8">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                    {/* Left Column: Deep Technical Specifications & System Architecture */}
                    <ScrollReveal
                      delay={100}
                      className="flex flex-col justify-between rounded-[26px] bg-secondary/35 border border-border/70 p-6 sm:p-8 shadow-sm transition-all hover:border-foreground/20"
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-border/60 pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-foreground/10 text-foreground">
                              <Terminal className="size-4" />
                            </span>
                            <span className="text-sm font-semibold tracking-tight text-foreground uppercase tracking-wider font-mono">
                              System Specifications
                            </span>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            {project.category}
                          </span>
                        </div>

                        {/* Specs Table */}
                        <div className="space-y-3 font-mono text-xs">
                          {specs.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 p-3 rounded-xl bg-background/80 border border-border/50 hover:border-border transition-colors"
                            >
                              <span className="text-muted-foreground text-[11px] uppercase tracking-wider">
                                {item.label}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-foreground font-medium text-xs sm:text-[13px] text-right font-sans">
                                  {item.value}
                                </span>
                                {item.badge && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-foreground border border-border/60 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Footnote */}
                      <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
                        <span>Architecture Verified</span>
                        <span>Lead Author: Daksh Srivastava</span>
                      </div>
                    </ScrollReveal>

                    {/* Right Column: Case Study Narrative & Production Ownership */}
                    <ScrollReveal
                      delay={200}
                      className="flex flex-col justify-between gap-6 rounded-[26px] bg-secondary/25 border border-border/60 p-6 sm:p-8"
                    >
                      <div className="space-y-5">
                        <div className="rounded-[20px] bg-background border border-border/70 p-6 shadow-sm">
                          <p className="text-base sm:text-lg leading-relaxed text-foreground font-normal">
                            &ldquo;{project.description}&rdquo;
                          </p>
                        </div>

                        <div className="space-y-4 pt-1">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                              Role &amp; Leadership
                            </span>
                            <p className="font-semibold text-foreground text-sm sm:text-base">
                              {project.role}
                            </p>
                          </div>

                          <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                              Engineering Impact &amp; Results
                            </span>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {project.impactText}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50">
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
                            <span>View Source</span>
                          </a>
                        )}
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* 4 Architectural Highlight Pillar Cards */}
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4">
                    {project.architectureHighlights.map((hl, hlIdx) => {
                      const IconComponent = ICON_MAP[hl.iconName] || Sparkles;

                      return (
                        <li key={hl.title}>
                          <ScrollReveal
                            delay={hlIdx * 80}
                            className="group/card flex flex-col justify-between gap-6 rounded-[22px] border border-border/60 bg-secondary/30 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-background hover:border-foreground/20 hover:shadow-md cursor-default h-full"
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
                          </ScrollReveal>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
