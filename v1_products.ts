import { getBankFeeQuote, getCardFeeQuote } from "@/lib/surcharging";
import type { PaymentQuote } from "@/types/invoice";

export function getPaymentOptions({
  amountDueCents,
  customerState
}: {
  amountDueCents: number;
  customerState?: string | null;
}): PaymentQuote[] {
  const bank = getBankFeeQuote(amountDueCents);
  const card = getCardFeeQuote(amountDueCents, customerState);

  return [
    {
      method: "bank",
      label: "Bank account (ACH)",
      feeLabel: bank.feeCents > 0 ? `+${formatFee(bank.feeCents)}` : "Lowest fee",
      customerMessage: "Recommended. Lower-cost bank payment with the best net payout.",
      estimatedFeeCents: bank.feeCents,
      amountDueCents,
      totalPayableCents: bank.totalCents,
      recommended: true,
      disclosure: bank.disclosure
    },
    {
      method: "card",
      label: "Credit card",
      feeLabel: card.feeCents > 0 ? `+${formatFee(card.feeCents)}` : "No extra fee shown",
      customerMessage: card.surchargeApplied
        ? "Fastest option. Credit-card fee is shown separately before confirmation."
        : "Fastest option. Debit/prepaid are never surcharged, and some states keep card pricing flat.",
      estimatedFeeCents: card.feeCents,
      amountDueCents,
      totalPayableCents: card.totalCents,
      recommended: false,
      disclosure: card.disclosure
    }
  ];
}

function formatFee(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}
