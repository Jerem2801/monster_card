import { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState([]);

    // Fonction pour ajouter un message
    function addMessage(text) {
        setMessages(prev => [...prev, { id: crypto.randomUUID(), text }]);
    }

    return (
        <MessagesContext.Provider value={{ messages, setMessages, addMessage }}>
            {children}
        </MessagesContext.Provider>
    );
}

// Hook custom pour utiliser le contexte plus facilement
export function useMessages() {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
}
