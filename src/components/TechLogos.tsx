import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiThreedotjs,
  SiDocker,
  SiPostgresql,
  SiGooglecloud,
  SiRedis,
  SiTailwindcss,
  SiGit,
  SiMongodb,
  SiFirebase,
  SiGooglegemini,
  SiClaude,
  SiVercel,
  SiFigma,
} from "@icons-pack/react-simple-icons";

// 1. Official React Logo
export function ReactLogo({ className = "size-7" }: { className?: string }) {
  return <SiReact className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 2. Official Next.js Logo
export function NextjsLogo({ className = "size-7" }: { className?: string }) {
  return <SiNextdotjs className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 3. Official TypeScript Logo
export function TypeScriptLogo({ className = "size-7" }: { className?: string }) {
  return <SiTypescript className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 4. Official Python Logo
export function PythonLogo({ className = "size-7" }: { className?: string }) {
  return <SiPython className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 5. Official FastAPI Logo
export function FastAPILogo({ className = "size-7" }: { className?: string }) {
  return <SiFastapi className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 6. Official Three.js Logo
export function ThreejsLogo({ className = "size-7" }: { className?: string }) {
  return <SiThreedotjs className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 7. Official Google Gemini Logo
export function GeminiLogo({ className = "size-7" }: { className?: string }) {
  return <SiGooglegemini className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 8. Official OpenAI Vector Logo (Pristine Mathematical Rosette)
export function OpenAILogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

// 9. Official Claude (Anthropic) Logo
export function ClaudeLogo({ className = "size-7" }: { className?: string }) {
  return <SiClaude className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 10. Official Vercel Delta Logo
export function VercelLogo({ className = "size-7" }: { className?: string }) {
  return <SiVercel className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 11. Official Figma Logo
export function FigmaLogo({ className = "size-7" }: { className?: string }) {
  return <SiFigma className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 12. Official Docker Container Logo
export function DockerLogo({ className = "size-7" }: { className?: string }) {
  return <SiDocker className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 13. Official PostgreSQL Elephant Logo
export function PostgresLogo({ className = "size-7" }: { className?: string }) {
  return <SiPostgresql className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 14. Official Google Cloud Logo
export function GoogleCloudLogo({ className = "size-7" }: { className?: string }) {
  return <SiGooglecloud className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 15. Official Redis Logo
export function RedisLogo({ className = "size-7" }: { className?: string }) {
  return <SiRedis className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 16. Official W3C Web Audio API Equalizer
export function WebAudioLogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10v4" />
      <path d="M6 6v12" />
      <path d="M10 3v18" />
      <path d="M14 8v8" />
      <path d="M18 5v14" />
      <path d="M22 10v4" />
    </svg>
  );
}

// 17. Official Tailwind CSS Logo
export function TailwindLogo({ className = "size-7" }: { className?: string }) {
  return <SiTailwindcss className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 18. Official Git Logo
export function GitLogo({ className = "size-7" }: { className?: string }) {
  return <SiGit className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 19. Authentic Gradient Boosted Decision Tree (XGBoost) Node Vector
export function XGBoostLogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Root Node */}
      <circle cx="12" cy="4" r="2.5" fill="currentColor" />
      {/* Branches */}
      <path d="M10.5 5.8L6.5 11M13.5 5.8L17.5 11" />
      {/* Intermediate Child Nodes */}
      <circle cx="6" cy="12.5" r="2.2" fill="currentColor" />
      <circle cx="18" cy="12.5" r="2.2" fill="currentColor" />
      {/* Leaf Branches */}
      <path d="M4.8 14.5L3 18.5M7.2 14.5L9 18.5M16.8 14.5L15 18.5M19.2 14.5L21 18.5" />
      {/* Leaf Nodes */}
      <circle cx="3" cy="20" r="1.6" fill="currentColor" />
      <circle cx="9" cy="20" r="1.6" fill="currentColor" />
      <circle cx="15" cy="20" r="1.6" fill="currentColor" />
      <circle cx="21" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}

// 20. Official MongoDB Leaf Logo
export function MongoDBLogo({ className = "size-7" }: { className?: string }) {
  return <SiMongodb className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 21. Official Firebase Flame Logo
export function FirebaseLogo({ className = "size-7" }: { className?: string }) {
  return <SiFirebase className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 22. DevSecOps Security Shield Vector
export function DevSecOpsLogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
