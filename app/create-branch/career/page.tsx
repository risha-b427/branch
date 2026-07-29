import Link from "next/link";

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/create-branch"
          className="text-sm text-stone-600 transition hover:text-stone-900"
        >
          ← Back to decisions
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-stone-500">
          Career branch
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Compare your possible career paths.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          Explore how different career choices could affect your income,
          savings, and financial flexibility over time.
        </p>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold">
            What Branch will compare
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f3ea] p-5">
              <h3 className="font-semibold">Corporate job</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Higher stability and a predictable salary path.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ea] p-5">
              <h3 className="font-semibold">Startup job</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Potential upside with greater uncertainty.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ea] p-5">
              <h3 className="font-semibold">Graduate school</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Upfront education costs with possible long-term earnings
                growth.
              </p>
            </div>
          </div>

          <Link
            href="/create-branch/career/details"
            className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 font-medium text-white transition hover:bg-stone-700"
          >
            Enter career details
          </Link>
        </div>
      </section>
    </main>
  );
}