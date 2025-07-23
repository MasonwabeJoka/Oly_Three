import styles from "./Chat.module.scss";

import useMessageStore, {
  Message,
  MessageContent,
} from "../store/useMessageStore";
import ExitButton from "@/components/ExitButton";
import ChatBubble from "./ChatBubble";
import TextInputBar from "@/components/TextInputBar";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Chat = () => {
  const { 
    messages, 
    selectedChat, 
    handleSendMessage, 
    userMessages, 
    setChats,
    isLoading,
    isInitialized,
    initializeMessages
  } = useMessageStore();
  
  // Initialize messages on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeMessages();
    }
  }, [isInitialized, initializeMessages]);
  
  const shouldShowAvatar = (
    index: number,
    msg: MessageContent,
    allMessages: MessageContent[]
  ): boolean => {
    if (index === 0) return true;
    const prevMsg = allMessages[index - 1];
    return prevMsg.senderType !== msg.senderType;
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.exitButtonContainer}
        onClick={() => setChats(false)}
        onKeyDown={(e) => e.key === "Enter" && setChats(false)}
        role="button"
        tabIndex={0}
        aria-label="Close chat"
      >
        <ExitButton />
      </div>
      <ul className={styles.mainSectionWrapper} aria-live="polite">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          messages
            .filter((message: Message) => message.id === selectedChat?.id)
            .map((message: Message) => {
              const allMessages: MessageContent[] = [
                ...message.messages,
                ...userMessages,
              ];
              return (
                <li key={message.name}>
                  {allMessages.map((msg: MessageContent, index: number) => (
                    <ChatBubble
                      key={`${msg.text}-${index}`}
                      contactName={message.contactName}
                      message={msg.text}
                      profilePicture={
                        msg.senderType === "contact"
                          ? message.profilePicture
                          : "/profilePic.jpg"
                      }
                      time={msg.time}
                      isContact={msg.senderType === "contact"}
                      showAvatar={shouldShowAvatar(index, msg, allMessages)}
                    />
                  ))}
                </li>
              );
            })
        )}
      </ul>
      <div className={styles.bottomSection}>
        <div className={styles.typingArea}>
          <div className={styles.textInputContainer}>
            <TextInputBar
              id="textInput"
              name="textInput"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                console.log(e.target.value)
              }
              onSubmit={(e: React.FormEvent<HTMLTextAreaElement>) =>
                handleSendMessage(e.currentTarget.value)
              }
              className={styles.textInput}
              placeholder="Type a message"
              ariaLabel="Type and send a message"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
