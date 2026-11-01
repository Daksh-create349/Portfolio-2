import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daksh Srivastava — Full-Stack & AI Systems Engineer",
  description:
    "Portfolio of Daksh Srivastava: CS Undergraduate (CGPA 9.57), Google Student Ambassador, Builder of Sonaura 2.0 (Audio DSP), AQUILA (Geospatial Climate AI), GitHub Guardian (DevSecOps), and HyperMind.",
  keywords: [
    "Daksh Srivastava",
    "Portfolio",
    "Full-Stack Developer",
    "AI Engineer",
    "DevSecOps",
    "Geospatial Intelligence",
    "Sonaura",
    "AQUILA",
    "GitHub Guardian",
    "HyperMind",
    "Google Student Ambassador",
  ],
  authors: [{ name: "Daksh Srivastava" }],
  creator: "Daksh Srivastava",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dakshsportfolio.vercel.app",
    title: "Daksh Srivastava — Full-Stack & AI Systems Engineer",
    description:
      "Full-stack Developer & CS Undergraduate. Engineering high-precision AI, Audio DSP, and DevSecOps applications.",
    siteName: "Daksh Srivastava Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daksh Srivastava — Full-Stack & AI Systems Engineer",
    description:
      "Full-stack Developer & CS Undergraduate. Engineering high-precision AI, Audio DSP, and DevSecOps applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-foreground selection:text-background min-h-screen">
        {children}
      </body>
    </html>
  );
}

