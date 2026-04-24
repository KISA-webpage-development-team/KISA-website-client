"use client";

import { Switch } from "@umichkisa-ds/web";
import { useAuth, MOCK_SESSION } from "@/lib/auth/authContext";

export function MockAuthToggle() {
  const { isMockMode, isAuthenticated, isAdmin, toggle, toggleIsAdmin } =
    useAuth();

  if (!isMockMode) return null;

  return (
    <div
      role="group"
      aria-label="Mock authentication toggle"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg border border-border-strong bg-surface px-3 py-2 shadow-md"
    >
      <div className="flex items-center gap-2">
        <Switch
          checked={isAuthenticated}
          onChange={toggle}
          aria-label="Toggle mock authentication"
        />
        <span className="relative type-body-sm text-foreground">
          <span aria-hidden="true" className="invisible">
            Mock: {MOCK_SESSION.user!.email}
          </span>
          <span className="absolute inset-0">
            {isAuthenticated
              ? `Mock: ${MOCK_SESSION.user!.email}`
              : "Mock: logged out"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={isAdmin}
          onChange={toggleIsAdmin}
          disabled={!isAuthenticated}
          aria-label="Toggle mock admin"
        />
        <span className="type-body-sm text-foreground">Mock: admin</span>
      </div>
    </div>
  );
}
