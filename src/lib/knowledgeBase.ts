// Client-safe knowledge base for the site chatbot (see /api/chat).
// Source of truth: Desktop/NestLine automation/Sales Docs/{pricing-menu,faq}.md
// Keep this in sync manually when those docs change. sales-process.md is
// intentionally excluded — it's Liem's internal playbook, not public.
export const KNOWLEDGE_BASE = `
# NestLine Automation — Services & Pricing Menu

NestLine builds AI systems that do real work inside your business — not just chatbots, actual agents that read, decide, and act. Every engagement includes a one-time setup fee plus a monthly retainer to keep the system running, monitored, and improved.

## 1. Lead Capture & Follow-Up Agent
Best for: Contractors, service businesses. Captures every website or form lead the moment it comes in and follows up automatically by email/SMS until they book a call — so no lead goes cold from a slow response.
Setup: $1,500 | Monthly: $600/mo

## 2. Customer Service AI (Chatbot)
Best for: Contractors, service businesses. Answers customer questions on your website 24/7, qualifies visitors, and hands off to you only when it's a real opportunity.
Setup: $3,000 | Monthly: $800/mo

## 3. Internal Knowledge Base (RAG Agent)
Best for: Real estate teams, larger contractors, firms with a lot of documentation. An AI that instantly answers staff or client questions by searching your own documents, pricing, and policies.
Setup: $2,000 | Monthly: $500/mo

## 4. Sales Email Personalization
Best for: Contractors, agencies. Writes personalized outreach and follow-up emails automatically based on each prospect's details, instead of generic templates.
Setup: $1,000 | Monthly: $400/mo

## 5. Document Processing Agent
Best for: Accounting, law, trades. Reads, sorts, and extracts data from contracts, invoices, or forms automatically.
Setup: $750 | Monthly: $250/mo

## 6. Appointment Booking Agent
Best for: Any service business. Books, confirms, and reminds clients automatically, synced directly to your calendar.
Setup: $1,000 | Monthly: $400/mo

## 7. Social Content Generation
Best for: Real estate, trades. Turns your business activity and case studies into ready-to-post social content automatically.
Setup: $1,250 | Monthly: $400/mo

## 8. Voice AI Receptionist
Best for: Trades, real estate, barbers, any business that lives on the phone. An AI phone agent that answers every call, books appointments, and routes urgent calls — 24/7.
Setup: $3,000 | Monthly: $750/mo

## 9. Data Reporting Agent
Best for: Any business owner. Pulls data from your systems and delivers a plain-English report on demand.
Setup: $1,750 | Monthly: $450/mo

## 10. Onboarding Automation
Best for: Agencies, consultants. Walks new clients or employees through onboarding automatically.
Setup: $2,500 | Monthly: $800/mo

## Premium Tier: AI Operating System
For businesses ready to go further than one agent — a custom dashboard combining multiple agents into a single system you can see, track, and talk to. Price scoped per engagement.

---

# FAQ

Q: Combien de temps ça prend?
A: Ça dépend du projet — un site web prend généralement 1 à 2 semaines, un agent IA ou système d'automatisation peut prendre 2 à 4 semaines selon la complexité.

Q: Quelle technologie utilises-tu?
A: Pour les sites web : Next.js, hébergé sur Vercel. Pour les automatisations simples : n8n. Pour les systèmes IA plus complexes (agents qui lisent, pensent et agissent) : Claude Code.

Q: Est-ce que je suis propriétaire de mon site / mes agents IA une fois que c'est terminé?
A: NestLine reste propriétaire du code et de l'infrastructure dans le cadre du forfait standard (hébergement, maintenance et mises à jour inclus). La pleine propriété du code est possible pour un montant additionnel.

Q: Qu'est-ce qui est inclus dans le forfait mensuel?
A: Le retainer mensuel couvre l'hébergement, le monitoring, les mises à jour, et les changements/ajustements continus au système — pas de frais supplémentaires pour des changements courants.

Q: Est-ce que je peux demander des changements après le lancement?
A: Oui, en tout temps, inclus dans le forfait mensuel — pas de frais supplémentaires.

Q: Est-ce que je peux annuler mon abonnement mensuel?
A: Le dépôt initial est payé d'avance, puis NestLine construit le site/système. Si le résultat ne convient pas, remboursement complet et l'automatisation est supprimée complètement. Une fois le système livré et accepté, l'annulation reste possible en tout temps; le service prend fin à la fin de la période déjà payée.

Q: Qu'est-ce qui arrive si le système brise ou ne fonctionne plus?
A: Le monitoring inclus dans le forfait mensuel sert à détecter et corriger ça — c'est une des raisons d'être du retainer plutôt qu'un projet ponctuel.

Q: Mes données sont-elles en sécurité avec l'IA?
A: Oui — toute information sensible (clés API, identifiants, données privées) est stockée dans des variables d'environnement, jamais exposée dans le code ou accessible publiquement.

Q: Est-ce que tu travailles avec mon type d'entreprise?
A: NestLine a livré des projets pour des courtiers financiers et des consultants en génie/approvisionnement. On cible aussi activement les entrepreneurs, agents immobiliers et autres entreprises de services, mais il n'y a pas encore de client livré dans ces secteurs précis.
`.trim();
