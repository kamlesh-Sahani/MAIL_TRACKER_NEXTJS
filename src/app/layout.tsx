import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Ai Mail Campaigns",
  description: "Advance cold mailer",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="bg-black flex flex-col flex-1 h-screen justify-between">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />

        </SessionProvider>
      </body>
    </html>
  );
}
