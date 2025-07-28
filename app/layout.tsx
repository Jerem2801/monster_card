import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'rc-slider/assets/index.css';
import TopNav from '@/ui/TopNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Monster Card',
    description: 'A simple app to create and manage your tabletop RPG encounters',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} h-screen antialiased`}>
                <TopNav />
                <div className="h-full pt-20">{children}</div>
            </body>
        </html>
    );
}
