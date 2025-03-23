import { Navbar, Footer } from "@/components/impl";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <Navbar />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
