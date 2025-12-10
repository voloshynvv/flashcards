import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { poppins } from "@/styles/fonts";
import "@/styles/globals.css";

import { Providers } from "./providers";
import { Navbar } from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flashcards App",
  description:
    "A simple and fast flashcards app for studying and memorization.",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
