import styles from "./UserButtonCustom.module.scss";
import { useModalStore } from "@/store/modalStore";
import { useUser } from "@clerk/nextjs";
import Icon from "../Icon";
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
    <div className={styles.container}>
      <Button
        className={styles.profile}
        buttonChildren={
          <div
            style={{
              height: "34px",
              width: "34px",
              borderRadius: "50%",
              outline: "3px solid #ffffff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              className={styles.profileImage}
              src={user?.imageUrl || ""}
              alt="Profile Icon"
              fill
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        }
        buttonType="icon"
        buttonSize=""
        name="profile-icon"
        type="button"
        ariaLabel="Profile Icon"
        autoFocus={false}
        disabled={false}
        onClick={() => setShowNotificationsModal(true)}
      />
    </div>
  );
};

export default UserButton;
