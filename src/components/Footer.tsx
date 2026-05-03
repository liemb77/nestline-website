"use client";

import { Zap } from "lucide-react";

const links = {
  Company: ["About", "Services", "Pricing", "Contact"],
  Trades: ["Plumbers", "Roofers", "Landscapers", "HVAC", "Electricians"],
  Legal: ["Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="bg-[#08090d] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c2ff] to-[#7b61ff] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Nest<span className="gradient-text">Line</span>
              </span>
            </a>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-5">
              We automate the chaos so contractors can focus on what they do best —
              the work.
            </p>
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} NestLine Automation. All rights reserved.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            Built with automation, for people who build things.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
