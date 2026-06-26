import { z } from "zod";

const providerListSchema = z
  .string()
  .min(1)
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, "JWT_SECRET should be at least 32 characters"),
  APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  PAYMENT_PRIMARY_PROVIDER: z.enum(["helcim", "adyen", "native-platform"]).default("helcim"),
  PAYMENT_PLATFORM_PROVIDER: z.enum(["adyen", "helcim", "native-platform"]).default("adyen"),
  PAYMENT_ENABLED_PROVIDERS: providerListSchema.default("helcim,adyen"),
  PAYMENT_WEBHOOK_SECRET: z.string().min(16),
  HELCIM_API_TOKEN: z.string().optional(),
  HELCIM_WEBHOOK_SECRET: z.string().optional(),
  ADYEN_API_KEY: z.string().optional(),
  ADYEN_MERCHANT_ACCOUNT: z.string().optional(),
  ADYEN_WEBHOOK_SECRET: z.string().optional()
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL,
  PAYMENT_PRIMARY_PROVIDER: process.env.PAYMENT_PRIMARY_PROVIDER ?? "helcim",
  PAYMENT_PLATFORM_PROVIDER: process.env.PAYMENT_PLATFORM_PROVIDER ?? "adyen",
  PAYMENT_ENABLED_PROVIDERS: process.env.PAYMENT_ENABLED_PROVIDERS ?? "helcim,adyen",
  PAYMENT_WEBHOOK_SECRET: process.env.PAYMENT_WEBHOOK_SECRET ?? "replace-with-webhook-signing-secret",
  HELCIM_API_TOKEN: process.env.HELCIM_API_TOKEN,
  HELCIM_WEBHOOK_SECRET: process.env.HELCIM_WEBHOOK_SECRET,
  ADYEN_API_KEY: process.env.ADYEN_API_KEY,
  ADYEN_MERCHANT_ACCOUNT: process.env.ADYEN_MERCHANT_ACCOUNT,
  ADYEN_WEBHOOK_SECRET: process.env.ADYEN_WEBHOOK_SECRET
});
