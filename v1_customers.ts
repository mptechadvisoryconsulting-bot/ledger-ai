import crypto from "crypto";
import { db } from "./db";
import type { PaymentMethodType } from "@/types/invoice";
import { getPaymentQuote } from "@/lib/surcharging";
import { resolvePaymentProvider } from "@/lib/payment-config";

type HostedPaymentSessionInput = {
  invoiceId: string;
  invoiceNumber: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  method: PaymentMethodType;
  successUrl: string;
  cancelUrl: string;
  customerState?: string | null;
  businessId?: string;
  customerId?: string;
  businessCountry?: string | null;
  businessMode?: string | null;
};

export async function createHostedPaymentSession(input: HostedPaymentSessionInput) {
  const intentId = `pay_${crypto.randomUUID()}`;
  const quote = getPaymentQuote(input.method, input.amount, input.customerState);
  const provider = resolvePaymentProvider({
    method: input.method,
    businessCountry: input.businessCountry,
    businessMode: input.businessMode
  });

  const params = new URLSearchParams({
    payment_intent_id: intentId,
    invoice_id: input.invoiceId,
    invoice_number: input.invoiceNumber,
    provider: provider.slug,
    provider_label: provider.label,
    method: input.method,
    subtotal_cents: String(input.amount),
    fee_cents: String(quote.feeCents),
    total_cents: String(quote.totalCents),
    success_url: input.successUrl.replace("{PAYMENT_INTENT_ID}", intentId),
    cancel_url: input.cancelUrl
  });

  return {
    id: intentId,
    provider: provider.slug,
    providerLabel: provider.label,
    url: `/payments/hosted-checkout?${params.toString()}`,
    quote
  };
}

export async function upsertVaultedPaymentMethod(params: {
  businessId: string;
  customerId: string;
  provider: string;
  providerReferenceId: string;
  type: "CARD" | "BANK_ACCOUNT";
  displayLabel: string;
}) {
  return db.paymentMethod.upsert({
    where: {
      id: `${params.provider}:${params.providerReferenceId}`
    },
    update: {
      displayLabel: params.displayLabel,
      authorizedAt: new Date()
    },
    create: {
      id: `${params.provider}:${params.providerReferenceId}`,
      businessId: params.businessId,
      customerId: params.customerId,
      provider: params.provider,
      providerReferenceId: params.providerReferenceId,
      type: params.type,
      displayLabel: params.displayLabel,
      authorizedAt: new Date()
    }
  });
}

export function verifyWebhookSignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature || !secret) {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
