interface UsageOverviewProps {
  used: number;
  limit: number;
  remaining: number;
  periodStart: string;
  planName: string;
}

export function UsageOverview({
  used,
  limit,
  remaining,
  periodStart,
  planName,
}: UsageOverviewProps) {
  const percentage =
    limit > 0 ? Math.min((used / limit) * 100, 100) : 0;

  return (
    <section className="rounded-[4px] border border-[#dce2e8] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e6e9ed] px-4 py-3">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#d97706]">
            Usage Overview
          </p>

          <h2 className="mt-1 text-[12px] font-semibold text-[#263241]">
            Monthly Request Usage
          </h2>
        </div>

        <span className="rounded-full bg-[#f3f6f8] px-2 py-1 text-[7px] font-medium uppercase text-[#687382]">
          {planName}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[24px] font-semibold leading-none text-[#18212f]">
              {used}
              <span className="ml-1 text-[11px] font-normal text-[#9099a6]">
                / {limit}
              </span>
            </p>

            <p className="mt-1 text-[8px] text-[#9099a6]">
              requests used this period
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold text-[#178848]">
              {remaining}
            </p>

            <p className="text-[7px] text-[#9099a6]">
              remaining
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="h-[6px] overflow-hidden rounded-full bg-[#edf0f3]">
            <div
              className="h-full rounded-full bg-[#4d9ed1] transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <div className="mt-1.5 flex justify-between">
            <span className="text-[7px] text-[#9099a6]">
              {percentage.toFixed(1)}% used
            </span>

            <span className="text-[7px] text-[#9099a6]">
              {limit} total runs
            </span>
          </div>
        </div>

        {/* Period */}
        <div className="mt-4 flex items-center justify-between border-t border-[#edf0f3] pt-3">
          <span className="text-[8px] text-[#9099a6]">
            Current period
          </span>

          <span className="text-[8px] font-medium text-[#4b5563]">
            Started {formatDate(periodStart)}
          </span>
        </div>
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}