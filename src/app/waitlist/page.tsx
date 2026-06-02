import Navbar from "@/components/Navbar";
import WaitlistSection from "@/components/WaitlistSection";
import Link from "next/link";

export default function WaitlistPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <WaitlistSection />
      </main>
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="NestLine Automation" className="h-10 w-auto" />
          </Link>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} NestLine Automation. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}
