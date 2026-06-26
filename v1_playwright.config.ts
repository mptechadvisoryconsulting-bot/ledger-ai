# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_URL=http://localhost:3000

# Database + auth
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/invoice_platform?schema=public"
JWT_SECRET="replace-with-a-long-random-secret-at-least-32-characters"

# Payments
PAYMENT_PRIMARY_PROVIDER="helcim"
PAYMENT_PLATFORM_PROVIDER="adyen"
PAYMENT_ENABLED_PROVIDERS="helcim,adyen"
PAYMENT_WEBHOOK_SECRET="replace-with-fallback-webhook-signing-secret"
HELCIM_API_TOKEN=""
HELCIM_WEBHOOK_SECRET=""
ADYEN_API_KEY=""
ADYEN_MERCHANT_ACCOUNT=""
ADYEN_WEBHOOK_SECRET=""
BANK_FEE_RATE="0.01"
CARD_SURCHARGE_RATE="0.029"
SURCHARGE_DISABLED_STATES="CA,CO,CT,MA,ME,NY,OK"

# Email/SMS placeholders
EMAIL_FROM="billing@example.com"
EMAIL_PROVIDER_API_KEY=""
SMS_PROVIDER_API_KEY=""

# Founder/free account seed and E2E validation
FOUNDER_EMAIL="mp.techadvisory.consulting@gmail.com"
FOUNDER_PASSWORD="set-this-locally-only"
PLAYWRIGHT_BASE_URL="http://localhost:3000"
