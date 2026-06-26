import { AppShell } from "@/components/AppShell";

export default function NewInvoicePage() {
  return (
    <AppShell>
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold text-slate-500">Invoices</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Create invoice</h1>
        <p className="mt-2 text-slate-600">Starter route added so the billing actions no longer 404.</p>
      </div>
    </AppShell>
  );
}
