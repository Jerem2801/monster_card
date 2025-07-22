'use client';

import { STATUSES_TO_SHOW } from '@/data/statusdata';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function StatusSelector({ status, handleStatusChange }) {
    const statusOrder = STATUSES_TO_SHOW.slice().sort((a, b) => a.label.localeCompare(b.label));
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    useEffect(() => {
        setSelectedStatuses(status.map(s => s.id));
    }, [status]);

    function toggleStatus(id) {
        const newStatuses = selectedStatuses.includes(id)
            ? selectedStatuses.filter(sid => sid !== id)
            : [...selectedStatuses, id];

        setSelectedStatuses(newStatuses);
        handleStatusChange?.(newStatuses);
    }

    return (
        <div className="pt-3 text-center">
            <label className="mb-2 block text-sm font-semibold text-gray-700">Status</label>

            <div className="grid grid-cols-2 gap-4 px-4">
                {statusOrder.map(status => {
                    const isChecked = selectedStatuses.includes(status.id);
                    return (
                        <label
                            key={status.id}
                            htmlFor={`status-${status.id}`}
                            className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 transition ${isChecked ? 'border-indigo-400 bg-indigo-100' : 'border-gray-300 hover:bg-gray-100'}`}
                        >
                            <input
                                type="checkbox"
                                id={`status-${status.id}`}
                                checked={isChecked}
                                onChange={() => toggleStatus(status.id)}
                                className="hidden"
                            />
                            <span
                                className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${isChecked ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400 bg-white'}`}
                            >
                                {isChecked && (
                                    <svg
                                        className="h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </span>
                            <Image src={status.path} alt={status.label} width={24} height={24} />
                            <span className="text-sm text-gray-800">{status.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
