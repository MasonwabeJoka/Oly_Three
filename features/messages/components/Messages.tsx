"use client";

import styles from "./Messages.module.scss";
import useMessageStore from "../store/useMessageStore";
import ChatList from "./ChatList";
import Chat from "./Chat";
import { useEffect } from "react";

const Messages: React.FC = () => {
  const { chats, selectedChat, isInitialized, initializeMessages } = useMessageStore();

  // Initialize messages on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeMessages();
    }
  }, [isInitialized, initializeMessages]);

  return (
    <div className={styles.container}>
      {!chats && (
        <div className={styles.chatList}>
          <ChatList />
        </div>
      )}

      {chats && selectedChat && (
        <div className={styles.chat}>
          <Chat />
        </div>
      )}
    </div>
  );
};

export default Messages;
