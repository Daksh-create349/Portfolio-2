import React from "react";

// Official vector SVG logos for tech stack
export function ReactLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 115.3 100" fill="none" aria-hidden="true">
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(30 57.65 50)" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(90 57.65 50)" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" transform="rotate(150 57.65 50)" stroke="#61DAFB" strokeWidth="6" />
      <circle cx="57.65" cy="50" r="10" fill="#61DAFB" />
    </svg>
  );
}

export function NextjsLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <circle cx="90" cy="90" r="88" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="4" />
      <path
        d="M149.508 157.086L69.142 54H54V125.97H66.2136V69.3874L139.999 164.845C143.333 162.476 146.516 159.878 149.508 157.086Z"
        fill="currentColor"
      />
      <rect x="115" y="54" width="12" height="72" fill="currentColor" />
    </svg>
  );
}

export function TypeScriptLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        d="M56.2 92.5c-3.5 3-7.5 4.6-12.8 4.6-6.4 0-11.6-2.2-15.1-6.4-3.5-4.2-5.1-10.4-5.1-18.4 0-8.2 1.8-14.6 5.3-18.9 3.6-4.3 8.9-6.5 15.6-6.5 4.9 0 9 1.4 12.1 4.1l-5.4 9.1c-2.3-1.8-4.7-2.7-7.4-2.7-3.4 0-6 1.2-7.8 3.6-1.8 2.4-2.6 6.3-2.6 11.5 0 5.2.8 9 2.5 11.4 1.7 2.4 4.3 3.6 7.7 3.6 3 0 5.5-1 7.6-3.1l5.4 8.2zm20.8-37.8h-14.2v-9.6h39.7v9.6h-14.2v49.9h-11.3V54.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PythonLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 110" fill="none" aria-hidden="true">
      <path
        d="M54.1 6.5c-24.8 0-23.3 10.7-23.3 10.7l.1 11.1h23.7v3.4H21.2S6.5 30 6.5 54.8c0 24.8 12.9 23.9 12.9 23.9h7.7v-10.9s-.4-12.9 12.7-12.9h21.9s12.3-.2 12.3-12.1V18.6s1.9-12.1-20-12.1zm-13 7.3c2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4z"
        fill="#387EB8"
      />
      <path
        d="M55.9 103.5c24.8 0 23.3-10.7 23.3-10.7l-.1-11.1H55.4v-3.4h33.4s14.7 1.7 14.7-23.1c0-24.8-12.9-23.9-12.9-23.9h-7.7v10.9s.4 12.9-12.7 12.9H48.6s-12.3.2-12.3 12.1v14.2s-1.9 12.1 20 12.1zm13-7.3c-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4 2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4z"
        fill="#FFE873"
      />
    </svg>
  );
}

export function FastAPILogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <circle cx="64" cy="64" r="64" fill="#059669" />
      <path
        d="M68.5 24L38 71.5h23.5L58 104l32-47.5H66.5L68.5 24z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ThreejsLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" aria-hidden="true">
      <path d="M64 12L116 102H12L64 12Z" />
      <path d="M64 42L90 87H38L64 42Z" />
      <path d="M64 72L77 94H51L64 72Z" />
    </svg>
  );
}

