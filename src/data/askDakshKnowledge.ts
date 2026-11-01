export interface ChatAnswer {
  keywords: string[];
  response: string;
  suggestedFollowUps?: string[];
}

export const KNOWLEDGE_BASE: ChatAnswer[] = [
  {
    keywords: ["sonaura", "audio", "dsp", "5.1", "sound", "hrtf", "headphones", "reverb"],
    response: `**Sonaura 2.0** is my flagship browser audio DSP extension, officially launched on the **Microsoft Edge Add-ons Store**! 🎧

Key highlights:
- **Zero Drivers / Subscriptions**: Intercepts live tab audio via the **Web Audio API** in real-time.
- **HRTF Virtual 5.1 Surround**: 6-channel matrix leveraging Haas-effect micro-delays for true spatial positioning.
- **10-Band Parametric EQ**: Integrated auto room-calibration through FFT spectrum analysis.
- **Advanced DSP Chain**: Convolution reverb with custom IR upload, asymmetric subharmonic exciter, and a -1 dB brickwall limiter preventing transients from clipping.
- **Performance**: 48-bar spectrum visualizer running at 25 FPS with an ink-on-paper light/dark interface.`,
    suggestedFollowUps: [
      "Tell me about AQUILA",
      "What is your GPA at university?",
      "How does GitHub Guardian work?",
    ],
  },
  {
    keywords: ["aquila", "flood", "climate", "geospatial", "earth engine", "gee", "sar", "sentinel", "three.js"],
    response: `**AQUILA** is a production-grade climate intelligence engine for global flood detection and forecasting! 🌍

Architecture breakdown:
- **Sentinel-1 SAR Radar**: Cloud-penetrating synthetic aperture radar imagery processed via **Google Earth Engine**—critical for all-weather monitoring during monsoons.
- **Physics-Based False Positive Filter**: Adaptive Otsu thresholding coupled with **COPERNICUS DEM**, HAND drainage topography, and JRC tidal baselines.
- **Three.js 3D Interactive Globe**: Decoupled React 19 + Three.js frontend rendering 8 toggleable GeoJSON layers at 60 FPS.
- **Forecasting Pipeline**: Async **FastAPI** backend with Dockerized **Celery & Redis** workers running an **XGBoost 5-day flood prediction model**.`,
    suggestedFollowUps: [
      "Tell me about Sonaura",
      "What awards have you won?",
      "How do I get in touch to hire you?",
    ],
  },
  {
    keywords: ["guardian", "security", "devsecops", "sast", "git", "dag", "vulnerability", "audit"],
    response: `**GitHub Guardian** is a forensic DevSecOps platform combining SAST with deep Git DAG traversal! 🛡️

Why it's unique:
- **Deleted Commit Forensics**: Traverses the entire Git Directed Acyclic Graph (DAG) to uncover API keys, SSL certificates, SQL injection, and XSS across active *and deleted* commits.
- **Noise Suppression**: Non-linear vulnerability weighting reduces false-positive alerts by over 70%.
- **AI Architectural Reviewer**: Integrated OpenAI and Gemini reviewers for code security audits and Jupyter Notebook analysis.
- **Desktop Wizard**: Shipped a one-click local setup that automatically provisions pre-commit hooks and tailored \`.gitignore\` rules. Deployed at [github-guardian.vercel.app](https://github-guardian.vercel.app).`,
    suggestedFollowUps: [
      "Tell me about HyperMind",
      "What is your tech stack?",
      "Can I view your resume?",
    ],
  },
  {
    keywords: ["hypermind", "gemini", "learning", "education", "quiz", "tutor", "reactflow", "recharts"],
    response: `**HyperMind** is an adaptive AI learning companion powered by Google Gemini 2.5 Flash/Pro and Gemini Live! ✨

Core capabilities:
- **Gemini Live Realtime**: Real-time bidirectional voice tutoring that feels like speaking to a human professor.
- **Generative UI**: Dynamically compiles live **Recharts** analytics and interactive **ReactFlow** concept mind maps in real-time response streams.
- **Concept Tutor & Debate Mode**: Uses a Socratic devil's advocate method to challenge user assumptions before generating 10-question adaptive MCQs with diagnostic breakdown.
- **Multimodal Input**: Processes document PDFs, image diagrams, and speech. Deployed at [hypermind-official.vercel.app](https://hypermind-official.vercel.app).`,
    suggestedFollowUps: [
      "Tell me about your Google Student Ambassador role",
      "What are your top projects?",
      "How do I contact Daksh?",
    ],
  },
  {
    keywords: ["gpa", "education", "college", "university", "itm", "grades", "score", "b.tech", "academics"],
    response: `Daksh is currently pursuing his **B.Tech in Computer Science Engineering (Full Stack & AI/ML)** at **ITM Skills University**, Navi Mumbai (Expected Dec 2029). 🎓

Academic stats:
- **Cumulative CGPA: 9.57 / 10.0**
- **Semester 1 SGPA: 9.30**
- **Semester 2 SGPA: 9.83**
- Completed HSC (Science Stream) from Maharashtra State Board (MSBSHSE) in March 2025.`,
    suggestedFollowUps: [
      "What awards has Daksh won?",
      "Tell me about Sonaura 2.0",
      "What are Daksh's technical skills?",
    ],
  },
  {
    keywords: ["award", "achievement", "hackathon", "winner", "prize", "hacktoberfest", "mlh", "100x"],
    response: `Daksh has achieved recognition in competitive hackathons and cohorts: 🏆

1. **Hack Day Winner — Hacktoberfest x MLH**:
   - Won 1st place at the Hack Day organized by Hacktoberfest & Major League Hacking at Sardar Patel Institute of Technology (SPIT). Awarded an **Arduino UNO Q**.
2. **Top 3 — 100x Applied AI Open Capstone Series**:
   - Ranked in the top 3 out of all national participants; awarded a **25% merit scholarship** to the 100x Applied AI Cohort.
3. **National Hackathon Finalist (2024–2025)**:
   - Built under high-pressure competitive conditions demonstrating full-stack and AI speed.
4. **Google Student Ambassador**:
   - Selected to represent Google Cloud and AI/ML developer programs on campus.`,
    suggestedFollowUps: [
      "What is Daksh's experience?",
      "Is Daksh open for internships?",
      "Tell me about Sonaura 2.0",
    ],
  },
  {
    keywords: ["google", "ambassador", "gdsc", "cloud", "workshop"],
    response: `As a **Google Student Ambassador** (2025 – Present), Daksh: 🌟
- Leads campus developer workshops on **Google Cloud, Google Workspace, and AI/ML developer technologies**.
- Bridges Google developer programs (GDSC, Google Career Certificates) with the university ecosystem to accelerate student upskilling and community hackathons.`,
    suggestedFollowUps: [
      "What other leadership experience does Daksh have?",
      "Tell me about AQUILA",
      "How can I contact Daksh?",
    ],
  },
  {
    keywords: ["contact", "hire", "email", "phone", "linkedin", "github", "connect", "call", "reach"],
    response: `You can reach Daksh directly across any of these channels: 📬

- **Email**: [dakshshrivastav56@gmail.com](mailto:dakshshrivastav56@gmail.com)
- **Phone**: +91-9588415901 (Mumbai, India)
- **LinkedIn**: [linkedin.com/in/daksh-srivastava-2ba851344](https://www.linkedin.com/in/daksh-srivastava-2ba851344)
- **GitHub**: [github.com/Daksh-create349](https://github.com/Daksh-create349)
- **Portfolio**: [dakshsportfolio.vercel.app](https://dakshsportfolio.vercel.app)

Daksh is actively open to **Software Engineering, AI Engineering, and DevSecOps internship and project opportunities**!`,
    suggestedFollowUps: [
      "Tell me about Sonaura 2.0",
      "What is Daksh's tech stack?",
      "What are his hackathon achievements?",
    ],
  },
  {
    keywords: ["stack", "skills", "tech", "languages", "tools", "python", "react", "fastapi"],
    response: `Daksh's core technical stack spans systems, AI, and full-stack engineering: 💻

- **Languages**: Python, TypeScript, JavaScript, SQL, HTML5, CSS3
- **Frontend**: React 19, Next.js, Tailwind CSS, Three.js, Recharts, ReactFlow
- **Backend & APIs**: FastAPI, Node.js, Express.js, Web Audio API, JWT, OAuth 2.0
- **AI & ML**: Google Gemini API, OpenAI API, XGBoost, Prompt Engineering, Gemini Live Realtime
- **Data & Databases**: PostgreSQL, PostGIS, MongoDB, Redis, Google Earth Engine
- **DevOps & Cloud**: Docker, Celery, Firebase, Vercel, Git DAG Forensics`,
    suggestedFollowUps: [
      "Explain AQUILA's climate engine",
      "How does Sonaura 2.0 work?",
      "How can I contact Daksh?",
    ],
  },
];

export function getDakshAnswer(query: string): { response: string; followUps: string[] } {
  const cleanQuery = query.toLowerCase().trim();

  // Search through knowledge base for matching keywords
  let bestMatch: ChatAnswer | null = null;
  let maxScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (cleanQuery.includes(kw)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && maxScore > 0) {
    return {
      response: bestMatch.response,
      followUps: bestMatch.suggestedFollowUps || [
        "What are your top projects?",
        "What is your GPA?",
        "How can I get in touch?",
      ],
    };
  }

  // Fallback answer
  return {
    response: `Hi there! I'm Daksh's interactive portfolio assistant. Daksh is a **Full-stack Developer & CS Undergraduate (CGPA: 9.57)** at ITM Skills University, a **Google Student Ambassador**, and builder of production systems like **Sonaura 2.0** (Edge Store), **AQUILA** (Geospatial SAR AI), **GitHub Guardian** (DevSecOps), and **HyperMind** (Gemini Live).

Feel free to ask me anything about his projects, architecture choices, awards, or internship availability!`,
    followUps: [
      "Tell me about Sonaura 2.0",
      "Explain AQUILA flood engine",
      "What is Daksh's GPA and college?",
      "How do I contact Daksh to hire him?",
    ],
  };
}

