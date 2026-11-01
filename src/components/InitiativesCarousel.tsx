"use client";

import React, { useState, useEffect } from "react";
import { INITIATIVES } from "@/data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";
import { Award, Briefcase, Sparkles, Building2, Terminal, Shield } from "lucide-react";

const ICONS = [Sparkles, Briefcase, Award, Terminal, Shield, Building2, Sparkles];

export function InitiativesCarousel() {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide carousel smoothly
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % INITIATIVES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section aria-label="Led impactful initiatives at" className="overflow-x-clip px-6 md:px-10">
      <div className="mx-auto w-full max-w-[1176px] border-x border-foreground/5 py-6">
        {/* Decorative Divider Line with Dot Caps */}
        <div aria-hidden="true" className="pointer-events-none relative h-px">
          <div className="absolute -inset-x-[129px] top-0 h-px bg-foreground/10" />
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
        </div>

        <ScrollReveal className="flex items-center justify-between py-5">
          <h2 className="text-base font-medium leading-none text-muted-foreground">
            Impactful initiatives &amp; organizations
          </h2>
          <span className="font-mono text-xs text-muted-foreground/60">
            Leadership &amp; Awards
          </span>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal
          delay={100}
          className="rounded-[24px] bg-secondary/25 p-4 sm:p-6 overflow-hidden border border-border/40"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIATIVES.slice(0, 4).map((item, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div
                  key={item.name}
                  className="group relative flex flex-col justify-between gap-6 rounded-[20px] border border-border/60 bg-background/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-foreground/20 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-foreground group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-mono font-medium text-foreground/80">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-base tracking-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mb-2">
                      {item.role} · {item.period}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary Row for More Initiatives */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {INITIATIVES.slice(4).map((item, idx) => {
              const Icon = ICONS[(idx + 4) % ICONS.length];
              return (
                <div
                  key={item.name}
                  className="group relative flex flex-col justify-between gap-5 rounded-[20px] border border-border/40 bg-background/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-md hover:border-foreground/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-4" />
                    </span>
                    <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      {item.role} · {item.period}
                    </p>
                    <p className="text-xs text-muted-foreground/90 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

