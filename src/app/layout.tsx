import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 👇 import thêm phần Providers (bỏ Navbar)
import Providers from "@/lib/providers";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EV Service Center",
  description: "EV Service Center Web Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Bọc toàn bộ app trong React Query Provider */}
        <Providers>
          <ErrorBoundary>
            {/* ✅ CHỈ CHỨA CHILDREN - KHÔNG CÒN NAVBAR */}
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
