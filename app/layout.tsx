import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai, Prompt } from "next/font/google";

// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Ticker } from "@/components/Ticker";
import "./globals.css";
import { FiArrowUpRight } from "react-icons/fi";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Progress — สอบติดไม่ใช่โชค | ติว TGAT & A-Level",
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
    <html lang="th" className={`${notoSansThai.variable} ${prompt.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden antialiased">
        <Ticker />
        <Navbar />
        {children}
        <Footer />

        <a href={"https://line.me/R/ti/p/@453qifrr"} target="_blank" rel="noreferrer" className="btn btn-line btn-sm fixed right-6 bottom-6 z-50 px-5 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          LINE Admin <FiArrowUpRight size={"1.25rem"} className="relative -top-px" />
        </a>

        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}
