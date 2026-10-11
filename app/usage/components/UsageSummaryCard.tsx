import { LucideIcon } from "lucide-react";

interface UsageSummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  footer?: string;
  badge?: string;
  progress?: number;
}

export function UsageSummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  footer,
  badge,
  progress,
}: UsageSummaryCardProps) {
  return (
    <div className="min-h-[118px] rounded-[3px] border border-[#dce2e8] bg-white px-3 py-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[8px] font-medium text-[#687382]">
          {title}
        </p>

        <Icon
          size={11}
          className="text-[#1683c7]"
          strokeWidth={1.8}
        />
      </div>

      {/* Main Value */}
      <div className="mt-2 flex items-end gap-1.5">
        <p className="text-[16px] font-semibold leading-none text-[#18212f]">
          {value}
        </p>

        <span className="mb-[1px] text-[7px] text-[#8b95a2]">
          {subtitle}
        </span>
      </div>

      {/* Progress */}
      {typeof progress === "number" && (
        <div className="mt-3">
          <div className="h-[3px] overflow-hidden rounded-full bg-[#edf0f3]">
            <div
              className="h-full rounded-full bg-[#4d9ed1] transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-1 flex justify-between">
            <span className="text-[7px] text-[#9099a6]">
              Usage
            </span>

            <span className="text-[7px] font-medium text-[#4d9ed1]">
              {progress.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && (
        <span className="mt-2 inline-flex rounded-[3px] bg-[#eef8f2] px-1.5 py-0.5 text-[7px] font-medium text-[#178848]">
          ↗ {badge}
        </span>
      )}

      {/* Footer */}
      {footer && (
        <p className="mt-2 text-[7px] text-[#9099a6]">
          {footer}
        </p>
      )}
    </div>
  );
}