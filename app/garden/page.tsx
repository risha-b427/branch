"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getBranches, removeBranch } from "@/lib/branches";
import type { SavedBranch } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export default function GardenPage() {
  const [branches, setBranches] = useState<SavedBranch[]>([]);

  useEffect(() => {
    const savedBranches = JSON.parse(
      localStorage.getItem("branches") || "[]"
    );

    setBranches(savedBranches);
  }, []);

  function deleteBranch(id: string) {
    const updatedBranches = removeBranch(id);
    setBranches(updatedBranches);
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Your garden
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              Your possible futures.
            </h1>
          </div>

          <Link
            href="/create-branch"
            className="rounded-full bg-stone-900 px-6 py-3 font-medium text-white transition hover:bg-stone-700"
          >
            Grow a new branch
          </Link>
        </header>

        {branches.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-stone-300 p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Your garden is empty.
            </h2>

            <p className="mt-3 text-stone-600">
              Create your first branch to start comparing possible futures.
            </p>

            <Link
              href="/create-branch"
              className="mt-6 inline-block rounded-full bg-stone-900 px-6 py-3 text-white"
            >
              Grow your first branch
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm uppercase tracking-[0.15em] text-stone-500">
                  {branch.category}
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  {branch.title}
                </h2>

                <p className="mt-3 line-clamp-3 leading-7 text-stone-600">
                  {branch.description}
                </p>

                <div className="mt-6 border-t border-stone-200 pt-6">
                  <p className="text-sm text-stone-500">
                    Projected savings
                  </p>

                  <p className="mt-1 text-3xl font-semibold">
                    {formatCurrency(branch.projectedSavings)}
                  </p>

                  <p className="mt-2 text-sm text-stone-500">
                    After {branch.years}{" "}
                    {branch.years === 1 ? "year" : "years"}
                  </p>
                </div>

                <div className="mt-auto flex gap-3 pt-8">
                  <Link
                    href={`/branch/${branch.id}`}
                    className="flex-1 rounded-full bg-stone-900 px-4 py-3 text-center text-sm font-medium text-white"
                  >
                    View branch
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteBranch(branch.id)}
                    className="rounded-full border border-stone-300 px-4 py-3 text-sm transition hover:border-red-700 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}