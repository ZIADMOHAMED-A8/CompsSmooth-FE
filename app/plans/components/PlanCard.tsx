import { planPresentation } from "../data/plans";
import { Plan } from "../types/plan.types";

import { PlanFeatures } from "./PlanFeatures";
import { PlanAction } from "./PlanAction";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({
  plan,
}: PlanCardProps) {
  const presentation = planPresentation[plan.plan];
  const isPriceAvailable=!isNaN(plan.price)




  return (
    <article
      className={`
        relative flex flex-col
        rounded-[7px]
        border
        bg-white
        p-5
        ${
          false
            ? "border-[2px] border-[#c96a00] shadow-[0_4px_16px_rgba(201,106,0,0.08)]"
            : "border-[#dce2ea]"
        }
      `}
    >
      {/* Badge */}
      {presentation?.badge && (
        <div
          className={`
            absolute left-1/2 top-0
            -translate-x-1/2 -translate-y-1/2
            whitespace-nowrap
            rounded-[3px]
            px-3 py-[3px]
            text-[8px] font-bold
            tracking-[0.04em]
            ${
            //   plan.plan === "PRO"
            false
                ? "bg-[#c96a00] text-white"
                : "border border-[#1684bc] bg-white text-[#1684bc]"
            }
          `}
        >
          {presentation.badge}
        </div>
      )}

      {/* Header */}
      <div>
        <p className="text-[8px] font-medium tracking-[0.05em] text-[#c96a00]">
          {presentation?.eyebrow}
        </p>

        <div className="mt-1 flex items-baseline justify-between">
          <h2 className="text-[16px] font-bold text-[#172033]">
            {plan.plan} Tier
          </h2>

          <div className="flex items-baseline">
            <span className="text-[16px] font-bold text-[#111827]">
              {isPriceAvailable && "$"}{plan.price}
            </span>

            <span className="ml-0.5 text-[10px] text-[#52627d]">
              {isPriceAvailable && "/mo"}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 min-h-[62px] text-[10px] leading-[1.7] text-[#65738b]">
        {presentation?.description}
      </p>

      <PlanFeatures plan={plan} />

      <PlanAction plan={plan} />
    </article>
  );
}