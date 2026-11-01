/**
 * Authoritative Knowledge Base on Daksh Srivastava
 * Used for RAG retrieval in the Groq AI Chat Agent
 */

export interface KnowledgeSection {
  id: string;
  category: "bio" | "projects" | "experience" | "skills" | "achievements" | "contact";
  title: string;
  keywords: string[];
  content: string;
}

export const DAKSH_KNOWLEDGE: KnowledgeSection[] = [
  {
    id: "profile-overview",
    category: "bio",
    title: "Daksh Srivastava - Profile & Bio",
    keywords: ["daksh", "who", "bio", "about", "introduction", "background", "overview"],
    content: `
Daksh Srivastava is a Full-Stack & AI Systems Engineer based in Mumbai, India.
He specializes in building high-performance client-side architectures, spatial audio engines, autonomous Model Context Protocol (MCP) systems, and real-time AI pipelines.
He is currently pursuing his B.Tech in Computer Science and Engineering (with specialization in Full Stack & AI/ML) at ITM Skills University (2025–2029) with an outstanding cumulative CGPA of 9.57 (Sem 1: 9.30 SGPA, Sem 2: 9.83 SGPA), ranking in the top academic standing of his cohort.
Portfolio URL: https://daksh.is-a.dev
GitHub: https://github.com/Daksh-create349
LinkedIn: https://linkedin.com/in/daksh-srivastava-2ba851344
Email: dakshshrivastav56@gmail.com
    `.trim(),
  },
  {
    id: "key-initiatives",
    category: "experience",
    title: "Roles & Leadership Initiatives",
    keywords: ["google", "ambassador", "sahajta", "intern", "internship", "experience", "work", "job", "lead"],
    content: `
Key Roles and Leadership:
1. Google Student Ambassador (Google, Mumbai, India | 2025 – Present):
   - Leading university developer workshops on Google Cloud, Google Workspace APIs, and Google Gemini multimodal AI models.
2. AI Engineer Intern (Sahajta AI | 2025 – Present):
   - Architecting agentic AI pipelines, prompt evaluations, and low-latency multimodal application services.
3. Student Ambassador (LetsUpgrade | Sep 2025 – Dec 2025):
   - Organized technical upskilling workshops and peer coding tournaments for university students.
    `.trim(),
  },
  {
    id: "sonaura-project",
    category: "projects",
    title: "Project: Sonaura 2.0 (Spatial Audio Extension)",
    keywords: ["sonaura", "audio", "spatial", "extension", "edge", "music", "sound", "webaudio", "binaural"],
    content: `
Project Sonaura 2.0 (Lead Systems & Audio Engineer | 2025):
- Headline: Browser Web Audio extension delivering cinema-grade 5.1 binaural surround sound, 10-band parametric EQ, and convolution reverb with zero external drivers.
- Status: Officially launched and verified on the Microsoft Edge Add-ons Store.
- Architecture:
  * Zero-driver browser audio pipeline capturing tabs via Web Audio API.
  * Real-time 48-bar FFT frequency spectrum visualizer running at 25 FPS.
  * HRTF spatial matrix with Haas-effect interaural time delays for realistic 3D acoustic immersion through any standard pair of headphones.
- GitHub: https://github.com/Daksh-create349/Sonaura-2.0
    `.trim(),
  },
  {
    id: "contradiction-mcp-project",
    category: "projects",
    title: "Project: Contradiction-MCP",
    keywords: ["contradiction", "mcp", "protocol", "model context", "agent", "agents", "knowledge", "graph"],
    content: `
Project Contradiction-MCP (Author & Maintainer | Open Source):
- Autonomous Model Context Protocol (MCP) engine for factual consistency, version reconciliation, and conflict resolution across engineering knowledge bases and agent tools.
- Ranked: 7 Stars on GitHub · Top Open Source Project.
- Tech Stack: TypeScript, Model Context Protocol (MCP), Knowledge Graphs, Agentics.
- Key Capabilities:
  * Autonomous multi-source reconciliation for LLM context windows.
  * Strict RFC-compliant Model Context Protocol server implementation.
  * Deterministic version diffing across markdown documentation and JSON schemas.
- GitHub: https://github.com/Daksh-create349/Contradiction-MCP
    `.trim(),
  },
  {
    id: "hydrowatch-project",
    category: "projects",
    title: "Project: HydroWatch (SIH 2026 Finalist)",
    keywords: ["hydrowatch", "sih", "smart india hackathon", "radar", "satellite", "flood", "sentinel", "climate"],
    content: `
Project HydroWatch (Smart India Hackathon 2026):
- Climate intelligence platform fusing Doppler radar (dBZ), Sentinel-2 SAR satellite imagery, NASA POWER, and NOAA GFS weather forecasts into an interactive 3D digital twin.
- Tech Stack: Python, FastAPI, Cesium 3D WebGL, Sentinel-2 SAR, PostGIS, Docker.
- Highlights:
  * Cloud-penetrating Doppler dBZ radar flood tracking.
  * Physics-based false-positive DEM (Digital Elevation Model) and HAND drainage masking.
  * WebGL Cesium 3D twin rendering 8 dynamic spatial layers in real time.
- GitHub: https://github.com/Daksh-create349/Hydrowatch-SIH26071
    `.trim(),
  },
  {
    id: "data-autopsy-project",
    category: "projects",
    title: "Project: data-autopsy (AI Forensic Workstation)",
    keywords: ["autopsy", "data", "forensics", "leakage", "tabular", "ml", "machine learning"],
    content: `
Project data-autopsy (Author & Lead Engineer):
- AI forensic investigation workstation for tabular datasets. Uncovers target leakage, structural corruption, and distributional drift before models reach training pipelines.
- 6 Stars on GitHub.
- Tech Stack: Python, AI Forensics, Data Quality, Local AI.
- Highlights:
  * Heuristic & statistical target leakage detection engine.
  * 100% local AI analysis with reproducible audit trails.
  * Deep tabular corruption diagnosis across Parquet and CSV datasets.
- GitHub: https://github.com/Daksh-create349/data-autopsy
    `.trim(),
  },
  {
    id: "blood-bridge-project",
    category: "projects",
    title: "Project: Blood-Bridge 3.0",
    keywords: ["blood", "bridge", "health", "hospital", "donor", "emergency", "medical"],
    content: `
Project Blood-Bridge 3.0:
- Critical emergency health logistics platform connecting registered blood donors, live hospital inventories, and real-time transit dispatch with geo-routing.
- Tech Stack: TypeScript, Next.js, HealthTech, Live Geolocation.
- Highlights:
  * Sub-second emergency radius matching for rare blood groups.
  * Live hospital blood bank inventory synchronization.
  * Automated push dispatch alerts with donor verification.
- GitHub: https://github.com/Daksh-create349/Blood-Bridge-3.0
    `.trim(),
  },
  {
    id: "security-projects",
    category: "projects",
    title: "Security Projects: GitHub Guardian & BoundaryBench",
    keywords: ["security", "devsecops", "sast", "github guardian", "boundarybench", "idor", "bola", "gemma"],
    content: `
Security & DevSecOps Tools:
1. GitHub Guardian: Forensic DevSecOps security auditing platform combining SAST with full Git Directed Acyclic Graph (DAG) traversal to uncover leaked secrets across commit histories, rebases, and deleted branches.
   - GitHub: https://github.com/Daksh-create349/Github-Guardian
2. BoundaryBench: Local-first AI-assisted API authorization testing framework using Gemma for automated security boundary stress-testing, BOLA/IDOR detection, and OpenAPI spec parsing.
   - GitHub: https://github.com/Daksh-create349/BoundaryBench
    `.trim(),
  },
  {
    id: "technical-stack",
    category: "skills",
    title: "Technical Stack & Engineering Toolchain",
    keywords: ["stack", "skills", "languages", "tools", "technologies", "frontend", "backend", "database", "devops", "react", "python"],
    content: `
Daksh's Core Technical Toolchain:
- Frontend: React 19, Next.js (App Router), TypeScript, Tailwind CSS, Web Audio API, Three.js (WebGL).
- Backend & APIs: Python, FastAPI, Node.js, REST, WebSockets, Model Context Protocol (MCP).
- AI & LLM Systems: Groq LPU, Google Gemini API, OpenAI API, Gemma, Agentic Pipelines, RAG Architectures.
- Databases & GIS: PostgreSQL, PostGIS, Redis, MongoDB, Firebase.
- DevOps, Security & Cloud: Docker, Git, SAST, Google Cloud Platform (GCP), Google Earth Engine (GEE), Vercel.
- Performance: Zero-driver audio signal processing, 60/120fps DOM optimizations, low-latency client state.
    `.trim(),
  },
  {
    id: "awards-and-accolades",
    category: "achievements",
    title: "Awards, Hackathon Wins & Honors",
    keywords: ["awards", "win", "hackathon", "scholarship", "honors", "achievements", "spit", "hacktoberfest"],
    content: `
Honors and Accolades:
1. Hack Day Winner (Hacktoberfest x MLH @ Sardar Patel Institute of Technology, Mumbai | 2025):
   - Won first place Hack Day; awarded Arduino UNO Q hardware prize.
2. Top 3 Capstone Ranking & 25% Merit Scholarship (100x Applied AI Cohort | 2025):
   - Ranked in Top 3 across national cohort for architectural rigor and systems design.
3. Production Store Launch (Microsoft Edge Store | 2025):
   - Published Sonaura 2.0 Browser Extension to production on Microsoft Edge Add-ons.
4. Academic Excellence (ITM Skills University | 2025 – 2029):
   - 9.57 Cumulative CGPA (Sem 1: 9.30 SGPA, Sem 2: 9.83 SGPA).
    `.trim(),
  },
  {
    id: "contact-and-hiring",
    category: "contact",
    title: "Contact, Hiring & Collaboration",
    keywords: ["contact", "hire", "email", "linkedin", "collaborate", "reach", "work with", "phone"],
    content: `
How to Contact Daksh Srivastava:
- Email: dakshshrivastav56@gmail.com
- LinkedIn: https://linkedin.com/in/daksh-srivastava-2ba851344
- GitHub: https://github.com/Daksh-create349
- Portfolio Website: https://daksh.is-a.dev
- Location: Mumbai, India
- Open to: High-impact software engineering internships, AI systems roles, open-source collaborations, and hackathon teams.
    `.trim(),
  },
];

