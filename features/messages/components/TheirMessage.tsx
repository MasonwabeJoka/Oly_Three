import styles from "./TheirMessage.module.scss";
import Avatar from "@/components/Avatars";
import { extractText } from "@/lib/utils";
import Image from "next/image";

const TheirMessage = ({ lastMessage, message }) => {
  // Check if this is the contacts's first message
  const isFirstMessageByContact =
    !lastMessage || lastMessage.sender.username !== message.sender.username;
  return (
    <>
      <div className={styles.theirMessageContainer}>
        {/*If this is the first message by the contact we render the avatar*/}
        {isFirstMessageByContact && (
          <div className={styles.avatarContainer}>
            <Avatar
              className={styles.avatar}
              avatar={`${message?.sender?.avatar}`}
              avatarSize="regular"
              imageAlt="Profile Picture"
            />
            <div className={styles.contactTime}>10:00</div>
          </div>
        )}

        {message?.attachments?.length > 0 ? (
          <div className={styles.chatBubblesWrapper}>
            <div className={styles.bubbleWidthSetter}>
              <div className={styles.theirMessage}>
                <Image
                  src={message.attachments[0].file}
                  alt="message-attachment"
                  className="message-image"
                  style={{ float: "right" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className={styles.chatBubblesWrapper}
              style={{ float: "left" }}
            >
              <div className={styles.bubbleWidthSetter}>
                <p className={styles.theirMessage}>
                  {extractText(message.text)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TheirMessage;
