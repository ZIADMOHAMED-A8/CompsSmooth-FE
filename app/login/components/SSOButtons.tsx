import { Building2 } from "lucide-react";

export function SSOButtons() {
  return (
    <div className="mt-5">
      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#dce2ea]" />

        <span className="text-[9px] font-medium tracking-[0.08em] text-[#65738b]">
          INSTITUTIONAL SINGLE SIGN-ON
        </span>

        <div className="h-px flex-1 bg-[#dce2ea]" />
      </div>

      {/* Buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="
            flex h-[27px]
            items-center justify-center gap-1.5
            rounded-[5px]
            border border-[#d9e0ea]
            bg-white
            text-[11px] font-semibold text-[#273246]
            transition
            hover:bg-[#f8f9fb]
          "
        >
          <span className="text-[14px] font-bold">G</span>
          Google SSO
        </button>

        <button
          type="button"
          className="
            flex h-[27px]
            items-center justify-center gap-1.5
            rounded-[5px]
            border border-[#d9e0ea]
            bg-white
            text-[11px] font-semibold text-[#273246]
            transition
            hover:bg-[#f8f9fb]
          "
        >
          <Building2 size={14} strokeWidth={2.5} />
          Okta Enterprise
        </button>
      </div>
    </div>
  );
}