import Link from 'next/link';

export default function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const errorMessage =
    searchParams?.error === 'invalid'
      ? 'Invalid email or password.'
      : searchParams?.error === 'rate_limited'
        ? 'Too many sign-in attempts. Try again in a minute.'
        : null;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-500">Welcome back</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Sign in</h1>
        {errorMessage ? (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
        <form className="mt-5 space-y-4" action="/api/auth/login" method="post">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input className="mt-1 w-full rounded-xl border px-3 py-2" name="email" type="email" autoComplete="email" required />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input className="mt-1 w-full rounded-xl border px-3 py-2" name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="w-full rounded-xl bg-slate-900 px-4 py-2 font-medium text-white">
            Sign in
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          New workspace? <Link href="/signup" className="font-medium text-slate-900">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
