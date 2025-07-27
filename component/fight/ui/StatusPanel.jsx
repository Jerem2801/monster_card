import { Popover } from 'flowbite-react';
import Image from 'next/image';
import { STATUSES } from '@/data/statusdata';

export default function StatusPanel({ status }) {
    function getPopoverContent(id) {
        const status = STATUSES[id.toUpperCase()];

        return (
            <div className="w-64 text-sm text-gray-500">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 text-center">
                    <h3 className="font-semibold text-gray-900">{status.label}</h3>
                </div>
                <div className="px-3 py-2 text-center">
                    <div className="inline-flex flex-wrap justify-center">{status.description}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1">
            {status.map(status => (
                <Popover
                    key={status.id}
                    content={getPopoverContent(status.id)}
                    trigger="hover"
                    placement="top"
                >
                    <Image
                        key={status.id}
                        src={status.path}
                        alt={status.label}
                        width={24}
                        height={24}
                    />
                </Popover>
            ))}
        </div>
    );
}
