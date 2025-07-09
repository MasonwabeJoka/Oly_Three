import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import styles from "./ChatList.module.scss";
import { Message } from "../store/useMessageStore";
import useMessageStore from "../store/useMessageStore";

const ChatList: React.FC = () => {
  const { messages, setSelectedChat, setChats, setUserMessages } =
    useMessageStore();

  const handleChatClick = (message: Message): void => {
    setSelectedChat(message);
    setChats(true);
    // Load userMessages for this chat from localStorage or initialize empty
    const savedUserMessages = localStorage.getItem(
      `userMessages_${message.id}`
    );
    setUserMessages(savedUserMessages ? JSON.parse(savedUserMessages) : []);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    message: Message
  ): void => {
    if (event.key === "Enter" || event.key === " ") {
      handleChatClick(message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerDiv} style={{ height: "96px" }}></div>
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
        />
      </div>
      <div className={styles.chats} role="list" aria-label="Recent chats">
        {messages.map((message: Message) => (
          <div
            className={styles.chat}
            key={message.id}
            onClick={() => handleChatClick(message)}
            onKeyDown={(e) => handleKeyDown(e, message)}
            role="button"
            tabIndex={0}
            aria-label={`Open chat with ${message.name}`}
          >
            <div className={styles.avatarContainer}>
              <Avatar
                className={styles.avatar}
                avatar={message.profilePicture}
                avatarSize="regular"
                imageAlt={`${message.name}'s profile picture`}
              />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.name}>
                {message.name.length > 15
                  ? message.name.slice(0, 15) + "..."
                  : message.name}
              </p>
              <p className={styles.message}>
                {message.messages[0].text.length > 48
                  ? message.messages[0].text.slice(0, 48) + "..."
                  : message.messages[0].text}
              </p>
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.time}>{message.createdAt}</div>
              <p
                className={styles.messageCount}
                style={
                  message.messages.length > 9
                    ? {
                        width: "auto",
                        height: "1rem",
                        borderRadius: "0.5rem",
                        padding: "0 0.7rem",
                      }
                    : {
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "50%",
                        padding: "0",
                      }
                }
              >
                {message.messages.length > 10 ? "9+" : message.messages.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
