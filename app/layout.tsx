import type { Metadata } from "next";

import NavBar from "@/components/nav/nav-bar";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { geistFont } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter App",
  description: "A basic starter for next.js",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistFont.className} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body>
        <Provider>
          <NavBar />
          {children}
          {modal}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
