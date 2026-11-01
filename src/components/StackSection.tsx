"use client";

import React, { useState, useEffect, useRef } from "react";
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

interface MarqueeStripProps {
  items: TechItem[];
  direction?: "left" | "right";
}

function MarqueeStrip({ items, direction = "left" }: MarqueeStripProps) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(direction === "left" ? 1.05 : -1.05);
  const targetSpeedRef = useRef(direction === "left" ? 1.05 : -1.05);

  // Smoothly slow down on hover (from normal 1.05 to gentle 0.22)
  useEffect(() => {
    const baseSpeed = direction === "left" ? 1.05 : -1.05;
    targetSpeedRef.current = isHovered ? baseSpeed * 0.2 : baseSpeed;
  }, [isHovered, direction]);

  useEffect(() => {
    let animId: number;

    const loop = () => {
      // Smooth interpolation for inertia deceleration / acceleration
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
      offsetRef.current += speedRef.current;

      if (contentRef.current) {
        const halfWidth = contentRef.current.scrollWidth / 2;
        if (halfWidth > 0) {
          if (offsetRef.current >= halfWidth) {
            offsetRef.current -= halfWidth;
          } else if (offsetRef.current < 0) {
            offsetRef.current += halfWidth;
          }
          contentRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Repeat for continuous seamless wrapping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-y border-border/60 bg-secondary/20 py-4.5 sm:py-5.5 select-none [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div
        ref={contentRef}
        className="flex items-center gap-10 sm:gap-14 w-max will-change-transform py-1"
      >
        {repeatedItems.map((tech, idx) => {
          const LogoComponent = LOGO_COMPONENTS[tech.logoKey] || Layers;

          return (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-4.5 shrink-0 group transition-opacity duration-200"
            >
              {/* Big, Crisp Authentic Brand Logo */}
              <span className="flex size-10 sm:size-12 shrink-0 items-center justify-center group-hover:scale-115 transition-transform duration-300">
                <LogoComponent className="size-full" />
              </span>

              {/* Typography: Bold Name and Subtext */}
              <div className="flex items-baseline gap-2.5">
                <span className="font-bold text-lg sm:text-2xl text-foreground tracking-tight whitespace-nowrap group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground/80 whitespace-nowrap">
                  {tech.category}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/50 hidden sm:inline whitespace-nowrap">
                  &middot; {tech.proficiency}
                </span>
              </div>

              {/* Strip Divider */}
              <span
                className="text-foreground/20 font-mono text-lg ml-6 sm:ml-8"
                aria-hidden="true"
              >
                &middot;
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StackSection() {
  const mid = Math.ceil(TECH_STACK.length / 2);
  const row1 = TECH_STACK.slice(0, mid);
  const row2 = TECH_STACK.slice(mid);

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
        <ScrollReveal className="px-4 pb-12 pt-20 md:px-10 lg:pt-28">
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
        </ScrollReveal>
      </div>

      {/* Dual Continuous Opposing Marquee Strips */}
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 pb-28 pt-2">
        <div className="space-y-4">
          {/* Strip 1: Moving Left */}
          <MarqueeStrip items={row1} direction="left" />

          {/* Strip 2: Half below moving Right */}
          <MarqueeStrip items={row2} direction="right" />
        </div>
      </div>
    </section>
  );
}
