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

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "1";
const STORAGE_KEY = "kisa-mock-auth-authenticated";

type AuthContextValue = {
  session: AppSession | null;
  isAuthenticated: boolean;
  toggle: () => void;
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
  const [mockAuthed, setMockAuthed] = useState(false);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "1") {
        setMockAuthed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      sessionStorage.setItem(STORAGE_KEY, mockAuthed ? "1" : "0");
    }
  }, [mockAuthed]);

  const value: AuthContextValue = IS_MOCK_MODE
    ? {
        session: mockAuthed ? MOCK_SESSION : null,
        isAuthenticated: mockAuthed,
        toggle: () => setMockAuthed((p) => !p),
        isMockMode: true,
      }
    : {
        session: initialSession,
        isAuthenticated: initialSession !== null,
        toggle: () => {},
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
  const { isMockMode, isAuthenticated, toggle } = useMockAuth();

  if (!isMockMode) return null;

  return (
    <div
      role="group"
      aria-label="Mock authentication toggle"
      className="fixed bottom-4 right-4 z-50 min-w-72 rounded-full border border-border-strong bg-surface px-4 py-2 shadow-md"
    >
      <Switch
        checked={isAuthenticated}
        onChange={toggle}
        text={
          isAuthenticated
            ? `Mock: ${MOCK_SESSION.user!.email}`
            : "Mock: logged out"
        }
        aria-label="Toggle mock authentication"
      />
    </div>
  );
}

export type { AppSession };
