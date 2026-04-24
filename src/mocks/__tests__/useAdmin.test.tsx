import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider, useAuth } from "@/lib/auth/authContext";
import useAdmin from "@/lib/next-auth/useAdmin";
import type { ReactNode } from "react";

const AUTH_KEY = "kisa-mock-auth-authenticated";
const ADMIN_KEY = "kisa-mock-auth-isadmin";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider session={null}>
      <AuthContextProvider initialSession={null}>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

/**
 * Combined hook so each test can drive the mock toggles (via useAuth)
 * and observe useAdmin's return in the same render tree.
 */
function useBoth() {
  const admin = useAdmin();
  const mock = useAuth();
  return { admin, mock };
}

describe("useAdmin — mock-mode short-circuit", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_MOCK_API", "1");
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns isAdmin=true with email+token when mockAuthed+mockIsAdmin are on", () => {
    sessionStorage.setItem(AUTH_KEY, "1");
    sessionStorage.setItem(ADMIN_KEY, "1");
    const { result } = renderHook(() => useBoth(), { wrapper: Wrapper });
    expect(result.current.admin.isAdmin).toBe(true);
    expect(result.current.admin.email).toBe("tester@umich.edu");
    expect(result.current.admin.token).toBe("mock-access-token");
    expect(result.current.admin.status).toBe("success");
  });

  it("returns isAdmin=false but keeps token when logged in but not admin", () => {
    sessionStorage.setItem(AUTH_KEY, "1");
    const { result } = renderHook(() => useBoth(), { wrapper: Wrapper });
    expect(result.current.admin.isAdmin).toBe(false);
    expect(result.current.admin.email).toBe("tester@umich.edu");
    expect(result.current.admin.token).toBe("mock-access-token");
    expect(result.current.admin.status).toBe("success");
  });

  it("returns empty identity + isAdmin=false when logged out", () => {
    const { result } = renderHook(() => useBoth(), { wrapper: Wrapper });
    expect(result.current.admin.isAdmin).toBe(false);
    expect(result.current.admin.email).toBeUndefined();
    expect(result.current.admin.token).toBeUndefined();
    expect(result.current.admin.status).toBe("success");
  });

  it("flips isAdmin reactively when toggles change", () => {
    const { result } = renderHook(() => useBoth(), { wrapper: Wrapper });
    expect(result.current.admin.isAdmin).toBe(false);
    act(() => {
      result.current.mock.toggle();
    });
    expect(result.current.admin.isAdmin).toBe(false);
    act(() => {
      result.current.mock.toggleIsAdmin();
    });
    expect(result.current.admin.isAdmin).toBe(true);
    expect(result.current.admin.token).toBe("mock-access-token");
  });
});
