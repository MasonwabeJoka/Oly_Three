"use client";
import styles from "./MessagesSidebar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import { messages } from "@/data/MessagesData";
import { useState } from "react";
import useRoutes from "../../../hooks/useDashboardMenus";
import { User } from "@prisma/client";
import Avatar from "@/components/Avatars";

interface MessagesSidebarProps {
  currentUser: User;
  users: User[];
}

const MessagesSidebar: React.FC<MessagesSidebarProps> = ({
  currentUser,
  users,
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

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
        {messages[1].slice(0, 6).map((message: any) => {
          return (
            <div className={styles.chat} key={message.id}>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={currentUser?.image}
                  avatarSize="regular"
                />
              </div>
              <div className={styles.textContainer}>
                <p className={styles.name}>
                  {message.name.length > 15
                    ? message.name.slice(0, 20) + "..."
                    : message.name}
                </p>
                <p className={styles.message}>
                  {message.messages[0].length > 12
                    ? message.messages[0].slice(0, 24) + "..."
                    : message.messages[0]}
                </p>
              </div>
              <div className={styles.timeContainer}>
                <div className={styles.timeSideSection}>
                  {message.createdAt}
                </div>
                <p
                  className={styles.messageCount}
                  style={
                    message.messages.length > 9
                      ? {
                          width: "0",
                          height: "1rem",
                          borderRadius: "0.5rem",
                          padding: "0 0.7rem 0 0.7rem",
                        }
                      : {
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "50%",
                          padding: "0",
                        }
                  }
                >
                  {message.messages.length > 10
                    ? "9+"
                    : message.messages.length}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Link href="#" className={styles.contactsLink}>
        <Image
          src="/icons/contacts.png"
          alt="contacts"
          width={32}
          height={32}
        />
        <h4 className={styles.contactsTex}>Contacts</h4>
      </Link>
    </div>
  );
};

export default MessagesSidebar;
