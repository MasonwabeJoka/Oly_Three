import styles from "./Chat.module.scss";
import Avatar from "@/components/Avatars";
import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import axios from "axios";
import { ChatType, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { FullChatType } from "../lib/types";
import useOtherUser from "../hooks/useOtherUser";
// import { User } from "@prisma/client";

type ChatProps = {
  avatar: string | null;
  avatarSize: "small" | "regular" | "large";
  name: string;
  messages: string[];
  message: string;
  createdAt: string;
  isOnline: boolean;
  selected?: boolean;
  chat: FullChatType;
};

const Chat: React.FC<ChatProps> = ({
  avatar,
  avatarSize,
  name,
  messages,
  message,
  createdAt,
  isOnline,
  selected,
  chat,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // to make sure that the current user is not listed among the contacts list in the list of chats.
  // other users comes form the useOtherHook that we created.
  // const otherUser = useOtherUser(chat);

  // const session = useSession();

  // const handleClick = useCallback(() => {
  //   // on click send to this router 
  //   router.push(`/chats/${chat.id}`);
  // }, [chat.id, router]);

  // // to fetch the last message sent in the conversation
  // const lastMessage = useMemo(()=> {
  //   const messages = chat.messages || []

  //   return messages[messages.length - 1]
  // }, [chat.messages])

  // // to fetch the user email
  // const userEmail = useMemo(()=> {
  //   return session.data?.user?.email;
  // }, [session.data?.user?.email])

  // // to check whether the user has seen the message or not
  // const hasSeen = useMemo(()=> {
  //   // if there is no last message the user obviously has not seen the message, so false is return.
  //   if(!lastMessage) {
  //     return false;
  //   }

  //   // we declare the seen array
  //   const seenArray = lastMessage.seen || []; // the empty array prevents the app from crashing in case there is no seenArray.

  //   // if there is not userEmail we return false because we need the userEmail to be loaded in order to see if it is part of the userArray.
  //   if(!userEmail) {
  //     return false
  //   }

  //   // make sure to return the current user by filtering out all the other users who have seen the message.
  //   // we use .length !== 0 to make sure a boolean is returned and that there is at least one user who has seen the message.
  //   return seenArray.filter((user)=> user.email === userEmail).length !== 0

  // }, [userEmail, lastMessage])

  // // to identify the last message text
  // const lastMessageText = useMemo(()=> {
  //   // check if the last message is image
  //   // If its an image we can not show any text to the user.
  //   if(lastMessage?.image) {
  //     return 'Sent an image'
  //   }


  //   // if there is a body it means there is text to display.
  //   if(lastMessage?.body) {
  //     return lastMessage.body
  //   }

  //   // if there is neither an image or text, it means the conversation has just started and there is not a single message sent yet.

  //   return "Start chatting"
  // }, [lastMessage])

  return (

    // <div className={styles.chat} onClick={handleClick}>
    <div className={styles.chat}>
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          // avatar={otherUser.image}
          avatar={avatar}
          avatarSize={avatarSize}
        />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.name}>
          {" "}
          {chat.name && chat.name.length > 20
            ? chat?.name?.slice(0, 20) + "..."
            : chat?.name || name.length > 15
              ? name.slice(0, 20) + "..."
              : name}
        </p>
        <p className={styles.message}>
          {message.length > 12 ? message.slice(0, 24) + "..." : message}{" "}
        </p>
      </div>
      <div className={styles.timeContainer}>
        <div className={styles.time}>{createdAt}</div>
        <p className={styles.messageCount}>
          {messages.length > 10 ? "9+" : messages.length}
        </p>
      </div>
    </div>
  );
};

export default Chat;
