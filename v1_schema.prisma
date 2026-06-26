export type PaymentMethod = "card" | "bank";
export type PaymentProviderSlug = "helcim" | "adyen" | "native-platform";

export type ProviderResolutionInput = {
  method: PaymentMethod;
  businessCountry?: string | null;
  businessMode?: string | null;
};

export type ProviderConfig = {
  slug: PaymentProviderSlug;
  label: string;
  supportsBank: boolean;
  supportsCard: boolean;
  environmentVariablePrefix: string;
};

export const PAYMENT_PROVIDERS: Record<PaymentProviderSlug, ProviderConfig> = {
  helcim: {
    slug: "helcim",
    label: "Helcim",
    supportsBank: false,
    supportsCard: true,
    environmentVariablePrefix: "HELCIM"
  },
  adyen: {
    slug: "adyen",
    label: "Adyen",
    supportsBank: true,
    supportsCard: true,
    environmentVariablePrefix: "ADYEN"
  },
  "native-platform": {
    slug: "native-platform",
    label: "Native platform shell",
    supportsBank: true,
    supportsCard: true,
    environmentVariablePrefix: "PAYMENT"
  }
};

function normalizeMode(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

export function getEnabledProviders() {
  const configured = (process.env.PAYMENT_ENABLED_PROVIDERS ?? "helcim,adyen")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value): value is PaymentProviderSlug => value in PAYMENT_PROVIDERS);

  return configured.length > 0 ? configured : (["helcim", "adyen"] as PaymentProviderSlug[]);
}

export function getPrimaryProvider() {
  const value = (process.env.PAYMENT_PRIMARY_PROVIDER ?? "helcim").trim().toLowerCase();
  return (value in PAYMENT_PROVIDERS ? value : "helcim") as PaymentProviderSlug;
}

export function getPlatformProvider() {
  const value = (process.env.PAYMENT_PLATFORM_PROVIDER ?? "adyen").trim().toLowerCase();
  return (value in PAYMENT_PROVIDERS ? value : "adyen") as PaymentProviderSlug;
}

export function resolvePaymentProvider(input: ProviderResolutionInput): ProviderConfig {
  const enabledProviders = new Set(getEnabledProviders());
  const primary = PAYMENT_PROVIDERS[getPrimaryProvider()];
  const platform = PAYMENT_PROVIDERS[getPlatformProvider()];
  const mode = normalizeMode(input.businessMode);

  if (mode === "platform" && enabledProviders.has(platform.slug)) {
    return platform;
  }

  if (input.method === "bank") {
    if (enabledProviders.has(platform.slug) && platform.supportsBank) {
      return platform;
    }

    if (enabledProviders.has(primary.slug) && primary.supportsBank) {
      return primary;
    }

    return PAYMENT_PROVIDERS["native-platform"];
  }

  if (enabledProviders.has(primary.slug) && primary.supportsCard) {
    return primary;
  }

  if (enabledProviders.has(platform.slug) && platform.supportsCard) {
    return platform;
  }

  return PAYMENT_PROVIDERS["native-platform"];
}

export function getWebhookSecret(provider: string) {
  const normalized = provider.trim().toLowerCase();

  if (normalized === "helcim") {
    return process.env.HELCIM_WEBHOOK_SECRET ?? process.env.PAYMENT_WEBHOOK_SECRET ?? "";
  }

  if (normalized === "adyen") {
    return process.env.ADYEN_WEBHOOK_SECRET ?? process.env.PAYMENT_WEBHOOK_SECRET ?? "";
  }

  return process.env.PAYMENT_WEBHOOK_SECRET ?? "";
}
