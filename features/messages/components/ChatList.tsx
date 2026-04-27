"use client";

import Input from "@/components/Input";
import styles from "./ChatList.module.scss";
import useMessageStore, { Chat } from "../store/useMessageStore";
import { useMemo, useState } from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "next/navigation";

const ChatList: React.FC = () => {
  const chats = useMessageStore((state) => state.chats);
  const router = useRouter();

  const [search, setSearch] = useState("");

  // ✅ filter chats
  const filteredChats = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return chats;

    return chats.filter((chat) => {
      const lastMessage = chat.messages[chat.messages.length - 1]?.text || "";

      return (
        chat.name.toLowerCase().includes(query) ||
        lastMessage.toLowerCase().includes(query)
      );
    });
  }, [chats, search]);

  const sortedChats = useMemo(() => {
    // sort compares 2 chats at a time based on last message timestamp
    return [...filteredChats].sort((chatOne, chatTwo) => {
      const lastMsgInChatOne =
        chatOne.messages[chatOne.messages.length - 1]?.createdAt || 0;
      const lastMsgInChatTwo =
        chatTwo.messages[chatTwo.messages.length - 1]?.createdAt || 0;
      return lastMsgInChatTwo - lastMsgInChatOne; // newer messages appear on top
    });
  }, [filteredChats]);

  return (
    <div className={styles.container}>
      <div className={styles.headerDiv}></div>

      <div className={styles.searchBar}>
        <Input
          className={styles.search}
          inputType="text"
          inputColourType="normal"
          inputSize="medium"
          iconSrcLeft=""
          iconSrcRight="/icons/search.png"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="search-bar"
          placeholder="Search chats"
          id="search-bar"
          name="search-bar"
          ariaLabel="Search chats"
          autoFocus={false}
          required={false}
          value={search} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <ul className={styles.chats} role="list" aria-label="Recent chats">
        {sortedChats.length === 0 ? (
          <p className={styles.empty}>No chats found</p>
        ) : (
          sortedChats.map((chat: Chat) => (
            <ChatItem key={chat.id} chat={chat} onSelect={(id) => router.push(`/dashboard/messages/${id}`)} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatList;
