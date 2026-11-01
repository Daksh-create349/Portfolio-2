"use client";

import React, { useState } from "react";
import { GITHUB_PROJECTS, GithubProject } from "@/data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";
import { GithubIcon } from "./Icons";
import { GithubContributionGraph } from "./GithubContributionGraph";
import {
  Star,
  ExternalLink,
  GitFork,
  Check,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Code2,
} from "lucide-react";

const CATEGORIES = [
  "All Projects",
  "AI & MCP",
  "Data & Forensics",
  "Systems & DSP",
  "Security & Dev",
  "Web & Logistics",
] as const;

export function BentoWall() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");

  const filteredProjects = GITHUB_PROJECTS.filter((p) => {
    if (activeCategory === "All Projects") return true;
    return p.category === activeCategory;
  });

  // Top flagship repositories
  const topProjects = GITHUB_PROJECTS.slice(0, 2);
  const otherProjects = filteredProjects.filter(
    (p) => activeCategory !== "All Projects" || !topProjects.some((tp) => tp.id === p.id)
  );

  return (
    <section id="opensource" aria-labelledby="github-projects-title" className="overflow-x-clip px-6 md:px-10 py-16">
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

        {/* Section Header */}
        <ScrollReveal className="flex flex-col gap-6 px-4 pb-12 pt-16 md:px-10 lg:pt-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
                <GithubIcon className="size-3.5 text-foreground" />
                <span>Open Source Ecosystem</span>
              </div>
              <h2
                id="github-projects-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              >
                Popular Repositories.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Autonomous MCP engines, tabular forensic workstations, and low-latency DSP systems built and maintained in public by Daksh Srivastava.
              </p>
            </div>

            <a
              href="https://github.com/Daksh-create349"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-secondary/60 hover:bg-secondary px-5 py-3 text-sm font-medium text-foreground transition-all shadow-sm group w-fit"
            >
              <GithubIcon className="size-4" />
              <span>github.com/Daksh-create349</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Category Filter Pills */}
          <div role="group" aria-label="Filter repositories" className="flex flex-wrap gap-2 pt-4">
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
        </ScrollReveal>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-4 md:px-8 space-y-8">
        {/* Interactive GitHub Contribution Graph Station */}
        <ScrollReveal delay={60}>
          <GithubContributionGraph />
        </ScrollReveal>

        {/* When "All Projects" is selected, show Top 2 Spotlight Content Cards */}
        {activeCategory === "All Projects" && (
          <div className="grid grid-cols-1 gap-6">
            {topProjects.map((proj, pIdx) => (
              <ScrollReveal
                key={proj.id}
                delay={pIdx * 120}
                className="group relative overflow-hidden rounded-[28px] border border-border/70 bg-secondary/30 p-6 sm:p-8 lg:p-10 transition-all hover:border-foreground/20 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Repository Info */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold text-amber-500 border border-amber-500/20">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        <span>{proj.stars} Stars</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-mono text-foreground border border-border/60">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: proj.languageColor }}
                        />
                        <span>{proj.language}</span>
                      </span>

                      <span className="text-xs font-mono text-muted-foreground">
                        {proj.category}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        {proj.name}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {/* Key Technical Highlights */}
                    <div className="space-y-2.5 pt-1">
                      {proj.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground/10 text-foreground mt-0.5">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="pt-2">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] shadow-sm"
                      >
                        <GithubIcon className="size-4" />
                        <span>View Repository on GitHub</span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Deep Engineering Content Card (No images) */}
                  <div className="lg:col-span-5 flex flex-col justify-between rounded-[22px] bg-background border border-border/80 p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/50 pb-3">
                      <div className="flex items-center gap-2">
                        <Code2 className="size-4 text-primary" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          Repository Highlights
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {proj.repo}
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-secondary/40 border border-border/50 space-y-1">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">
                          Architectural Objective
                        </span>
                        <p className="text-foreground font-sans text-xs sm:text-sm font-medium leading-relaxed">
                          {proj.id === "contradiction-mcp"
                            ? "Provide a deterministic reconciliation layer ensuring multi-source LLM context contains zero contradicting statements."
                            : "Diagnose silent statistical failures, target leakage, and structural schema bugs in tabular training data."}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-secondary/40 border border-border/50 space-y-1">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">
                          Engineering Execution
                        </span>
                        <p className="text-foreground font-sans text-xs sm:text-sm font-medium leading-relaxed">
                          {proj.id === "contradiction-mcp"
                            ? "Strict Model Context Protocol (MCP) server implementation with JSON-RPC over stdio and HTTP SSE."
                            : "Local-first forensic suite leveraging Polars/Pandas heuristic matrices with zero external cloud dependencies."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-secondary border border-border/60 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>Public Open Source</span>
                      <span className="text-foreground font-medium inline-flex items-center gap-1">
                        <Star className="size-3 fill-amber-500 text-amber-500" />
                        <span>{proj.stars} Stars</span>
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Repositories Grid (Pure Content) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {otherProjects.map((proj, idx) => (
            <ScrollReveal
              key={proj.id}
              delay={idx * 60}
              className="group flex flex-col justify-between rounded-[24px] border border-border/70 bg-secondary/30 p-6 sm:p-8 transition-all hover:bg-secondary/50 hover:border-foreground/20 hover:shadow-lg h-full"
            >
              <div className="space-y-5">
                {/* Header Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-mono font-medium text-amber-500 border border-amber-500/20">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      <span>{proj.stars}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border/60">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: proj.languageColor }}
                      />
                      <span>{proj.language}</span>
                    </span>

                    <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                      {proj.category}
                    </span>
                  </div>

                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    aria-label={`View ${proj.name} on GitHub`}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 pt-2">
                  {proj.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                      <span className="size-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-background/80 border border-border/50 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tags & Repo Link */}
              <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  {proj.repo}
                </span>

                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
                >
                  <span>Code</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
