import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sileo";

const inter = Inter({
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Coreva Systems",
  url: "https://www.corevasystems.com",
  logo: "https://www.corevasystems.com/images/coreva-thumbnail.webp",
  image: "https://www.corevasystems.com/images/coreva-thumbnail.webp",
  description:
    "Coreva Systems builds AI systems, high-converting websites, and automation solutions that help service businesses grow, save time, and scale efficiently.",
  email: "hello@corevasystems.com",
  areaServed: ["US", "LATAM"],
  knowsLanguage: ["en", "es"],
  sameAs: ["https://www.linkedin.com/in/carloscordovadev/"],
  founder: {
    "@type": "Person",
    name: "Carlos Cordova",
    jobTitle: "Founder & Systems Architect",
  },
};

export const metadata = {
  metadataBase: new URL("https://www.corevasystems.com"),

  title: {
    default: "Coreva Systems | AI, Websites & Automation",
    template: "%s | Coreva Systems",
  },

  description:
    "We build AI systems, high-converting websites, and automation solutions that help businesses grow faster, save time, and scale efficiently.",

  openGraph: {
    title: "Coreva Systems | AI, Websites & Automation",
    description:
      "AI systems, modern websites, and automation designed to grow your business.",
    url: "https://www.corevasystems.com",
    siteName: "Coreva Systems",
    images: [
      {
        url: "/images/coreva-thumbnail.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Coreva Systems | AI, Websites & Automation",
    description:
      "We build systems that help businesses grow, automate, and scale.",
    images: ["/images/coreva-thumbnail.webp"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Toaster position="top-right" />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}