import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./homepage/TopNav";
import BottomNav from "./homepage/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monster Card",
  description: "A simple app to create and manage your tabletop RPG encounters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <TopNav />
        <div className="flex-grow overflow-auto"
          style={{
            paddingLeft: 'max(0px, calc((100vw - 1300px) / 2))',
            paddingRight: 'max(0px, calc((100vw - 1300px) / 2))',
          }}>
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
