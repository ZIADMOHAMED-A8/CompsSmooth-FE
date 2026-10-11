export function UsageDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div>
        <div className="h-4 w-20 rounded bg-[#edf0f3]" />
        <div className="mt-1.5 h-2 w-48 rounded bg-[#edf0f3]" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[118px] rounded-[3px] border border-[#e3e7eb] bg-white p-3"
          >
            <div className="h-2 w-20 rounded bg-[#edf0f3]" />
            <div className="mt-4 h-4 w-24 rounded bg-[#edf0f3]" />
            <div className="mt-4 h-[3px] w-full rounded bg-[#edf0f3]" />
            <div className="mt-3 h-2 w-28 rounded bg-[#edf0f3]" />
          </div>
        ))}
      </div>

      <div className="h-[230px] rounded-[4px] border border-[#e3e7eb] bg-white" />
    </div>
  );
}