import { ReactNode } from "react";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getServerSession } from "next-auth";
import { Container } from "@umichkisa-ds/web";
import authOptions from "@/lib/next-auth/authOptions";
import {
  AuthContextProvider,
  MockAuthToggle,
  type AppSession,
} from "@/mocks/authContext";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <AuthContextProvider initialSession={session as AppSession | null}>
      <div className="h-full flex flex-col">
        <header
          className="top-0 z-40
          bg-linear-to-r from-brand-primary/90 via-brand-primary to-brand-primary/85
          text-white"
        >
          <Header />
        </header>

        <Container as="main" size="xl" className="relative h-full pt-3 md:pt-6 flex-1">
          {children}
        </Container>

        <footer className="mt-auto w-full">
          <Footer />
        </footer>

        <MockAuthToggle />
      </div>
    </AuthContextProvider>
  );
}
