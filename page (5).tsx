import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">Login</p>
        <h1 className="mt-2 text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Deploy-safe placeholder login page. Connect your auth provider here.
        </p>
        <form className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input className="rounded-xl border border-slate-300 px-4 py-3" type="email" placeholder="founder@ledgerai.example" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Password
            <input className="rounded-xl border border-slate-300 px-4 py-3" type="password" placeholder="••••••••••••" />
          </label>
          <Link href="/dashboard" className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">
            Continue to dashboard
          </Link>
        </form>
      </section>
    </main>
  );
}
