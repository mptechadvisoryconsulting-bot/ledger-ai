import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto flex max-w-2xl flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-500">404 Error</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-950">Page not found</h1>
          <p className="mt-2 text-slate-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
          >
            Back to home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800"
          >
            Go to dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
