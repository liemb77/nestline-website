"use client";

const items = [
  "Lead Intake Automation",
  "Missed Call Text-Back",
  "Appointment Booking",
  "CRM Management",
  "Follow-Up Sequences",
  "Invoice Automation",
  "Reputation Management",
  "24/7 Auto-Response",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-5 overflow-hidden border-y border-white/[0.05]"
      style={{ background: "rgba(255,255,255,0.015)" }}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #050505, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #050505, transparent)" }} />

      <div className="animate-marquee flex gap-12 w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase text-white/25 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[#00e887]/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
