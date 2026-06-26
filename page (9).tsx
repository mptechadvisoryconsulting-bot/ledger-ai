import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { customers } from "@/lib/data";

export default function CustomersPage() {
  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Customers</p>
          <h1 className="text-3xl font-bold text-slate-950">Customer setup</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Create customers, store billing contacts, set default payment preferences, and enable automatic billing.
          </p>
        </div>
        <Link href="/customers/new" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          Add customer
        </Link>
      </div>

      <div className="grid gap-4">
        {customers.map((customer) => (
          <div key={customer.id} className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-slate-950">{customer.businessName}</p>
                <p className="text-sm text-slate-500">{customer.contactName} · {customer.email}</p>
                <p className="mt-2 text-sm text-slate-600">{customer.billingAddress}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  Default: {customer.defaultPaymentMethod === "bank" ? "Bank / ACH" : "Card"}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${customer.autopayEnabled ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {customer.autopayEnabled ? "Autopay on" : "Autopay off"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
