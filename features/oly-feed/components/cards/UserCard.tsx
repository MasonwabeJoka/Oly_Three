"use client";
import styles from "./UserCard.module.scss";
import Button from "@/components/Buttons";
import Avatar from "@/components/Avatars";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  image: string;
  personType: string;
}

const UserCard = ({ id, name, username, image, personType }: Props) => {
  const router = useRouter();
  return (
    <article className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar
          className="avatar"
          avatar={image}
          imageAlt="logo"
          avatarSize="largeDesktop"
          priority
        />
      </div>
      <div className={styles.nameContainer}>
        <h4 className={styles.name}>{name.length > 9 ? name : name + "..."}</h4>
        <p className={styles.username}>@{username}</p>
      </div>
      <Button
        className={styles.viewButton}
        buttonChildren="view"
        buttonType="normal"
        buttonSize="small"
        name="view-btn"
        type="button"
        ariaLabel="View Button"
        autoFocus={false}
        disabled={false}
        onClick={() => router.push(`/oly-feed/profile/${id}`)}
      />
    </article>
  );
};

export default UserCard;
