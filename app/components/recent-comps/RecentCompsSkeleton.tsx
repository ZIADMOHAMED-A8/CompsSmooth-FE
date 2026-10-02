export function RecentCompsSkeleton() {
  return (
    <div className="divide-y divide-[#edf0f3] animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="px-4 py-3"
        >
          <div className="h-3 w-56 rounded bg-[#edf0f3]" />

          <div className="mt-2 flex gap-3">
            <div className="h-2 w-20 rounded bg-[#edf0f3]" />
            <div className="h-2 w-16 rounded bg-[#edf0f3]" />
            <div className="h-2 w-12 rounded bg-[#edf0f3]" />
          </div>
        </div>
      ))}
    </div>
  );
}