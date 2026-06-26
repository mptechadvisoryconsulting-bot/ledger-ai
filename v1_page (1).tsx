# Ledger AI Invoicing

Ledger AI is a Next.js invoicing app for AI-assisted billing, product pricing, online payments, recurring invoices, customer setup, and compact revenue dashboards.

## Included

- Next.js App Router + TypeScript
- Prisma + PostgreSQL multi-tenant foundation
- Founder seed account
- Signup, login, logout, and signed session cookies
- Database-backed dashboard, invoice, product, subscription, pay, and printable invoice pages
- Native on-site payment shell
- ACH-first payment recommendations
- Conditional credit-card surcharge rules engine
- Provider-neutral routing with Helcim + Adyen support
- Provider-neutral webhook ingestion and idempotent webhook storage
- Vercel-ready structure and GitHub-safe defaults

## Quick start

```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/login
http://localhost:3000/signup
http://localhost:3000/dashboard
http://localhost:3000/api/health
```

## Required environment variables

```text
DATABASE_URL=
JWT_SECRET=
APP_URL=
NEXT_PUBLIC_APP_URL=
PAYMENT_PRIMARY_PROVIDER=helcim
PAYMENT_PLATFORM_PROVIDER=adyen
PAYMENT_ENABLED_PROVIDERS=helcim,adyen
PAYMENT_WEBHOOK_SECRET=
HELCIM_API_TOKEN=
HELCIM_WEBHOOK_SECRET=
ADYEN_API_KEY=
ADYEN_MERCHANT_ACCOUNT=
ADYEN_WEBHOOK_SECRET=
BANK_FEE_RATE=0.01
CARD_SURCHARGE_RATE=0.029
SURCHARGE_DISABLED_STATES=CA,CO,CT,MA,ME,NY,OK
```

## Recommended production route

For Ledger AI, the best launch path is:

1. Keep checkout inside your site.
2. Make ACH the recommended default.
3. Keep credit cards available for convenience.
4. Apply credit-card surcharges only where your legal and processor rules allow them.
5. Use Helcim as the primary card rail for cost-sensitive merchants.
6. Use Adyen as the platform rail when you need platform onboarding, routing, or payouts.

## GitHub and Vercel

This package is safe to upload to GitHub because:

- `.gitignore` excludes local env files, builds, logs, and node modules.
- `.env.example` shows required configuration without secrets.
- `vercel.json` uses standard Next.js build settings.
- `.github/workflows/ci.yml` runs Prisma generation and TypeScript checks.

Recommended Vercel setup:

1. Import the GitHub repository into Vercel.
2. Add the environment variables from `.env.example`.
3. Attach a PostgreSQL database.
4. Run `npm run db:generate`.
5. Run `npm run db:migrate`.
6. Run `npm run db:seed`.
7. Point provider webhooks to `POST /api/webhooks/ledger-ai`.
8. Test a full invoice payment in preview before production.

## Webhooks

Point your provider to:

```text
POST /api/webhooks/ledger-ai
```

Supported normalized event types:

```text
payment.succeeded
payment.failed
payment.refunded
```

If you run both providers, pass `x-ledger-ai-provider: helcim` or `x-ledger-ai-provider: adyen` with the webhook request.

## Founder account

The seed script creates the Ledger AI founder account.

```bash
FOUNDER_EMAIL="mp.techadvisory.consulting@gmail.com"
FOUNDER_PASSWORD="set-this-locally-only"
```

## Honest launch note

This zip is a launch-oriented architecture package, not a legal or compliance guarantee. Before taking live traffic, finish provider onboarding, embedded field integration, domain/DNS, monitoring, email delivery, legal review, and a live end-to-end payment test.
