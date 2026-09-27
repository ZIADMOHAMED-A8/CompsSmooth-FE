"use client";

import {
  ExternalLink,
  Rocket,
} from "lucide-react";

import { useCreateCheckoutSession } from "../hooks/useCreateCheckoutSession";
import { Plan } from "../types/plan.types";
import { useGetCurrentPlan } from "../hooks/usegetCurrentPlan";

interface PlanActionProps {
  plan: Plan;
}

export function PlanAction({
  plan,
}: PlanActionProps) {
  const checkout = useCreateCheckoutSession();
  const {data:currentPlan,isLoading,isError} = useGetCurrentPlan()
 

  function handleUpgrade() {
    checkout.mutate(
      {
        planId: plan.id,
      },
      {
        onSuccess: (data) => {
          console.log(data)
          window.location.href = data.data.url;
        },
      }
    );
  }

  if (plan.plan === "FREE") {
    return
  }

  if(isLoading){
    return
  }
if (plan.plan === "ENTERPRISE") {
  return (
    <a
      href="mailto:badry8977@gmail.com"
      className="
        mt-5 flex h-9 w-full
        items-center justify-center gap-1.5
        rounded-[4px]
        bg-[#c96a00]
        text-[10px] font-semibold
        text-white
        transition
        hover:bg-[#b75f00]
      "
        target="_blank"
  rel="noopener noreferrer"
    >
      <Rocket size={11} />
      Email Us
    </a>
  );
}
  const isCurrentPlan=plan.id === currentPlan?.effectiveSub?.plan.id
  return (
    <button
      type="button"
      onClick={handleUpgrade}
      disabled={checkout.isPending || isCurrentPlan}
      className="
        mt-5 flex h-9 w-full
        items-center justify-center gap-1.5
        rounded-[4px]
        bg-[#c96a00]
        text-[10px] font-semibold
        text-white
        transition
        hover:bg-[#b75f00]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <Rocket size={11} />
      { isCurrentPlan?
        "This is your current plan." :
        checkout.isPending
          ? "Creating Checkout..."
          : "Upgrade • Instant Checkout"
      }
      { }
    </button>
  );
}