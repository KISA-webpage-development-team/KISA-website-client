import { ReactNode } from "react";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/next-auth/authOptions";
import {
  AuthContextProvider,
  MockAuthToggle,
  type AppSession,
} from "@/mocks/authContext";

export default async function MainLayout({ children }: { children: ReactNode }) {
  // pass over this session to Header to remove unnecessary re-renders
  const session = await getServerSession(authOptions);

  // mainContentsWidth: this will control all of the horizontal padding and margin of the page contents
  const mainContentsWidth = "max-w-screen-2xl px-4 md:px-24 lg:px-32";

  return (
    <AuthContextProvider initialSession={session as AppSession | null}>
      <div className="h-full flex flex-col">
        <header
          className={`${sejongHospitalLight.className} top-0 z-40
          bg-gradient-to-r from-michigan-blue/90 via-michigan-blue to-michigan-blue/85
        text-white`}
        >
          <Header session={session} />
        </header>

        <main
          className={`relative w-full h-full
          mx-auto ${mainContentsWidth}
          pt-3 md:pt-6 flex-1`}
        >
          {children}
        </main>

        <footer className="mt-auto w-full">
          <Footer />
        </footer>

        <MockAuthToggle />
      </div>
    </AuthContextProvider>
  );
}
