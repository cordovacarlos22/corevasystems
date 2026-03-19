import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sileo";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Coreva Systems | High-Performance Business Automation",
  description:
    "Websites, automation, and scalable systems designed to generate leads, save time, and turn manual chaos into digital precision.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}