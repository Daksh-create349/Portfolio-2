export interface Project {
  id: string;
  title: string;
  headline: string;
  category: "AI & Agentics" | "Audio DSP" | "Geospatial" | "DevSecOps" | "Full Stack";
  tags: string[];
  role: string;
  year: string;
  stats: string;
  image?: string;
  promptExample: string;
  description: string;
  impactText: string;
  demoUrl?: string;
  githubUrl?: string;
  architectureHighlights: {
    iconName: string;
    title: string;
    description: string;
  }[];
}

export interface GithubProject {
  id: string;
  name: string;
  repo: string;
  description: string;
  stars: number;
  forks?: number;
  language: string;
  languageColor: string;
  category: "AI & MCP" | "Data & Forensics" | "Systems & DSP" | "Security & Dev" | "Web & Logistics";
  tags: string[];
  image?: string;
  highlights: string[];
  url: string;
}

export const GITHUB_PROJECTS: GithubProject[] = [
  {
    id: "contradiction-mcp",
    name: "Contradiction-MCP",
    repo: "Daksh-create349/Contradiction-MCP",
    description:
      "Autonomous Model Context Protocol (MCP) engine for factual consistency, version reconciliation, and conflict resolution across engineering knowledge bases and agent tools.",
    stars: 7,
    forks: 1,
    language: "TypeScript",
    languageColor: "#3178c6",
    category: "AI & MCP",
    tags: ["TypeScript", "MCP Protocol", "Agentics", "Knowledge Graphs"],
    image: "/projects/knowledge-graph-real.jpg",
    highlights: [
      "Autonomous multi-source reconciliation for LLM context",
      "Strict RFC-compliant Model Context Protocol server",
      "Deterministic version diffing across markdown and JSON schemas",
    ],
    url: "https://github.com/Daksh-create349/Contradiction-MCP",
  },
  {
    id: "data-autopsy",
    name: "data-autopsy",
    repo: "Daksh-create349/data-autopsy",
    description:
      "AI forensic investigation workstation for tabular datasets. Uncovers target leakage, structural corruption, and distributional drift before models reach training pipelines.",
    stars: 6,
    forks: 2,
    language: "Python",
    languageColor: "#3572A5",
    category: "Data & Forensics",
    tags: ["Python", "AI Forensics", "Data Quality", "Local AI"],
    image: "/projects/data-analytics-real.jpg",
    highlights: [
      "Heuristic & statistical target leakage detection engine",
      "100% local AI analysis with reproducible audit trails",
      "Deep tabular corruption diagnosis across parquet and csv files",
    ],
    url: "https://github.com/Daksh-create349/data-autopsy",
  },
  {
    id: "blood-bridge",
    name: "Blood-Bridge 3.0",
    repo: "Daksh-create349/Blood-Bridge-3.0",
    description:
      "Critical emergency health logistics platform connecting registered blood donors, live hospital inventories, and real-time transit dispatch with geo-routing.",
    stars: 3,
    forks: 1,
    language: "TypeScript",
    languageColor: "#3178c6",
    category: "Web & Logistics",
    tags: ["TypeScript", "Next.js", "HealthTech", "Live Geolocation"],
    image: "/projects/medical-logistics-real.jpg",
    highlights: [
      "Sub-second emergency radius matching for rare blood groups",
      "Live hospital blood bank inventory synchronization",
      "Automated push dispatch alerts with donor verification",
    ],
    url: "https://github.com/Daksh-create349/Blood-Bridge-3.0",
  },
  {
    id: "sonaura",
    name: "Sonaura 2.0",
    repo: "Daksh-create349/Sonaura-2.0",
    description:
      "Browser Web Audio DSP extension delivering cinema-grade 5.1 binaural surround sound, 10-band parametric EQ, and convolution reverb with zero external drivers.",
    stars: 2,
    forks: 0,
    language: "JavaScript",
    languageColor: "#f1e05a",
    category: "Systems & DSP",
    tags: ["JavaScript", "Web Audio API", "Chrome Extension", "Edge Store"],
    image: "/projects/audio-dsp-real.jpg",
    highlights: [
      "Officially launched on Microsoft Edge Add-ons Store",
      "Real-time 48-bar FFT visualizer running at 25 FPS",
      "HRTF spatial matrix with Haas-effect interaural time delays",
    ],
    url: "https://github.com/Daksh-create349/Sonaura-2.0",
  },
  {
    id: "hydrowatch",
    name: "HydroWatch (SIH 2026)",
    repo: "Daksh-create349/Hydrowatch-SIH26071",
    description:
      "Smart India Hackathon 2026 climate intelligence platform fusing Doppler radar (dBZ), Sentinel-2 SAR, NASA POWER, and NOAA GFS into an interactive 3D digital twin.",
    stars: 2,
    forks: 1,
    language: "Python",
    languageColor: "#3572A5",
    category: "Data & Forensics",
    tags: ["Python", "FastAPI", "Cesium 3D", "Sentinel-2", "PostGIS"],
    image: "/projects/satellite-radar-real.jpg",
    highlights: [
      "Doppler dBZ cloud-penetrating radar flood tracking",
      "Physics-based false-positive DEM and HAND drainage masking",
      "WebGL Cesium 3D twin rendering 8 dynamic spatial layers",
    ],
    url: "https://github.com/Daksh-create349/Hydrowatch-SIH26071",
  },
  {
    id: "github-guardian",
    name: "GitHub Guardian",
    repo: "Daksh-create349/Github-Guardian",
    description:
      "Forensic DevSecOps security auditing platform combining SAST with full Git Directed Acyclic Graph (DAG) traversal to uncover leaked secrets across commit histories.",
    stars: 2,
    forks: 0,
    language: "Python",
    languageColor: "#3572A5",
    category: "Security & Dev",
    tags: ["Python", "Security SAST", "Git DAG", "OAuth2"],
    image: "/projects/devsecops-real.jpg",
    highlights: [
      "Traverses ghost commits, rebases, and deleted branches",
      "Non-linear vulnerability scoring reducing false positives by 70%",
      "One-click desktop pre-commit gatekeeper wizard",
    ],
    url: "https://github.com/Daksh-create349/Github-Guardian",
  },
  {
    id: "boundary-bench",
    name: "BoundaryBench",
    repo: "Daksh-create349/BoundaryBench",
    description:
      "Local-first AI-assisted API authorization testing framework using Gemma 4 for automated security boundary stress-testing and BOLA/IDOR detection.",
    stars: 1,
    forks: 0,
    language: "Python",
    languageColor: "#3572A5",
    category: "Security & Dev",
    tags: ["Python", "API Security", "Gemma 4", "BOLA Testing"],
    highlights: [
      "Local-first automated IDOR & BOLA vulnerability prober",
      "Gemma 4 model reasoning over endpoint authorization matrices",
      "Automated OpenAPI and Swagger specification parsing",
    ],
    url: "https://github.com/Daksh-create349/BoundaryBench",
  },
  {
    id: "procrastinate-os",
    name: "Procrastinate-OS",
    repo: "Daksh-create349/Procrastinate-OS",
    description:
      "100% local-first privacy-preserving desktop productivity system that surfaces forgotten in-progress work and reduces digital clutter without external telemetry.",
    stars: 1,
    forks: 0,
    language: "Python",
    languageColor: "#3572A5",
    category: "Systems & DSP",
    tags: ["Python", "Privacy-first", "Local AI", "Desktop"],
    highlights: [
      "Zero-cloud offline file recovery and activity scoring",
      "78% clutter reduction through intelligent project grouping",
      "Instant state restoration for interrupted coding flows",
    ],
    url: "https://github.com/Daksh-create349/Procrastinate-OS",
  },
  {
    id: "lifelog",
    name: "LifeLog Daemon",
    repo: "Daksh-create349/LifeLog-Pick-up-where-you-left-off",
    description:
      "High-performance background daemon in Go recording filesystem modifications and Git branches so engineers can instantly resume context after interruptions.",
    stars: 1,
    forks: 0,
    language: "Go",
    languageColor: "#00ADD8",
    category: "Systems & DSP",
    tags: ["Go", "macOS Daemon", "Git Context", "Low-overhead"],
    highlights: [
      "Under 5MB memory footprint background event watcher",
      "Git commit and branch context snapshotting",
      "Instant CLI summary of touched files across projects",
    ],
    url: "https://github.com/Daksh-create349/LifeLog-Pick-up-where-you-left-off",
  },
  {
    id: "heatmap-wallpaper",
    name: "GitHub Contribution Wallpaper",
    repo: "Daksh-create349/Github-Contribution-Widget",
    description:
      "macOS desktop widget rendering your live GitHub contribution heatmap directly into your wallpaper with zero background battery drain.",
    stars: 1,
    forks: 0,
    language: "JavaScript",
    languageColor: "#f1e05a",
    category: "Web & Logistics",
    tags: ["JavaScript", "macOS", "GitHub API", "Wallpaper"],
    highlights: [
      "Live daily contribution streak and commit grid",
      "Adaptive dark and light wallpaper blending",
      "Zero background daemon battery consumption",
    ],
    url: "https://github.com/Daksh-create349/Github-Contribution-Widget",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "sonaura",
    title: "Sonaura 2.0 — Browser Audio DSP Extension",
    headline: "Delivering cinema-quality 3D acoustics through any headphones directly inside the browser.",
    category: "Audio DSP",
    tags: ["#AudioDSP", "#WebAudioAPI", "#ChromeExtension", "#EdgeStoreLaunch"],
    role: "Lead DSP & Systems Engineer",
    year: "2025",
    stats: "Officially Launched on Microsoft Edge Store",
    image: "/projects/sonaura-preview.jpg",
    promptExample: "Calibrating 10-band HRTF matrix for binaural 3D acoustics...",
    description:
      "Engineered a high-performance client-side audio processing pipeline as a browser extension that intercepts live tab audio and delivers immersive 3D spatial acoustics with zero external drivers, zero latency overhead, and no subscriptions.",
    impactText:
      "Engineered HRTF 5.1 spatial virtualization, convolution reverb, asymmetric subharmonic exciter, and a 48-bar spectrum visualizer running at 25 FPS.",
    demoUrl: "https://microsoftedge.microsoft.com/addons",
    githubUrl: "https://github.com/Daksh-create349/Sonaura-2.0",
    architectureHighlights: [
      {
        iconName: "Volume2",
        title: "HRTF 5.1 Virtualization",
        description: "6-channel matrix with Haas-effect interaural time delays for true 360-degree binaural spatial immersion.",
      },
      {
        iconName: "Sliders",
        title: "10-Band Parametric EQ",
        description: "Auto room-calibration powered by real-time Fast Fourier Transform (FFT) analysis.",
      },
      {
        iconName: "Waves",
        title: "Convolution Reverb",
        description: "Dual synthetic and custom impulse-response (IR) upload engine with asymmetric subharmonic exciter.",
      },
      {
        iconName: "ShieldAlert",
        title: "Brickwall Limiter",
        description: "-1 dB peak ceiling with 20:1 compression ratio guaranteeing zero clipping under heavy transients.",
      },
    ],
  },
  {
    id: "aquila",
    title: "AQUILA / HydroWatch — Climate Intelligence Engine",
    headline: "Production-grade geospatial flood detection fusing Doppler radar, Sentinel imagery, and 3D digital twins.",
    category: "Geospatial",
    tags: ["#GeospatialAI", "#Sentinel2", "#FastAPI", "#Cesium3D", "#PostGIS"],
    role: "Full-Stack & Geospatial AI Architect",
    year: "2025 – 2026",
    stats: "Sentinel-2 + NASA POWER + NOAA GFS",
    image: "/projects/hydrowatch-preview.jpg",
    promptExample: "Fusing ground weather telemetry with Sentinel-2 radar backscatter...",
    description:
      "Architected a decoupled geospatial intelligence platform (SIH 2026 PS 26071 — MoES / IMD) fusing ground weather (NASA POWER), NWP (NOAA GFS), Doppler radar (dBZ), and Sentinel-2 satellite imagery into a 3D Cesium digital twin.",
    impactText:
      "Integrated adaptive Otsu thresholding with physics-based false-positive correction (COPERNICUS DEM, HAND drainage topography) and XGBoost 5-day flood forecasts.",
    demoUrl: "https://github.com/Daksh-create349/Hydrowatch-SIH26071",
    githubUrl: "https://github.com/Daksh-create349/Hydrowatch-SIH26071",
    architectureHighlights: [
      {
        iconName: "Radio",
        title: "Doppler & SAR Pipeline",
        description: "Cloud-penetrating radar backscatter and Doppler dBZ processing for continuous flood tracking during monsoons.",
      },
      {
        iconName: "Filter",
        title: "Physics False-Positive Mask",
        description: "COPERNICUS DEM, HAND drainage topography, and JRC tidal baseline filtering for extreme precision.",
      },
      {
        iconName: "Globe",
        title: "Cesium 3D Digital Twin",
        description: "Decoupled WebGL frontend rendering 8 toggleable GeoJSON layers and flood extents at 60 FPS.",
      },
      {
        iconName: "Cpu",
        title: "XGBoost 5-Day Forecaster",
        description: "Distributed async workers predicting regional water accumulation vectors across 120-hour windows.",
      },
    ],
  },
  {
    id: "guardian",
    title: "GitHub Guardian — DevSecOps Security Auditing Platform",
    headline: "Forensic security platform combining SAST with Git DAG traversal to expose leaked secrets across commit histories.",
    category: "DevSecOps",
    tags: ["#DevSecOps", "#Forensics", "#OpenAI", "#OAuth2", "#SecuritySAST"],
    role: "Founder & DevSecOps Lead",
    year: "2025",
    stats: "Full Git DAG Commit Traversal",
    image: "/projects/guardian-preview.jpg",
    promptExample: "Traversing commit tree DAG: scanning orphan commit SHA 8f9b2a...",
    description:
      "A forensic DevSecOps platform combining Static Application Security Testing (SAST) with full Git Directed Acyclic Graph (DAG) traversal to uncover leaked API keys, SSL certs, SQLi, and XSS across active and deleted commits.",
    impactText:
      "Non-linear vulnerability scoring cuts false-positive noise by 70%. Integrated AI Architectural Reviewer with Jupyter Notebook parsing and one-click Desktop Wizard.",
    demoUrl: "https://github-guardian.vercel.app",
    githubUrl: "https://github.com/Daksh-create349/Github-Guardian",
    architectureHighlights: [
      {
        iconName: "GitBranch",
        title: "Git DAG History Traversal",
        description: "Forensically traverses ghost commits, rebases, and deleted branches where leaked credentials hide.",
      },
      {
        iconName: "ShieldCheck",
        title: "Non-Linear Scoring",
        description: "Contextual vulnerability weighting that suppresses noisy scanner alerts and elevates real attack vectors.",
      },
      {
        iconName: "Sparkles",
        title: "AI Architectural Reviewer",
        description: "OpenAI and Gemini powered code context auditor with native support for Jupyter Notebooks and PR diffs.",
      },
      {
        iconName: "FileCode",
        title: "Desktop Wizard & Hooks",
        description: "One-click local Git setup with auto-generated .gitignore rules and automated pre-commit security gates.",
      },
    ],
  },
  {
    id: "hypermind",
    title: "HyperMind — Adaptive AI Learning Companion",
    headline: "Adaptive AI education platform with Gemini 2.5 Flash/Pro, Gemini Live real-time audio, and Generative UI.",
    category: "AI & Agentics",
    tags: ["#GeminiAPI", "#GenerativeUI", "#GeminiLive", "#React19", "#ReactFlow"],
    role: "Lead AI Engineer",
    year: "2025",
    stats: "Gemini Live Real-Time Voice + Generative UI",
    image: "/projects/hypermind-preview.jpg",
    promptExample: "Synthesizing Concept Tutor mind map for Quantum Computing...",
    description:
      "Engineered an adaptive AI education platform that transforms static learning into interactive dialogue. Features Concept Tutor, Socratic Debate Mode, and dynamic Quiz Generator with deep performance telemetry.",
    impactText:
      "Built with React 19, Gemini 2.5 Flash/Pro, Gemini Live real-time voice streaming, and Generative UI rendering dynamic Recharts charts and ReactFlow mind maps.",
    demoUrl: "https://hypermind-official.vercel.app",
    githubUrl: "https://github.com/Daksh-create349/Hypermind-main",
    architectureHighlights: [
      {
        iconName: "Bot",
        title: "Gemini 2.5 Flash / Pro",
        description: "Multimodal engine accepting text, document PDFs, and image vision for comprehensive concept decomposition.",
      },
      {
        iconName: "Mic",
        title: "Gemini Live Realtime",
        description: "Bidirectional ultra-low-latency voice stream tutoring simulating natural human back-and-forth dialogue.",
      },
      {
        iconName: "Network",
        title: "Generative UI with ReactFlow",
        description: "Dynamically compiles interactive node mind maps and concept dependency trees directly in chat responses.",
      },
      {
        iconName: "Award",
        title: "Adaptive Debate & Quizzes",
        description: "Socratic devil's advocate stress-testing user understanding followed by 10-question AI evaluated MCQs.",
      },
    ],
  },
];

