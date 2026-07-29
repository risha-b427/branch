"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addBranch } from "@/lib/branches";
import { formatCurrency } from "@/lib/format";
import type { SavedBranch } from "@/lib/types";

type CareerResult = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  startingSalary: number;
  endingSalary: number;
  monthlyTakeHome: number;
  monthlyRemaining: number;
  projectedSavings: number;
  additionalValue: number;
  additionalValueLabel: string;
  stability: "Low" | "Medium" | "High";
  flexibility: "Low" | "Medium" | "High";
  risk: "Low" | "Medium" | "High";
  summary: string;
  futureYou: string;
};

function calculateWorkingPath({
  id,
  name,
  emoji,
  description,
  startingSalary,
  yearlyRaise,
  currentSavings,
  monthlyExpenses,
  years,
  additionalValue = 0,
  additionalValueLabel,
  stability,
  flexibility,
  risk,
  summary,
  futureYou,
}: {
  id: string;
  name: string;
  emoji: string;
  description: string;
  startingSalary: number;
  yearlyRaise: number;
  currentSavings: number;
  monthlyExpenses: number;
  years: number;
  additionalValue?: number;
  additionalValueLabel: string;
  stability: "Low" | "Medium" | "High";
  flexibility: "Low" | "Medium" | "High";
  risk: "Low" | "Medium" | "High";
  summary: string;
  futureYou: string;
}): CareerResult {
  let salary = startingSalary;
  let projectedSavings = currentSavings;

  for (let year = 0; year < years; year += 1) {
    const estimatedTakeHomeIncome = salary * 0.78;
    const yearlyLivingExpenses = monthlyExpenses * 12;

    projectedSavings += estimatedTakeHomeIncome - yearlyLivingExpenses;
    salary *= 1 + yearlyRaise / 100;
  }

  const monthlyTakeHome = (startingSalary * 0.78) / 12;
  const monthlyRemaining = monthlyTakeHome - monthlyExpenses;

  return {
    id,
    name,
    emoji,
    description,
    startingSalary,
    endingSalary: salary,
    monthlyTakeHome,
    monthlyRemaining,
    projectedSavings: projectedSavings + additionalValue,
    additionalValue,
    additionalValueLabel,
    stability,
    flexibility,
    risk,
    summary,
    futureYou,
  };
}

function CareerResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSavings = Number(searchParams.get("currentSavings")) || 0;
  const monthlyExpenses = Number(searchParams.get("monthlyExpenses")) || 0;
  const years = Number(searchParams.get("years")) || 5;

  const corporateSalary = Number(searchParams.get("corporateSalary")) || 0;
  const corporateRaise = Number(searchParams.get("corporateRaise")) || 0;

  const startupSalary = Number(searchParams.get("startupSalary")) || 0;
  const startupRaise = Number(searchParams.get("startupRaise")) || 0;
  const startupEquity = Number(searchParams.get("startupEquity")) || 0;

  const tuition = Number(searchParams.get("tuition")) || 0;
  const schoolYears = Number(searchParams.get("schoolYears")) || 0;
  const graduateSalary = Number(searchParams.get("graduateSalary")) || 0;

  const corporateResult = calculateWorkingPath({
    id: "corporate",
    name: "Corporate job",
    emoji: "🏢",
    description: "A steady path with predictable income and lower risk.",
    startingSalary: corporateSalary,
    yearlyRaise: corporateRaise,
    currentSavings,
    monthlyExpenses,
    years,
    additionalValueLabel: "Additional value",
    stability: "High",
    flexibility: "Medium",
    risk: "Low",
    summary:
      "This path provides the most predictable paycheck and may make it easier to plan for rent, travel, and major purchases.",
    futureYou:
      "You built your future one steady paycheck at a time. Your income was predictable, your savings grew consistently, and you had more room to plan ahead without as much financial uncertainty.",
  });

  const startupResult = calculateWorkingPath({
    id: "startup",
    name: "Startup job",
    emoji: "🚀",
    description:
      "A less predictable path with possible growth and equity upside.",
    startingSalary: startupSalary,
    yearlyRaise: startupRaise,
    currentSavings,
    monthlyExpenses,
    years,
    additionalValue: startupEquity,
    additionalValueLabel: "Potential equity value",
    stability: "Low",
    flexibility: "High",
    risk: "High",
    summary:
      "This path may provide faster growth and more ownership, but your income and equity could be less predictable.",
    futureYou:
      "Your path was not always predictable, but it gave you opportunities to grow quickly and take on meaningful responsibility. The potential reward was higher, although so was the uncertainty.",
  });

  function calculateGraduateSchool(): CareerResult {
    let projectedSavings = currentSavings;
    let salary = graduateSalary;

    for (let year = 0; year < years; year += 1) {
      if (year < schoolYears) {
        projectedSavings -= tuition;
        projectedSavings -= monthlyExpenses * 12;
      } else {
        const estimatedTakeHomeIncome = salary * 0.78;
        projectedSavings += estimatedTakeHomeIncome - monthlyExpenses * 12;
        salary *= 1.03;
      }
    }

    const monthlyTakeHome = (graduateSalary * 0.78) / 12;
    const monthlyRemaining = monthlyTakeHome - monthlyExpenses;
    const totalTuition = tuition * Math.min(schoolYears, years);

    return {
      id: "graduate-school",
      name: "Graduate school",
      emoji: "🎓",
      description:
        "An upfront investment that could increase your future earning potential.",
      startingSalary: graduateSalary,
      endingSalary: salary,
      monthlyTakeHome,
      monthlyRemaining,
      projectedSavings,
      additionalValue: totalTuition,
      additionalValueLabel: "Total tuition during projection",
      stability: "Medium",
      flexibility: "Low",
      risk: "Medium",
      summary:
        "This path requires the most sacrifice upfront. Its long-term value depends on whether the degree meaningfully improves your career opportunities.",
      futureYou:
        "The early years required patience and sacrifice. After graduating, you began rebuilding your savings with stronger qualifications and new career opportunities.",
    };
  }

  const graduateResult = calculateGraduateSchool();

  const results = [corporateResult, startupResult, graduateResult];

  const bestSavings = Math.max(
    ...results.map((result) => result.projectedSavings),
  );

  function chooseFuture(result: CareerResult) {
    const savedBranch: SavedBranch = {
      id: crypto.randomUUID(),
      title: result.name,
      category: "Career",
      createdAt: new Date().toISOString(),
      years,
      description: result.description,
      projectedSavings: result.projectedSavings,
      monthlyRemaining: result.monthlyRemaining,

      metrics: [
        {
          label: "Estimated monthly take-home pay",
          value: result.monthlyTakeHome,
          format: "currency",
        },
        {
          label: "Money remaining each month",
          value: result.monthlyRemaining,
          format: "currency",
        },
        {
          label: `Projected savings after ${years} ${
            years === 1 ? "year" : "years"
          }`,
          value: result.projectedSavings,
          format: "currency",
        },
      ],

      assumptions: [
        {
          label: "Starting salary",
          value: formatCurrency(result.startingSalary),
        },
        {
          label: "Estimated salary near the end",
          value: formatCurrency(result.endingSalary),
        },
        {
          label: "Current savings",
          value: formatCurrency(currentSavings),
        },
        {
          label: "Monthly living expenses",
          value: formatCurrency(monthlyExpenses),
        },
        {
          label: "Stability",
          value: result.stability,
        },
        {
          label: "Flexibility",
          value: result.flexibility,
        },
        {
          label: "Risk",
          value: result.risk,
        },
        {
          label: "Projection length",
          value: `${years} ${years === 1 ? "year" : "years"}`,
        },
      ],
    };

    addBranch(savedBranch);
    router.push("/garden");
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/create-branch/career/details"
          className="text-sm text-stone-600 transition hover:text-stone-900"
        >
          ← Change my details
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-stone-500">
          Your possible futures
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Here is how each path could unfold.
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">
          These results use a simplified estimate of take-home pay and assume
          your regular monthly expenses stay the same.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {results.map((result) => {
            const hasBestSavings =
              result.projectedSavings === bestSavings;

            return (
              <article
                key={result.id}
                className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-4xl">{result.emoji}</span>

                  {hasBestSavings && (
                    <span className="rounded-full bg-[#e6efd8] px-3 py-1 text-xs font-medium text-stone-800">
                      Highest projected value
                    </span>
                  )}
                </div>

                <h2 className="mt-6 text-2xl font-semibold">{result.name}</h2>

                <p className="mt-2 min-h-14 leading-7 text-stone-600">
                  {result.description}
                </p>

                <div className="mt-6 rounded-2xl bg-[#f7f3ea] p-5">
                  <p className="text-sm text-stone-500">
                    Estimated monthly take-home
                  </p>

                  <p className="mt-2 text-3xl font-semibold">
                    {formatCurrency(result.monthlyTakeHome)}
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-sm text-stone-500">
                      Money left after monthly expenses
                    </p>

                    <p
                      className={`mt-1 text-xl font-semibold ${
                        result.monthlyRemaining < 0 ? "text-red-700" : ""
                      }`}
                    >
                      {formatCurrency(result.monthlyRemaining)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-stone-500">
                      Projected savings after {years}{" "}
                      {years === 1 ? "year" : "years"}
                    </p>

                    <p
                      className={`mt-1 text-xl font-semibold ${
                        result.projectedSavings < 0 ? "text-red-700" : ""
                      }`}
                    >
                      {formatCurrency(result.projectedSavings)}
                    </p>
                  </div>

                  {result.additionalValue > 0 && (
                    <div>
                      <p className="text-sm text-stone-500">
                        {result.additionalValueLabel}
                      </p>

                      <p className="mt-1 text-xl font-semibold">
                        {formatCurrency(result.additionalValue)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border border-stone-200 p-3">
                    <p className="text-xs text-stone-500">Stability</p>
                    <p className="mt-1 text-sm font-medium">
                      {result.stability}
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 p-3">
                    <p className="text-xs text-stone-500">Flexibility</p>
                    <p className="mt-1 text-sm font-medium">
                      {result.flexibility}
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 p-3">
                    <p className="text-xs text-stone-500">Risk</p>
                    <p className="mt-1 text-sm font-medium">{result.risk}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold">What this means</h3>

                  <p className="mt-2 leading-7 text-stone-600">
                    {result.summary}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                  <p className="text-sm font-medium">A message from Future You</p>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {result.futureYou}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => chooseFuture(result)}
                  className="mt-6 rounded-full bg-stone-900 px-5 py-3 font-medium text-white transition hover:bg-stone-700"
                >
                  Grow this branch
                </button>
              </article>
            );
          })}
        </div>

        <section className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold">
            How Branch calculated this
          </h2>

          <p className="mt-3 leading-7 text-stone-600">
            Branch estimates that you keep roughly 78% of your salary after
            taxes and deductions. It subtracts your monthly living expenses,
            applies your estimated raises, and adds tuition or potential equity
            where relevant.
          </p>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Real taxes, benefits, investment growth, financial aid, bonuses,
            equity outcomes, and unexpected expenses may change the result.
          </p>
        </section>
      </section>
    </main>
  );
}

export default function CareerResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
          <p className="mx-auto max-w-6xl">Growing your possible futures...</p>
        </main>
      }
    >
      <CareerResultsContent />
    </Suspense>
  );
}