export function GeminiLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M64 0C64 35.346 35.346 64 0 64C35.346 64 64 92.654 64 128C64 92.654 92.654 64 128 64C92.654 64 64 35.346 64 0Z"
        fill="url(#gemini-grad)"
      />
      <defs>
        <linearGradient id="gemini-grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1BA1E3" />
          <stop offset="0.5" stopColor="#5B7FFF" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function OpenAILogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="currentColor" aria-hidden="true">
      <path d="M116.8 54.2c-.8-6.1-4-11.6-8.9-15.3-3.6-2.8-8-4.5-12.7-4.9-1.2-4.5-3.8-8.5-7.4-11.5-5.3-4.4-12.2-6.4-19-5.4-3.5.5-6.8 1.9-9.8 4-2.8-3.4-6.6-5.8-10.9-6.9-6.4-1.6-13.2-.6-18.8 2.8-4.9 3-8.6 7.7-10.4 13.2-4.7 1.1-8.9 3.6-12.1 7.2-4.6 5.2-6.9 12-6.4 18.9.2 3.5 1.3 6.9 3.2 9.9-3.4 2.8-5.8 6.6-6.9 10.9-1.6 6.4-.6 13.2 2.8 18.8 3 4.9 7.7 8.6 13.2 10.4 1.1 4.7 3.6 8.9 7.2 12.1 5.2 4.6 12 6.9 18.9 6.4 3.5-.2 6.9-1.3 9.9-3.2 2.8 3.4 6.6 5.8 10.9 6.9 2.2.6 4.4.8 6.6.8 4.3 0 8.5-.9 12.2-2.7 4.9-2.4 8.9-6.3 11.4-11.3 4.7-1.1 8.9-3.6 12.1-7.2 4.6-5.2 6.9-12 6.4-18.9-.2-3.6-1.3-7-3.2-10 3.4-2.8 5.8-6.6 6.9-10.9 1.6-6.5.6-13.3-2.8-18.9zM64 74.4c-5.7 0-10.4-4.7-10.4-10.4s4.7-10.4 10.4-10.4 10.4 4.7 10.4 10.4-4.7 10.4-10.4 10.4z" />
    </svg>
  );
}

export function DockerLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M123.6 52.3c-2.8-1.9-8.4-3.1-13.3-2.1-.8-6.4-5.3-11.8-11.8-13.7-1.2-.4-2.4-.6-3.6-.6-1.5 0-3 .3-4.4.9-5.9 2.7-9.4 8.7-8.6 15.2-4.6 2.5-12.7 2.8-17.7.8l-1.3-.5-1 .9c-11.2 10.4-25.7 16-41 16H18v9.5c0 14.1 5.6 27.6 15.6 37.6s23.5 15.6 37.6 15.6c27.8 0 52-20.1 56.6-47.5 7.8-3.4 13.9-9.9 16.5-18l1.1-3.6-1.8-1.1z"
        fill="#2496ED"
      />
      <rect x="29" y="52" width="11" height="9" rx="1.5" fill="#2496ED" />
      <rect x="43" y="52" width="11" height="9" rx="1.5" fill="#2496ED" />
      <rect x="57" y="52" width="11" height="9" rx="1.5" fill="#2496ED" />
      <rect x="43" y="40" width="11" height="9" rx="1.5" fill="#2496ED" />
      <rect x="57" y="40" width="11" height="9" rx="1.5" fill="#2496ED" />
      <rect x="71" y="40" width="11" height="9" rx="1.5" fill="#2496ED" />
      <rect x="57" y="28" width="11" height="9" rx="1.5" fill="#2496ED" />
    </svg>
  );
}

export function PostgresLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M64.6 13.6c-17.1 0-31 13.9-31 31 0 5.4 1.4 10.5 3.9 15-7.7 2.2-13.4 9.1-13.4 17.5 0 9.7 7.7 17.6 17.3 17.8v19.5h10.4V94.8c4.1.8 8.4 1.2 12.8 1.2 4.4 0 8.7-.4 12.8-1.2v19.6h10.4V94.9c9.6-.2 17.3-8.1 17.3-17.8 0-8.4-5.7-15.3-13.4-17.5 2.5-4.5 3.9-9.6 3.9-15 0-17.1-13.9-31-31-31z"
        fill="#336791"
      />
    </svg>
  );
}

export function GoogleCloudLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M65.4 34.2c-15.3 0-28 11-30.8 25.6-2.1-.5-4.3-.8-6.6-.8-14.4 0-26 11.6-26 26s11.6 26 26 26h68c13.3 0 24-10.7 24-24 0-12.2-9.1-22.3-21-23.8-1.5-16.1-15-29-31.6-29z"
        fill="#4285F4"
      />
      <circle cx="88" cy="62" r="14" fill="#34A853" fillOpacity="0.4" />
    </svg>
  );
}

