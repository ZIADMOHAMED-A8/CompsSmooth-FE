import { UsageDashboard } from "./components/UsageDashboard";


export default function UsagePage() {
  return (
    <main className="min-h-full bg-[#f7f8fa]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-5">
        <div className="mb-4">
          <h1 className="text-[18px] font-semibold text-[#18212f]">
            Usage
          </h1>

          <p className="mt-1 text-[9px] text-[#9099a6]">
            Monitor your usage, limits, and property activity.
          </p>
        </div>

        <UsageDashboard />
      </div>
    </main>
  );
}