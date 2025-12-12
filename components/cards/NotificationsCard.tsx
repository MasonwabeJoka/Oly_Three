"use client";
import styles from "./NotificationsCard.module.scss";
import Button from "@/components/Buttons";
import Avatar from "@/components/Avatar";
import Image from "@/components/Image";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";
import { useState } from "react";
import Icon from "../Icon";

type NotificationProps = {
  avatar: string;
  image: string;
  isOnline: boolean;
  isRead: boolean;
  notificationType: string;
  message: string;
  messageBody: string;
  name: string;
  time: string;
  buttons: string[];
  buttonLinks: string[];
};

const NotificationsCard = ({
  avatar,
  image,
  isOnline,
  isRead,
  notificationType,
  message,
  messageBody,
  name,
  time,
  buttons,
  buttonLinks,
}: NotificationProps) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className={styles.container}>
      
      <section
        className={styles.mainSection}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <div className={styles.isRead} />
        <div className={styles.avatar}>
          <Avatar
            className={styles.avatar}
            avatar={avatar}
            avatarSize="regular"
            isOnline={isOnline}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.notificationType}>{notificationType}</p>
          <div className={styles.message}>
            <p className={styles.title}>
              <span className={styles.name}>{name}</span> liked{" "}
              <span className={styles.restOfTitle}>{message}</span>
            </p>
            <p className={styles.body}>{messageBody}</p>
          </div>
          <p className={styles.time}>5 minutes ago</p>
        </div>
        <div className={styles.image}>
          <Image src={image} alt="Ad" width={100} height={100} />
        </div>
        <div className={styles.checkContainer}>
          <Checkbox
            className={styles.checkbox}
            id="1"
            isFeed={false}
            checkedColour="#14d6ff"
            hoverColour="#ffff"
            checkedHovered="#ccf6ff"
          />
        </div>
        <div className={styles.deleteButton}>
        <Icon
          className={styles.X}
          src="/icons/X.png"
          alt="X"
          width={10}
          height={10}
        />
      </div>
      </section>
      {showButtons && (
        <section
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          <ul className={styles.buttonsSection}>

          {buttons?.map((button: string, index: number) =>
            buttonLinks ? (
              <li
                key={index}
                className={`${styles.buttonContainer} ${
                  buttons[0] === button && styles.firstButtonContainer
                }`}
              >
                <Link href={buttonLinks[index]}>
                  <Button
                    className={`${styles.button} ${
                      buttons[0] === button && styles.firstButton
                    }`}
                    buttonChildren={button}
                    buttonType="normal"
                    buttonSize="medium"
                    name="take-action"
                    type="button"
                    ariaLabel="Take Action Button"
                    autoFocus={false}
                    disabled={false}
                    dashboard
                  />
                </Link>
              </li>
            ) : null
          )}
          
          </ul>
        </section>
      )}
    </div>
  );
};

export default NotificationsCard;
