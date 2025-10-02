import styles from "./ChatBubble.module.scss";
import Avatar from "@/components/Avatar";

interface ChatBubbleProps {
  isContact: boolean;
  message: string;
  contactName: string;
  profilePicture: string;
  time: string;
  showAvatar: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  isContact,
  message,
  contactName,
  profilePicture,
  time,
  showAvatar,
}) => {
  return (
    <div
      className={
        isContact
          ? styles.contactChatBubbleContainer
          : styles.userChatBubbleContainer
      }
    >
      {isContact && showAvatar && (
        <div className={styles.avatarContainer}>
          <Avatar
            className={styles.avatar}
            avatar={profilePicture}
            avatarSize="regular"
            imageAlt={`${contactName}'s Profile Picture`}
          />
          <div className={styles.contactTime}>{time}</div>
        </div>
      )}
      <div
        className={styles.chatBubblesWrapper}
        style={{
          marginLeft: !showAvatar && isContact ? "76px" : undefined,
          marginRight: !showAvatar && !isContact ? "48px" : undefined,
        }}
      >
        <div className={styles.bubbleWidthSetter}>
          <div
            className={
              isContact ? styles.contactChatBubble : styles.userChatBubble
            }
            style={isContact ? { textAlign: "left" } : { textAlign: "right" }}
          >
            {isContact && showAvatar && (
              <p className={styles.contactName}>{contactName}</p>
            )}
            {!isContact && showAvatar && <p className={styles.userName}>Me</p>}
            <p style={{ marginTop: !showAvatar ? "8px" : undefined }}>
              {message}
            </p>
          </div>
        </div>
      </div>
      {!isContact && showAvatar && (
        <div className={styles.avatarContainer}>
          <Avatar
            className={styles.avatar}
            avatar={profilePicture}
            avatarSize="regular"
            imageAlt="Your Profile Picture"
          />
          <div className={styles.contactTime}>{time}</div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
