import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import localFont from "next/font/local";

// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/next";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "./globals.css";
import { FiArrowUpRight } from "react-icons/fi";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
});

// Client-supplied CI font — self-hosted from their own reference design, Noto Sans Thai covers any glyph the subset misses.
const fcFriday = localFont({
  src: "../public/fonts/fc-friday.woff",
  variable: "--font-fc-friday",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Progress — สอบติดไปด้วยกัน | ติว TGAT & A-Level",
  description: "The Progress - ติวสอบ TGAT A-Level คณิต อังกฤษ",
  metadataBase: new URL("https://theprogressgo.com"),
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${fcFriday.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden antialiased">
        <Navbar />
        {children}
        <Footer />

        <Button variant="line-solid" href="https://line.me/R/ti/p/@453qifrr" target="_blank" rel="noreferrer" size="md" className="fixed right-4 bottom-5 z-50">
          LINE Admin <FiArrowUpRight size={"1.25rem"} />
        </Button>

        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}
