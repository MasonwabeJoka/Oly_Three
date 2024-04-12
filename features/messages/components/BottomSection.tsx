import styles from "@/features/messages/components/BottomSection.module.scss";
import TypingArea from "./TypingArea";
const BottomSection = () => {
    return (
      <div className={styles.bottomSection}>
        <div className={styles.typingArea}>
          <div className={styles.textInputContainer}>
            <TypingArea />
          </div>
        </div>
      </div>
    );
  };
  
  export default BottomSection;