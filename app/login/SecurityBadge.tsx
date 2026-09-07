import { BadgeCheck } from "lucide-react";

export function SecurityBadge() {
  return (
    <div
      className="
        mt-5 flex h-[38px]
        items-center justify-center gap-1.5
        rounded-[5px]
        border border-[#dce2ea]
        bg-[#fafbfc]
        text-[10px]
        tracking-[0.03em]
        text-[#61718b]
      "
    >
      <BadgeCheck
        size={14}
        strokeWidth={2}
        className="text-[#12a57a]"
      />

      <span>256-bit encrypted authentication</span>

      <span className="text-[#b5becb]">•</span>

      <span>JWT session tokens</span>
    </div>
  );
}