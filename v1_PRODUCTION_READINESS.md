import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function Page() {
  return (
    <AppShell>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold text-slate-500">Profiles</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Profiles</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Starter page wired into the modern dropdown navigation. Connect this page to your database and provider APIs as the product grows.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          Back to dashboard
        </Link>
      </div>
    </AppShell>
  );
}
