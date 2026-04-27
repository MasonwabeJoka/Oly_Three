"use client";

import styles from "./Messages.module.scss";
import ChatList from "./ChatList";
import { useHydrated } from "@/hooks/useHydrated";

const Messages: React.FC = () => {
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        <ChatList />
      </div>
    </div>
  );
};

export default Messages;
