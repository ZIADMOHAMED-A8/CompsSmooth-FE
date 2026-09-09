import { BrandHeader } from "./components/BrandHeader";
import { SystemStatus } from "./components/SystemStatus";
import { SignupForm } from "./components/SignupForm";
import { SSOButtons } from "./components/SSOButtons";
import { SecurityBadge } from "./components/SecurityBadge";
import { FooterStatus } from "./components/FooterStatus";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] px-5 py-7 text-[#172033]">
      {/* Top architecture label */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-[10px] font-medium tracking-[0.16em] text-[#63728c]">
          <span className="h-2 w-2 rounded-full bg-[#d99a50]" />
          COMPSMOOTH TERMINAL ARCHITECTURE
        </div>
      </div>

      <div className="mx-auto mt-[90px] flex w-full max-w-[440px] flex-col items-center">
        <SystemStatus />

        <section className="mt-5 w-full rounded-[9px] border border-[#dce2ea] bg-white px-6 py-6 shadow-[0_12px_30px_rgba(20,32,50,0.06)]">
          <BrandHeader />

          <SignupForm />

          <SSOButtons />

          <SecurityBadge />
        </section>

        <FooterStatus />
      </div>
    </main>
  );
}