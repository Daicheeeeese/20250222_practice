import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BBC English",
  description: "Learn English with BBC News articles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
