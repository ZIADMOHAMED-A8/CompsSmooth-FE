"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  ChartNoAxesCombined,
  CreditCard,
  House,
  LogOut,
  Settings2,
} from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { label: "Dashboard", href: "/", icon: House },
  { label: "Usage", href: "/usage", icon: ChartNoAxesCombined },
  { label: "Plans", href: "/plans", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: Settings2 },
];

const standaloneRoutes = ["/login", "/signup", "/reset-password"];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (standaloneRoutes.some((route) => pathname.startsWith(route))) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <aside
        className="
          group/sidebar fixed inset-x-0 bottom-0 z-50
          flex h-[68px] flex-row
          border-t border-[#e4e8ed] bg-white

          lg:inset-y-0 lg:left-0 lg:right-auto
          lg:h-screen lg:w-[68px]
          lg:flex-col lg:border-r lg:border-t-0
          lg:transition-[width] lg:duration-200 lg:ease-out
          lg:hover:w-[248px]
          lg:focus-within:w-[248px]
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="CompSmooth dashboard"
          className="
            hidden h-[68px] w-full shrink-0
            items-center gap-3 overflow-hidden
            border-b border-[#edf0f3] px-[18px]
            lg:flex
          "
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg  text-[15px] font-bold text-[#c96a00]">
            C
          </span>

          <span
            className="
              whitespace-nowrap text-[14px] font-semibold
              tracking-[-0.03em] text-[#18212f]
              opacity-0 transition-opacity delay-75
              group-hover/sidebar:opacity-100
              group-focus-within/sidebar:opacity-100
            "
          >
            Comp<span className="text-[#c96a00]">Smooth</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex min-w-0 flex-1 items-center px-1 lg:block lg:px-3 lg:pt-6">
          <p
            className="
              mb-2 hidden h-4 overflow-hidden whitespace-nowrap
              px-2 text-[9px] font-semibold uppercase
              tracking-[0.12em] text-[#a1a9b4]
              opacity-0 transition-opacity
              group-hover/sidebar:opacity-100
              group-focus-within/sidebar:opacity-100
              lg:block
            "
          >
            Workspace
          </p>

          <nav
            aria-label="Main navigation"
            className="
              flex w-full items-center justify-around gap-1
              lg:block lg:space-y-1
            "
          >
            {navigation.map(({ label, href, icon: Icon }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  title={label}
                  aria-current={active ? "page" : undefined}
                  className={`
                    flex h-[58px] min-w-0 flex-1 flex-col
                    items-center justify-center gap-1
                    overflow-hidden rounded-md px-1
                    text-[9px] font-medium transition-colors

                    lg:h-10 lg:w-full lg:flex-row
                    lg:flex-none lg:justify-start
                    lg:gap-3 lg:px-[13px] lg:text-[12px]

                    ${
                      active
                        ? "bg-[#fff4e8] text-[#b85f00]"
                        : "text-[#687384] hover:bg-[#f5f6f8] hover:text-[#263241]"
                    }
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span
                    className="
                      whitespace-nowrap
                      lg:opacity-0 lg:transition-opacity
                      lg:delay-75
                      lg:group-hover/sidebar:opacity-100
                      lg:group-focus-within/sidebar:opacity-100
                    "
                  >
                    {label}
                  </span>

                  {active && (
                    <span
                      className="
                        ml-auto hidden h-1.5 w-1.5 shrink-0
                        rounded-full bg-[#d97706]
                        opacity-0
                        group-hover/sidebar:opacity-100
                        group-focus-within/sidebar:opacity-100
                        lg:block
                      "
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div
          className="
            flex shrink-0 items-center
            border-l border-[#edf0f3] px-1
            lg:mt-auto lg:w-full
            lg:border-l-0 lg:border-t lg:p-3
          "
        >
          <button
            type="button"
            title="Log out"
            onClick={() => signOut({ redirectTo: "/login" })}
            className="
              flex h-[58px] w-[58px] flex-col
              items-center justify-center gap-1
              overflow-hidden rounded-md
              text-[8px] font-medium text-[#687384]
              transition-colors
              hover:bg-[#fff1ed] hover:text-[#b54730]

              lg:h-10 lg:w-full lg:flex-row
              lg:justify-start lg:gap-3
              lg:px-[13px] lg:text-left lg:text-[12px]
            "
          >
            <LogOut
              size={17}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span
              className="
                whitespace-nowrap
                lg:opacity-0 lg:transition-opacity
                lg:delay-75
                lg:group-hover/sidebar:opacity-100
                lg:group-focus-within/sidebar:opacity-100
              "
            >
              Log out
            </span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 pb-[76px] lg:ml-[68px] lg:pb-0">
        {children}
      </main>
    </div>
  );
}