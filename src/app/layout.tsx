import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import { MSWProvider } from "@/mocks/MSWProvider";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: 'UMich KISA',
    template: 'UMich KISA | %s',
  },
  description:
    '미시간 대학교 한인 학부생 학생회 공식 웹사이트 | University of Michigan Korean International Student Association (KISA) official website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ fontFamily: "var(--font-pretendard)" }}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex flex-col">
        <MSWProvider>
          <div className="flex-1 flex flex-col w-full">{children}</div>
          <footer className="mt-auto w-full">
            <Footer />
          </footer>
        </MSWProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
