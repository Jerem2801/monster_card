'use client'

import { useEffect, useRef } from 'react';
import { Button } from 'flowbite-react';
import { useMessages } from './MessagesProvider';
import ResultDisplayBox from './ResultDisplayBox';

export default function ResultDisplayDialogBox() {
    const { messages, setMessages } = useMessages();
    const scrollRef = useRef(null);

    function deleteMessage() {
        setMessages([]);
    }

    // Limiter à 9 messages max
    const displayedMessages = messages.length > 8 ? messages.slice(messages.length - 8) : messages;

    // Scroll vers le bas quand displayedMessages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayedMessages]);

    return (
        <div
            className="fixed right-4 w-80 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md"
            style={{
                top: '7rem',
                bottom: '2rem',
                height: 'auto',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className="mb-2 flex items-center justify-between border-b pb-2">
                Lancer de Dés
                <Button onClick={deleteMessage}>Effacer</Button>
            </div>

            {/* Liste scrollable */}
            <div
                className="flex flex-col space-y-3 overflow-y-auto"
                style={{ flexGrow: 1, paddingRight: '0.5rem' }}
            >
                {displayedMessages.map(msg => (
                    <ResultDisplayBox key={msg.id} msg={msg} />
                ))}
                {/* 👇 Marqueur en bas pour le scroll automatique */}
                <div ref={scrollRef} />
            </div>
        </div>
    );
}

