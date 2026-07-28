"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { addBranch } from "@/lib/branches";

export default function HousingResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const annualIncome = Number(searchParams.get("income")) || 0;
  const currentSavings = Number(searchParams.get("savings")) || 0;
  const monthlyExpenses = Number(searchParams.get("expenses")) || 0;
  const totalHousingCost = Number(searchParams.get("housingCost")) || 0;
  const years = Number(searchParams.get("years")) || 1;

  const monthlyIncome = annualIncome / 12;

  const scenarios = [
    {
      name: "Live alone",
      description:
        "More privacy and independence, but you are responsible for the full housing cost.",
      numberOfPeople: 1,
    },
    {
      name: "One roommate",
      description:
        "Split housing costs with one other person while keeping some personal space.",
      numberOfPeople: 2,
    },
    {
      name: "Two roommates",
      description:
        "Lower monthly housing costs, but less privacy and more shared space.",
      numberOfPeople: 3,
    },
  ];

  const results = scenarios.map((scenario) => {
    const monthlyHousingCost =
      totalHousingCost / scenario.numberOfPeople;

    const monthlyRemaining =
      monthlyIncome - monthlyExpenses - monthlyHousingCost;

    const projectedSavings =
      currentSavings + monthlyRemaining * 12 * years;

    return {
      ...scenario,
      monthlyHousingCost,
      monthlyRemaining,
      projectedSavings,
    };
  });

  function chooseFuture(result: (typeof results)[number]) {
    const savedBranch = {
        id: crypto.randomUUID(),
        title: result.name,
        category: "Housing",
        createdAt: new Date().toISOString(),
        years,
        annualIncome,
        currentSavings,
        monthlyExpenses,
        originalHousingCost: totalHousingCost,
        monthlyHousingCost: result.monthlyHousingCost,
        monthlyRemaining: result.monthlyRemaining,
        projectedSavings: result.projectedSavings,
        description: result.description,
    };

    addBranch(savedBranch);

    router.push("/garden");
   }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/create-branch/housing/details"
          className="text-sm text-stone-600 hover:text-stone-900"
        >
          ← Edit details
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-stone-500">
          Housing futures
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Compare where each path could lead.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          These projections show how different living arrangements could
          affect your monthly budget and savings over {years}{" "}
          {years === 1 ? "year" : "years"}.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {results.map((result) => (
            <article
              key={result.name}
              className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{result.name}</h2>

              <p className="mt-3 min-h-20 leading-7 text-stone-600">
                {result.description}
              </p>

              <div className="mt-6 border-t border-stone-200 pt-6">
                <p className="text-sm text-stone-500">
                  Your monthly housing cost
                </p>

                <p className="mt-1 text-3xl font-semibold">
                  {formatCurrency(result.monthlyHousingCost)}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Money remaining each month
                </p>

                <p
                  className={`mt-1 text-2xl font-semibold ${
                    result.monthlyRemaining < 0
                      ? "text-red-700"
                      : "text-stone-900"
                  }`}
                >
                  {formatCurrency(result.monthlyRemaining)}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-stone-500">
                  Projected savings after {years}{" "}
                  {years === 1 ? "year" : "years"}
                </p>

                <p
                  className={`mt-1 text-2xl font-semibold ${
                    result.projectedSavings < 0
                      ? "text-red-700"
                      : "text-stone-900"
                  }`}
                >
                  {formatCurrency(result.projectedSavings)}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={() => chooseFuture(result)}
                  className="w-full rounded-full border border-stone-900 px-5 py-3 font-medium transition hover:bg-stone-900 hover:text-white"
                >
                  Choose this future
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-stone-900 p-6 text-white md:p-8">
          <h2 className="text-2xl font-semibold">How Branch calculated this</h2>

          <p className="mt-3 max-w-3xl leading-7 text-stone-300">
            Branch divided your annual income into monthly income, subtracted
            your non-housing expenses and estimated housing cost, and added the
            remaining amount to your current savings each month.
          </p>

          <p className="mt-4 text-sm text-stone-400">
            These are simplified estimates and do not yet include taxes,
            inflation, investment growth, rent increases, or unexpected
            expenses.
          </p>
        </div>
      </section>
    </main>
  );
}