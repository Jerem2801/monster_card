import { Popover } from 'flowbite-react';
import Image from 'next/image';

export default function StatusButton({ action, passive }) {
    const baseClass =
        'text-md not-italic inline-flex items-center gap-1 rounded px-1 align-middle select-none';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';

    const status = action.effect.status;

    const popoverContent = (
        <div className="w-64 text-sm text-gray-500">
            <div className="px-3 py-2 text-center">
                <div className="inline-flex flex-wrap justify-center">{status.description}</div>
            </div>
        </div>
    );

    return (
        <Popover content={popoverContent} trigger="hover" placement="top">
            <span className={`${baseClass} ${passive ? passiveClass : activeClass}`}>
                {status.label}
                <Image src={status.path} alt={status.label} width={20} height={20} />
            </span>
        </Popover>
    );
}
