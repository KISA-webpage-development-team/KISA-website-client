"use client";

import { ReactNode, useEffect } from "react";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AuthContextProvider, useAuth } from "@/lib/auth/authContext";
import { LoadingSpinner, StatusView } from "@umichkisa-ds/web";
import LoginButton from "@/components/layout/header/LoginButton";
import useAdmin from "@/lib/next-auth/useAdmin";
import BackToHubFAB, {
  type BackTarget,
} from "@/components/layout/admin/BackToHubFAB";
import { setFromHubFlag } from "@/lib/admin/fromHubFlag";

// Dev-only toggle. Build-time gate: when NEXT_PUBLIC_MOCK_API !== "1",
// the ternary collapses to null and the entire MockAuthToggle module is
// tree-shaken from the prod admin layout chunk.
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "1";
const MockAuthToggle = IS_MOCK_MODE
  ? dynamic(
      () => import("@/mocks/MockAuthToggle").then((m) => m.MockAuthToggle),
      { ssr: false }
    )
  : null;

const HUB_TARGET: BackTarget = {
  href: "/admin",
  label: "관리자 홈",
  ariaLabel: "관리자 홈으로 돌아가기",
};

const WEBSITE_CMS_TARGET: BackTarget = {
  href: "/admin/website",
  label: "Website CMS",
  ariaLabel: "Website CMS로 돌아가기",
};

// Mock-only auth gate. In prod, next-auth middleware (`src/middleware.ts`)
// gates `/admin/:path*` server-side — any request that reaches an /admin
// page is already authenticated. In mock mode the middleware is a no-op,
// so /admin/* routes need this client-side fallback. The admin role gate
// runs on top.
function MockAuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return (
      <StatusView
        fullScreen
        variant="not-logged-in"
        action={
          <LoginButton isAuthenticated={false} callbackUrl={pathname} />
        }
      />
    );
  }

  return <>{children}</>;
}

// Role gate. Loading → fullScreen spinner so admin chrome never paints to
// non-admins. Resolved + not admin → StatusView. Otherwise → children.
function AdminGate({ children }: { children: ReactNode }) {
  const { isAdmin, status } = useAdmin();

  if (status === "loading") {
    return <LoadingSpinner fullScreen size="lg" />;
  }

  if (status === "success" && !isAdmin) {
    return <StatusView fullScreen variant="not-authorized" />;
  }

  return <>{children}</>;
}

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Latch the `kisa.admin.fromHub` flag on hub mount. Persists for the
  // session (sessionStorage clears on tab close). AdminHubCards also writes
  // this flag preemptively on tool-card click; both writers go through
  // `lib/admin/fromHubFlag`. BackToHubFAB only reads it.
  useEffect(() => {
    if (pathname === "/admin") {
      setFromHubFlag();
    }
  }, [pathname]);

  // Dashboard collapses by default to avoid colliding with the dashboard's
  // sticky bulk-promote action bar. All other admin routes default expanded.
  const defaultCollapsed = pathname.startsWith("/admin/pocha/dashboard");

  // Back goes one level up: Website CMS sections return to /admin/website,
  // everything else to the hub.
  const backTarget = pathname.startsWith("/admin/website/")
    ? WEBSITE_CMS_TARGET
    : HUB_TARGET;

  const body = (
    <AdminGate>
      <div className="w-full">{children}</div>
      <BackToHubFAB target={backTarget} defaultCollapsed={defaultCollapsed} />
    </AdminGate>
  );

  return (
    <SessionProvider>
      <AuthContextProvider initialSession={null}>
        {IS_MOCK_MODE ? <MockAuthGate>{body}</MockAuthGate> : body}
        {MockAuthToggle && <MockAuthToggle />}
      </AuthContextProvider>
    </SessionProvider>
  );
}
