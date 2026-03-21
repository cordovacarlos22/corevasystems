import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sileo";

const inter = Inter({
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  metadataBase: new URL("https://www.corevasystems.com"),

  title: {
    default: "Coreva Systems | AI, Websites & Automation",
    template: "%s | Coreva Systems",
  },

  description:
    "We build AI systems, high-converting websites, and automation solutions that help businesses grow faster, save time, and scale efficiently.",

  keywords: [
    "AI solutions",
    "business automation",
    "web design agency",
    "high converting websites",
    "lead generation systems",
    "automation workflows",
    "Coreva Systems",
  ],

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
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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