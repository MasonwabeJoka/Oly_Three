"use client";
import styles from "./ChatFeed.module.scss";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import TypingArea from "./TypingArea";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];

  const showReadReceipts = (message, isMyMessage) => {
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className={styles.readReceipts}
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages ? messages : "");
    if (!messages || Object.keys(messages).length === 0) {
      return <p>No messages</p>;
    }

    return keys.map((id, index) => {
      const message = messages[id];
      const lastMessageId = index === 0 ? 0 : keys[index - 1];
      const myMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`}>
          {myMessage ? (
            <MyMessage message={message} />
          ) : (
            <TheirMessage
              message={message}
              lastMessage={messages[lastMessageId]}
            />
          )}
          <div
            className={styles.messageRead}
            style={{
              marginRight: myMessage ? "18px" : "0px",
              marginLeft: myMessage ? "0px" : "68px",
            }}
          >
            {showReadReceipts(message, myMessage)}
          </div>
        </div>
      );
    });
  };

  renderMessages();

  if (!chat) return "Loading...";

  return (
    <div className={styles.mainSection}>
      <div className={styles.mainSectionWrapper}>
        <h4 className={styles.userName}>
          {chat.people.map((contact) => `${contact.person.username}`)}
        </h4>

        {renderMessages()}

        <div style={{ height: `100px` }} />
        <div className={styles.bottomSection}>
          <div className={styles.typingArea}>
            <div className={styles.textInputContainer}>
              <TypingArea {...props} chatId={activeChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFeed;
