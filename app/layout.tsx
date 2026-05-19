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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karthik-reddy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Karthik Reddy — Data Analyst, Melbourne",
    template: "%s | Karthik Reddy",
  },
  description:
    "Master of Data Science @ RMIT. Ex-Data Analyst at Zelis Healthcare. Shipping production AI for Australian industry. Available in Melbourne.",
  keywords: [
    "Karthik Reddy",
    "Data Analyst Melbourne",
    "Power BI Melbourne",
    "Snowflake SQL",
    "RMIT Data Science",
    "Junior Data Scientist Australia",
    "Business Intelligence Analyst",
    "Healthcare Analytics Australia",
  ],
  authors: [{ name: "Karthik Reddy Tanigundala" }],
  creator: "Karthik Reddy Tanigundala",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "Karthik Reddy",
    title: "Karthik Reddy — Data Analyst, Melbourne",
    description:
      "Master of Data Science @ RMIT. Ex-Data Analyst at Zelis Healthcare. Shipping production AI for Australian industry.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Karthik Reddy — Data Analyst, Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Reddy — Data Analyst, Melbourne",
    description:
      "Master of Data Science @ RMIT. Ex-Data Analyst at Zelis Healthcare. Shipping production AI for Australian industry.",
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
  jobTitle: "Data Analyst",
  description:
    "Master of Data Science student at RMIT University Melbourne. Former Data Analyst at Zelis Healthcare India.",
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
    "Business Intelligence",
    "Power BI",
    "Snowflake SQL",
    "Python",
    "Machine Learning",
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