# Codex Task: Finalize Ledger AI Invoicing

Build and validate this repository as the Ledger AI invoicing site only.

Requirements:
1. Keep all public-facing branding as "Ledger AI".
2. Do not add landscaping, field-service, or unrelated sample company content.
3. Keep the app processor-neutral; do not hard-code Stripe as the backend.
4. Preserve the modern payment-page feel: card, bank, saved payment method, and autopay options.
5. Ensure Vercel deploys from the repository root.
6. Ensure `package.json` is valid JSON and at the root.
7. Ensure these routes work:
   - `/`
   - `/login`
   - `/dashboard`
   - `/customers`
   - `/customers/new`
   - `/products`
   - `/products/import`
   - `/invoices`
   - `/invoices/new`
   - `/subscriptions`
   - `/billing`
   - `/pay/inv_1001`
   - `/api/health`
8. Seed the founder account using environment variables:
   - `FOUNDER_EMAIL`
   - `FOUNDER_PASSWORD`
9. Run:
   - `npm install`
   - `npm run build`
   - `npm run typecheck`
   - `npm run db:generate`
10. Fix all build/type errors.
11. Return a deployable ZIP/repository.

Do not commit the real founder password. Use environment variables only.
