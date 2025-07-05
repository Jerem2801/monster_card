import Image from 'next/image';

export default function Home() {

    return (
        <div
            className="relative flex items-center justify-center bg-cover h-full bg-center overflow-hidden">
            <div className="-translate-y-15">
                <Image src="/Logo.png" alt="Logo" width={800} height={400} />
            </div>
        </div>

    );
}
