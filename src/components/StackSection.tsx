"use client";

import React from "react";
import { TECH_STACK, TechItem } from "@/data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";
import {
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  PythonLogo,
  FastAPILogo,
  ThreejsLogo,
  GeminiLogo,
  OpenAILogo,
  DockerLogo,
  PostgresLogo,
  GoogleCloudLogo,
  RedisLogo,
  WebAudioLogo,
  TailwindLogo,
  GitLogo,
  XGBoostLogo,
  MongoDBLogo,
  FirebaseLogo,
} from "./TechLogos";
import { Layers, Cpu } from "lucide-react";

const LOGO_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  react: ReactLogo,
  nextjs: NextjsLogo,
  typescript: TypeScriptLogo,
  python: PythonLogo,
  fastapi: FastAPILogo,
  threejs: ThreejsLogo,
  gemini: GeminiLogo,
  openai: OpenAILogo,
  docker: DockerLogo,
  postgres: PostgresLogo,
  gee: GoogleCloudLogo,
  redis: RedisLogo,
  webaudio: WebAudioLogo,
  tailwind: TailwindLogo,
  git: GitLogo,
  xgboost: XGBoostLogo,
  mongodb: MongoDBLogo,
  firebase: FirebaseLogo,
};

function StackCard({ tech }: { tech: TechItem }) {
  const LogoComponent = LOGO_COMPONENTS[tech.logoKey] || Layers;

  return (
    <div className="group relative flex items-center gap-4 rounded-[24px] border border-border/80 bg-secondary/35 px-5 py-4 min-w-[280px] sm:min-w-[320px] max-w-[340px] h-[92px] sm:h-[100px] backdrop-blur-md transition-all duration-300 hover:bg-secondary/70 hover:border-foreground/30 hover:scale-[1.02] shadow-xs cursor-default select-none shrink-0">
      {/* Big Crisp Official Vector Logo Container */}
      <span className="flex size-14 sm:size-15 shrink-0 items-center justify-center rounded-2xl bg-background border border-border/80 p-3 shadow-2xs group-hover:scale-105 group-hover:border-foreground/40 transition-all duration-300">
        <LogoComponent className="size-full" />
      </span>

      {/* Tech Details: Name & Category + Role */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-base sm:text-lg text-foreground tracking-tight truncate group-hover:text-primary transition-colors">
            {tech.name}
          </h4>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-background border border-border/60 text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-wider shrink-0">
            {tech.category}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground/80 truncate">
            {tech.proficiency}
          </span>
        </div>
      </div>
    </div>
  );
}

export function StackSection() {
  const mid = Math.ceil(TECH_STACK.length / 2);
  const row1 = TECH_STACK.slice(0, mid);
  const row2 = TECH_STACK.slice(mid);

  // Repeat for continuous seamless infinite marquee looping
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="stack" aria-labelledby="stack-title" className="overflow-x-clip px-6 md:px-10 py-16">
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
        <ScrollReveal className="px-4 pb-10 pt-20 md:px-10 lg:pt-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
                <Cpu className="size-3.5 text-blue-500" />
                <span>Verified Tooling &amp; SDKs</span>
              </div>
              <h2 id="stack-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                My Stack.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Official languages, distributed databases, cloud orchestration, and AI model SDKs used in daily engineering and production releases.
              </p>
            </div>

            {/* Info Pill */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-border/80 bg-secondary/35 text-xs font-mono text-muted-foreground backdrop-blur-sm">
                <span className="font-semibold text-foreground">{TECH_STACK.length} Technologies</span>
                <span>&middot;</span>
                <span>Hover to pause</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Dual Opposing Direction Infinite Marquee */}
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-2 pb-28 pt-4 sm:px-6">
        <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          {/* Top Row: Sliding Left */}
          <div className="flex gap-4 sm:gap-6 animate-marquee-left py-2">
            {marqueeRow1.map((tech, idx) => (
              <StackCard key={`row1-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>

          {/* Bottom Row: Sliding Right */}
          <div className="flex gap-4 sm:gap-6 animate-marquee-right py-2 mt-2">
            {marqueeRow2.map((tech, idx) => (
              <StackCard key={`row2-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
