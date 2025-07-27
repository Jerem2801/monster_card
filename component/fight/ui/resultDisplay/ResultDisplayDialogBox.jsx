'use client';

import { useEffect, useRef } from 'react';
import { Button } from 'flowbite-react';
import { useMessages } from './MessagesProvider';
import ResultDisplayBox from './ResultDisplayBox';
import Image from 'next/image';

export default function ResultDisplayDialogBox() {
    const { messages, setMessages } = useMessages();
    const scrollRef = useRef(null);

    function deleteMessage() {
        setMessages([]);
    }

    const displayedMessages = messages.length > 8 ? messages.slice(-8) : messages;

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [displayedMessages]);

    return (
        <div
            role="region"
            aria-label="Résultats des lancers de dés"
            className="flex h-[calc(100vh-155px)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg"
        >
            {/* Header fixe et sombre */}

            <div className="relative flex items-center justify-center rounded-t-xl bg-gray-800 px-4 py-3 select-none">
                <h3 className="flex flex-1 items-center justify-center text-base font-semibold tracking-wide text-white">
                    <Image src="/stat/damage.png" alt="🎲" width={34} height={34} />
                    <span className="ml-3">Lancer de dés</span>
                </h3>
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                    <Button
                        size="xs"
                        color="alternative"
                        onClick={deleteMessage}
                        title="Effacer les résultats"
                    >
                        Effacer
                    </Button>
                </div>
            </div>

            {/* Zone scrollable sous le header */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
                {displayedMessages.map(msg => (
                    <ResultDisplayBox key={msg.id} msg={msg} />
                ))}
                <div ref={scrollRef} />
            </div>
        </div>
    );
}
