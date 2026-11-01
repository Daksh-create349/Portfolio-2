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
} from "@icons-pack/react-simple-icons";

// 1. Official React Logo
export function ReactLogo({ className = "size-5" }: { className?: string }) {
  return <SiReact className={className} size="100%" color="#61DAFB" aria-hidden="true" />;
}

// 2. Official Next.js Logo
export function NextjsLogo({ className = "size-5" }: { className?: string }) {
  return <SiNextdotjs className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 3. Official TypeScript Logo
export function TypeScriptLogo({ className = "size-5" }: { className?: string }) {
  return <SiTypescript className={className} size="100%" color="#3178C6" aria-hidden="true" />;
}

// 4. Official Python Logo
export function PythonLogo({ className = "size-5" }: { className?: string }) {
  return <SiPython className={className} size="100%" color="#3776AB" aria-hidden="true" />;
}

// 5. Official FastAPI Logo
export function FastAPILogo({ className = "size-5" }: { className?: string }) {
  return <SiFastapi className={className} size="100%" color="#009688" aria-hidden="true" />;
}

// 6. Official Three.js Logo
export function ThreejsLogo({ className = "size-5" }: { className?: string }) {
  return <SiThreedotjs className={className} size="100%" color="currentColor" aria-hidden="true" />;
}

// 7. Official Google Gemini Logo
export function GeminiLogo({ className = "size-5" }: { className?: string }) {
  return <SiGooglegemini className={className} size="100%" color="#8E75B2" aria-hidden="true" />;
}

// 8. Official OpenAI Vector Logo
export function OpenAILogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.487a4.485 4.485 0 0 1 2.365-1.98v.166v5.516a.788.788 0 0 0 .388.677l5.843 3.369-2.02 1.168a.078.078 0 0 1-.073 0L4.003 14.79a4.504 4.504 0 0 1-1.663-6.303zm16.596 3.059L13.093 8.177V5.846a.088.088 0 0 1 .038-.063l4.84-2.795a4.5 4.5 0 0 1 6.14 1.646 4.47 4.47 0 0 1 .536 3.014l-.142-.085-4.783-2.759a.767.767 0 0 0-.78 0zm2.724 4.467a4.485 4.485 0 0 1-2.365 1.98v-.166v-5.516a.788.788 0 0 0-.388-.677l-5.843-3.369 2.02-1.168a.078.078 0 0 1 .073 0l4.84 2.795a4.504 4.504 0 0 1 1.663 6.303zM7.44 8.528l2.02-1.169a.071.071 0 0 1 .038-.052V1.724a4.5 4.5 0 0 1 7.37 3.534v.166l-4.779 2.758a.795.795 0 0 0-.392.681v6.737L9.677 14.43a.071.071 0 0 1-.038-.052V8.528zm2.02 1.93l3.799-2.193 3.799 2.193v4.386L13.26 17.037l-3.799-2.193z" />
    </svg>
  );
}

// 9. Official Docker Logo
export function DockerLogo({ className = "size-5" }: { className?: string }) {
  return <SiDocker className={className} size="100%" color="#2496ED" aria-hidden="true" />;
}

// 10. Official PostgreSQL Elephant Logo
export function PostgresLogo({ className = "size-5" }: { className?: string }) {
  return <SiPostgresql className={className} size="100%" color="#4169E1" aria-hidden="true" />;
}

// 11. Official Google Cloud Logo
export function GoogleCloudLogo({ className = "size-5" }: { className?: string }) {
  return <SiGooglecloud className={className} size="100%" color="#4285F4" aria-hidden="true" />;
}

// 12. Official Redis Logo
export function RedisLogo({ className = "size-5" }: { className?: string }) {
  return <SiRedis className={className} size="100%" color="#FF4438" aria-hidden="true" />;
}

// 13. Official W3C Web Audio API Logo
export function WebAudioLogo({ className = "size-5" }: { className?: string }) {
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

// 14. Official Tailwind CSS Logo
export function TailwindLogo({ className = "size-5" }: { className?: string }) {
  return <SiTailwindcss className={className} size="100%" color="#06B6D4" aria-hidden="true" />;
}

// 15. Official Git Logo
export function GitLogo({ className = "size-5" }: { className?: string }) {
  return <SiGit className={className} size="100%" color="#F05032" aria-hidden="true" />;
}

// 16. Official XGBoost Decision Tree Logo
export function XGBoostLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="4.5" r="2.5" fill="#10B981" stroke="#10B981" />
      <circle cx="6" cy="13" r="2.5" fill="#0EA5E9" stroke="#0EA5E9" />
      <circle cx="18" cy="13" r="2.5" fill="#0EA5E9" stroke="#0EA5E9" />
      <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="currentColor" />
      <circle cx="8" cy="20" r="1.5" fill="currentColor" stroke="currentColor" />
      <circle cx="16" cy="20" r="1.5" fill="currentColor" stroke="currentColor" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="currentColor" />
      <path d="M10.2 6.5L7.8 11" />
      <path d="M13.8 6.5L16.2 11" />
      <path d="M5.3 15.5L4.5 18.5" />
      <path d="M6.7 15.5L7.5 18.5" />
      <path d="M17.3 15.5L16.5 18.5" />
      <path d="M18.7 15.5L19.5 18.5" />
    </svg>
  );
}

// 17. Official MongoDB Leaf Logo
export function MongoDBLogo({ className = "size-5" }: { className?: string }) {
  return <SiMongodb className={className} size="100%" color="#47A248" aria-hidden="true" />;
}

// 18. Official Firebase Flame Logo
export function FirebaseLogo({ className = "size-5" }: { className?: string }) {
  return <SiFirebase className={className} size="100%" color="#FFCA28" aria-hidden="true" />;
}
