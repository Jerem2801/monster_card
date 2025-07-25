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
      className="w-full max-w-lg rounded-xl border border-gray-300 shadow-lg flex flex-col
                 h-[calc(100vh-155px)] bg-white overflow-hidden"
    >
      {/* Header fixe et sombre */}
      
<div className="bg-gray-800 px-4 py-3 flex items-center justify-center relative rounded-t-xl select-none">
  <h3 className="flex items-center text-base font-semibold tracking-wide text-white flex-1 justify-center">
    <Image src="/stat/damage.png" alt="🎲" width={34} height={34} />
    <span className="ml-3">Lancer de dés</span>
  </h3>
  <div className="absolute right-4 top-1/2 -translate-y-1/2">
    <Button size="xs" color="alternative" onClick={deleteMessage} title="Effacer les résultats">
      Effacer
    </Button>
  </div>
</div>

      {/* Zone scrollable sous le header */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {displayedMessages.map((msg) => (
          <ResultDisplayBox key={msg.id} msg={msg} />
        ))}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
