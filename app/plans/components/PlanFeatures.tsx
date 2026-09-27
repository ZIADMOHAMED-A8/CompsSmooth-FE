import { Check } from "lucide-react";

import { planPresentation } from "../data/plans";
import { Plan } from "../types/plan.types";

interface PlanFeaturesProps {
  plan: Plan;
}

export function PlanFeatures({
  plan,
}: PlanFeaturesProps) {
  const presentation = planPresentation[plan.plan];

  return (
    <div className="mt-4 rounded-[5px] border border-[#dce2ea] bg-[#fafbfc] px-3 py-2.5">
      <ul className="space-y-2">
        {/* DB-controlled feature */}
        <li className="flex items-start gap-2 text-[9px] leading-[1.35] text-[#30405a]">
          <Check
            size={11}
            strokeWidth={2}
            className="mt-[1px] shrink-0 text-[#55708f]"
          />

          <span>
            {plan.monthly_request_limit.toLocaleString()}{" "}
            requests / month
          </span>
        </li>

        {/* Frontend presentation features */}
        {presentation?.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-[9px] leading-[1.35] text-[#30405a]"
          >
            <Check
              size={11}
              strokeWidth={2}
              className="mt-[1px] shrink-0 text-[#55708f]"
            />

            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}