import "./globals.css";
import { globalFont } from "@/utils/fonts/global";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: "UMich KISA",
    template: "UMich KISA | %s",
  },
  description:
    "미시간 대학교 한인 학부생 학생회 공식 웹사이트 | University of Michigan Korean International Student Association (KISA) official website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // google login session
  // const session = await getServerSession(authOptions);

  return (
    <html className={globalFont.className} lang="en">
      {/* <SessionProvider session={session}> */}
      <body className="flex flex-col overflow-x-hidden relative">
        {/* template.js : header + main */}
        <div className="grow">{children}</div>

        {/* Footer */}
        <footer className="bottom-0 z-0 overflow-y-clip">
          <Footer />
        </footer>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
      {/* </SessionProvider> */}
    </html>
  );
}
