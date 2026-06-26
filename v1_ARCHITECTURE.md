import Link from "next/link";
import { AppShell } from "@/components/AppShell";

const billingFeatures = [
  "Create one-time or recurring invoices",
  "Save customer bank/card payment method tokens through your payment provider",
  "Run automatic billing on the next invoice date",
  "Retry failed payments and send reminder emails",
  "Send webhooks when invoices are created, paid, failed, refunded, or cancelled"
];

export default function BillingPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-slate-500">Billing</p>
        <h1 className="text-3xl font-bold text-slate-950">Billing automation</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          A processor-neutral billing control center for automatic billing, retries, receipts, and recurring invoices.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-slate-950">Automatic billing setup</h2>
          <div className="mt-5 grid gap-3">
            {billingFeatures.map((feature) => (
              <div key={feature} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">{feature}</div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-slate-950">Actions</h2>
          <div className="mt-5 grid gap-3">
            <Link href="/subscriptions/new" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-950">Create recurring plan</Link>
            <Link href="/customers/new" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-950">Set up customer</Link>
            <Link href="/invoices/new" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-950">Create invoice</Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
