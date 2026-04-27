import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chats as initialChats } from "@/data/MessagesData";

export type MessageStatus = "sending" | "delivered" | "seen" | "failed";

export interface MessageContent {
  id: string;
  text: string;
  senderType: "user" | "contact";
  status: MessageStatus;
  createdAt: number;
}

export interface Chat {
  id: number;
  name: string;
  contact: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: number;
  messages: MessageContent[];
  opened: boolean;
}



interface MessageState {
  selectedChatId: number | null;
  chats: Chat[];
  markOpened: (id: number) => void;
  sendMessage: (text: string, chatId: number) => void;
  updateMessageStatus: (chatId: number, messageId: string, status: MessageStatus) => void;
  reset: () => void;
  isTyping: boolean;
}

const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      selectedChatId: null,
      chats: initialChats,
      isTyping: false,

          markOpened: (id) => {
        set((state) => ({
          selectedChatId: id,
          chats: state.chats.map((chat) =>
            chat.id === id ? { ...chat, opened: true } : chat
          ),
        }));
      },

      updateMessageStatus: (chatId: number, messageId: string, status: MessageStatus) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, status } : msg
                  ),
                }
              : chat
          ),
        }));
      },

      sendMessage: (text, chatId) => {
        if (!text.trim()) return;

        const { chats } = get();
        if (!chatId) return;

      const newMessage: MessageContent = {
        id: crypto.randomUUID(),
        text,
        senderType: "user",
        status: "sending",
        createdAt: Date.now(),
      };

      const updatedMessages  = chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
            }
          : chat
      );

      set({ chats: updatedMessages  });

      // 👇 simulate message status progression: sending → sent → delivered → seen
      setTimeout(() => {
        get().updateMessageStatus(chatId, newMessage.id, "sending");
      }, 200);

      setTimeout(() => {
        get().updateMessageStatus(chatId, newMessage.id, "delivered");
      }, 400);

      setTimeout(() => {
        get().updateMessageStatus(chatId, newMessage.id, "seen");
      }, 600);

      set({ isTyping: true })

        // 👇 simulate reply (mock backend)
        setTimeout(() => {
          const reply: MessageContent = {
            id: crypto.randomUUID(),
            text: "Got it 👍",
            senderType: "contact",
            status: "delivered",
            createdAt: Date.now(),
          };

          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId 
                ? {
                    ...chat,
                    messages: [...chat.messages, reply],
                  }
                : chat
            ),
            isTyping: false,
          }));
        }, 1000);


      },

      reset: () =>
        set({
          chats: initialChats,
          selectedChatId: null,
          isTyping: false,
        }),
    }),
    {
      name: "message-storage", // 👈 localStorage key

      // 👇 OPTIONAL but recommended
      
      partialize: (state) => ({
        chats: state.chats,
        selectedChatId: state.selectedChatId,
      }),
    }
  )
);

export default useMessageStore;

// 🔧 DEV ONLY: Reset persisted state on page load
if (typeof window !== "undefined") {
  localStorage.removeItem("message-storage");
}