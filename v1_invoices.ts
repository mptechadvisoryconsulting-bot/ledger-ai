# GitHub and Vercel shipping checklist

## Before pushing to GitHub

- Review `.gitignore`
- Confirm `.env.local` is not committed
- Keep secrets only in Vercel
- Run `npm run db:generate`
- Run `npm run typecheck`

## Before deploying to Vercel

- Add all environment variables from `.env.example`
- Provision Postgres
- Set `APP_URL` and `NEXT_PUBLIC_APP_URL` to the deployed domain
- Set `PAYMENT_PRIMARY_PROVIDER=helcim`
- Set `PAYMENT_PLATFORM_PROVIDER=adyen`
- Set `PAYMENT_ENABLED_PROVIDERS=helcim,adyen`
- Add provider webhook secrets
- Configure custom domain
- Turn on error monitoring

## After first deploy

- Run migrations
- Seed founder account
- Verify `/api/health`
- Create a test invoice
- Test ACH-first checkout
- Test credit-card fallback
- Test webhook processing with both providers
