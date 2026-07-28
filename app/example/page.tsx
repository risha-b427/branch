import Link from "next/link";

export default function ExamplePage() {
  const scenarios = [
    {
      name: "Live alone",
      housingCost: "$2,400",
      remaining: "$2,050",
      projectedSavings: "$135,000",
    },
    {
      name: "One roommate",
      housingCost: "$1,200",
      remaining: "$3,250",
      projectedSavings: "$207,000",
    },
    {
      name: "Two roommates",
      housingCost: "$800",
      remaining: "$3,650",
      projectedSavings: "$231,000",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-stone-600 hover:text-stone-900"
        >
          ← Back home
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-stone-500">
          Example branch
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Should Maya live alone or with roommates?
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          Maya earns $75,000 per year, has $12,000 saved, and wants to compare
          her housing options over five years.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <article
              key={scenario.name}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{scenario.name}</h2>

              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Monthly housing cost
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {scenario.housingCost}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Money remaining each month
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {scenario.remaining}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Projected savings after five years
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {scenario.projectedSavings}
                </p>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/create-branch"
          className="mt-10 inline-block rounded-full bg-stone-900 px-6 py-3 text-white transition hover:bg-stone-700"
        >
          Grow your own branch
        </Link>
      </section>
    </main>
  );
}