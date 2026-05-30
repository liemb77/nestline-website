import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { LanguageProvider } from "@/contexts/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NestLine Automation — We Automate the Chaos",
  description:
    "NestLine Automation helps contractors eliminate wasted hours on follow-ups, missed leads, and manual admin with custom automation workflows.",
  keywords: ["automation", "contractors", "plumbers", "roofers", "landscapers", "n8n", "workflows"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f0f0f5]">
        <LanguageProvider>
          {/* Fixed fluid-particles canvas — sits behind all page content */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <FluidParticlesBackground
              particleCount={1800}
              noiseIntensity={0.003}
              particleSize={{ min: 0.4, max: 1.8 }}
              className="w-full h-full"
            />
          </div>

          {/* Page content sits above the canvas */}
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
