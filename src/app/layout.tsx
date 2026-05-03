import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full flex flex-col bg-[#08090d] text-[#f0f0f5]">
        {children}
      </body>
    </html>
  );
}
