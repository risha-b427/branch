"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { SavedBranch } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export default function BranchPage() {
  const [branch, setBranch] = useState<SavedBranch | null>(null);

  useEffect(() => {
    const savedBranch = localStorage.getItem("selectedBranch");

    if (savedBranch) {
      setBranch(JSON.parse(savedBranch));
    }
  }, []);

  if (!branch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-6 text-stone-900">
        <section className="text-center">
          <h1 className="text-3xl font-semibold">No branch selected yet.</h1>

          <Link
            href="/create-branch"
            className="mt-6 inline-block rounded-full bg-stone-900 px-6 py-3 text-white"
          >
            Create a branch
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
          {branch.category} branch
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          {branch.title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          {branch.description}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Monthly housing cost</p>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(branch.monthlyHousingCost)}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Monthly money remaining</p>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(branch.monthlyRemaining)}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">
              Savings after {branch.years}{" "}
              {branch.years === 1 ? "year" : "years"}
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(branch.projectedSavings)}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6">
          <h2 className="text-2xl font-semibold">Your starting point</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-stone-500">Annual income</p>
              <p className="mt-1 text-xl font-medium">
                {formatCurrency(branch.annualIncome)}
              </p>
            </div>

            <div>
              <p className="text-sm text-stone-500">Current savings</p>
              <p className="mt-1 text-xl font-medium">
                {formatCurrency(branch.currentSavings)}
              </p>
            </div>

            <div>
              <p className="text-sm text-stone-500">
                Monthly non-housing expenses
              </p>
              <p className="mt-1 text-xl font-medium">
                {formatCurrency(branch.monthlyExpenses)}
              </p>
            </div>

            <div>
              <p className="text-sm text-stone-500">Projection length</p>
              <p className="mt-1 text-xl font-medium">
                {branch.years} {branch.years === 1 ? "year" : "years"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/create-branch/housing/details"
            className="rounded-full border border-stone-900 px-6 py-3 font-medium"
          >
            Edit assumptions
          </Link>

          <Link
            href="/"
            className="rounded-full bg-stone-900 px-6 py-3 font-medium text-white"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}