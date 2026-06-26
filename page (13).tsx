import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { categories, formatMoney, products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Product catalog</p>
          <h1 className="text-3xl font-bold text-slate-950">Categories, pricing, and invoice items</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Maintain services, materials, subscriptions, and fees, then pull those products into invoices.
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

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-lg font-bold">{category.name}</p>
            <p className="mt-2 text-sm text-slate-500">{category.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold">Pricing table</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-3">SKU</th>
                <th>Product</th>
                <th>Category</th>
                <th>Unit price</th>
                <th>Taxable</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="py-3 font-medium">{product.sku}</td>
                  <td>{product.name}</td>
                  <td>{product.categoryName}</td>
                  <td>{formatMoney(product.unitPrice)}</td>
                  <td>{product.taxable ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
