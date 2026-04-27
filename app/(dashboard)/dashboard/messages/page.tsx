import styles from './styles.module.scss'
import Messages from "@/features/messages/components/Messages";

const MessagesPage = () => {
  return (
    <div className={styles.container}>
     

        <Messages />
     
    </div>
  );
};

export default MessagesPage;
