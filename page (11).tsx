import { AppShell } from "@/components/AppShell";

export default function NewCustomerPage() {
  return (
    <AppShell>
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold text-slate-500">Customers</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Add customer</h1>
        <p className="mt-2 text-slate-600">Starter route added to prevent 404s during deployment.</p>
      </div>
    </AppShell>
  );
}
