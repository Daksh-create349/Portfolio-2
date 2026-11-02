"use client";

import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import confetti from "canvas-confetti";
import {
  FileText,
  Download,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Layers,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const RESUME_TEXT = `Daksh Srivastava
Full-stack Developer & CS Undergraduate · AI-Powered Applications · DevSecOps Enthusiast · Geospatial Intelligence
Mumbai, India | dakshshrivastav56@gmail.com | +91-9588415901
LinkedIn: linkedin.com/in/daksh-srivastava-2ba851344
GitHub: github.com/Daksh-create349
Portfolio: dakshsrivastava.vercel.app

TECHNICAL SKILLS
- Languages: Python, JavaScript, TypeScript, SQL, HTML, CSS
- Frameworks: React 19, Next.js, Node.js, Express.js, FastAPI, Tailwind CSS, Three.js
- AI / ML: Google Gemini API, OpenAI API, XGBoost, LLM Integration, Prompt Engineering
- Cloud & DevOps: Firebase, Google Earth Engine, Docker, Celery, Redis, Vercel
- Databases: PostgreSQL, PostGIS, MongoDB, MySQL, Firebase Realtime Database

EDUCATION
- ITM Skills University — Navi Mumbai, India (2025 – 2029)
  B.Tech, Computer Science Engineering (Full Stack & AI/ML) · Expected Dec 2029
  Sem 1 SGPA: 9.3 · Sem 2 SGPA: 9.83 · CGPA: 9.57
- Maharashtra State Board (MSBSHSE) (Completed March 2025)
  Higher Secondary Certificate (HSC) — Science Stream

PROJECTS
- Sonaura 2.0 — Spatial Audio Browser Extension (2025)
  Web Audio API · Chrome Extension (Manifest V3) · JavaScript · HTML5 Canvas
  Officially launched on Microsoft Edge Add-ons Store
  Built a client-side audio processing pipeline intercepting live tab audio with virtualized 5.1 surround sound (HRTF, Haas-effect), 10-band parametric EQ, convolution reverb, asymmetric subharmonic exciter, and brickwall limiter.
- AQUILA — Climate Intelligence Engine (2025)
  FastAPI · Google Earth Engine · React 19 · Three.js · XGBoost · PostgreSQL/PostGIS · Docker
  Geospatial flood detection platform processing Sentinel-1 SAR and Sentinel-2 imagery via GEE; adaptive Otsu thresholding with physics-based false-positive correction (DEM, HAND, JRC tidal); XGBoost 5-day flood forecaster.
- GitHub Guardian — DevSecOps Security Auditing Platform (2025)
  FastAPI · React · Python · GitHub OAuth · OpenAI API · JWT
  Forensic security platform combining SAST with Git DAG traversal to uncover leaked credentials, SQLi, and XSS across current and deleted commits.
- HyperMind — Adaptive AI Learning Companion (2025)
  React 19 · TypeScript · Google Gemini 2.5 API · Tailwind CSS · Recharts · ReactFlow · Vite
  Adaptive education platform on Gemini 2.5 Flash/Pro with Concept Tutor, Debate Mode, dynamic Recharts & ReactFlow mind maps, and Gemini Live real-time audio sessions.

EXPERIENCE & LEADERSHIP
- Co-Lead, Research & Development Club — ITM Skills University (2025 – Present)
  Spearheading student-led research initiatives, technical prototyping, AI & systems experimentation, and university-wide engineering workshops.
- AI Engineer Intern — Sahajta AI (Remote)
- Google Student Ambassador — Google (2025 – Present)
  Lead Google Cloud, Workspace, and AI/ML developer workshops on campus; bridge GDSC and Google programs with the university ecosystem.
- Student Ambassador — LetsUpgrade (Sep 2025 – Dec 2025)
  Organized technical developer workshops, webinars, and coding hackathons for university engineering students.

ACHIEVEMENTS & LEADERSHIP
- Hack Day Winner — Hacktoberfest x MLH (Awarded Arduino UNO Q at SPIT)
- Top 3 — 100x Applied AI Open Capstone Series (Awarded 25% merit scholarship)
- Hackathon Finalist (2024–2025)
- Rapid Self-Learning across Google Earth Engine, Gemini Live, and DevSecOps tooling.`;

export function ResumeSection() {
  const [viewMode, setViewMode] = useState<"folio" | "pdf">("folio");
  const [activePage, setActivePage] = useState<1 | 2 | "both">("both");
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(RESUME_TEXT);
    setCopied(true);
    try {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.65 },
        colors: ["#ffffff", "#d4d4d8", "#71717a"],
      });
    } catch {}
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="resume" aria-labelledby="resume-title" className="overflow-x-clip px-6 md:px-10 py-16">
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

        {/* Section Header */}
        <ScrollReveal className="px-4 pb-8 pt-20 md:px-10 lg:pt-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
                <FileText className="size-3.5 text-foreground" />
                <span>Verified Credentials &middot; 2026 Edition</span>
              </div>
              <h2 id="resume-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Curriculum Vitae.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Official document outlining technical proficiencies, university academic standing, production architectures, and engineering leadership.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Download Official PDF */}
              <a
                href="/Daksh_Srivastava_Resume.pdf"
                download="Daksh_Srivastava_Resume.pdf"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-xs font-semibold text-background shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Download PDF</span>
                <span className="font-mono text-[10px] opacity-75">(7 KB)</span>
              </a>

              {/* Open in New Window */}
              <a
                href="/Daksh_Srivastava_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border/80 bg-background px-4 text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <ExternalLink className="size-3.5 text-muted-foreground" />
                <span>Open Raw</span>
              </a>

              {/* Copy Plaintext ATS Text */}
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border/80 bg-background px-4 text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-foreground" />
                    <span>Copied ATS Text</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-muted-foreground" />
                    <span>Copy ATS Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Main Studio Document Viewer */}
      <div className="mx-auto w-full max-w-[1240px] border-x border-foreground/5 px-2 pb-28 pt-4 sm:px-6">
        {/* Floating Studio Controls Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-secondary/35 p-3 backdrop-blur-md">
          {/* View Mode Toggle: Interactive Folio vs Native PDF */}
          <div className="flex items-center gap-1 rounded-xl bg-background/80 p-1 border border-border/60">
            <button
              type="button"
              onClick={() => setViewMode("folio")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                viewMode === "folio"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="size-3.5" />
              <span>Interactive Folio</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("pdf")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                viewMode === "pdf"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="size-3.5" />
              <span>Vector PDF</span>
            </button>
          </div>

          {/* Page Filter (Folio & Vector Modes) */}
          <div className="flex items-center gap-1 rounded-xl bg-background/80 p-1 border border-border/60">
            <button
              type="button"
              onClick={() => setActivePage("both")}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                activePage === "both"
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Pages
            </button>
            <button
              type="button"
              onClick={() => setActivePage(1)}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                activePage === 1
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Page 1
            </button>
            <button
              type="button"
              onClick={() => setActivePage(2)}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                activePage === 2
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Page 2
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground px-2">
            <span>ReportLab Engine &middot; A4 Vector Sheet</span>
          </div>
        </div>

        {/* VIEW 1: INTERACTIVE FOLIO */}
        {viewMode === "folio" && (
          <div className="space-y-8">
            {/* PAGE 1: HEADER, SKILLS, EDUCATION, FLAGSHIP WORKS */}
            {(activePage === 1 || activePage === "both") && (
              <div className="relative rounded-[28px] border border-border/80 bg-background/95 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all">
                {/* Page Badge */}
                <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-8">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Folio Page 01 &mdash; Skills, Education &amp; Works
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    A4 Vector Specification
                  </span>
                </div>

                {/* Document Header */}
                <div className="space-y-3">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                    Daksh Srivastava
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/80 font-medium">
                    Full-stack Developer &amp; CS Undergraduate &middot; AI-Powered Applications &middot; DevSecOps Enthusiast &middot; Geospatial Intelligence
                  </p>

                  {/* Contact Strip */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs font-mono text-muted-foreground">
                    <span>Mumbai, India</span>
                    <span>&middot;</span>
                    <a
                      href="mailto:dakshshrivastav56@gmail.com"
                      className="hover:text-foreground transition-colors underline decoration-border underline-offset-4"
                    >
                      dakshshrivastav56@gmail.com
                    </a>
                    <span>&middot;</span>
                    <a
                      href="tel:+919588415901"
                      className="hover:text-foreground transition-colors"
                    >
                      +91-9588415901
                    </a>
                    <span>&middot;</span>
                    <a
                      href="https://linkedin.com/in/daksh-srivastava-2ba851344"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <LinkedinIcon className="size-3" />
                      <span>LinkedIn</span>
                    </a>
                    <span>&middot;</span>
                    <a
                      href="https://github.com/Daksh-create349"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <GithubIcon className="size-3" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                {/* Section: Technical Skills */}
                <div className="mt-10 pt-8 border-t border-border/60 space-y-5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                    <Code2 className="size-3.5 text-foreground" />
                    <span>Technical Skills</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/30 space-y-1">
                      <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Languages</span>
                      <p className="font-semibold text-foreground">Python, JavaScript, TypeScript, SQL, HTML, CSS</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/30 space-y-1">
                      <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Frameworks &amp; Runtimes</span>
                      <p className="font-semibold text-foreground">React 19, Next.js, Node.js, Express.js, FastAPI, Tailwind CSS, Three.js</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/30 space-y-1">
                      <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">AI &amp; Machine Learning</span>
                      <p className="font-semibold text-foreground">Google Gemini API, OpenAI API, XGBoost, LLM Integration, Prompt Engineering</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/30 space-y-1">
                      <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Cloud, DevOps &amp; Databases</span>
                      <p className="font-semibold text-foreground">Docker, PostgreSQL, PostGIS, MongoDB, Redis, Google Earth Engine, Firebase, Vercel</p>
                    </div>
                  </div>
                </div>

                {/* Section: Education */}
                <div className="mt-10 pt-8 border-t border-border/60 space-y-5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                    <GraduationCap className="size-3.5 text-foreground" />
                    <span>Education</span>
                  </h4>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl border border-border/70 bg-secondary/25 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-base text-foreground">ITM Skills University &mdash; Navi Mumbai, India</h5>
                        <span className="font-mono text-xs text-muted-foreground">2025 &ndash; 2029</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        B.Tech, Computer Science Engineering (Full Stack &amp; AI/ML) &middot; Expected Dec 2029
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-background border border-border/60 text-foreground font-semibold">
                          Sem 1 SGPA: 9.3
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-background border border-border/60 text-foreground font-semibold">
                          Sem 2 SGPA: 9.83
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-foreground text-background font-bold">
                          CGPA: 9.57
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border/50 bg-secondary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h6 className="font-semibold text-xs text-foreground">Maharashtra State Board (MSBSHSE)</h6>
                        <p className="text-[11px] text-muted-foreground">Higher Secondary Certificate (HSC) &mdash; Science Stream</p>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">Completed March 2025</span>
                    </div>
                  </div>
                </div>

                {/* Section: Projects */}
                <div className="mt-10 pt-8 border-t border-border/60 space-y-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                    <BookOpen className="size-3.5 text-foreground" />
                    <span>Flagship Engineering Works</span>
                  </h4>

                  <div className="space-y-6 text-xs leading-relaxed">
                    {/* Sonaura */}
                    <div className="space-y-2 rounded-2xl border border-border/60 bg-secondary/20 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-foreground">Sonaura 2.0 &mdash; Spatial Audio Browser Extension</h5>
                          <span className="px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-mono font-semibold">
                            Microsoft Edge Store
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">2025</span>
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        Web Audio API &middot; Chrome Extension (Manifest V3) &middot; JavaScript &middot; HTML5 Canvas
                      </p>
                      <ul className="space-y-1.5 text-muted-foreground list-disc list-inside pt-1">
                        <li>Built a client-side audio pipeline as a browser extension intercepting live tab audio to deliver cinema-quality 3D acoustics through any headphones with zero driver installation.</li>
                        <li>Engineered full audio graph: HRTF-based virtualized 5.1 surround sound (6-channel matrix, Haas-effect delays), 10-band parametric EQ with auto room-calibration FFT, convolution reverb, asymmetric subharmonic exciter, and brickwall limiter (-1 dB, 20:1 ratio).</li>
                        <li>Shipped 5 built-in presets (Cinema, Action Boost, Dialogue Clarity, Night Mode, Bypass) and a real-time 48-bar spectrum visualizer running at 25 FPS.</li>
                      </ul>
                    </div>

                    {/* AQUILA */}
                    <div className="space-y-2 rounded-2xl border border-border/60 bg-secondary/20 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-sm text-foreground">AQUILA &mdash; Climate Intelligence Engine</h5>
                        <span className="font-mono text-xs text-muted-foreground">2025</span>
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        FastAPI &middot; Google Earth Engine &middot; React 19 &middot; Three.js &middot; XGBoost &middot; PostgreSQL/PostGIS &middot; Docker
                      </p>
                      <ul className="space-y-1.5 text-muted-foreground list-disc list-inside pt-1">
                        <li>Built production-grade geospatial flood detection processing Sentinel-1 SAR and Sentinel-2 imagery via Google Earth Engine globally; applied adaptive Otsu thresholding with physics-based false-positive correction (COPERNICUS DEM, HAND drainage, JRC tidal).</li>
                        <li>Architected decoupled full-stack system: async FastAPI backend and React 19 + Three.js 3D globe with 8 toggleable GeoJSON layers; integrated XGBoost 5-day flood forecaster and Dockerized multi-service stack (Celery, Redis, PostGIS).</li>
                      </ul>
                    </div>

                    {/* GitHub Guardian */}
                    <div className="space-y-2 rounded-2xl border border-border/60 bg-secondary/20 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-sm text-foreground">GitHub Guardian &mdash; DevSecOps Security Auditing Platform</h5>
                        <span className="font-mono text-xs text-muted-foreground">2025</span>
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        FastAPI &middot; React &middot; Python &middot; GitHub OAuth &middot; OpenAI API &middot; JWT
                      </p>
                      <ul className="space-y-1.5 text-muted-foreground list-disc list-inside pt-1">
                        <li>Built forensic security platform combining SAST with Git DAG traversal to expose API keys, SSL certificates, SQL injection, and XSS vulnerabilities across current and deleted commits; non-linear scoring minimizes false positives.</li>
                        <li>Shipped GitHub OAuth 2.0 with JWT sessions, AI Architectural Reviewer (OpenAI/Gemini) with Jupyter Notebook parsing, and one-click Desktop Wizard with automated .gitignore generators.</li>
                      </ul>
                    </div>

                    {/* HyperMind */}
                    <div className="space-y-2 rounded-2xl border border-border/60 bg-secondary/20 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-sm text-foreground">HyperMind &mdash; Adaptive AI Learning Companion</h5>
                        <span className="font-mono text-xs text-muted-foreground">2025</span>
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        React 19 &middot; TypeScript &middot; Google Gemini 2.5 API &middot; Tailwind CSS &middot; Recharts &middot; ReactFlow &middot; Vite
                      </p>
                      <ul className="space-y-1.5 text-muted-foreground list-disc list-inside pt-1">
                        <li>Built adaptive AI education platform on Gemini 2.5 Flash/Pro with Concept Tutor, Socratic Debate Mode, and dynamic Quiz Generator with performance telemetry; multimodal input supporting vision, PDF parsing, and TTS.</li>
                        <li>Engineered Generative UI compiling dynamic Recharts analytics and interactive ReactFlow concept dependency mind maps; integrated Gemini Live for real-time voice and video pair programming sessions.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: INDUSTRY EXPERIENCE & LEADERSHIP HONORS */}
            {(activePage === 2 || activePage === "both") && (
              <div className="relative rounded-[28px] border border-border/80 bg-background/95 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all">
                {/* Page Badge */}
                <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-8">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Folio Page 02 &mdash; Experience &amp; Leadership Honors
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    A4 Vector Specification
                  </span>
                </div>

                {/* Section: Experience */}
                <div className="space-y-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                    <Briefcase className="size-3.5 text-foreground" />
                    <span>Industry &amp; Community Experience</span>
                  </h4>

                  <div className="space-y-4">
                    {/* Research & Development Club */}
                    <div className="p-5 rounded-2xl border border-border/60 bg-secondary/25 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-foreground">Co-Lead &mdash; Research &amp; Development Club</h5>
                          <span className="px-2 py-0.5 rounded-full bg-secondary border border-border/60 text-[10px] font-mono text-foreground font-semibold">
                            ITM Skills University
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">2025 &ndash; Present</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Spearheading student-led research initiatives, open-source technical prototyping, AI &amp; systems experimentation, and university-wide engineering workshops.
                      </p>
                    </div>

                    {/* Sahajta AI */}
                    <div className="p-5 rounded-2xl border border-border/60 bg-secondary/25 space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-sm text-foreground">AI Engineer Intern &mdash; Sahajta AI</h5>
                        <span className="font-mono text-xs text-muted-foreground">India &middot; Remote</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Spearheading generative AI pipeline integration, LLM orchestration, and developer tooling.
                      </p>
                    </div>

                    {/* Google */}
                    <div className="p-5 rounded-2xl border border-border/60 bg-secondary/25 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-foreground">Google Student Ambassador &mdash; Google</h5>
                          <span className="px-2 py-0.5 rounded-full bg-secondary border border-border/60 text-[10px] font-mono text-foreground font-semibold">
                            Google Cloud &amp; Gemini
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">2025 &ndash; Present</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Lead Google Cloud, Workspace, and AI/ML developer workshops on campus; bridge Google programs (GDSC, Career Certificates) with the university ecosystem to drive technical community growth and developer upskilling.
                      </p>
                    </div>

                    {/* LetsUpgrade */}
                    <div className="p-5 rounded-2xl border border-border/60 bg-secondary/25 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-sm text-foreground">Student Ambassador &mdash; LetsUpgrade</h5>
                        <span className="font-mono text-xs text-muted-foreground">Sep 2025 &ndash; Dec 2025</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Organized workshops, webinars, and coding events for university students; strengthened program reach through cross-functional collaboration, event coordination, and developer community management.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Achievements & Leadership */}
                <div className="mt-10 pt-8 border-t border-border/60 space-y-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                    <Award className="size-3.5 text-foreground" />
                    <span>Achievements &amp; Leadership Honors</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-border/60 bg-secondary/20 space-y-1">
                      <span className="font-bold text-foreground block">Hack Day Winner &mdash; Hacktoberfest x MLH</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Won Hack Day organized by Hacktoberfest and Major League Hacking at Sardar Patel Institute of Technology; awarded Arduino UNO Q hardware prize.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/60 bg-secondary/20 space-y-1">
                      <span className="font-bold text-foreground block">Top 3 &mdash; 100x Applied AI Open Capstone Series</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Ranked in the top 3 out of all national participants; awarded a 25% merit scholarship to the 100x Applied AI Cohort in recognition of project architecture.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/60 bg-secondary/20 space-y-1">
                      <span className="font-bold text-foreground block">Hackathon Finalist (2024–2025)</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Finalist in national collegiate hackathons demonstrating innovation in full-stack and AI development under competitive, time-pressured conditions.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-border/60 bg-secondary/20 space-y-1">
                      <span className="font-bold text-foreground block">Rapid Production Self-Learning</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Independently mastered Google Earth Engine, Gemini Live real-time streaming, and DevSecOps tooling &mdash; each applied in production-deployed software.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: VECTOR PDF EMBEDDED VIEWER (100% Custom Cursor & DOM Compatible) */}
        {viewMode === "pdf" && (
          <div className="rounded-[28px] border border-border/80 bg-background/95 p-4 sm:p-6 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-mono text-muted-foreground border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="size-3.5 text-foreground" />
                <span>Vector Document &middot; Daksh_Srivastava_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Infinite Vector Resolution</span>
                <a
                  href="/Daksh_Srivastava_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline underline-offset-4 flex items-center gap-1 transition-colors"
                >
                  <span>Raw PDF</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Vector Rendered Pages */}
            <div className="space-y-8">
              {(activePage === 1 || activePage === "both") && (
                <div className="group relative rounded-2xl border border-border/70 bg-white p-2 sm:p-5 shadow-lg overflow-hidden transition-all">
                  <div className="flex items-center justify-between pb-3 px-1 text-[11px] font-mono text-zinc-500">
                    <span>Page 01 &mdash; Skills, Education &amp; Works</span>
                    <span>A4 Vector</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/resume-page-1.svg"
                    alt="Daksh Srivastava Resume - Page 1"
                    className="w-full h-auto rounded-lg shadow-xs select-none pointer-events-auto"
                    loading="lazy"
                  />
                </div>
              )}

              {(activePage === 2 || activePage === "both") && (
                <div className="group relative rounded-2xl border border-border/70 bg-white p-2 sm:p-5 shadow-lg overflow-hidden transition-all">
                  <div className="flex items-center justify-between pb-3 px-1 text-[11px] font-mono text-zinc-500">
                    <span>Page 02 &mdash; Experience &amp; Leadership Honors</span>
                    <span>A4 Vector</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/resume-page-2.svg"
                    alt="Daksh Srivastava Resume - Page 2"
                    className="w-full h-auto rounded-lg shadow-xs select-none pointer-events-auto"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

