"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CareerDetailsPage() {
  const router = useRouter();

  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [years, setYears] = useState("5");

  const [corporateSalary, setCorporateSalary] = useState("");
  const [corporateRaise, setCorporateRaise] = useState("3");

  const [startupSalary, setStartupSalary] = useState("");
  const [startupRaise, setStartupRaise] = useState("4");
  const [startupEquity, setStartupEquity] = useState("");

  const [tuition, setTuition] = useState("");
  const [schoolYears, setSchoolYears] = useState("2");
  const [graduateSalary, setGraduateSalary] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({
      currentSavings,
      monthlyExpenses,
      years,
      corporateSalary,
      corporateRaise,
      startupSalary,
      startupRaise,
      startupEquity: startupEquity || "0",
      tuition,
      schoolYears,
      graduateSalary,
    });

    router.push(`/create-branch/career/results?${params.toString()}`);
  }

  const inputStyles =
    "mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-stone-700";

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/create-branch/career"
          className="text-sm text-stone-600 transition hover:text-stone-900"
        >
          ← Back to career overview
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-stone-500">
          Career branch
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Tell us about your options.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          Enter your best estimates. They do not need to be perfect—Branch is
          meant to help you understand the overall tradeoffs.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
                About you
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Your starting point
              </h2>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <label>
                <span className="font-medium">Current savings</span>
                <p className="mt-1 text-sm text-stone-500">
                  Money you already have saved.
                </p>

                <input
                  type="number"
                  min="0"
                  required
                  value={currentSavings}
                  onChange={(event) => setCurrentSavings(event.target.value)}
                  placeholder="10000"
                  className={inputStyles}
                />
              </label>

              <label>
                <span className="font-medium">Monthly living expenses</span>
                <p className="mt-1 text-sm text-stone-500">
                  Rent, food, transportation, and other regular spending.
                </p>

                <input
                  type="number"
                  min="0"
                  required
                  value={monthlyExpenses}
                  onChange={(event) => setMonthlyExpenses(event.target.value)}
                  placeholder="2500"
                  className={inputStyles}
                />
              </label>

              <label>
                <span className="font-medium">Years to compare</span>
                <p className="mt-1 text-sm text-stone-500">
                  How far into the future should Branch look?
                </p>

                <select
                  value={years}
                  onChange={(event) => setYears(event.target.value)}
                  className={inputStyles}
                >
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="10">10 years</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
              Option one
            </p>

            <h2 className="mt-2 text-2xl font-semibold">Corporate job</h2>

            <p className="mt-2 text-stone-600">
              A more predictable job with a steady salary and regular raises.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <label>
                <span className="font-medium">Starting annual salary</span>

                <input
                  type="number"
                  min="0"
                  required
                  value={corporateSalary}
                  onChange={(event) => setCorporateSalary(event.target.value)}
                  placeholder="85000"
                  className={inputStyles}
                />
              </label>

              <label>
                <span className="font-medium">Expected yearly raise</span>
                <p className="mt-1 text-sm text-stone-500">
                  Three percent is a reasonable starting estimate.
                </p>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.5"
                    required
                    value={corporateRaise}
                    onChange={(event) => setCorporateRaise(event.target.value)}
                    className={`${inputStyles} pr-12`}
                  />

                  <span className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-stone-500">
                    %
                  </span>
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
              Option two
            </p>

            <h2 className="mt-2 text-2xl font-semibold">Startup job</h2>

            <p className="mt-2 text-stone-600">
              A potentially faster-moving path with more uncertainty and
              possible equity upside.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <label>
                <span className="font-medium">Starting annual salary</span>

                <input
                  type="number"
                  min="0"
                  required
                  value={startupSalary}
                  onChange={(event) => setStartupSalary(event.target.value)}
                  placeholder="70000"
                  className={inputStyles}
                />
              </label>

              <label>
                <span className="font-medium">Expected yearly raise</span>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.5"
                    required
                    value={startupRaise}
                    onChange={(event) => setStartupRaise(event.target.value)}
                    className={`${inputStyles} pr-12`}
                  />

                  <span className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-stone-500">
                    %
                  </span>
                </div>
              </label>

              <label className="md:col-span-2">
                <span className="font-medium">
                  Estimated future equity value
                </span>

                <p className="mt-1 text-sm text-stone-500">
                  Optional. Enter what you think your ownership could
                  eventually be worth. This is not guaranteed income.
                </p>

                <input
                  type="number"
                  min="0"
                  value={startupEquity}
                  onChange={(event) => setStartupEquity(event.target.value)}
                  placeholder="25000"
                  className={inputStyles}
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
              Option three
            </p>

            <h2 className="mt-2 text-2xl font-semibold">Graduate school</h2>

            <p className="mt-2 text-stone-600">
              A path with upfront costs and delayed earnings, but potentially
              stronger opportunities afterward.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <label>
                <span className="font-medium">Tuition per year</span>

                <input
                  type="number"
                  min="0"
                  required
                  value={tuition}
                  onChange={(event) => setTuition(event.target.value)}
                  placeholder="30000"
                  className={inputStyles}
                />
              </label>

              <label>
                <span className="font-medium">Years in school</span>

                <select
                  value={schoolYears}
                  onChange={(event) => setSchoolYears(event.target.value)}
                  className={inputStyles}
                >
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="font-medium">
                  Expected annual salary after graduation
                </span>

                <input
                  type="number"
                  min="0"
                  required
                  value={graduateSalary}
                  onChange={(event) => setGraduateSalary(event.target.value)}
                  placeholder="105000"
                  className={inputStyles}
                />
              </label>
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-full bg-stone-900 px-7 py-3 font-medium text-white transition hover:bg-stone-700"
            >
              Compare my futures
            </button>

            <p className="text-sm text-stone-500">
              Branch uses simplified estimates—not financial advice.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}