import styles from "./UserButtonCustom.module.scss";
import { useModalStore } from "@/store/modalStore";
import { useUser } from "@clerk/nextjs";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";
import Image from "next/image";
import Button from "../Buttons";

const UserButton = () => {
  const showMenuModal = useModalStore((state) => state.showModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  const { user } = useUser();
  return (
    <div className={styles.container} onClick={() => setShowMenuModal(true)}>
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
