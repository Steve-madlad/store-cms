import { ClerkProvider } from "@/components/clerkProvider";
import ThemeSwitch from "@/components/themeSwitch";
import ModalProvider from "@/providers/modal-provider";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster as ToastProvider } from "react-hot-toast";
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
  title: "Store CMS",
  description: "E-Commerce Store with built in CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider attribute={"class"}>
          <ClerkProvider>
            <SignedOut>
              <header className="flex h-16 items-center justify-end gap-4 p-4">
                <SignInButton />
                <SignUpButton>
                  <button className="h-8 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-8 sm:px-5 sm:text-base">
                    Sign Up
                  </button>
                </SignUpButton>
                <ThemeSwitch />
              </header>
            </SignedOut>
            <ToastProvider />
            <ModalProvider />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
