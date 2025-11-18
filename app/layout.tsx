import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Portfolio - Professionelle Webentwicklung",
  description: "Professionelles Portfolio eines Full-Stack Entwicklers mit Expertise in modernen Webtechnologien",
  keywords: "Portfolio, Webentwicklung, Full-Stack, React, Next.js, TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-primary dark:text-gray-100 transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
