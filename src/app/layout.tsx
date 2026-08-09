import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultPanel from "@/components/consultation/ConsultPanel";
import CustomCursor from "@/components/cursor/CustomCursor";
import { inter, spaceGrotesk, jetbrainsMono } from "@/app/font";
import AgentationProvider from "@/components/dev/AgentationProvider";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import AmbientGrid from "@/components/layout/AmbientGrid";
import EasterEgg from "@/components/layout/EasterEgg";
import IntroLoader from "@/components/animations/IntroLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://dumbbasss.vercel.app"),
  title: {
    template: "%s | dumbbasss",
    default: "dumbbasss — a very serious studio, unseriously named",
  },
  description:
    "A small studio building websites, software, and AI systems — with an unserious name and unusually crafted work.",
  openGraph: {
    title: "dumbbasss — a very serious studio, unseriously named",
    description: "A small studio building websites, software, and AI systems.",
    url: "https://dumbbasss.vercel.app",
    siteName: "dumbbasss studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "dumbbasss studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dumbbasss — a very serious studio, unseriously named",
    description: "A small studio building websites, software, and AI systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col relative">
        <IntroLoader />
        <SmoothScrolling>
          <AmbientGrid />
          <EasterEgg />
          <Navbar />
          <main className="flex-1">
            {children}
            <AgentationProvider />
          </main>
          <Footer />
          <ConsultPanel />
          <CustomCursor />
        </SmoothScrolling>
      </body>
    </html>
  );
}
