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

// 8. Official OpenAI Vector Logo (Pristine Geometry)
export function OpenAILogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
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

// 16. Official XGBoost Logo (From xgboost.ai)
export function XGBoostLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 138" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(0, 138) scale(0.1, -0.1)" fill="#00A3E0">
        <path d="M285 1310 c-12 -13 -16 -29 -13 -52 8 -48 -28 -116 -70 -133 -54 -23 -62 -81 -16 -112 55 -36 109 17 85 82 -11 31 -10 39 10 75 19 33 28 40 48 38 32 -4 80 -83 62 -101 -24 -24 -5 -97 24 -97 12 0 13 -10 9 -47 -4 -27 -11 -52 -15 -57 -5 -6 -9 -25 -9 -43 0 -40 35 -67 74 -57 64 16 58 124 -7 124 -18 0 -24 45 -9 65 23 31 40 36 74 20 30 -15 33 -20 30 -54 -4 -44 14 -64 60 -64 36 0 58 24 58 63 0 35 -29 60 -68 60 -44 0 -102 30 -108 56 -7 27 -32 51 -59 56 -32 5 -65 75 -58 123 4 31 1 46 -12 58 -22 23 -68 21 -90 -3z m79 -25 c12 -31 -17 -61 -48 -49 -21 8 -28 34 -15 50 15 19 55 18 63 -1z m-119 -220 c0 -25 -4 -30 -24 -30 -32 0 -49 28 -31 50 7 9 23 15 34 13 16 -2 21 -10 21 -33z m229 13 c15 -24 -13 -53 -43 -43 -21 6 -29 43 -14 59 12 12 45 2 57 -16z m176 -107 c7 -15 6 -23 -6 -35 -19 -20 -29 -20 -48 0 -19 19 -20 26 -4 42 18 18 46 14 58 -7z m-162 -100 c6 -40 -39 -56 -58 -20 -9 15 -8 24 1 35 18 22 53 13 57 -15z" />
        <path d="M970 1273 c-25 -8 -50 -16 -57 -18 -8 -3 -6 -28 8 -92 38 -172 34 -163 82 -163 50 0 113 28 145 63 53 57 30 177 -41 210 -42 20 -77 20 -137 0z m98 -76 c6 -6 13 -24 17 -39 5 -21 1 -33 -20 -54 -14 -14 -29 -24 -31 -21 -3 3 -10 25 -15 49 -5 24 -12 51 -15 61 -4 13 1 17 24 17 16 0 34 -6 40 -13z" />
        <path d="M1245 1270 c-4 -7 -12 -66 -18 -132 -11 -131 -9 -138 45 -138 30 0 36 12 40 90 l3 45 14 -42 c12 -37 18 -43 43 -43 27 0 28 1 28 56 0 30 -4 53 -8 50 -5 -3 -22 22 -37 54 -22 47 -34 60 -51 60 -12 0 -29 3 -37 6 -8 3 -18 0 -22 -6z" />
        <path d="M1104 890 c-66 -14 -110 -36 -157 -79 -88 -81 -128 -233 -93 -353 60 -208 332 -311 514 -194 l32 21 -2 139 -3 139 -69 24 c-105 35 -111 34 -134 -37 l-21 -60 22 -14 c12 -7 34 -16 50 -20 34 -8 35 -29 2 -44 -58 -26 -131 -2 -166 55 -46 74 -4 195 79 230 48 20 109 10 164 -27 40 -27 44 -28 61 -13 15 14 17 30 15 102 l-3 86 -55 22 c-63 25 -176 36 -236 23z" />
        <path d="M500 730 c-28 -55 -53 -100 -55 -100 -3 0 -47 32 -96 70 -50 39 -95 70 -99 70 -11 0 -130 -132 -130 -145 0 -6 49 -48 110 -94 60 -46 110 -88 110 -93 0 -12 -44 -98 -91 -180 -22 -36 -39 -73 -39 -80 0 -8 32 -29 70 -48 55 -27 75 -32 88 -24 14 9 103 132 137 189 10 16 21 10 104 -54 51 -39 101 -71 110 -71 16 0 131 121 131 138 0 5 -51 48 -113 96 l-113 86 49 100 c27 55 50 114 50 132 2 31 -2 35 -68 70 -38 21 -78 38 -87 38 -13 0 -33 -30 -68 -100z" />
      </g>
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
