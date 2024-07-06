import styles from "./UserButtonCustom.module.scss";
import { useModalStore } from "@/store/modalStore";
import { useUser } from "@clerk/nextjs";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatars";
import Image from "next/image";
import Button from "../Buttons";

const UserButton = () => {
  const showNotificationsModal = useModalStore(
    (state) => state.showNotificationsModal
  );
  const setShowNotificationsModal = useModalStore(
    (state) => state.setShowNotificationsModal
  );
  const { user } = useUser();
  return (
    <div
      className={styles.container}
      onClick={() => setShowNotificationsModal(true)}
    >
      <Avatar
        className={styles.profile}
        avatar={user?.imageUrl || ""}
        avatarSize="regular"
        isOnline={false}
      />
    </div>
  );
};

export default UserButton;
