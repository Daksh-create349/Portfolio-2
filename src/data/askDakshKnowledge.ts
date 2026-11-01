export interface ChatAnswer {
  keywords: string[];
  response: string;
  suggestedFollowUps?: string[];
}

export const KNOWLEDGE_BASE: ChatAnswer[] = [
  {
    keywords: ["contradiction", "mcp", "model context protocol", "reconciliation"],
    response: `**Contradiction-MCP** (⭐ 7 Stars on GitHub) is my autonomous **Model Context Protocol (MCP)** engine for engineering knowledge bases! 🧠

Key capabilities:
- **Autonomous Conflict Resolution**: Resolves factual divergences, API signature drift, and version contradictions between separate documentation sources.
- **Model Context Protocol Native**: Seamlessly integrates with Claude, Antigravity, and Cursor via standardized MCP tool schemas.
- **Consensus & Provenance**: Tracks authoritative source weighting with cryptographically verifiable provenance.
- Repository: [github.com/Daksh-create349/Contradiction-MCP](https://github.com/Daksh-create349/Contradiction-MCP)`,
    suggestedFollowUps: [
      "Tell me about data-autopsy",
      "Tell me about Sonaura 2.0",
      "What is your GPA?",
    ],
  },
  {
    keywords: ["data-autopsy", "autopsy", "forensic", "tabular", "leakage", "corruption"],
    response: `**data-autopsy** (⭐ 6 Stars on GitHub) is an AI forensic investigation workstation for tabular datasets! 🔬

What it does:
- **Target Leakage Detection**: Scans feature covariance matrices to catch predictive leakage before model training.
- **Structural Corruption Auditing**: Identifies silent schema mutations, bit flips, and statistical distribution shifts.
- **Local AI Verification**: Runs 100% locally with zero cloud dependencies to protect sensitive datasets.
- Repository: [github.com/Daksh-create349/data-autopsy](https://github.com/Daksh-create349/data-autopsy)`,
    suggestedFollowUps: [
      "Tell me about Contradiction-MCP",
      "Tell me about HydroWatch",
      "How do I contact Daksh?",
    ],
  },
  {
    keywords: ["blood-bridge", "blood", "donor", "hospital", "health"],
    response: `**Blood-Bridge 3.0** (⭐ 3 Stars on GitHub) is an emergency blood logistics and donor matching platform! 🩸

Highlights:
- **Real-Time Inventory Telemetry**: Live hospital ICU blood bank stock tracking with critical shortage alerts.
- **Geospatial Donor Dispatch**: Matches urgent recipient calls with nearby verified donors based on distance matrix algorithms.
- **Donation Drive Automation**: Organizes community donation camps and handles digital verification certificates.
- Repository: [github.com/Daksh-create349/Blood-Bridge-3.0](https://github.com/Daksh-create349/Blood-Bridge-3.0)`,
    suggestedFollowUps: [
      "Tell me about Sonaura 2.0",
      "What awards has Daksh won?",
      "Can I view your GitHub?",
    ],
  },
  {
    keywords: ["github", "repos", "repositories", "popular", "stars", "open source"],
    response: `Daksh has 100+ public repositories on GitHub ([github.com/Daksh-create349](https://github.com/Daksh-create349)) spanning AI, DSP, DevSecOps, and Systems: 🌟

Top Starred & Flagship Repositories:
1. **Contradiction-MCP** (⭐ 7 Stars): Autonomous Model Context Protocol engine for factual reconciliation.
2. **data-autopsy** (⭐ 6 Stars): AI forensic investigation workstation for tabular datasets.
3. **Blood-Bridge 3.0** (⭐ 3 Stars): Emergency health logistics & live donor dispatch platform.
4. **Sonaura-2.0**: Client-side browser DSP extension launched on the Microsoft Edge Store.
5. **Hydrowatch-SIH26071** (SIH 2026): Rainfall early warning & 3D Cesium flood digital twin.
6. **BoundaryBench**: Local-first AI API authorization testing framework with Gemma 4.
7. **Procrastinate-OS**: Privacy-preserving desktop productivity OS.
8. **LifeLog**: Go-based macOS filesystem & git history activity recorder.
9. **Github-Contribution-Widget**: Native macOS wallpaper contribution heatmap.
10. **Notes-Automation**: Groq Whisper audio chunker + LLaMA 3.3 Notion syncer.`,
    suggestedFollowUps: [
      "Tell me about Contradiction-MCP",
      "Tell me about Sonaura 2.0",
      "How can I contact Daksh?",
    ],
  },
  {
    keywords: ["sonaura", "audio", "dsp", "5.1", "sound", "hrtf", "headphones", "reverb"],
    response: `**Sonaura 2.0** is my flagship browser audio DSP extension, officially launched on the **Microsoft Edge Add-ons Store**! 🎧

Key highlights:
- **Zero Drivers / Subscriptions**: Intercepts live tab audio via the **Web Audio API** in real-time.
- **HRTF Virtual 5.1 Surround**: 6-channel matrix leveraging Haas-effect micro-delays for true spatial positioning.
- **10-Band Parametric EQ**: Integrated auto room-calibration through FFT spectrum analysis.
- **Advanced DSP Chain**: Convolution reverb with custom IR upload, asymmetric subharmonic exciter, and a -1 dB brickwall limiter preventing transients from clipping.
- **Performance**: 48-bar spectrum visualizer running at 25 FPS with an ink-on-paper light/dark interface.
- GitHub: [github.com/Daksh-create349/Sonaura-2.0](https://github.com/Daksh-create349/Sonaura-2.0)`,
    suggestedFollowUps: [
      "Tell me about Contradiction-MCP",
      "What is your GPA at university?",
      "How does GitHub Guardian work?",
    ],
  },
  {
    keywords: ["aquila", "hydrowatch", "flood", "climate", "geospatial", "earth engine", "gee", "sar", "sentinel"],
    response: `**AQUILA / HydroWatch** (SIH 2026 PS 26071 — MoES / IMD) is a production-grade climate intelligence engine! 🌍

Architecture breakdown:
- **Doppler Radar (dBZ) & Sentinel-2**: Cloud-penetrating radar backscatter processed via **Google Earth Engine** and Cesium 3D.
- **Physics-Based False Positive Filter**: Adaptive Otsu thresholding coupled with **COPERNICUS DEM**, HAND drainage topography, and JRC tidal baselines.
- **Cesium 3D Digital Twin**: Decoupled React 19 + Cesium frontend rendering 8 toggleable GeoJSON layers at 60 FPS.
- **Forecasting Pipeline**: Async **FastAPI** backend with Dockerized **Celery & Redis** workers running an **XGBoost 5-day flood prediction model**.
- GitHub: [github.com/Daksh-create349/Hydrowatch-SIH26071](https://github.com/Daksh-create349/Hydrowatch-SIH26071)`,
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
- **Desktop Wizard**: Shipped a one-click local setup that automatically provisions pre-commit hooks and tailored \`.gitignore\` rules. Deployed at [github-guardian.vercel.app](https://github-guardian.vercel.app).
- GitHub: [github.com/Daksh-create349/Github-Guardian](https://github.com/Daksh-create349/Github-Guardian)`,
    suggestedFollowUps: [
      "Tell me about Contradiction-MCP",
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
- **Multimodal Input**: Processes document PDFs, image diagrams, and speech. Deployed at [hypermind-official.vercel.app](https://hypermind-official.vercel.app).
- GitHub: [github.com/Daksh-create349/Hypermind-main](https://github.com/Daksh-create349/Hypermind-main)`,
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
      "Tell me about Contradiction-MCP",
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
      "Tell me about Contradiction-MCP",
      "What is Daksh's tech stack?",
      "What are his hackathon achievements?",
    ],
  },
];

export function getDakshAnswer(query: string): { response: string; followUps: string[] } {
  const cleanQuery = query.toLowerCase().trim();

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

  return {
    response: `Hi there! I'm Daksh's interactive portfolio assistant. Daksh is a **Full-stack Developer & CS Undergraduate (CGPA: 9.57)** at ITM Skills University, a **Google Student Ambassador**, and author of popular open-source engines like **Contradiction-MCP** (⭐ 7 Stars), **data-autopsy** (⭐ 6 Stars), **Blood-Bridge 3.0** (⭐ 3 Stars), **Sonaura 2.0** (Edge Store), and **HydroWatch** (SIH 2026).

Feel free to ask me anything about his projects, architecture choices, awards, or internship availability!`,
    followUps: [
      "What are Daksh's most popular GitHub repos?",
      "Tell me about Contradiction-MCP",
      "Explain data-autopsy AI forensics",
      "How do I contact Daksh to hire him?",
    ],
  };
}
