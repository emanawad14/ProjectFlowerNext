import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import AuthProvider from "@/components/Context/AuthContext"; // ✅

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopMart",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartContextProvider>
            <Toaster />
            <Navbar />
            <div className="w-full mx-auto px-1">{children}</div>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
