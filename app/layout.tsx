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
  title: "Atharv Babu — Robotics & AI Engineer",
  description:
    "Portfolio of Atharv Babu, a Robotics & AI Engineering student building intelligent systems, C++ game engines, gravitational simulations, and autonomous software.",
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
    title: "Atharv Babu — Robotics & AI Engineer",
    description:
      "Robotics & AI Engineering student building intelligent systems, C++ game engines, and physical simulations.",
    siteName: "Atharv Babu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Babu — Robotics & AI Engineer",
    description:
      "Robotics & AI Engineering student building intelligent systems, C++ game engines, and physical simulations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