export const EXPERIMENTS = [
  {
    id: "contradiction-mcp",
    title: "Contradiction-MCP Engine",
    description:
      "Autonomous Model Context Protocol (MCP) engine for factual consistency, version reconciliation, and conflict resolution across engineering knowledge bases.",
    tags: ["TypeScript", "Model Context Protocol", "Knowledge Graphs"],
    demoUrl: "https://github.com/Daksh-create349/Contradiction-MCP",
    badge: "7 Stars · Top Open Source",
  },
  {
    id: "data-autopsy",
    title: "data-autopsy — AI Forensic Workstation",
    description:
      "Serious AI forensic investigation workstation for tabular datasets: detects target leakage, structural corruption, and statistical anomalies with reproducible evidence and local AI.",
    tags: ["Python", "AI Forensics", "Data Quality", "Local AI"],
    demoUrl: "https://github.com/Daksh-create349/data-autopsy",
    badge: "6 Stars · AI Forensics",
  },
  {
    id: "blood-bridge",
    title: "Blood-Bridge 3.0 Telemetry",
    description:
      "Real-time emergency blood donor matching, critical blood inventory tracking, and automated donation drive coordination.",
    tags: ["TypeScript", "HealthTech", "Geo-matching"],
    demoUrl: "https://github.com/Daksh-create349/Blood-Bridge-3.0",
    badge: "3 Stars · Health Logistics",
  },
];

