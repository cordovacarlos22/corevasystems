import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sileo";

const inter = Inter({
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Coreva Systems",
  url: "https://www.corevasystems.com",
  logo: "https://www.corevasystems.com/images/coreva-thumbnail.webp",
  image: "https://www.corevasystems.com/images/coreva-thumbnail.webp",
  description:
    "Coreva Systems builds high-converting websites and online stores that help service businesses and sellers grow.",
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
    default: "Websites & E-Commerce Built to Convert | Coreva Systems",
    template: "%s | Coreva Systems",
  },

  description:
    "Coreva Systems builds high-converting websites and online stores for US & LATAM service businesses. Book a free strategy session today.",

  openGraph: {
    title: "Websites & E-Commerce Built to Convert | Coreva Systems",
    description:
      "High-converting websites and online stores designed to grow your business.",
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
    title: "Websites & E-Commerce Built to Convert | Coreva Systems",
    description:
      "We build websites and online stores that help businesses grow.",
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

        {(GA_ID || GOOGLE_ADS_ID) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID || GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-tags" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `}
            </Script>
          </>
        )}

        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {TAWK_PROPERTY_ID && TAWK_WIDGET_ID && (
          <Script
            id="tawk-to"
            strategy="lazyOnload"
            src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
            crossOrigin="*"
          />
        )}
      </body>
    </html>
  );
}