import styles from "./MyMessage.module.scss";
import Avatar from "@/components/Avatars";
import Image from "next/image";
import { extractText } from "@/lib/utils"

const MyMessage = ({ message }: { message: any }) => {
 

  if (message?.attachments?.length > 0) {
    // if image attachment is greater than zero that means the message is an image
    return (
      <div className={styles.myMessageContainer}>
        <div className={styles.chatBubblesWrapper}>
          <div className={styles.bubbleWidthSetter}>
            <div className={styles.myMessage}>
              <div className={styles.userTime}>11:00</div>
              <Image
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: "right" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.myMessageContainer} style={{ float: "right" }}>
      <div className={styles.chatBubblesWrapper}>
        <div className={styles.bubbleWidthSetter}>
          <div className={styles.myMessage}>
            <div className={styles.userTime}>11:00</div>

            {extractText(message.text)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
