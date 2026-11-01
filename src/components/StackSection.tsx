"use client";

import React, { useState } from "react";
import { TECH_STACK } from "@/data/portfolioData";

export function StackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="stack" aria-labelledby="stack-title" className="overflow-x-clip px-6 md:px-10">
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

        <div className="px-4 pb-8 pt-20 md:px-10 lg:pt-28">
          <h2 id="stack-title" className="text-3xl font-medium leading-tight md:text-4xl text-foreground">
            My Stack
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            Production languages, frameworks, cloud infrastructure, and AI tools I use daily.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5 px-4 pb-28 pt-8 md:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TECH_STACK.map((tech) => {
            const isHovered = hoveredTech === tech.name;

            return (
              <div
                key={tech.name}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative flex flex-col justify-between gap-4 rounded-[20px] border p-4 transition-all duration-300 ease-out cursor-default ${
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
