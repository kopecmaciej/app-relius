import "@/app/globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProviderClient } from "@/locales/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maciej Kopeć - Personal Website",
  description: "Welcome to my personal website",
};

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProviderClient locale={locale}>
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
