import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
    return (
        <nav className="inline-flex h-20 w-full items-center justify-center gap-8 bg-gray-100 p-4">
            <Link href="/" className="flex flex-col items-center justify-center select-none group">
                <span className="text-lg font-bold tracking-wide">MONSTER CARDS</span>
                <span className="bg-blue-300 px-2 py-0.5 w-full text-center rounded text-xs text-black">BETA</span>
            </Link>
            <Link
                href="/encounter"
                className="flex items-center space-x-2 rounded-sm text-lg font-medium text-gray-900 hover:bg-gray-200 transition-colors px-3 py-2"
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
