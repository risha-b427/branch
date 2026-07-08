export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-900">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <p className="text-xl font-semibold tracking-tight">Branch</p>
        <button className="rounded-full border border-stone-300 px-4 py-2 text-sm">
          Start
        </button>
      </nav>

      <section className="mx-auto mt-28 max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-stone-500">
          Financial decision simulator
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
          See where a choice could take you.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
          Branch helps you compare life decisions like housing, jobs, and major
          purchases by showing possible futures before you commit.
        </p>

        <div className="mt-10 flex gap-3">
          <button className="rounded-full bg-stone-900 px-6 py-3 text-white">
            Grow a branch
          </button>
          <button className="rounded-full border border-stone-300 px-6 py-3">
            View example
          </button>
        </div>
      </section>
    </main>
  );
}