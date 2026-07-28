"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HousingDetailsPage() {
  const router = useRouter();

  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [expenses, setExpenses] = useState("");
  const [housingCost, setHousingCost] = useState("");
  const [years, setYears] = useState("5");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({
      income,
      savings,
      expenses,
      housingCost,
      years,
    });

    router.push(`/create-branch/housing/results?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
          Housing details
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Tell us about your finances.
        </h1>

        <p className="mt-4 text-lg leading-8 text-stone-600">
          These numbers will help Branch compare your housing futures.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block">
            <span className="text-sm font-medium">Annual income</span>
            <input
              type="number"
              min="0"
              required
              value={income}
              onChange={(event) => setIncome(event.target.value)}
              placeholder="75000"
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Current savings</span>
            <input
              type="number"
              min="0"
              required
              value={savings}
              onChange={(event) => setSavings(event.target.value)}
              placeholder="12000"
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">
              Monthly non-housing expenses
            </span>
            <input
              type="number"
              min="0"
              required
              value={expenses}
              onChange={(event) => setExpenses(event.target.value)}
              placeholder="1800"
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">
              Estimated monthly housing cost
            </span>
            <input
              type="number"
              min="0"
              required
              value={housingCost}
              onChange={(event) => setHousingCost(event.target.value)}
              placeholder="2200"
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Projection length</span>
            <select
              value={years}
              onChange={(event) => setYears(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
            >
              <option value="1">1 year</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
              <option value="10">10 years</option>
            </select>
          </label>

          <button
            type="submit"
            className="rounded-full bg-stone-900 px-6 py-3 text-white transition hover:bg-stone-700"
          >
            Compare futures
          </button>
        </form>
      </section>
    </main>
  );
}