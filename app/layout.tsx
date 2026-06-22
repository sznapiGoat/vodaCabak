import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vodo-Topo Čabák | Vodoinstalatér a topenář Vsetín",
  description:
    "Štěpán Čabák, vodoinstalatérské a topenářské práce ve Vsetíně a okolí. Rozvody vody, topení, rekonstrukce koupelen, lisované spoje. Spolehlivě a precizně.",
  keywords: [
    "vodoinstalatér Vsetín",
    "topenář Vsetín",
    "rekonstrukce koupelny",
    "rozvody topení",
    "Štěpán Čabák",
  ],
  openGraph: {
    title: "Vodo-Topo Čabák | Voda a topení Vsetín",
    description:
      "Vodoinstalatérské a topenářské práce ve Vsetíně a okolí. Štěpán Čabák.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${display.variable} ${sans.variable} dark`}>
      <body>{children}</body>
    </html>
  );
}