export const INITIATIVES = [
  {
    name: "Google Student Ambassador",
    role: "Google",
    period: "2025 – Present",
    description: "Lead Google Cloud, Workspace & AI/ML developer workshops on campus.",
    color: "from-blue-500/20 to-emerald-500/20",
    badge: "Leadership",
  },
  {
    name: "Sahajta AI",
    role: "AI Engineer Intern",
    period: "2025",
    description: "Engineering agentic AI pipelines and multimodal application backends.",
    color: "from-purple-500/20 to-indigo-500/20",
    badge: "Industry",
  },
  {
    name: "Hack Day Winner",
    role: "Hacktoberfest x MLH",
    period: "2025",
    description: "Won Hack Day at Sardar Patel Institute of Technology; awarded Arduino UNO Q.",
    color: "from-amber-500/20 to-orange-500/20",
    badge: "1st Place",
  },
  {
    name: "Microsoft Edge Add-ons",
    role: "Store Publisher",
    period: "2025",
    description: "Officially launched Sonaura 2.0 Browser DSP Extension.",
    color: "from-cyan-500/20 to-blue-500/20",
    badge: "Production Launch",
  },
  {
    name: "100x Applied AI",
    role: "Top 3 Capstone Series",
    period: "2025",
    description: "Ranked Top 3 across cohort; awarded 25% merit scholarship.",
    color: "from-emerald-500/20 to-teal-500/20",
    badge: "Award",
  },
  {
    name: "ITM Skills University",
    role: "B.Tech CSE (Full Stack & AI/ML)",
    period: "2025 – 2029",
    description: "Sem 1: 9.3 · Sem 2: 9.83 · CGPA: 9.57. Top academic standing.",
    color: "from-rose-500/20 to-pink-500/20",
    badge: "CGPA 9.57",
  },
  {
    name: "LetsUpgrade",
    role: "Student Ambassador",
    period: "Sep 2025 – Dec 2025",
    description: "Organized coding events & technical upskilling workshops for university peers.",
    color: "from-indigo-500/20 to-violet-500/20",
    badge: "Community",
  },
];