/**
 * Basic semantic & keyword retrieval function for RAG
 */
export function retrieveRelevantKnowledge(query: string, maxResults = 4): string {
  if (!query || typeof query !== "string") {
    return DAKSH_KNOWLEDGE.slice(0, 3).map((k) => k.content).join("\n\n");
  }

  const queryTerms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  // Score each section
  const scored = DAKSH_KNOWLEDGE.map((section) => {
    let score = 0;
    const lowerTitle = section.title.toLowerCase();
    const lowerContent = section.content.toLowerCase();

    for (const term of queryTerms) {
      if (section.keywords.some((kw) => kw.includes(term) || term.includes(kw))) {
        score += 8;
      }
      if (lowerTitle.includes(term)) {
        score += 5;
      }
      if (lowerContent.includes(term)) {
        score += 2;
      }
    }

    return { section, score };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  // Take top matching sections, or fallback to profile overview + projects + contact
  const selected = scored.filter((s) => s.score > 0).slice(0, maxResults);

  if (selected.length === 0) {
    return [
      DAKSH_KNOWLEDGE[0].content, // Profile overview
      DAKSH_KNOWLEDGE[2].content, // Sonaura
      DAKSH_KNOWLEDGE[8].content, // Technical stack
      DAKSH_KNOWLEDGE[10].content, // Contact info
    ].join("\n\n---\n\n");
  }

  // Always ensure Profile Overview is present if not already included
  const hasProfile = selected.some((s) => s.section.id === "profile-overview");
  const resultSections = selected.map((s) => s.section);
  if (!hasProfile && DAKSH_KNOWLEDGE[0]) {
    resultSections.unshift(DAKSH_KNOWLEDGE[0]);
  }

  return resultSections.map((s) => `### ${s.title}\n${s.content}`).join("\n\n---\n\n");
}

