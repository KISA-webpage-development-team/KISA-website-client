import Header from "../components/Header/Header";
import "./globals.css";
import { globalFont } from "../utils/fonts/globalFont";
import Footer from "../components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/auth";
import { SessionProvider } from "../context/SessionProvider";

export const metadata = {
  title: "UMich KISA",
  description:
    "University of Michigan Korean International Student Association (KISA) official website",
};

export default async function RootLayout({ children }) {
  // google login session
  const session = await getServerSession(authOptions);

  return (
    <html className={globalFont.className} lang="en">
      <SessionProvider session={session}>
        <body className="flex flex-col overflow-x-hidden relative">
          {/* template.js : header + main */}
          <div className="grow">{children}</div>

          {/* Footer */}
          <footer className="bottom-0 z-0">
            <Footer />
          </footer>
        </body>
      </SessionProvider>
    </html>
  );
}
