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
  metadataBase: new URL("https://voda-cabak.vercel.app"),
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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Vodo-Topo Čabák | Voda a topení Vsetín",
    description:
      "Vodoinstalatérské a topenářské práce ve Vsetíně a okolí. Štěpán Čabák.",
    type: "website",
    locale: "cs_CZ",
    images: [{ url: "/realizace/nemocnice-1.jpeg" }],
  },
};

export const viewport = {
  themeColor: "#09090b",
};

// Structured data for local search: a plumber serving Vsetín and surroundings
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Vodo-Topo Čabák",
  founder: "Štěpán Čabák",
  telephone: "+420731200845",
  email: "vodotopo-cabak@seznam.cz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Horní Jasenka 175",
    addressLocality: "Vsetín",
    postalCode: "755 01",
    addressCountry: "CZ",
  },
  areaServed: "Vsetín a okolí do 30 km",
  url: "https://voda-cabak.vercel.app",
  image: "https://voda-cabak.vercel.app/realizace/nemocnice-1.jpeg",
  priceRange: "$$",
  openingHours: "Mo-Sa 07:00-18:00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${display.variable} ${sans.variable} dark`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}
