"use client";

import React, { useState } from "react";
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
import { Layers, CheckCircle2, Cpu } from "lucide-react";

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

const STACK_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "AI / LLM",
  "Database",
  "DevOps",
] as const;

export function StackSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredStack = TECH_STACK.filter((tech) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Frontend")
      return tech.category === "Frontend" || tech.category === "Framework" || tech.category === "Styling";
    if (activeCategory === "Backend")
      return tech.category === "Backend" || tech.category === "Language" || tech.category === "Audio DSP";
    if (activeCategory === "AI / LLM")
      return tech.category === "AI / LLM" || tech.category === "Machine Learning";
    if (activeCategory === "Database")
      return tech.category === "Database" || tech.category === "Distributed";
    if (activeCategory === "DevOps")
      return tech.category === "DevOps" || tech.category === "DevSecOps" || tech.category === "Geospatial" || tech.category === "Cloud Services";
    return true;
  });

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

            {/* Filter Pills */}
            <div role="group" aria-label="Filter technologies" className="flex flex-wrap gap-2">
              {STACK_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium outline-none transition-all cursor-pointer ${
                      isSelected
                        ? "bg-foreground text-background shadow-xs font-semibold"
                        : "bg-background text-foreground/80 hover:bg-secondary border border-border/70 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Grid of Verified Tech with Real Vector Logos */}
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-4 pb-28 pt-8 md:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredStack.map((tech, idx) => {
            const LogoComponent = LOGO_COMPONENTS[tech.logoKey] || Layers;
            const isHovered = hoveredTech === tech.name;

            return (
              <ScrollReveal key={tech.name} delay={idx * 30}>
                <div
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={`group relative flex flex-col justify-between gap-5 rounded-[22px] border p-5 transition-all duration-300 ease-out cursor-default h-full ${
                    isHovered
                      ? "bg-background border-foreground/30 -translate-y-2 shadow-xl"
                      : "bg-secondary/30 border-border/60 hover:bg-secondary/50"
                  }`}
                >
                  {/* Top Bar: Official Vector Logo & Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-background border border-border/70 p-1.5 shadow-2xs group-hover:scale-110 transition-transform duration-300">
                      <LogoComponent className="size-full" />
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded-full bg-background border border-border/40">
                      {tech.category}
                    </span>
                  </div>

                  {/* Bottom: Name & Proficiency Tag */}
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-foreground/60" />
                      <span>{tech.proficiency}</span>
                    </div>
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
