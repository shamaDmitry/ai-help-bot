import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import ApolloProviderWrapper from "@/components/ApolloProvider";
import { Toaster } from "@/components/ui/sonner";
import ShowMessageToast from "@/components/ShowMessageToast";
import { shadcn } from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIBot",
  description: "AI chat agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <ClerkProvider
        appearance={{
          theme: shadcn,
        }}
      >
        <ThemeProvider>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex`}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <ShowMessageToast />
              </Suspense>
              {children}

              <Toaster position="top-center" />
            </body>
          </html>
        </ThemeProvider>
      </ClerkProvider>
    </ApolloProviderWrapper>
  );
}
