import type { Metadata } from "next";

import NavBar from "@/components/nav/nav-bar";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { geistFont } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Johan",
    default: "Johan",
  },
  description: "A WebTech Playground.",
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
