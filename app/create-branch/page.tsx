import Link from "next/link";

const decisionTypes = [
  {
    title: "Housing",
    description: "Compare living alone, with roommates, or at home.",
    emoji: "🏠",
    href: "/create-branch/housing",
  },
  {
    title: "Career",
    description: "Compare jobs, graduate school, or different career paths.",
    emoji: "💼",
    href: "#",
  },
  {
    title: "Major Purchase",
    description: "Explore the impact of a car, trip, laptop, or other purchase.",
    emoji: "🚗",
    href: "#",
  },
];

export default function CreateBranchPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
          New branch
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          What decision are you trying to make?
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          Choose one category to start exploring possible futures.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {decisionTypes.map((decision) => (
            <Link
                key={decision.title}
                href={decision.href}
                className="rounded-3xl border border-stone-300 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
                >
                <span className="text-3xl">{decision.emoji}</span>

                <h2 className="mt-6 text-2xl font-semibold">
                    {decision.title}
                </h2>

                <p className="mt-3 leading-7 text-stone-600">
                    {decision.description}
                </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}