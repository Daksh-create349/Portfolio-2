"use client";

import React from "react";
import { JOURNEY } from "@/data/portfolioData";
import { AskDakshSection } from "./AskDakshSection";
import { MapPin, Calendar, Award, GraduationCap, Laptop, Sparkles } from "lucide-react";

export function AboutAndJourneySection() {
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip px-6 md:px-10">
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
          <h2 id="about-title" className="text-3xl font-medium leading-tight md:text-4xl text-foreground">
            Ask me anything...
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            Interact with my portfolio assistant or explore my background, photos, and journey below.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5 flex flex-col gap-12 px-4 pb-24 pt-8 md:px-10">
        {/* Interactive AI Chat Terminal */}
        <AskDakshSection />

        {/* About Daksh Narrative */}
        <div className="flex flex-col gap-4 pt-6">
          <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            About Daksh
          </p>
          <div className="flex flex-col gap-3 text-foreground/90">
            <h3 className="text-2xl font-medium leading-snug md:text-3xl text-foreground">
              I build high-throughput AI pipelines, design audio DSP chains, and speak English and Hindi.
            </h3>
            <div className="text-base text-muted-foreground leading-relaxed space-y-3 max-w-3xl">
              <p>
                I&apos;m Daksh Srivastava, a full-stack engineer and Computer Science undergraduate at{" "}
                <strong className="text-foreground">ITM Skills University</strong> (CGPA:{" "}
                <strong className="text-foreground">9.57 / 10.0</strong>). My passion lies in building
                systems that operate at the frontier: from low-latency Web Audio API digital signal
                processing to planetary-scale satellite radar pipelines.
              </p>
              <p>
                As a <strong className="text-foreground">Google Student Ambassador</strong>, I lead
                campus workshops on Google Cloud, Workspace, and AI/ML developer tools. When not
                debugging Git DAGs or training XGBoost forecasters, I tinker with agentic frameworks,
                read research papers on spatial acoustics, and collaborate in hackathons.
              </p>
            </div>
          </div>
        </div>

        {/* Photo Gallery with Peer-Blur Hover Effect */}
        <div className="group/photos grid gap-6 py-8 md:grid-cols-3">
          {/* Photo 1: Google Workshop / Campus */}
          <div
            data-photo="true"
            className="group/photo relative flex flex-col justify-end overflow-hidden rounded-[20px] bg-secondary border border-border/70 p-6 min-h-[300px] transition-all duration-500 ease-out [@media(hover:hover)]:group-has-[[data-photo]:hover]/photos:opacity-60 [@media(hover:hover)]:group-has-[[data-photo]:hover]/photos:blur-[2px] [@media(hover:hover)]:hover:!opacity-100 [@media(hover:hover)]:hover:!blur-none hover:shadow-xl hover:border-foreground/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[11px] font-mono text-foreground border border-border/60">
              <GraduationCap className="size-3.5 text-blue-500" />
              <span>Campus Leadership</span>
            </div>
            <div className="relative z-10 text-white">
              <h4 className="text-base font-semibold">Google Student Ambassador</h4>
              <p className="text-xs text-white/80 mt-1">
                Leading Cloud and AI/ML workshops for hundreds of university peers.
              </p>
            </div>
          </div>

          {/* Photo 2: Hackathon Win */}
          <div
            data-photo="true"
            className="group/photo relative flex flex-col justify-end overflow-hidden rounded-[20px] bg-secondary border border-border/70 p-6 min-h-[300px] transition-all duration-500 ease-out [@media(hover:hover)]:group-has-[[data-photo]:hover]/photos:opacity-60 [@media(hover:hover)]:group-has-[[data-photo]:hover]/photos:blur-[2px] [@media(hover:hover)]:hover:!opacity-100 [@media(hover:hover)]:hover:!blur-none hover:shadow-xl hover:border-foreground/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[11px] font-mono text-foreground border border-border/60">
              <Award className="size-3.5 text-amber-500" />
              <span>1st Place Winner</span>
            </div>
            <div className="relative z-10 text-white">
              <h4 className="text-base font-semibold">Hacktoberfest x MLH</h4>
              <p className="text-xs text-white/80 mt-1">
                Hack Day Champion at Sardar Patel Institute of Technology (SPIT).
              </p>
            </div>
          </div>

          {/* Photo 3: Engineering Workstation */}
          <div
            data-photo="true"
            className="group/photo relative flex flex-col justify-end overflow-hidden rounded-[20px] bg-secondary border border-border/70 p-6 min-h-[300px] transition-all duration-500 ease-out [@media(hover:hover)]:group-has-[[data-photo]:hover]/photos:opacity-60 [@media(hover:hover)]:group-has-[[data-photo]:hover]/photos:blur-[2px] [@media(hover:hover)]:hover:!opacity-100 [@media(hover:hover)]:hover:!blur-none hover:shadow-xl hover:border-foreground/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[11px] font-mono text-foreground border border-border/60">
              <Laptop className="size-3.5 text-emerald-500" />
              <span>Systems Studio</span>
            </div>
            <div className="relative z-10 text-white">
              <h4 className="text-base font-semibold">DSP &amp; Satellite Pipelines</h4>
              <p className="text-xs text-white/80 mt-1">
                Deploying client-side audio models &amp; GEE satellite infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* Journey & Timeline Table */}
        <div className="flex flex-col gap-6 pt-6">
          <h3 className="text-2xl font-medium tracking-tight text-foreground">
            Academic &amp; Professional Journey
          </h3>

          <div className="rounded-[24px] border border-border/60 bg-secondary/20 p-2 sm:p-4 overflow-hidden">
            <ul className="divide-y divide-border/40">
              {JOURNEY.map((item, index) => (
                <li
                  key={`${item.role}-${index}`}
                  className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_auto] items-center gap-2 p-3.5 rounded-xl hover:bg-background/60 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-foreground text-sm block">
                      {item.role}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground sm:hidden">
                      {item.org} · {item.period}
                    </span>
                  </div>

                  <span className="hidden sm:block text-xs font-mono text-muted-foreground">
                    {item.org}
                  </span>

                  <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {item.location}
                  </span>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                    <span className="text-xs font-mono text-muted-foreground font-medium">
                      {item.period}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-secondary border border-border text-foreground/80">
                      {item.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

