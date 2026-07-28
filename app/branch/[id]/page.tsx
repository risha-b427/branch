"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { SavedBranch } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { getBranchById, removeBranch } from "@/lib/branches";

export default function BranchDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [branch, setBranch] = useState<SavedBranch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const branchId = params.id as string;
    const selectedBranch = getBranchById(branchId);

    setBranch(selectedBranch || null);
    setIsLoading(false);
  }, [params.id]);

  function deleteBranch() {
    if (!branch) {
      return;
    }
    removeBranch(branch.id);
    router.push("/garden");
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-6 text-stone-900">
        <p className="text-stone-600">Loading branch...</p>
      </main>
    );
  }

  if (!branch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-6 text-stone-900">
        <section className="text-center">
          <h1 className="text-3xl font-semibold">Branch not found.</h1>

          <p className="mt-3 text-stone-600">
            This branch may have been deleted or is no longer available.
          </p>

          <Link
            href="/garden"
            className="mt-6 inline-block rounded-full bg-stone-900 px-6 py-3 text-white"
          >
            Return to garden
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/garden"
            className="text-sm text-stone-600 transition hover:text-stone-900"
          >
            ← Back to garden
          </Link>

          <button
            type="button"
            onClick={deleteBranch}
            className="rounded-full border border-stone-300 px-5 py-2 text-sm transition hover:border-red-700 hover:text-red-700"
          >
            Delete branch
          </button>
        </header>

        <div className="mt-10">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
            {branch.category} branch
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {branch.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            {branch.description}
          </p>

          <p className="mt-3 text-sm text-stone-500">
            Created{" "}
            {new Date(branch.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-stone-900 p-6 text-white">
            <p className="text-sm text-stone-300">
              Projected savings after {branch.years}{" "}
              {branch.years === 1 ? "year" : "years"}
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {formatCurrency(branch.projectedSavings)}
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6">
            <p className="text-sm text-stone-500">
              Monthly housing cost
            </p>

            <p className="mt-3 text-3xl font-semibold">
              {formatCurrency(branch.monthlyHousingCost)}
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6">
            <p className="text-sm text-stone-500">
              Money remaining each month
            </p>

            <p
              className={`mt-3 text-3xl font-semibold ${
                branch.monthlyRemaining < 0
                  ? "text-red-700"
                  : "text-stone-900"
              }`}
            >
              {formatCurrency(branch.monthlyRemaining)}
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Starting assumptions</h2>

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
              <p className="text-sm text-stone-500">
                Original housing cost
              </p>
              <p className="mt-1 text-xl font-medium">
                {formatCurrency(branch.originalHousingCost)}
              </p>
            </div>

            <div>
              <p className="text-sm text-stone-500">Projection length</p>
              <p className="mt-1 text-xl font-medium">
                {branch.years} {branch.years === 1 ? "year" : "years"}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/create-branch/housing/details"
            className="rounded-full border border-stone-900 px-6 py-3 font-medium transition hover:bg-stone-900 hover:text-white"
          >
            Create a similar branch
          </Link>

          <Link
            href="/create-branch"
            className="rounded-full bg-stone-900 px-6 py-3 font-medium text-white transition hover:bg-stone-700"
          >
            Grow another branch
          </Link>
        </div>
      </section>
    </main>
  );
}