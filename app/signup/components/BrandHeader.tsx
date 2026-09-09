import { ShieldCheck } from "lucide-react";

export function BrandHeader() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#101a2c] shadow-sm">
        <ShieldCheck
          size={23}
          strokeWidth={1.8}
          className="text-[#e58a00]"
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        <h1 className="text-[20px] font-bold tracking-[-0.04em] text-[#172033]">
          CompSmooth
        </h1>

        <span className="rounded-[2px] border border-[#f0b45d] px-1 py-[2px] text-[8px] font-bold leading-none text-[#c96a00]">
          PRO
        </span>
      </div>

      <h2 className="mt-1.5 text-[17px] font-semibold text-[#172033]">
        Create your account
      </h2>

      <p className="mt-1 text-[12px] text-[#65738b]">
        Set up your property search & comp workspace
      </p>
    </div>
  );
}