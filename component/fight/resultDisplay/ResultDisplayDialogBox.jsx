import { Button } from 'flowbite-react';
import { useMessages } from './MessagesProvider';
import ResultDisplayBox from './ResultDisplayBox';

export default function ResultDisplayDialogBox() {
    const { messages, setMessages } = useMessages();

    function deleteMessage() {
        setMessages([]);
    }

    return (
        <div className="h-[calc(100vh-5rem)] w-80 space-y-3 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md">
            <div className="mb-2 border-b pb-2 flex items-center justify-between">
                Actions
                <Button onClick={deleteMessage}>Rafraichir</Button>
            </div>
            {messages.map(msg => (
                <ResultDisplayBox key={msg.id} msg={msg} />
            ))}
        </div>
    );
}
