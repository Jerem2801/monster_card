import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import 'rc-slider/assets/index.css';
import TopNav from "./ui/TopNav";

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} antialiased flex flex-col h-screen`}>
        <TopNav />
        <div className="flex-grow overflow-auto"
          >
          {children}
        </div>
      </body>
    </html>
  );
}
