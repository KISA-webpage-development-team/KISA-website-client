import { ReactNode } from "react";
import dynamic from "next/dynamic";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getServerSession } from "next-auth";
import { Container } from "@umichkisa-ds/web";
import authOptions from "@/lib/next-auth/authOptions";
import PochaLiveBanner from "@/features/home/components/PochaLiveBanner";
import Providers from "./Providers";

// Dev-only toggle. Build-time gate: when NEXT_PUBLIC_MOCK_API !== "1",
// the ternary collapses to null and the entire MockAuthToggle module
// is tree-shaken from the prod (main) layout chunk.
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "1";
const MockAuthToggle = IS_MOCK_MODE
  ? dynamic(() =>
      import("@/mocks/MockAuthToggle").then((m) => m.MockAuthToggle)
    )
  : null;

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <Providers session={session}>
      <div className="h-full flex flex-col">
        <header
          className="top-0 z-40
          bg-linear-to-r from-brand-primary/90 via-brand-primary to-brand-primary/85
          text-white"
        >
          <Header />
        </header>

        <PochaLiveBanner />

        <Container
          as="main"
          size="xl"
          className="relative h-full flex-1 py-6! md:py-8! lg:py-10!"
        >
          {children}
        </Container>

        <footer className="mt-auto w-full">
          <Footer />
        </footer>

        {MockAuthToggle && <MockAuthToggle />}
      </div>
    </Providers>
  );
}
