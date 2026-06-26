name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  typecheck:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: postgresql://postgres:postgres@localhost:5432/invoice_platform
      JWT_SECRET: this-is-a-development-secret-with-more-than-32-characters
      APP_URL: http://localhost:3000
      NEXT_PUBLIC_APP_URL: http://localhost:3000
      PAYMENT_PRIMARY_PROVIDER: helcim
      PAYMENT_PLATFORM_PROVIDER: adyen
      PAYMENT_ENABLED_PROVIDERS: helcim,adyen
      PAYMENT_WEBHOOK_SECRET: development-webhook-secret
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run db:generate
      - run: npm run typecheck
