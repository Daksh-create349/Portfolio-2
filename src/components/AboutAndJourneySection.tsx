"use client";

import React from "react";
import { JOURNEY } from "@/data/portfolioData";
import { AskDakshSection } from "./AskDakshSection";
import { ScrollReveal } from "./ScrollReveal";
import { MapPin, Calendar, Award, GraduationCap, Laptop, Sparkles, Building2, Briefcase } from "lucide-react";

export function AboutAndJourneySection() {
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip px-6 md:px-10">
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

        <ScrollReveal className="px-4 pb-8 pt-20 md:px-10 lg:pt-28">
          <h2 id="about-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Ask me anything...
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl">
            Interact with my portfolio assistant or explore my engineering background, university achievements, and career milestones.
          </p>
        </ScrollReveal>
      </div>

      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 flex flex-col gap-14 px-4 pb-24 pt-8 md:px-10">
        {/* Interactive AI Chat Terminal */}
        <ScrollReveal delay={80}>
          <AskDakshSection />
        </ScrollReveal>

        {/* About Daksh Narrative */}
        <ScrollReveal delay={120} className="flex flex-col gap-5 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground w-fit">
            <Sparkles className="size-3.5 text-blue-500" />
            <span>Bio &amp; Engineering Philosophy</span>
          </div>

          <div className="flex flex-col gap-4 text-foreground/90">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-foreground max-w-4xl tracking-tight">
              I build high-throughput AI pipelines, design audio DSP chains, and engineer resilient systems from first principles.
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
                I have shipped production software on the Microsoft Edge Store, won 1st Place at Hacktoberfest x MLH Hack Day,
                and ranked in the Top 3 across the national 100x Applied AI cohort.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Journey & Timeline Table */}
        <ScrollReveal delay={160} className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Academic &amp; Professional Journey
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              2025 – 2029
            </span>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-secondary/25 p-3 sm:p-5 overflow-hidden">
            <ul className="divide-y divide-border/40">
              {JOURNEY.map((item, index) => (
                <li
                  key={`${item.role}-${index}`}
                  className="grid grid-cols-1 sm:grid-cols-[1.5fr_1.2fr_1fr_auto] items-center gap-2 p-4 rounded-xl hover:bg-background/80 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-foreground text-sm sm:text-base block">
                      {item.role}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.org}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <MapPin className="size-3.5 text-foreground/50 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <Calendar className="size-3.5 text-foreground/50 shrink-0" />
                    <span>{item.period}</span>
                  </div>

                  <div className="justify-self-start sm:justify-self-end mt-1 sm:mt-0">
                    <span className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-mono font-medium text-foreground border border-border/70 shadow-xs">
                      {item.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
