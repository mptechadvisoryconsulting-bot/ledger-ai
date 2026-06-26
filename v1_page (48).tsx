import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { formatMoney } from '@/lib/invoices';
import { requireBusinessAccess } from '@/lib/tenant';
import { listProductsForBusiness } from '@/lib/repositories';

export default async function ProductCatalogPage() {
  const session = await requireBusinessAccess('READ_ONLY');
  const { categories, products } = await listProductsForBusiness(session.businessId);

  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Product catalog</p>
          <h1 className="text-3xl font-bold text-slate-950">Categories, pricing, and invoice items</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Businesses can maintain their own services, materials, subscriptions, and fees, then pull those products into invoices.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/products/import" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900">
            Import / export
          </Link>
          <Link href="/invoices/new" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
            Use in invoice
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id} className="rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-lg font-bold">{category.name}</p>
            <p className="mt-2 text-sm text-slate-500">{category.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Pricing table</h2>
          <a href="/templates/product-pricing-template.xlsx" className="text-sm font-semibold text-slate-700">
            Download Excel template
          </a>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-3">SKU</th>
                <th>Product</th>
                <th>Category</th>
                <th>Unit price</th>
                <th>Taxable</th>
                <th>Units sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="py-4 font-mono text-xs">{product.sku}</td>
                  <td>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.description}</p>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>{formatMoney(product.unitPrice)}</td>
                  <td>{product.taxable ? 'Yes' : 'No'}</td>
                  <td>{product.unitsSold}</td>
                  <td>{formatMoney(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
