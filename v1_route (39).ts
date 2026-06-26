import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { formatMoney, invoiceTotal } from '@/lib/invoices';
import { requireBusinessAccess } from '@/lib/tenant';
import { listInvoicesForBusiness } from '@/lib/repositories';

export default async function InvoicesPage() {
  const session = await requireBusinessAccess('READ_ONLY');
  const invoices = await listInvoicesForBusiness(session.businessId);

  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Invoices</p>
          <h1 className="text-3xl font-bold text-slate-950">Invoices</h1>
        </div>
        <Link href="/invoices/new" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          Create invoice
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="grid gap-4 border-b border-slate-100 p-5 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="font-bold">{invoice.number}</p>
              <p className="text-sm text-slate-500">{invoice.customerName}</p>
            </div>
            <p className="text-sm text-slate-600">{invoice.status}</p>
            <p className="font-semibold">{formatMoney(invoiceTotal(invoice))}</p>
            <div className="flex gap-3 text-sm font-bold text-slate-950">
              <Link href={`/pay/${invoice.id}`}>Pay →</Link>
              <Link href={`/invoices/${invoice.id}/print`}>PDF →</Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
