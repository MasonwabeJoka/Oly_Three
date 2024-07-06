"use client";
import styles from "./MessagesSidebar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import { User } from "@prisma/client";
import Avatar from "@/components/Avatars";
import Chats from "./Chats";
import { messages } from "@/data/MessagesData";
import { users } from "@/app/temp/tempForMessages";
import { currentUser } from "@/app/temp/tempForMessages";
interface MessagesSidebarProps {
  // currentUser: User;
  // users: User[];
}

const MessagesSidebar: React.FC<MessagesSidebarProps> = (
  {
    // currentUser,
    // users,
  }
) => {
  const initialChats = [];
  return (
    <div className={styles.container}>
      <div className={styles.recentChats}>
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
            placeholder=""
            id="search-bar"
            name="search-bar"
            ariaLabel="Search"
            autoFocus={false}
            required={false}
          />
        </div>
        <Chats
          users={messages}
          currentUser={currentUser}
          initialChats={initialChats}
        />
      </div>
      <Link href="/dashboard/messages/contacts" className={styles.contactsLink}>
        <Image
          src="/icons/contacts.png"
          alt="contacts"
          width={32}
          height={32}
        />
        <h4 className={styles.contactsText}>Contacts</h4>
      </Link>
    </div>
  );
};

export default MessagesSidebar;
