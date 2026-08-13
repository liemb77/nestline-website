// Client-safe knowledge base for the site chatbot (see /api/chat).
// Source of truth: the live site itself (src/lib/translations.ts, Pricing,
// websites-client.tsx) — not the older generic services menu in
// Desktop/NestLine automation/Sales Docs/, which reflects a different,
// broader consulting positioning than what nestlineautomation.ca actually
// sells today. Keep this in sync manually whenever pricing, offers, or team
// info changes on the site. sales-process.md stays excluded — it's Liem's
// internal playbook, not public.
export const KNOWLEDGE_BASE = `
# NestLine Automation — What We Actually Sell

NestLine is a small Montreal team led by Liem Blouin. We build practical AI/automation systems around how a business already operates — not generic templates, not confusing tech talk.

## Core offer: Ads + AI System (for Quebec real estate agents)
Ads bring in the leads. An AI system responds to every lead, qualifies them, and books the appointment directly on the agent's calendar — so no lead goes cold from a slow response.
Includes: paid ad campaign setup & management (Meta/Bing, on the client's own ad account), AI lead response & qualification, automated appointment booking, a CRM with outcome-based follow-up, and long-term lead nurture for "not ready yet" leads.
**Pricing (public, always fine to quote):** $800 one-time setup (exact scope confirmed on the call) + $2,000/month + the client's own ad spend (they choose the budget, roughly $30/day as a starting point, stays in their own ad account — NestLine never touches or marks up ad spend).
No guaranteed results, ever. The client's ad account always stays theirs.

## Secondary offer: Business Websites (any trade/industry, not just real estate)
Fast, clean, mobile-ready websites built to convert, live in about a week, automation-ready from day one.
**Pricing (public, always fine to quote):** $1,500 setup + $150/month for hosting, updates, and ongoing support/changes (no extra charge for reasonable changes). Custom design for the client's business, fully mobile responsive, contact form + Google Maps, deployed on GitHub + Vercel, SEO basics included.
Bundle: adding NestLine's Starter automation with a website saves $200 on the setup fee.

## Beyond these two, NestLine has also delivered custom AI automation/process consulting for individual clients outside real estate (e.g. financial/wealth advisors, procurement consultants) — scoped and quoted individually per engagement, not a fixed published price. If asked about a fully custom automation project outside the two offers above, say pricing depends on scope and invite them to book a call rather than guessing a number.

## Process (what happens after someone books)
1. Discovery call — talk through what's slowing them down.
2. NestLine maps their process — identifies the best opportunity to fix first.
3. Custom quote & plan — clear scope and price before anything starts.
4. Build, test, launch — built and tested with real inputs before going live.
5. Ongoing support — monitored, fixed, and improved after launch.

## Why work with NestLine
- Direct access — clients talk directly to the people building the system, no account managers, no hand-offs.
- Custom, not generic — every system is built around how the business actually works.
- Bilingual — French and English, nothing lost in translation.
- No jargon — explained in plain language.

## Team
- **Liem Blouin — Founder.** Handles everything technical: builds every system and makes sure nothing breaks down, watching/fixing/improving after launch. liem@nestlineautomation.ca
- **Justin Berthelette — Sales.** First point of contact — handles talking to prospects and clients, keeps them in the loop from the first call through launch and onboarding. justin@nestlineautomation.ca
Small, hands-on team based in Montreal, serving real estate agents across Quebec and business/website clients more broadly.

## Real client work delivered so far (safe to reference as real, delivered experience)
- **OP Gestion Financière Stratégique** (Beloeil, Quebec) — wealth management advisor. Needed a professional bilingual (FR/EN) web presence to build trust with prospective clients. NestLine built and launched a bilingual site in days. Live at opgestionfinancierestrategique.ca.
- **DJ2 Services** (Quebec) — industrial procurement & contract-management consultant. Needed a fast, professional, mobile-ready bilingual site. NestLine delivered one with a working contact form. Live at dj2services.ca.

NestLine actively targets real estate agents and contractors as core audiences but does not yet have a *delivered* real estate agent or contractor client to point to — never imply otherwise. If asked directly, be honest: these are the target market and the offer is built for them, but the case studies above (financial advisor, procurement consultant) are the real delivered proof so far.

---

# FAQ

Q: Combien de temps ça prend?
A: Un site web prend généralement 1 semaine environ une fois le brief reçu. Un système IA plus complexe (agent qui lit, décide et agit) peut prendre 2 à 4 semaines selon la complexité, incluant tests et révisions.

Q: Quelle technologie utilises-tu?
A: Pour les sites web : Next.js, hébergé sur Vercel. Pour les automatisations simples (déclencheur → action) : n8n. Pour les systèmes IA plus complexes (agents qui lisent, pensent et agissent) : Claude Code.

Q: Est-ce que je suis propriétaire de mon site / mes agents IA une fois que c'est terminé?
A: Dans le forfait standard, NestLine reste propriétaire du code et de l'infrastructure (hébergement, maintenance et mises à jour inclus dans le forfait mensuel). La pleine propriété du code est possible pour un montant additionnel, à discuter sur l'appel.

Q: Qu'est-ce qui est inclus dans le forfait mensuel?
A: L'hébergement, le monitoring, les mises à jour, et les changements/ajustements courants au système — pas de frais supplémentaires pour des changements raisonnables.

Q: Est-ce que je peux annuler mon abonnement mensuel?
A: Le dépôt/frais initial est payé d'avance, puis NestLine construit le système. Si le résultat ne convient vraiment pas, remboursement complet et l'automatisation est retirée. Une fois livré et accepté, l'annulation reste possible en tout temps; le service prend fin à la fin de la période déjà payée (pas de remboursement rétroactif sur les mois déjà facturés).

Q: Qu'est-ce qui arrive si le système brise ou ne fonctionne plus?
A: Le monitoring inclus dans le forfait mensuel sert justement à détecter et corriger ça — c'est une des raisons d'être du forfait mensuel plutôt qu'un projet ponctuel.

Q: Mes données sont-elles en sécurité avec l'IA?
A: Oui — toute information sensible (clés API, identifiants, données privées) est stockée dans des variables d'environnement, jamais exposée dans le code ou accessible publiquement.

Q: Est-ce que tu travailles avec mon type d'entreprise?
A: L'offre principale de NestLine cible les agents immobiliers du Québec (publicités + système IA) et les entreprises/entrepreneurs qui ont besoin d'un site web professionnel. NestLine a aussi livré des sites pour des conseillers financiers et des consultants. Si le visiteur a un autre type d'entreprise, l'inviter à réserver un appel pour voir si NestLine peut aider.
`.trim();