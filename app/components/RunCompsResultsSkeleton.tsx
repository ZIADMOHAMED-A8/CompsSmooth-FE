export function RunCompsResultsSkeleton() {
  return (
    <section className="mt-4 overflow-hidden rounded-[4px] border border-[#dce2e8] bg-white">
      {/* Header */}
      <div className="border-b border-[#e6e9ed] p-4">
        <Skeleton className="h-2 w-28" />

        <Skeleton className="mt-2 h-4 w-64" />

        <Skeleton className="mt-2 h-2.5 w-36" />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-px bg-[#e6e9ed]">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Property info */}
      <div className="grid grid-cols-2 gap-4 border-b border-[#e6e9ed] p-4">
        <SkeletonInfo />
        <SkeletonInfo />
      </div>

      {/* Comps */}
      <div>
        <div className="border-b border-[#e6e9ed] px-4 py-3">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="mt-1 h-2 w-44" />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 border-b border-[#edf0f3] px-4 py-3"
          >
            <div className="flex-1">
              <Skeleton className="h-2.5 w-48" />
              <Skeleton className="mt-2 h-2 w-32" />
            </div>

            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-10" />
            <Skeleton className="h-7 w-10" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-[3px] bg-[#e9edf1] ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white p-3">
      <Skeleton className="h-2 w-16" />
      <Skeleton className="mt-2 h-5 w-24" />
    </div>
  );
}

function SkeletonInfo() {
  return (
    <div>
      <Skeleton className="h-2 w-28" />

      <div className="mt-3 flex gap-8">
        <div>
          <Skeleton className="h-2 w-8" />
          <Skeleton className="mt-1 h-3 w-5" />
        </div>

        <div>
          <Skeleton className="h-2 w-8" />
          <Skeleton className="mt-1 h-3 w-8" />
        </div>

        <div>
          <Skeleton className="h-2 w-8" />
          <Skeleton className="mt-1 h-3 w-12" />
        </div>
      </div>
    </div>
  );
}