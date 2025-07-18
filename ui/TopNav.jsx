import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 inline-flex h-20 w-full items-center justify-center gap-8 bg-gray-100 p-4 shadow-md">
            <Link href="/" className="group flex flex-col items-center justify-center select-none">
                <span className="text-lg font-bold tracking-wide">MONSTER CARDS</span>
                <span className="w-full bg-blue-300 px-2 text-center text-xs text-black">BETA</span>
            </Link>
            <Link
                href="/encounter"
                className="flex items-center space-x-2 rounded-sm px-3 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-gray-200"
            >
                <Image
                    src="/encounter-icon.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="transition-transform group-hover:scale-110"
                />
                <span>Rencontre</span>
            </Link>
        </nav>
    );
}
