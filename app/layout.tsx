import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components/impl";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Talmage Bergeson",
  description: "Personal portfolio showcasing my work and expertise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <Navbar />
        <main className="flex flex-grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
