import { AppShell } from "@/components/AppShell";
import { customers, formatMoney, invoices, products, subscriptions } from "@/lib/data";

const stats = [
  { label: "Customers", value: String(customers.length) },
  { label: "Products", value: String(products.length) },
  { label: "Invoices", value: String(invoices.length) },
  { label: "Recurring plans", value: String(subscriptions.length) }
];

export default function DashboardPage() {
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-slate-500">Dashboard</p>
        <h1 className="text-3xl font-bold text-slate-950">Revenue and billing overview</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Compact visibility into customers, invoices, recurring billing, and product performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-slate-500">Revenue</p>
          <p className="mt-3 text-3xl font-bold">{formatMoney(totalRevenue)}</p>
          <p className="mt-2 text-sm text-slate-600">Total sample invoice volume represented in this deploy-safe starter.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-slate-500">Next recurring bill</p>
          <p className="mt-3 text-3xl font-bold">{subscriptions[0]?.nextInvoiceDate}</p>
          <p className="mt-2 text-sm text-slate-600">{subscriptions[0]?.customerName} · {subscriptions[0]?.productName}</p>
        </div>
      </div>
    </AppShell>
  );
}
