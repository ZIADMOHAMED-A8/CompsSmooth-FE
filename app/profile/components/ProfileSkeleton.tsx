export function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      <section className="rounded-[4px] border border-[#dce2e8] bg-white p-4">
        <div className="h-20 w-20 animate-pulse rounded-full bg-[#edf0f3]" />
        <div className="mt-4 h-4 w-40 animate-pulse rounded bg-[#edf0f3]" />
        <div className="mt-2 h-3 w-52 animate-pulse rounded bg-[#edf0f3]" />
        <div className="mt-5 space-y-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-12 animate-pulse rounded-[4px] bg-[#f2f4f6]"
            />
          ))}
        </div>
      </section>

      <section className="rounded-[4px] border border-[#dce2e8] bg-white p-4">
        <div className="h-4 w-48 animate-pulse rounded bg-[#edf0f3]" />
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="h-16 animate-pulse rounded-[4px] bg-[#f2f4f6]" />
          <div className="h-16 animate-pulse rounded-[4px] bg-[#f2f4f6]" />
        </div>
        <div className="mt-5 h-10 w-32 animate-pulse rounded-[6px] bg-[#edf0f3]" />
      </section>
    </div>
  );
}
