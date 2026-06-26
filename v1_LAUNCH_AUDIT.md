import AppShell from '@/components/AppShell';

const metrics = [
  { label: 'Active teams', value: '128' },
  { label: 'Monthly payment volume', value: '$842,190' },
  { label: 'Failed webhooks', value: '3' },
  { label: 'Platform MRR', value: '$9,420' }
];

export default function AdminPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Platform admin</p>
          <h1 className="text-3xl font-semibold text-slate-900">Operations dashboard</h1>
          <p className="text-slate-600">
            Internal view for support, billing, account health, webhook monitoring, and subscription volume.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Production controls to connect</h2>
          <p className="mt-2 text-slate-600">
            Add role-restricted APIs for viewing teams, replaying webhooks, suspending accounts,
            refunding platform subscriptions, and safely impersonating a business for support.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
