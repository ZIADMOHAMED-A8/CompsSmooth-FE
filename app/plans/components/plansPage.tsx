"use client";

import { useMemo } from "react";

import { usePlans } from "../hooks/useGetPlans";
import { PlanCard } from "./PlanCard";

const enterprisePlan = {
  id: "enterprise",
  plan: "ENTERPRISE",
  price: "Custom",
  monthly_request_limit: 50000,
  isFrontendOnly: true as const,
};

export function PlansPage() {
  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = usePlans();

  const displayPlans = useMemo(() => {
    if (!plans) return [];

    return [
      ...plans,
      enterprisePlan,
    ];
  }, [plans]);

  if (isLoading) {
    return <PlansLoading />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[#f7f8fa]">
        <PlansHeader />

        <div className="mx-auto max-w-[1150px] px-5 py-10">
          <div className="rounded-[6px] border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-[12px] text-red-600">
              {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
      <PlansHeader />

      <div className="mx-auto max-w-[1150px] px-5 py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {displayPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function PlansHeader() {
  return (
    <header className="border-b border-[#e3e7ed] bg-white">
      <div className="mx-auto max-w-[1150px] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rotate-45 border border-[#c96a00]" />

          <h1 className="text-[15px] font-bold text-[#172033]">
            Institutional Appraisal Tiers
          </h1>
        </div>
      </div>
    </header>
  );
}

function PlansLoading() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <PlansHeader />

      <div className="mx-auto max-w-[1150px] px-5 py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[345px] animate-pulse rounded-[7px] border border-[#dce2ea] bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}