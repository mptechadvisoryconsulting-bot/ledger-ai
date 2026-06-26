import { AppShell } from "@/components/AppShell";

const integrations = [
  { name: "Payment provider", description: "Processor-neutral card and bank payment adapter with hosted checkout and custom webhooks.", status: "Ready placeholder" },
  { name: "Plaid-style bank connections", description: "Connect bank accounts for verification, reconciliation, and transaction matching.", status: "Ready placeholder" },
  { name: "accounting", description: "Sync customers, invoices, payments, and deposits.", status: "Ready placeholder" },
  { name: "field-service", description: "Import customers, jobs, and service data for invoice creation.", status: "Ready placeholder" }
];

export default function IntegrationsPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-slate-500">Apps</p>
        <h1 className="text-3xl font-bold text-slate-950">Integrations</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Keep provider code isolated so payments, accounting, bank connections, and job-management sync can evolve independently.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <div key={integration.name} className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-lg font-bold">{integration.name}</p>
            <p className="mt-2 text-sm text-slate-600">{integration.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{integration.status}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