export function RedisLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M15.4 46.2L64 21.6l48.6 24.6L64 70.8 15.4 46.2z"
        fill="#D82C20"
      />
      <path
        d="M15.4 56.6L64 81.2l48.6-24.6v15L64 96.2l-48.6-24.6v-15z"
        fill="#A32219"
      />
      <path
        d="M15.4 77.2L64 101.8l48.6-24.6v15L64 116.8l-48.6-24.6v-15z"
        fill="#821B14"
      />
    </svg>
  );
}

export function WebAudioLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" aria-hidden="true">
      <path d="M16 64h12" />
      <path d="M38 44v40" />
      <path d="M54 28v72" />
      <path d="M70 16v96" />
      <path d="M86 36v56" />
      <path d="M102 52v24" />
      <path d="M112 64h4" />
    </svg>
  );
}

export function TailwindLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M64 28c-18 0-29.3 9-34 27 6.7-9 14.7-12.3 24-10 5.3 1.3 9.1 5.2 13.3 9.5C70.2 61.5 78.5 70 98 70c18 0 29.3-9 34-27-6.7 9-14.7 12.3-24 10-5.3-1.3-9.1-5.2-13.3-9.5C87.8 36.5 79.5 28 64 28zm-34 42c-18 0-29.3 9-34 27 6.7-9 14.7-12.3 24-10 5.3 1.3 9.1 5.2 13.3 9.5C40.2 103.5 48.5 112 68 112c18 0 29.3-9 34-27-6.7 9-14.7 12.3-24 10-5.3-1.3-9.1-5.2-13.3-9.5C57.8 78.5 49.5 70 30 70z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function GitLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M125.7 58.7L69.3 2.3c-3.1-3.1-8.1-3.1-11.2 0L46.8 13.6l14.2 14.2c3.3-1.1 7.2-.3 9.8 2.2 2.6 2.6 3.3 6.4 2.2 9.8l13.7 13.7c3.3-1.1 7.2-.3 9.8 2.2 3.6 3.6 3.6 9.5 0 13.1-3.6 3.6-9.5 3.6-13.1 0-2.8-2.8-3.4-6.9-2-10.2L68.7 45.9v35.8c1 .5 1.9 1.2 2.7 2 3.6 3.6 3.6 9.5 0 13.1-3.6 3.6-9.5 3.6-13.1 0-3.6-3.6-3.6-9.5 0-13.1.9-.9 2-1.6 3.2-2.1V44.9c-1.2-.5-2.3-1.2-3.2-2.1-2.8-2.8-3.4-6.9-2-10.2L42.1 18.4 2.3 58.2c-3.1 3.1-3.1 8.1 0 11.2l56.4 56.4c3.1 3.1 8.1 3.1 11.2 0l55.8-55.8c3.1-3.2 3.1-8.2 0-11.3z"
        fill="#F05032"
      />
    </svg>
  );
}

export function XGBoostLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <rect width="128" height="128" rx="24" fill="#0284C7" />
      <path
        d="M32 96L64 32l32 64H78L64 54 50 96H32z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function MongoDBLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M64 4C61 4 52 26 52 58c0 30 11 50 12 52 1-2 12-22 12-52 0-32-9-54-12-54z"
        fill="#13AA52"
      />
      <path
        d="M64 110c-1-2-12-22-12-52 0-26 6-46 11-52l1 104z"
        fill="#00ED64"
      />
    </svg>
  );
}

export function FirebaseLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M26.4 97.4L44.8 22.8c.4-1.6 2.5-2.1 3.6-.9l16.1 18.4-38.1 57.1z"
        fill="#FFA000"
      />
      <path
        d="M74.9 51.5l12.4-14.2c.9-1 2.5-.7 2.9.5l18.4 60.1-33.7-46.4z"
        fill="#F57C00"
      />
      <path
        d="M20.6 98.4l41.2 23.1c1.4.8 3.1.8 4.5 0l41.2-23.1-86.9 0z"
        fill="#FFCA28"
      />
    </svg>
  );
}

