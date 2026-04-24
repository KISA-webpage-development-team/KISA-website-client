import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { AuthContextProvider } from "@/lib/auth/authContext";
import { MockAuthToggle } from "../MockAuthToggle";

const AUTH_KEY = "kisa-mock-auth-authenticated";
const ADMIN_KEY = "kisa-mock-auth-isadmin";

function renderToggle() {
  return render(
    <AuthContextProvider initialSession={null}>
      <MockAuthToggle />
    </AuthContextProvider>
  );
}

describe("MockAuthToggle — admin switch", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_MOCK_API", "1");
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders two switches", () => {
    renderToggle();
    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(2);
  });

  it("admin switch is disabled and unchecked when logged-out", () => {
    renderToggle();
    const switches = screen.getAllByRole("switch");
    const adminSwitch = switches[1];
    expect(adminSwitch).toBeDisabled();
    expect(adminSwitch).not.toBeChecked();
  });

  it("admin switch becomes enabled after logging in", () => {
    renderToggle();
    const [authSwitch, adminSwitch] = screen.getAllByRole("switch");
    act(() => {
      authSwitch.click();
    });
    expect(adminSwitch).not.toBeDisabled();
  });

  it("toggling mockAuthed off clears mockIsAdmin sessionStorage to '0'", () => {
    renderToggle();
    const [authSwitch, adminSwitch] = screen.getAllByRole("switch");
    act(() => {
      authSwitch.click();
    });
    act(() => {
      adminSwitch.click();
    });
    expect(sessionStorage.getItem(ADMIN_KEY)).toBe("1");

    act(() => {
      authSwitch.click();
    });
    expect(sessionStorage.getItem(ADMIN_KEY)).toBe("0");
    expect(adminSwitch).not.toBeChecked();
  });

  it("persists mockIsAdmin='1' on login + admin-on; loads it on remount", () => {
    sessionStorage.setItem(AUTH_KEY, "1");
    sessionStorage.setItem(ADMIN_KEY, "1");
    renderToggle();
    const [authSwitch, adminSwitch] = screen.getAllByRole("switch");
    expect(authSwitch).toBeChecked();
    expect(adminSwitch).toBeChecked();
  });
});
