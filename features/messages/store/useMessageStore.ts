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
  setChats: (value: boolean) => void;
  setSelectedChat: (chat: Message | null) => void;
  setUserMessages: (messages: MessageContent[]) => void;
  setMessages: (messages: Message[]) => void;
  handleChatClick: (message: Message) => void;
  handleSendMessage: (text: string) => void;
  resetLocalStorage: () => void;
}

const useMessageStore = create<MessageState>((set, get) => ({
  chats: false,
  selectedChat: null,
  userMessages: [],
  messages: (() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('messages');
      return saved ? JSON.parse(saved) : initialMessages;
    }
    return initialMessages;
  })(),

  setChats: (value) => set({ chats: value }),

  setSelectedChat: (chat) => set({ selectedChat: chat }),

  setUserMessages: (messages) => set({ userMessages: messages }),

  setMessages: (messages) => {
    set({ messages });
    localStorage.setItem('messages', JSON.stringify(messages));
  },

  handleChatClick: (message) => {
    set({
      selectedChat: message,
      chats: true,
    });
    const savedUserMessages = localStorage.getItem(`userMessages_${message.id}`);
    set({
      userMessages: savedUserMessages ? JSON.parse(savedUserMessages) : [],
    });
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
      localStorage.setItem(`userMessages_${selectedChat.id}`, JSON.stringify(updatedUserMessages));

      set({
        messages: messages.map((msg) =>
          msg.id === selectedChat.id
            ? {
                ...msg,
                messages: [...msg.messages, newMessage],
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            : msg
        ),
      });
    }
  },

  resetLocalStorage: () => {
    localStorage.removeItem('messages');
    const { messages } = get();
    messages.forEach((msg) => localStorage.removeItem(`userMessages_${msg.id}`));
    set({
      messages: initialMessages,
      userMessages: [],
      selectedChat: null,
      chats: false,
    });
  },
}));

export default useMessageStore;