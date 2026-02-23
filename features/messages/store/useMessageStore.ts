import { create } from 'zustand';
import { messages as initialMessages } from "@/data/MessagesData";
export interface Message {
    id: number;
    name: string;
    contactName: string;
    profilePicture: string;
    createdAt: string;
    messages: MessageContent[];
  }
  
  export interface MessageContent {
    text: string;
    senderType: "user" | "contact";
    time: string;
  }

interface MessageState {
  chats: boolean;
  selectedChat: Message | null;
  userMessages: MessageContent[];
  messages: Message[];
  isLoading: boolean;
  isInitialized: boolean;
  setChats: (value: boolean) => void;
  setSelectedChat: (chat: Message | null) => void;
  setUserMessages: (messages: MessageContent[]) => void;
  setMessages: (messages: Message[]) => void;
  handleChatClick: (message: Message) => void;
  handleSendMessage: (text: string) => void;
  resetLocalStorage: () => void;
  initializeMessages: () => void;
}

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error(`Error reading from localStorage with key "${key}":`, error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error writing to localStorage with key "${key}":`, error);
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing from localStorage with key "${key}":`, error);
    }
  },
};

const useMessageStore = create<MessageState>((set, get) => ({
  chats: false,
  selectedChat: null,
  userMessages: [],
  messages: [], // Start with empty array, will be populated by initializeMessages
  isLoading: false,
  isInitialized: false,

  initializeMessages: () => {
    if (get().isInitialized) return;
    
    set({ isLoading: true });
    
    // Simulate loading delay to show spinner (optional)
    setTimeout(() => {
      const saved = safeLocalStorage.getItem('messages');
      const loadedMessages = saved ? JSON.parse(saved) : initialMessages;
      
      set({ 
        messages: loadedMessages, 
        isLoading: false, 
        isInitialized: true 
      });
    }, 300); // Small delay to show loading state
  },

  setChats: (value) => set({ chats: value }),

  setSelectedChat: (chat) => set({ selectedChat: chat }),

  setUserMessages: (messages) => set({ userMessages: messages }),

  setMessages: (messages) => {
    set({ messages });
    safeLocalStorage.setItem('messages', JSON.stringify(messages));
  },

  handleChatClick: (message) => {
    set({
      selectedChat: message,
      chats: true,
    });
    const savedUserMessages = safeLocalStorage.getItem(`userMessages_${message.id}`);
    try {
      set({
        userMessages: savedUserMessages ? JSON.parse(savedUserMessages) : [],
      });
    } catch (error) {
      console.error('Error parsing user messages:', error);
      set({ userMessages: [] });
    }
  },

  handleSendMessage: (text) => {
    const { selectedChat, userMessages, messages } = get();
    if (text.trim() && selectedChat) {
      const newMessage: MessageContent = {
        text,
        senderType: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const updatedUserMessages = [...userMessages, newMessage];
      set({ userMessages: updatedUserMessages });
      safeLocalStorage.setItem(`userMessages_${selectedChat.id}`, JSON.stringify(updatedUserMessages));

      const updatedMessages = messages.map((msg) =>
        msg.id === selectedChat.id
          ? {
              ...msg,
              messages: [...msg.messages, newMessage],
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : msg
      );
      
      set({ messages: updatedMessages });
      safeLocalStorage.setItem('messages', JSON.stringify(updatedMessages));
    }
  },

  resetLocalStorage: () => {
    safeLocalStorage.removeItem('messages');
    const { messages } = get();
    messages.forEach((msg) => safeLocalStorage.removeItem(`userMessages_${msg.id}`));
    set({
      messages: initialMessages,
      userMessages: [],
      selectedChat: null,
      chats: false,
      isInitialized: false,
    });
  },
}));

export default useMessageStore;