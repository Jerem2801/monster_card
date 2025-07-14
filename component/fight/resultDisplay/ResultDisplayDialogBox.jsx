import { Button } from 'flowbite-react';
import { useMessages } from './MessagesProvider';
import ResultDisplayBox from './ResultDisplayBox';

export default function ResultDisplayDialogBox() {
  const { messages, setMessages } = useMessages();

  function deleteMessage() {
    setMessages([]);
  }

  // Limiter à 9 messages max (les plus récents)
  const displayedMessages = messages.length > 8 ? messages.slice(messages.length - 8) : messages;

  return (
    <div
  className="fixed right-4 w-80 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md"
  style={{
    top: '7rem', // décale du haut
    bottom: '2rem', // décale du bas
    height: 'auto', // pas besoin de calc height si top + bottom définis
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }}
>
      <div className="mb-2 border-b pb-2 flex items-center justify-between">
        Lancer de Dés
        <Button onClick={deleteMessage}>Effacer</Button>
      </div>
      <div
        className="flex flex-col space-y-3 overflow-y-auto"
        style={{ flexGrow: 1, paddingRight: '0.5rem' }}
      >
        {displayedMessages.map((msg) => (
          <ResultDisplayBox key={msg.id} msg={msg} />
        ))}
      </div>
    </div>
  );
}
