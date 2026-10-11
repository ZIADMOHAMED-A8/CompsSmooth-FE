"use client";

import {
  Activity,
  BarChart3,
  CreditCard,
  Gauge,
} from "lucide-react";

import { UsageDashboardSkeleton } from "./UsageDashboardSkeleton";
import { UsageOverview } from "./UsageOverview";
import { UsageSummaryCard } from "./UsageSummaryCard";
import { useUsage } from "../hooks/useUsage";

function calculatePercentage(
  used: number,
  limit: number
) {
  if (limit <= 0) return 0;

  return Math.min((used / limit) * 100, 100);
}

function calculateChange(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return ((current - previous) / previous) * 100;
}

export function UsageDashboard() {
  const { data, isLoading, isError, error } = useUsage();

  if (isLoading) {
    return <UsageDashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="rounded-[4px] border border-[#e2e6ea] bg-white px-4 py-8 text-center">
        <p className="text-[10px] text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load usage data."}
        </p>
      </div>
    );
  }

  const { plan, usage, propertiesRan } = data.data;

  const usagePercentage = calculatePercentage(
    usage.used,
    usage.limit
  );

  const propertiesChange = calculateChange(
    propertiesRan.thisMonth,
    propertiesRan.lastMonth
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-[16px] font-semibold text-[#18212f]">
          Usage
        </h1>

        <p className="mt-0.5 text-[9px] text-[#9099a6]">
          Track your monthly usage and plan limits.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <UsageSummaryCard
          title="Monthly Usage"
          value={`${usage.used} / ${usage.limit}`}
          subtitle={`${usagePercentage.toFixed(0)}% used`}
          icon={Gauge}
          progress={usagePercentage}
          footer={
            usage.remaining > 0
              ? `${usage.remaining} runs remaining`
              : "Usage limit reached"
          }
        />

        <UsageSummaryCard
          title="Remaining"
          value={String(usage.remaining)}
          subtitle="runs available"
          icon={Activity}
          footer={`From ${usage.limit} monthly runs`}
        />

        <UsageSummaryCard
          title="Properties Ran"
          value={String(propertiesRan.thisMonth)}
          subtitle="this month"
          icon={BarChart3}
          badge={
            propertiesChange !== 0
              ? `${propertiesChange > 0 ? "+" : ""}${propertiesChange.toFixed(1)}%`
              : undefined
          }
          footer={`${propertiesRan.lastMonth} last month`}
        />

        <UsageSummaryCard
          title="Current Plan"
          value={plan.name}
          subtitle="active plan"
          icon={CreditCard}
          footer={
            plan.expirationDate
              ? `Expires ${formatDate(plan.expirationDate)}`
              : "No expiration"
          }
        />
      </div>

      {/* Detailed Usage */}
      <UsageOverview
        used={usage.used}
        limit={usage.limit}
        remaining={usage.remaining}
        periodStart={usage.periodStart}
        planName={plan.name}
      />
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}