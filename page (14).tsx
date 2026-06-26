import { AppShell } from "@/components/AppShell";

export default function ProductsImportPage() {
  return (
    <AppShell>
      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold text-slate-500">Products</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Import / export</h1>
        <p className="mt-2 text-slate-600">Upload your pricing sheet or export the catalog from this route.</p>
      </div>
    </AppShell>
  );
}
