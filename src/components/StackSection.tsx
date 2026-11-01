"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ClaudeLogo,
  VercelLogo,
  FigmaLogo,
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
  DevSecOpsLogo,
} from "./TechLogos";
import { Layers } from "lucide-react";

interface StackItem {
  name: string;
  logoKey: string;
}

const ROW_ONE: StackItem[] = [
  { name: "CLAUDE", logoKey: "claude" },
  { name: "GEMINI", logoKey: "gemini" },
  { name: "OPENAI", logoKey: "openai" },
  { name: "REACT 19", logoKey: "react" },
  { name: "NEXT.JS", logoKey: "nextjs" },
  { name: "TYPESCRIPT", logoKey: "typescript" },
  { name: "PYTHON", logoKey: "python" },
  { name: "FASTAPI", logoKey: "fastapi" },
  { name: "THREE.JS", logoKey: "threejs" },
  { name: "VERCEL", logoKey: "vercel" },
];

const ROW_TWO: StackItem[] = [
  { name: "DEVSECOPS", logoKey: "devsecops" },
  { name: "DOCKER", logoKey: "docker" },
  { name: "POSTGRESQL", logoKey: "postgres" },
  { name: "GOOGLE CLOUD", logoKey: "gee" },
  { name: "XGBOOST", logoKey: "xgboost" },
  { name: "REDIS", logoKey: "redis" },
  { name: "MONGODB", logoKey: "mongodb" },
  { name: "FIREBASE", logoKey: "firebase" },
  { name: "TAILWIND", logoKey: "tailwind" },
  { name: "GIT", logoKey: "git" },
  { name: "FIGMA", logoKey: "figma" },
];

const LOGO_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  react: ReactLogo,
  nextjs: NextjsLogo,
  typescript: TypeScriptLogo,
  python: PythonLogo,
  fastapi: FastAPILogo,
  threejs: ThreejsLogo,
  gemini: GeminiLogo,
  openai: OpenAILogo,
  claude: ClaudeLogo,
  vercel: VercelLogo,
  figma: FigmaLogo,
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
  devsecops: DevSecOpsLogo,
};

interface MarqueeStripProps {
  items: StackItem[];
  direction?: "left" | "right";
  startOffsetAlternate?: boolean;
}

function MarqueeStrip({ items, direction = "left", startOffsetAlternate = false }: MarqueeStripProps) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(direction === "left" ? 1.05 : -1.05);
  const targetSpeedRef = useRef(direction === "left" ? 1.05 : -1.05);

  // Smooth deceleration on hover (from normal 1.05 to gentle 0.18 crawl)
  useEffect(() => {
    const baseSpeed = direction === "left" ? 1.05 : -1.05;
    targetSpeedRef.current = isHovered ? baseSpeed * 0.18 : baseSpeed;
  }, [isHovered, direction]);

  useEffect(() => {
    let animId: number;

    const loop = () => {
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

  // Quadruple items to ensure seamless infinite looping on ultra-wide screens
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden py-3 sm:py-5 select-none [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
    >
      <div
        ref={contentRef}
        className="flex items-center gap-8 sm:gap-14 w-max will-change-transform py-1"
      >
        {repeatedItems.map((item, idx) => {
          const LogoComponent = LOGO_COMPONENTS[item.logoKey] || Layers;
          // Alternating diamond separator color: even indices subtle silver, odd indices signature Figma blue (#0D99FF)
          const isAccentDiamond = (idx + (startOffsetAlternate ? 1 : 0)) % 2 === 1;

          return (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-8 sm:gap-14 shrink-0 group cursor-default"
            >
              {/* Item: Crisp Monochrome Logo + Bold Grotesque Uppercase Name */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <span className="flex size-7 sm:size-9 shrink-0 items-center justify-center text-foreground transition-transform duration-300 group-hover:scale-110">
                  <LogoComponent className="size-full" />
                </span>
                <span className="font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase text-foreground whitespace-nowrap transition-colors duration-200 group-hover:text-foreground/80">
                  {item.name}
                </span>
              </div>

              {/* Diamond Separator (Alternating Subtle Silver & Signature Figma Blue) */}
              <span
                className={`text-sm sm:text-base select-none shrink-0 transition-opacity duration-200 ${
                  isAccentDiamond ? "text-[#0D99FF]" : "text-foreground/25"
                }`}
                aria-hidden="true"
              >
                &#9670;
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StackSection() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="overflow-x-clip px-4 sm:px-6 md:px-10 py-16">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Editorial Top Eyebrow with Signature Figma Blue Accent Square & Hairline Rule */}
        <ScrollReveal className="pb-6">
          <div className="flex items-center gap-2.5">
            <span className="size-2 bg-[#0D99FF] inline-block shrink-0" aria-hidden="true" />
            <h2
              id="stack-title"
              className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground font-semibold"
            >
              THE STACK
            </h2>
          </div>
          <div className="mt-4 h-px w-full bg-border/70" aria-hidden="true" />
        </ScrollReveal>

        {/* Dual Opposing Continuous Infinite Marquee Strips */}
        <div className="py-2 space-y-2 sm:space-y-4">
          {/* Row 1: Moving Left */}
          <MarqueeStrip items={ROW_ONE} direction="left" />

          {/* Row 2: Moving Right with Alternating Diamond Offset */}
          <MarqueeStrip items={ROW_TWO} direction="right" startOffsetAlternate />
        </div>

        {/* Bottom Hairline Rule */}
        <div className="mt-4 h-px w-full bg-border/70" aria-hidden="true" />
      </div>
    </section>
  );
}