export const JOURNEY = [
  {
    role: "Google Student Ambassador",
    org: "Google",
    location: "Mumbai, India",
    period: "2025 – Present",
    tag: "Leadership",
    summary: "Leading campus developer workshops on Google Cloud, Workspace APIs, and Google Gemini multimodal models.",
  },
  {
    role: "AI Engineer Intern",
    org: "Sahajta AI",
    location: "Remote, India",
    period: "2025 – Present",
    tag: "Work Experience",
    summary: "Architecting agentic AI pipelines, prompt evaluations, and low-latency multimodal application services.",
  },
  {
    role: "Hack Day Winner",
    org: "Hacktoberfest x MLH @ SPIT",
    location: "Mumbai, India",
    period: "2025",
    tag: "1st Place Prize",
    summary: "Won 1st Place Hack Day at Sardar Patel Institute of Technology; awarded Arduino UNO Q hardware prize.",
  },
  {
    role: "Top 3 Capstone Ranking",
    org: "100x Applied AI Cohort",
    location: "National",
    period: "2025",
    tag: "Merit Scholarship",
    summary: "Evaluated in Top 3 across national cohort for architectural rigor; awarded 25% academic merit scholarship.",
  },
  {
    role: "Student Ambassador",
    org: "LetsUpgrade",
    location: "Remote, India",
    period: "Sep 2025 – Dec 2025",
    tag: "Community Lead",
    summary: "Organized technical upskilling workshops and peer coding tournaments for university students.",
  },
  {
    role: "B.Tech Computer Science (Full Stack & AI/ML)",
    org: "ITM Skills University",
    location: "Navi Mumbai, India",
    period: "2025 – 2029",
    tag: "CGPA: 9.57",
    summary: "Sem 1: 9.30 SGPA · Sem 2: 9.83 SGPA · Cumulative CGPA: 9.57. Top percentile academic standing.",
  },
  {
    role: "HSC (Science Stream)",
    org: "Maharashtra State Board (MSBSHSE)",
    location: "Mumbai, India",
    period: "Completed March 2025",
    tag: "Pre-University",
    summary: "Higher Secondary Certificate in Physics, Chemistry, and Advanced Mathematics.",
  },
];

