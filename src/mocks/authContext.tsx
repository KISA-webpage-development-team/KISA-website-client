"use client";

import type { Session } from "next-auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Switch } from "@umichkisa-ds/web";

type AppSession = Session & { token: string };

const MOCK_SESSION: AppSession = {
  user: {
    name: "KISA Tester",
    email: "tester@umich.edu",
    image: "/default_profile.png",
  },
  token: "mock-access-token",
  expires: new Date(Date.now() + 86_400_000).toISOString(),
};

const AUTH_KEY = "kisa-mock-auth-authenticated";
const ADMIN_KEY = "kisa-mock-auth-isadmin";

const isMockMode = () => process.env.NEXT_PUBLIC_MOCK_API === "1";

type AuthContextValue = {
  session: AppSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  toggle: () => void;
  toggleIsAdmin: () => void;
  isMockMode: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthContextProvider({
  initialSession,
  children,
}: {
  initialSession: AppSession | null;
  children: ReactNode;
}) {
  const IS_MOCK_MODE = isMockMode();
  const [mockAuthed, setMockAuthed] = useState(false);
  const [mockIsAdmin, setMockIsAdmin] = useState(false);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      if (sessionStorage.getItem(AUTH_KEY) === "1") setMockAuthed(true);
      if (sessionStorage.getItem(ADMIN_KEY) === "1") setMockIsAdmin(true);
    }
  }, [IS_MOCK_MODE]);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      sessionStorage.setItem(AUTH_KEY, mockAuthed ? "1" : "0");
    }
  }, [mockAuthed, IS_MOCK_MODE]);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      sessionStorage.setItem(ADMIN_KEY, mockIsAdmin ? "1" : "0");
    }
  }, [mockIsAdmin, IS_MOCK_MODE]);

  // Logging out clears admin state.
  useEffect(() => {
    if (IS_MOCK_MODE && !mockAuthed && mockIsAdmin) {
      setMockIsAdmin(false);
    }
  }, [mockAuthed, mockIsAdmin, IS_MOCK_MODE]);

  const value: AuthContextValue = IS_MOCK_MODE
    ? {
        session: mockAuthed ? MOCK_SESSION : null,
        isAuthenticated: mockAuthed,
        isAdmin: mockAuthed && mockIsAdmin,
        toggle: () => setMockAuthed((p) => !p),
        toggleIsAdmin: () => setMockIsAdmin((p) => !p),
        isMockMode: true,
      }
    : {
        session: initialSession,
        isAuthenticated: initialSession !== null,
        isAdmin: false,
        toggle: () => {},
        toggleIsAdmin: () => {},
        isMockMode: false,
      };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useMockAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useMockAuth must be used within <AuthContextProvider>");
  }
  return ctx;
}

export function MockAuthToggle() {
  const { isMockMode, isAuthenticated, isAdmin, toggle, toggleIsAdmin } =
    useMockAuth();

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

export type { AppSession };
