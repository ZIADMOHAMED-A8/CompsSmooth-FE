
import { FooterStatus } from "./components/FooterStatus";
import { secureHeapUsed } from "crypto";
import { SecurityBadge } from "./SecurityBadge";
import { SSOButtons } from "./components/SSOButtons";
import { LoginForm } from "./components/LoginForm";
import { SystemStatus } from "./components/systemStatus";
import { BrandHeader } from "./components/BrandHeader";


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] px-5 py-7 text-[#172033]">
      {/* Top architecture label */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-[10px] font-medium tracking-[0.16em] text-[#63728c]">
          <span className="h-2 w-2 rounded-full bg-[#d99a50]" />
          COMPSMOOTH TERMINAL ARCHITECTURE
        </div>
      </div>

      <div className="mx-auto mt-[125px] flex w-full max-w-[440px] flex-col items-center">
        <SystemStatus />

        <section className="mt-5 w-full rounded-[9px] border border-[#dce2ea] bg-white px-6 py-6 shadow-[0_12px_30px_rgba(20,32,50,0.06)]">
          <BrandHeader />

          <LoginForm />

          <SSOButtons />

          <SecurityBadge />
        </section>

        <FooterStatus />
      </div>
    </main>
  );
}