export interface TechItem {
  name: string;
  category: string;
  logoKey: string;
  proficiency: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "React 19", category: "Frontend", logoKey: "react", proficiency: "Expert" },
  { name: "Next.js", category: "Framework", logoKey: "nextjs", proficiency: "Production" },
  { name: "TypeScript", category: "Language", logoKey: "typescript", proficiency: "Advanced" },
  { name: "Python", category: "Language", logoKey: "python", proficiency: "Advanced" },
  { name: "FastAPI", category: "Backend", logoKey: "fastapi", proficiency: "Production" },
  { name: "Three.js", category: "3D Graphics", logoKey: "threejs", proficiency: "WebGL" },
  { name: "Google Gemini API", category: "AI / LLM", logoKey: "gemini", proficiency: "Multimodal" },
  { name: "OpenAI API", category: "AI / LLM", logoKey: "openai", proficiency: "Agents" },
  { name: "Docker", category: "DevOps", logoKey: "docker", proficiency: "Containers" },
  { name: "PostgreSQL & PostGIS", category: "Database", logoKey: "postgres", proficiency: "Spatial GIS" },
  { name: "Google Cloud & GEE", category: "Geospatial", logoKey: "gee", proficiency: "Satellite" },
  { name: "Redis", category: "Distributed", logoKey: "redis", proficiency: "Pub/Sub" },
  { name: "Web Audio API", category: "Audio DSP", logoKey: "webaudio", proficiency: "DSP Pipeline" },
  { name: "Tailwind CSS", category: "Styling", logoKey: "tailwind", proficiency: "Design System" },
  { name: "Git & SAST", category: "DevSecOps", logoKey: "git", proficiency: "Forensics" },
  { name: "XGBoost", category: "Machine Learning", logoKey: "xgboost", proficiency: "Predictive" },
  { name: "MongoDB", category: "Database", logoKey: "mongodb", proficiency: "NoSQL" },
  { name: "Firebase", category: "Cloud Services", logoKey: "firebase", proficiency: "Realtime" },
];
