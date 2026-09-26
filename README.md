# TradeLine AI — HVAC Answering Service

A 24/7 AI answering service for HVAC (and other trade) businesses: it answers
the phone, triages emergencies, collects job details, and books the next
available appointment — built for small shops at a flat, budget-friendly
price.

This is a standalone project, independent of any other app in this org.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page
and try the live chat demo of Ava, the AI receptionist.

The chat demo calls `/api/chat`, which needs an `ANTHROPIC_API_KEY`
environment variable set (see `.env.local`, not committed).

## What's here

- `components/AnsweringServiceApp.tsx` — the landing page (features, pricing,
  live chat demo).
- `app/api/chat/route.ts` — the Ava assistant endpoint. `COMPANY` at the top
  of that file is a stand-in profile (hours, services, pricing); a real
  deployment would load this per-subscriber instead of hardcoding one company.

## Currently English-only

The assistant and UI are English-only for now. Adding more languages later
is a matter of parameterizing the `SYSTEM_PROMPT` in `app/api/chat/route.ts`
by a `language` field, the same way — no architectural changes needed.
