import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
