"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const housingOptions = [
  {
    id: "alone",
    title: "Live alone",
    description: "More privacy and independence, with higher monthly costs.",
    emoji: "🏙️",
  },
  {
    id: "roommates",
    title: "Live with roommates",
    description: "Lower housing costs with shared space and responsibilities.",
    emoji: "👥",
  },
  {
    id: "home",
    title: "Stay at home",
    description: "Save more money while giving up some independence.",
    emoji: "🏡",
  },
];

export default function HousingPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  function toggleOption(id: string) {
    setSelectedOptions((current) =>
      current.includes(id)
        ? current.filter((option) => option !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
          Housing decision
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Which futures do you want to compare?
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          Select at least two housing paths.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {housingOptions.map((option) => {
            const isSelected = selectedOptions.includes(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`rounded-3xl border p-6 text-left transition ${
                  isSelected
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-300 bg-white hover:-translate-y-1 hover:shadow-lg"
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>

                <h2 className="mt-6 text-2xl font-semibold">
                  {option.title}
                </h2>

                <p
                  className={`mt-3 leading-7 ${
                    isSelected ? "text-stone-300" : "text-stone-600"
                  }`}
                >
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-stone-500">
            {selectedOptions.length} selected
          </p>

          <button
            type="button"
            disabled={selectedOptions.length < 2}
            onClick={() => router.push("/create-branch/housing/details")}
            className="rounded-full bg-stone-900 px-6 py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-30"
            >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}