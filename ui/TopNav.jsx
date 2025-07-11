import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
    return (
        <div className="inline-flex h-20 w-full items-center justify-center space-x-4 bg-gray-100 p-4">
            <div className="mr-50 inline-block text-center">
                <Link href="/">
                    <div>
                        <p className="text-lg font-bold">MONSTER CARDS</p>
                        <p className="bg-blue-300 px-2 text-xs text-black">BETA</p>
                    </div>
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link
                    href="../encounter"
                    className="flex items-center space-x-2 rounded-sm text-lg font-medium text-gray-900 hover:bg-gray-100"
                >
                    <Image src="/encounter-icon.svg" alt="Logo" width={24} height={24} />
                    <span>Rencontre</span>
                </Link>
            </div>
        </div>
    );
}
