"use client";
import Avatar from "@/components/Avatars";
import styles from "./Chats.module.scss";
import { User } from "@prisma/client";
import Chat from "./Chat";
import { FullChatType } from "../lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useChat from "../hooks/useChat";
import { chats } from "@/app/temp/tempForMessages";
import { messages } from "@/data/MessagesData";

interface ChatsProps {
  currentUser: User;
  users: User[];
  initialChats: FullChatType[];
}
const Chats: React.FC<ChatsProps> = ({ users, initialChats }) => {
  const route = useRouter();
  const { chatId, isOpen } = useChat();

  return (
    <div className={styles.chats}>
      {messages?.slice(0, 6).map((chat: any) => (
        <div key={chat.id} className={styles.chat}>
          <Chat
            avatar={chat?.image}
            avatarSize="regular"
            name={chat.name || ""}
            messages={chat.messages || []}
            chat={chat}
            createdAt={chat.createdAt || ""}
            isOnline={chat.isOnline || false}
            message={chat.messages?.[chat.messages?.length - 1]?.text || ""}
            selected={chatId === chat.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Chats;
