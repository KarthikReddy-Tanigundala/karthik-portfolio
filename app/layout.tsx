import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

// NEXT_PUBLIC_SITE_URL wins; otherwise Vercel's own production domain; local fallback.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Karthik Reddy — Data Analyst, Analytics Engineer & Data Scientist, Melbourne",
    template: "%s | Karthik Reddy",
  },
  description:
    "Melbourne data professional: 2+ years production SQL and Power BI (Zelis Healthcare, EnergyTech), plus seven 2026 projects in dbt, forecasting, ML and RAG, including an AI assistant for Better Health Network. Master of Data Science @ RMIT. Full work rights from Nov 2026, no sponsorship needed.",
  keywords: [
    "Karthik Reddy",
    "Data Analyst Melbourne",
    "Analytics Engineer Melbourne",
    "Data Scientist Melbourne",
    "BI Developer Melbourne",
    "Power BI",
    "dbt",
    "Snowflake SQL",
    "Time series forecasting",
    "RAG LLM Engineer",
    "Copilot Studio",
    "RMIT Master of Data Science",
    "Healthcare Analytics Australia",
    "Energy Analytics Australia",
  ],
  authors: [{ name: "Karthik Reddy Tanigundala" }],
  creator: "Karthik Reddy Tanigundala",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "Karthik Reddy",
    title: "Karthik Reddy — Data Analyst, Analytics Engineer & Data Scientist, Melbourne",
    description:
      "Production SQL & Power BI, dbt star schemas, calibrated forecasts and cited RAG systems. Master of Data Science @ RMIT. Full work rights from Nov 2026, no sponsorship.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Karthik Reddy — Data Analyst, Analytics Engineer & Data Scientist, Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Reddy — Data Analyst, Analytics Engineer & Data Scientist, Melbourne",
    description:
      "Production SQL & Power BI, dbt star schemas, calibrated forecasts and cited RAG systems. Master of Data Science @ RMIT. Full work rights from Nov 2026, no sponsorship.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karthik Reddy Tanigundala",
  givenName: "Karthik",
  familyName: "Tanigundala",
  additionalName: "Reddy",
  jobTitle: "Data Analyst · Analytics Engineer · Data Scientist",
  description:
    "Melbourne data professional with 2+ years of production SQL and Power BI experience (Zelis Healthcare, EnergyTech Global) and a Master of Data Science from RMIT University (Nov 2026).",
  email: "mailto:karthikreddytanigundala@gmail.com",
  telephone: "+61422607945",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Niddrie",
    addressRegion: "VIC",
    postalCode: "3042",
    addressCountry: "AU",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "RMIT University",
      sameAs: "https://www.rmit.edu.au",
    },
    {
      "@type": "EducationalOrganization",
      name: "Vasavi College of Engineering (Osmania University)",
    },
  ],
  knowsAbout: [
    "Data Analysis",
    "Analytics Engineering",
    "dbt",
    "Snowflake",
    "Power BI",
    "DAX",
    "Python",
    "Machine Learning",
    "Time Series Forecasting",
    "Retrieval-Augmented Generation",
    "Healthcare Analytics",
    "Energy Analytics",
  ],
  sameAs: [
    "https://linkedin.com/in/karthik-reddy-datascience",
    "https://github.com/KarthikReddy-Tanigundala",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}