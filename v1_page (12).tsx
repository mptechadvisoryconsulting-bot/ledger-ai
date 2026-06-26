import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Ledger AI</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            AI-assisted invoicing with online payments, recurring billing, and product pricing.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Ledger AI helps teams create customers, manage product categories, send invoices, collect online
            payments, automate recurring billing, and review revenue insights from one compact dashboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
            Sign in
          </Link>
          <Link href="/dashboard" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800">
            Open dashboard
          </Link>
          <Link href="/api/health" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800">
            Health check
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Invoices", "Create, print, PDF-ready, and track invoice payment status."],
            ["Catalog", "Import/export product categories and pricing from an Excel-compatible template."],
            ["Payments", "Modern customer payment pages with card, bank, saved method, and autopay options."]
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
