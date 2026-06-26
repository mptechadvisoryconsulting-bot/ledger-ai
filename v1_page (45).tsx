import { AppShell } from "@/components/AppShell";

export default function PaymentsPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-slate-500">Payments</p>
        <h1 className="text-3xl font-bold text-slate-950">Native payments strategy</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Keep checkout inside Ledger AI, make ACH the default, keep credit cards available, and only show card surcharges when your rules engine says they are allowed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Best customer path</h2>
          <p className="mt-2 text-sm text-slate-600">
            One payment page, branded receipts, ACH-first recommendations, and fast card fallback for convenience.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Best margin path</h2>
          <p className="mt-2 text-sm text-slate-600">
            Steer larger invoices to bank payments, keep subscription pricing clean, and recover card acceptance cost where permitted.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Best technical path</h2>
          <p className="mt-2 text-sm text-slate-600">
            Use processor-embedded fields and provider webhooks under a provider-neutral backend so you can avoid lock-in.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
