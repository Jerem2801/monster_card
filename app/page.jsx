import Image from 'next/image';

export default function Home() {
    return (
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-cover bg-center">
            <div className="-translate-y-15">
                <Image src="/Logo.png" alt="Logo" width={800} height={400} />
            </div>
        </div>
    );
}
