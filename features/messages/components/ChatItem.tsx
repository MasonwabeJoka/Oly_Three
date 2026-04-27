"use client";

import Avatar from "@/components/Avatar";
import styles from "./ChatItem.module.scss";
import { Chat } from "../store/useMessageStore";
import { formatRelativeTime } from "@/utils/formatterFunctions/Formatter";

interface ChatItemProps {
  chat: Chat;
  onSelect: (chatId: number) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onSelect }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(chat.id);
    }
  };

  return (
    <li
      className={styles.chat}
      onClick={() => onSelect(chat.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open chat with ${chat.contact.name}`}
    >
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatar={chat.contact.avatar}
          avatarSize="regular"
          imageAlt={`${chat.contact.name}'s profile picture`}
        />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.name}>
          {chat.contact.name.length > 15
            ? chat.contact.name.slice(0, 15) + "..."
            : chat.contact.name}
        </p>

        <p className={styles.message}>
          {lastMessage?.text && (
            <>
              {lastMessage.senderType === "user" && <span className={styles.you}>You: </span>}
              {lastMessage.text.length > 48 ? lastMessage.text.slice(0, 48) + "..." : lastMessage.text}
            </>
          )}
        </p>
      </div>

      <div className={styles.timeContainer}>
        <div className={styles.time}>
          {formatRelativeTime(lastMessage.createdAt)}
        </div>

        {lastMessage?.senderType === "user" ? (
          lastMessage.status === "sending" ? (
            <span className={styles.tick}>✓</span>
          ) : lastMessage.status === "delivered" ? (
            <span className={styles.tickLabel}>unread</span>
          ) : lastMessage.status === "seen" ? (
            <span className={styles.tickSeen}>✓✓</span>
          ) : null
        ) : (
          !chat.opened && <div className={styles.unread} />
        )}
      </div>
    </li>
  );
};

export default ChatItem;
