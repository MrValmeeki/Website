import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://atharvbabu.netlify.app"),
  title: "Atharv Babu — Projects & Experiments",
  description:
    "I’m Atharv, a Robotics & AI student. Here are a few things I’ve built, from a C++ game engine to a gravity simulator and an Android travel alarm.",
  keywords: [
    "Atharv Babu",
    "Robotics Engineer",
    "Artificial Intelligence",
    "AshVale",
    "Cosmic Canvas",
    "WakeMeThere",
    "C++ Developer",
    "MrValmeeki",
  ],
  authors: [{ name: "Atharv Babu", url: "https://github.com/MrValmeeki" }],
  creator: "Atharv Babu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atharvbabu.netlify.app",
    title: "Atharv Babu — Projects & Experiments",
    description:
      "A few projects by Atharv Babu: games, physics simulations, and apps.",
    siteName: "Atharv Babu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Babu — Projects & Experiments",
    description:
      "A few projects by Atharv Babu: games, physics simulations, and apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#eeeee6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}



