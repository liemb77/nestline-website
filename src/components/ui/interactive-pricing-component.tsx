"use client";

import React from "react";
import { Check, X, Zap, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Feature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  tag: string;
  name: string;
  description: string;
  setupPrice?: string;
  setupWas?: string;
  monthlyPrice?: string;
  monthlyWas?: string;
  features: Feature[];
  highlight?: boolean;          // green glow card
  comingSoon?: boolean;         // dimmed + badge
  badgeLabel?: string;
  badgeIcon?: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
  note?: string;
}

interface NestlinePricingProps {
  className?: string;
}

// ─── Plan data ────────────────────────────────────────────────────────────────

const plans: PricingPlan[] = [
  {
    id: "founders",
    tag: "Founder's Deal",
    name: "⚡ Only 3 to 5 spots available — ever.",
    description: "Only available for our first few clients. Price goes up once spots are filled.",
    setupPrice: "$600",
    setupWas: "was $1,500",
    monthlyPrice: "$300",
    monthlyWas: "was $600/mo",
    features: [
      { name: "Lead intake automation",             included: true  },
      { name: "Missed call text-back",              included: true  },
      { name: "Automated appointment booking",      included: true  },
      { name: "CRM setup & management",             included: true  },
      { name: "Automated Google review requests",   included: true  },
    ],
    highlight: true,
    badgeLabel: "Limited — 3 to 5 spots only",
    badgeIcon: <Zap className="w-3 h-3" fill="currentColor" />,
    ctaLabel: "Claim Your Spot",
    ctaHref: "https://book.nestlineautomation.ca/",
  },
  {
    id: "growth",
    tag: "Growth Plan",
    name: "Full Business Automation System",
    description: "From first call to final payment — fully automated.",
    features: [
      { name: "Missed call → instant client response",            included: true },
      { name: "Quote sent → automatic follow-up sequence",        included: true },
      { name: "Job booked → reminders to client & crew",          included: true },
      { name: "Job done → Google review request sent",            included: true },
      { name: "Invoice unpaid → automated payment reminders",     included: true },
      { name: "Every Monday → business summary delivered to you", included: true },
    ],
    comingSoon: true,
    ctaLabel: "Book a Call",
    ctaHref: "https://book.nestlineautomation.ca/",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const NestlinePricing: React.FC<NestlinePricingProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch", className)}>
      {plans.map((plan, i) => (
        <PlanCard key={plan.id} plan={plan} index={i} />
      ))}
    </div>
  );
};

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const isHighlight = plan.highlight;
  const isComingSoon = plan.comingSoon;

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden transition-all duration-300",
        // Base glass surface
        "bg-transparent border-0",
        // Highlight card gets green border + glow
        isHighlight && "ring-1 ring-[#2ee6a6]/30 shadow-[0_0_80px_rgba(46,230,166,0.1),0_20px_60px_rgba(0,0,0,0.4)]",
        // Coming soon card is dimmed
        isComingSoon && "opacity-70",
        // Index-based animation delay handled inline
      )}
      style={{
        background: isHighlight
          ? "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(46,230,166,0.06) 100%)"
          : "rgba(255,255,255,0.028)",
        border: isHighlight
          ? "1px solid rgba(46,230,166,0.25)"
          : "1px solid rgba(255,255,255,0.07)",
        animationDelay: `${index * 0.12}s`,
      }}
    >
      {/* Top shimmer line */}
      {isHighlight && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ee6a6]/60 to-transparent" />
      )}

      {/* Floating top badge */}
      {plan.badgeLabel && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full btn-primary text-xs font-bold whitespace-nowrap">
            {plan.badgeIcon}
            {plan.badgeLabel}
          </span>
        </div>
      )}

      {/* Coming Soon badge */}
      {isComingSoon && (
        <div className="absolute top-6 right-6 z-10">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 text-xs font-bold border-white/10 bg-white/5 text-white/35"
          >
            <Clock className="w-3 h-3" />
            Coming Soon
          </Badge>
        </div>
      )}

      <CardHeader className={cn("pb-2", plan.badgeLabel && "mt-4")}>
        {/* Plan tag */}
        <p
          className={cn(
            "text-xs font-bold tracking-[0.18em] uppercase mb-2",
            isHighlight ? "text-[#2ee6a6]" : "text-white/25",
          )}
        >
          {plan.tag}
        </p>

        {/* Plan headline */}
        <h3
          className={cn(
            "text-xl font-extrabold leading-snug",
            isHighlight ? "text-white" : "text-white pr-24",
          )}
        >
          {isHighlight ? (
            <>
              ⚡ Only 3 to 5 spots available —{" "}
              <span className="text-gradient">ever.</span>
            </>
          ) : (
            plan.name
          )}
        </h3>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-6">
        {/* Pricing row (Founder's Deal only) */}
        {(plan.setupPrice || plan.monthlyPrice) && (
          <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/[0.06]">
            {plan.setupPrice && (
              <div>
                <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Setup Fee</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.setupPrice}</span>
                  <span className="text-white/35 text-sm">one-time</span>
                </div>
                {plan.setupWas && (
                  <p className="text-xs line-through text-white/20 mt-1">{plan.setupWas}</p>
                )}
              </div>
            )}
            {plan.monthlyPrice && (
              <div>
                <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Monthly</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.monthlyPrice}</span>
                  <span className="text-white/35 text-sm">/mo</span>
                </div>
                {plan.monthlyWas && (
                  <p className="text-xs line-through text-white/20 mt-1">{plan.monthlyWas}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p
          className={cn(
            "text-sm leading-relaxed",
            isHighlight ? "text-[#2ee6a6]/60" : "text-white/35",
          )}
        >
          {plan.description}
        </p>

        {/* Feature list */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((feature) => (
            <li key={feature.name} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 shrink-0",
                  feature.included
                    ? isHighlight
                      ? "text-[#2ee6a6]"
                      : "text-white/20"
                    : "text-white/15",
                )}
              >
                {feature.included ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </span>
              <span
                className={cn(
                  "text-sm",
                  feature.included
                    ? isHighlight
                      ? "text-white/65"
                      : "text-white/25"
                    : "text-white/15",
                )}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-2">
        <a
          href={plan.ctaHref}
         
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold transition-all duration-200",
            isHighlight
              ? "btn-primary"
              : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70",
          )}
        >
          {plan.ctaLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </CardFooter>

      {/* Bottom shimmer line */}
      {isHighlight && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ee6a6]/40 to-transparent" />
      )}
    </Card>
  );
}

export default NestlinePricing;
