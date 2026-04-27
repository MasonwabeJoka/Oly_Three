"use client";

import useMessageStore from "../store/useMessageStore";
import Chat from "./Chat";
import { useHydrated } from "@/hooks/useHydrated";
import { useEffect } from "react";

const ChatPage = ({ chatId }: { chatId: number }) => {
  const hydrated = useHydrated();
  const chats = useMessageStore((state) => state.chats);
  const markOpened = useMessageStore((state) => state.markOpened);

  useEffect(() => {
    markOpened(chatId);
  }, [chatId]);

  const chat = chats.find((c) => c.id === chatId) || null;

  if (!hydrated) return null;
  if (!chat) return <p>Chat not found.</p>;

  return <Chat chat={chat} chatId={chatId} />;
};

export default ChatPage;
