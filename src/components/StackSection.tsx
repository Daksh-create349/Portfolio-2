"use client";

import React, { useState } from "react";
import { TECH_STACK } from "@/data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";
import { Layers } from "lucide-react";

export function StackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="stack" aria-labelledby="stack-title" className="overflow-x-clip px-6 md:px-10">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground w-fit mb-3">
            <Layers className="size-3.5 text-blue-500" />
            <span>Technologies &amp; Tools</span>
          </div>
          <h2 id="stack-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            My Stack.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl">
            Production languages, frameworks, distributed databases, cloud infrastructure, and AI SDKs used in daily engineering.
          </p>
        </ScrollReveal>
      </div>

      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-4 pb-28 pt-8 md:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TECH_STACK.map((tech, idx) => {
            const isHovered = hoveredTech === tech.name;

            return (
              <ScrollReveal key={tech.name} delay={idx * 35}>
                <div
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={`group relative flex flex-col justify-between gap-4 rounded-[20px] border p-4 transition-all duration-300 ease-out cursor-default h-full ${
                    isHovered
                      ? "bg-background border-foreground/30 -translate-y-1.5 shadow-lg"
                      : "bg-secondary/30 border-border/60 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                      {tech.icon}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/80 px-2 py-0.5 rounded-full bg-background border border-border/40">
                      {tech.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground tracking-tight">
                      {tech.name}
                    </h4>
                    <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                      Production Verified
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
