import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-stone-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10">
        <h1 className="text-xl font-semibold">Branch</h1>

        <Link
          href="/garden"
          className="rounded-full border border-stone-300 px-5 py-2 transition hover:border-stone-900"
        >
          Start
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Financial decision simulator
        </p>

        <h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          See where a choice could take you.
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-600">
          Branch helps you compare life decisions like housing, jobs, and major
          purchases by showing possible futures before you commit.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/create-branch"
            className="rounded-full bg-stone-900 px-6 py-3 text-white transition hover:bg-stone-700"
          >
            Grow a branch
          </Link>

          <Link
            href="/example"
            className="rounded-full border border-stone-300 px-6 py-3 transition hover:border-stone-900"
          >
            View example
          </Link>
        </div>
      </section>
    </main>
  );
}