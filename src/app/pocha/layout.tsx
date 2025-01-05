"use client";

import OnlyMobileView from "@/final_refactor_src/components/feedback/OnlyMobileView";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function PochaLayout({ children }) {
  // except for /pocha/dashboard, only mobile view is allowed
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <SessionProvider>
      {/* ✅ /dashboard is tablet view, others are mobile view restrictions applied */}
      {isDashboard ? (
        <>{children}</>
      ) : (
        <>
          {/* Mobile-only screen */}
          <div className="hidden md:block">
            <OnlyMobileView />
          </div>

          {/* Only render mobile-only content */}
          <div className="md:hidden bg-yellow-500 h-full w-full">
            {children}
          </div>
        </>
      )}
    </SessionProvider>
  );
}
