"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PricingTable, type PricingPlan, type BillingCycle } from "@/components/ui/pricing-table";

const NESTLINE_PLANS: PricingPlan[] = [
  {
    id: "founders",
    name: "Founder's Deal",
    price: 300,
    originalPrice: 600,
    setupFee: 600,
    originalSetupFee: 1500,
    description:
      "Lock in our lowest rate — ever. Only 3 to 5 spots available before the price goes up permanently.",
    features: [
      { id: "f1", name: "Lead intake automation",           included: true  },
      { id: "f2", name: "Missed call text-back",            included: true  },
      { id: "f3", name: "Automated appointment booking",    included: true  },
      { id: "f4", name: "CRM setup & management",           included: true  },
      { id: "f5", name: "Automated Google review requests", included: true  },
      { id: "f6", name: "Full Growth workflow suite",       included: false },
    ],
    isRecommended: true,
    buttonText: "Claim Your Spot",
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: 0,
    description:
      "From first call to final payment — fully automated. The complete business-in-a-box system.",
    features: [
      { id: "g1", name: "Missed call → instant client response",            included: true },
      { id: "g2", name: "Quote sent → automatic follow-up sequence",        included: true },
      { id: "g3", name: "Job booked → reminders to client & crew",          included: true },
      { id: "g4", name: "Job done → Google review request sent",            included: true },
      { id: "g5", name: "Invoice unpaid → automated payment reminders",     included: true },
      { id: "g6", name: "Every Monday → business summary delivered to you", included: true },
    ],
    buttonText: "Coming Soon",
    disabled: true,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [billingCycle] = useState<BillingCycle>("monthly");

  const handleSelect = (planId: string) => {
    if (planId === "founders") {
      window.open(
        "https://cal.com/liem-blouin/discovery?overlayCalendar=true",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <section id="pricing" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(0,232,135,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            Pricing
          </span>

          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
            Simple, transparent pricing
          </h2>

          <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
            Lock in the founder's rate before spots fill up.
          </p>
        </motion.div>

        {/* ── Pricing table ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
        >
          <PricingTable
            plans={NESTLINE_PLANS}
            billingCycle={billingCycle}
            onSelect={handleSelect}
            activePlanId="founders"
            className="!py-0"
          />
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center text-xs text-white/20 mt-4"
        >
          No long-term contracts · Cancel anytime · Results in 14 days or we keep working
        </motion.p>
      </div>
    </section>
  );
}
