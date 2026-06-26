import type { PaymentMethodType } from "@/types/invoice";

const DISCOUNT_ONLY_STATES = new Set(
  (process.env.SURCHARGE_DISABLED_STATES ??
    "CA,CO,CT,MA,ME,NY,OK")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean)
);

export type FeeQuote = {
  method: PaymentMethodType;
  subtotalCents: number;
  feeCents: number;
  totalCents: number;
  recommended: boolean;
  surchargeApplied: boolean;
  surchargeAllowed: boolean;
  reason: string;
  disclosure?: string;
};

function roundMoney(cents: number) {
  return Math.max(0, Math.round(cents));
}

function normalizeState(value?: string | null) {
  return (value ?? "").trim().toUpperCase();
}

export function isCreditSurchargeAllowed(state?: string | null) {
  const normalized = normalizeState(state);
  if (!normalized) {
    return false;
  }

  return !DISCOUNT_ONLY_STATES.has(normalized);
}

export function getBankFeeQuote(subtotalCents: number): FeeQuote {
  const feeRate = Number(process.env.BANK_FEE_RATE ?? "0.01");
  const feeCents = roundMoney(subtotalCents * feeRate);

  return {
    method: "bank",
    subtotalCents,
    feeCents,
    totalCents: subtotalCents + feeCents,
    recommended: true,
    surchargeApplied: false,
    surchargeAllowed: false,
    reason: "ACH keeps processing costs low and improves net collection.",
    disclosure: "Bank payments settle with lower fees and are recommended for larger invoices."
  };
}

export function getCardFeeQuote(subtotalCents: number, customerState?: string | null): FeeQuote {
  const allowed = isCreditSurchargeAllowed(customerState);
  const configuredRate = Number(process.env.CARD_SURCHARGE_RATE ?? "0.029");
  const capRate = Math.min(configuredRate, 0.03);
  const feeCents = allowed ? roundMoney(subtotalCents * capRate) : 0;

  return {
    method: "card",
    subtotalCents,
    feeCents,
    totalCents: subtotalCents + feeCents,
    recommended: false,
    surchargeApplied: allowed && feeCents > 0,
    surchargeAllowed: allowed,
    reason: allowed
      ? "Credit card convenience fee is shown separately to recover acceptance cost where enabled."
      : "Credit cards stay available, but no surcharge is added for this state or until legal review is complete.",
    disclosure: allowed
      ? "Credit-card surcharge applies only to eligible credit cards, never debit or prepaid, and is capped by configured acceptance cost."
      : "No credit-card surcharge is applied for this invoice."
  };
}

export function getPaymentQuote(method: PaymentMethodType, subtotalCents: number, customerState?: string | null) {
  return method === "bank"
    ? getBankFeeQuote(subtotalCents)
    : getCardFeeQuote(subtotalCents, customerState);
}
