import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { formatMoney, invoices } from "@/lib/data";

export default function InvoicesPage() {
  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Invoices</p>
          <h1 className="text-3xl font-bold text-slate-950">Invoice operations</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Create invoices, track payment status, and send customers to a hosted payment page.
          </p>
        </div>
        <Link href="/invoices/new" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          Create invoice
        </Link>
      </div>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-slate-950">{invoice.number}</p>
                <p className="text-sm text-slate-500">{invoice.customerName} · due {invoice.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-950">{formatMoney(invoice.total)}</p>
                <p className="text-sm text-slate-500">{invoice.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
