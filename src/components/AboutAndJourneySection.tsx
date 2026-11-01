"use client";

import React, { useState } from "react";
import { JOURNEY } from "@/data/portfolioData";
import { AskDakshSection } from "./AskDakshSection";
import { ScrollReveal } from "./ScrollReveal";
import {
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Sparkles,
  Building2,
  Briefcase,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export function AboutAndJourneySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip px-6 md:px-10 py-16">
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5">
        {/* Top Decorative Line with Dot Caps */}
        <div aria-hidden="true" className="pointer-events-none relative h-px">
          <div className="absolute -inset-x-0 sm:-inset-x-8 lg:-inset-x-[129px] top-0 h-px bg-foreground/10" />
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
        </div>

        <ScrollReveal className="flex flex-col gap-6 px-4 pb-12 pt-20 md:px-10 lg:pt-28">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
              <Sparkles className="size-3.5 text-foreground" />
              <span>Direct Channel &amp; Story</span>
            </div>
            <h2 id="about-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Get in touch.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Send a direct message to my personal inbox or explore my engineering background, university achievements, and milestones.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 flex flex-col gap-16 px-4 pb-24 pt-8 md:px-10">
        {/* Interactive Direct Message & AI Q&A Terminal */}
        <ScrollReveal delay={80}>
          <AskDakshSection />
        </ScrollReveal>

        {/* Bio Narrative */}
        <ScrollReveal delay={120} className="flex flex-col gap-5 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground w-fit">
            <Sparkles className="size-3.5 text-foreground" />
            <span>Bio &amp; Engineering Philosophy</span>
          </div>

          <div className="flex flex-col gap-4 text-foreground/90">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-foreground max-w-4xl tracking-tight">
              I build high-throughput AI pipelines, design real-time audio engines, and engineer resilient systems from first principles.
            </h3>
            <div className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
              <p>
                I&apos;m Daksh Srivastava, a full-stack engineer and Computer Science undergraduate at{" "}
                <strong className="text-foreground font-semibold">ITM Skills University</strong> (CGPA:{" "}
                <strong className="text-foreground font-semibold">9.57 / 10.0</strong>). My focus is on
                building software that bridges mathematical rigor and production user experiences: from
                low-latency Web Audio API spatial processing to planetary-scale satellite radar pipelines.
              </p>
              <p>
                As a <strong className="text-foreground font-semibold">Google Student Ambassador</strong>,
                I lead campus developer workshops covering Google Cloud, Workspace APIs, and Gemini models.
                I have shipped production software on the Microsoft Edge Store, won Hacktoberfest x MLH Hack Day,
                and ranked in the Top 3 across the national 100x Applied AI cohort.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Redesigned Academic & Professional Journey */}
        <div className="flex flex-col gap-8 pt-4">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground mb-3">
                <GraduationCap className="size-3.5 text-foreground" />
                <span>Track Record &amp; Milestones</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Academic &amp; Professional Journey.
              </h3>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              2025 &mdash; 2029 Overview
            </span>
          </ScrollReveal>

          {/* Stacking Timeline Milestone Cards */}
          <div className="space-y-4">
            {JOURNEY.map((item, index) => {
              const isHovered = hoveredIdx === index;
              const isCurrent = item.period.includes("Present");

              return (
                <ScrollReveal
                  key={`${item.role}-${index}`}
                  delay={index * 60}
                  className="transition-transform duration-300 ease-out"
                >
                  <div
                    onMouseEnter={() => setHoveredIdx(index)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`group relative flex flex-col justify-between gap-4 rounded-[24px] border p-6 sm:p-7 transition-all duration-300 ease-out cursor-default ${
                      isHovered
                        ? "bg-background border-foreground/30 -translate-y-1 shadow-xl"
                        : "bg-secondary/30 border-border/70 hover:bg-secondary/50"
                    }`}
                  >
                    {/* Top Row: Title, Organization, Period & Tag Badge */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {item.role}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                          <span className="text-foreground/90">{item.org}</span>
                          <span className="text-muted-foreground/40">&bull;</span>
                          <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                            <MapPin className="size-3 text-foreground/50 shrink-0" />
                            <span>{item.location}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Tag & Period */}
                      <div className="flex items-center gap-3 self-start lg:self-auto">
                        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                          <Calendar className="size-3.5 text-foreground/50 shrink-0" />
                          <span>{item.period}</span>
                        </div>

                        <span className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-mono font-medium text-foreground border border-border/80 shadow-2xs">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    {/* Summary Description */}
                    {item.summary && (
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1 max-w-3xl border-t border-border/40">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
