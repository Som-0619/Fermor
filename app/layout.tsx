import type { Metadata, Viewport } from "next";
import "@fontsource-variable/onest";
import "@fontsource-variable/newsreader";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Fermor — See the math behind every money decision",
  description:
    "Free EMI, SIP, FD, income tax and salary calculators built for India. No sign-up, and your numbers never leave your browser.",
};

export const viewport: Viewport = { themeColor: "#F1F4F1", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
