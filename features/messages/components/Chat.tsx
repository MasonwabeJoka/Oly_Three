"use client";

import styles from "./Chat.module.scss";
import { Chat as ChatType, MessageContent } from "../store/useMessageStore";
import useMessageStore from "../store/useMessageStore";
import { useEffect, useRef, useState } from "react";
import ExitButton from "@/components/ExitButton";
import ChatBubble from "./ChatBubble";
import TextInputBar from "@/components/TextInputBar";
import TypingIndicator from "./TypingIndicator";
import { useRouter } from "next/navigation";

type Props = {
  chat: ChatType;
  chatId: number;
};

const Chat = ({ chat, chatId }: Props) => {
  const router = useRouter();
  const sendMessage = useMessageStore((state) => state.sendMessage);
  const isTyping = useMessageStore((state) => state.isTyping);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, isTyping]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text, chatId);
    setText("");
  };

  const shouldShowAvatar = (
    index: number,
    msg: MessageContent,
    allMessages: MessageContent[],
  ): boolean => {
    if (index === 0) return true;
    const prevMsg = allMessages[index - 1];
    return prevMsg.senderType !== msg.senderType;
  };

  return (
    <div className={styles.container}>

      <div className={styles.mainSectionWrapper}>
        <div className={styles.messages}>
          {chat.messages.map((msg, index) => {
            const isUser = msg.senderType === "user";

            return (
              <div
                key={index}
                className={`${styles.message} ${
                  isUser ? styles.user : styles.contact
                }`}
              >
                <ChatBubble
                  contactName={chat.contact.name}
                  message={msg.text}
                  profilePicture={
                    msg.senderType === "contact"
                      ? chat.contact.avatar
                      : "/profilePic.jpg"
                  }
                  time={msg.time}
                  isContact={msg.senderType === "contact"}
                  showAvatar={shouldShowAvatar(index, msg, chat.messages)}
                  status={msg.status}
                />
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        {isTyping && (
          <div className={`${styles.message} ${styles.contact}`}>
            <TypingIndicator />
          </div>
        )}
      </div>

      <div className={styles.textInputContainer}>
        <TextInputBar
          id="textInput"
          name="textInput"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          onSubmit={() => handleSend()}
          containerClassName={styles.textInput}
          placeholder="Type a message"
          ariaLabel="Type and send a message"
          clearOnSubmit
          className={styles.textInputBar}
        />
      </div>
    </div>
  );
};

export default Chat;
