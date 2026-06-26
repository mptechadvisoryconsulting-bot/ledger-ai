import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { formatMoney } from '@/lib/invoices';
import { requireBusinessAccess } from '@/lib/tenant';
import { listSubscriptionsForBusiness } from '@/lib/repositories';

export default async function SubscriptionsPage() {
  const session = await requireBusinessAccess('READ_ONLY');
  const recurringBillingSchedules = await listSubscriptionsForBusiness(session.businessId);

  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Subscriptions</p>
          <h1 className="text-3xl font-bold text-slate-950">Recurring billing</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Set up recurring invoices, saved customer payment methods, and automatic billing authorizations.
          </p>
        </div>
        <Link href="/subscriptions/new" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          New recurring plan
        </Link>
      </div>

      <div className="grid gap-4">
        {recurringBillingSchedules.map((schedule) => (
          <div key={schedule.id} className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-slate-950">{schedule.productName}</p>
                <p className="text-sm text-slate-500">{schedule.customerName} · {schedule.interval} · next invoice {schedule.nextInvoiceDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-950">{formatMoney(schedule.amount)}</p>
                <p className="text-sm text-slate-500">{schedule.autopayEnabled ? `Autopay by ${schedule.paymentMethod}` : 'Manual approval'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
