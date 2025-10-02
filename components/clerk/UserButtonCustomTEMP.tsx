import styles from "./UserButtonCustom.module.scss";
import { useNotificationsModalStore } from "@/store/modalStore";
import { useUser } from "@clerk/nextjs";
import Icon from "../Icon";
import Image from "@/components/Image";
import Button from "../Buttons";

const UserButton = () => {
  const setShowModal = useNotificationsModalStore(
    (state) => state.setShowModal
  );
  const setShowMenuModal = useNotificationsModalStore(
    (state) => state.setShowModal
  );
  const { user } = useUser();
  return (
    <div className={styles.container}>
      <Button
        className={styles.profile}
        buttonChildren={
          <div
            style={{
              height: "32px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              className=""
              src={user?.imageUrl || ""}
              alt="Profile Icon"
              width={32}
              height={32}
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
        onClick={() => setShowModal(true)}
      />
    </div>
  );
};

export default UserButton;
