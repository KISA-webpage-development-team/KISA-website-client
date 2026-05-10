import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { AuthContextProvider } from "@/lib/auth/authContext";
import useAdmin from "@/lib/next-auth/useAdmin";

// Real (non-mock) path: useSession resolves to unauthenticated.
// Regression for infinite spinner on /posts/create/[boardType] when
// user is signed out (status was stuck at "loading" forever).
vi.mock("next-auth/react", async () => {
  const actual = await vi.importActual<typeof import("next-auth/react")>(
    "next-auth/react",
  );
  return {
    ...actual,
    useSession: () => ({ data: null, status: "unauthenticated" }) as ReturnType<
      typeof actual.useSession
    >,
  };
});

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider initialSession={null}>{children}</AuthContextProvider>
  );
}

describe("useAdmin — unauthenticated (non-mock)", () => {
  it("resolves status to 'success' (not stuck at 'loading') with isAdmin=false", async () => {
    const { result } = renderHook(() => useAdmin(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
    expect(result.current.isAdmin).toBe(false);
  });
});
