import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundTreatment from "@/components/BackgroundTreatment";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jack Nelson | Designer & Developer",
  description: "Design + engineering portfolio for Jack Nelson.",
  metadataBase: new URL("https://jacknel.com"),
  openGraph: {
    title: "Jack Nelson | Designer & Developer",
    description: "Selected work, experiments, and contact.",
    url: "https://jacknel.com",
    siteName: "Jack Nelson",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased bg-base text-contrast">
        <BackgroundTreatment />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
