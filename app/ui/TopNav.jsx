import Link from "next/link";
import Image from 'next/image';

export default function TopNav() {
  return (
    <div className="w-full h-20 inline-flex items-center justify-center space-x-4 p-4 bg-gray-100">
      <div className="inline-block text-center mr-50">
        <Link href="/">
          <div>
            <p className="text-lg font-bold">MONSTER CARDS</p>
            <p className="bg-blue-300 text-black text-xs px-2">BETA</p>
          </div>
        </Link>
      </div>
      <div className="flex space-x-4">
  <Link href="../encounter" className="flex items-center space-x-2 text-lg text-gray-900 rounded-sm hover:bg-gray-100 font-medium">
    <Image src="/encounter-icon.svg" alt="Logo" width={24} height={24} />
    <span>Rencontre</span>
  </Link>
</div>
    </div>
  );
}