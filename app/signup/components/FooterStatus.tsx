export function FooterStatus() {
  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="text-[11px] text-[#697890]">
        Already have an account?{" "}
        <button
          type="button"
          className="font-semibold text-[#c96a00] hover:underline"
        >
          Sign in ↗
        </button>
      </p>

      <div className="mt-5 flex items-center gap-4 text-[9px] font-medium tracking-[0.1em] text-[#718099]">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0c9b78]" />
          MLS LIVE SYNC
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1783bd]" />
          SPATIAL VALUATION MODEL V3
        </span>
      </div>
    </div>
  );
}