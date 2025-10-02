"use client";
import styles from "./SellerDetails.module.scss";
import Button from "./Buttons";
import Avatar from "@/components/Avatar";
import Image from "@/components/Image";
import useMessageStore from "@/features/messages/store/useMessageStore";

const socialMediaLogos = [
  {
    id: 1,
    app: "Facebook",
    icon: "/icons/social-media/facebook.png",
  },
  {
    id: 2,
    app: "Instagram",
    icon: "/icons/social-media/instagram.png",
  },
  {
    id: 3,
    app: "X",
    icon: "/icons/social-media/twitter.png",
  },
  {
    id: 4,
    app: "Share",
    icon: "/icons/social-media/youtube.png",
  },
];

const SellerDetails = () => {
  const { setChats } = useMessageStore();

  return (
    <div className={styles.container}>
      <>
        <div className={styles.profileSection}>
          <Avatar
            className={styles.avatar}
            avatar="/profilePic.jpg"
            isOnline={true}
            avatarSize="large"
          />
          <div className={styles.details}>
            <p className={styles.name}>Mandisa Msebenzi</p>
            <p className={styles.phoneNumber}>087 562 454 747</p>
            {/* <p className={styles.email}>Show Email</p> */}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            className={`${styles.button} ${styles.chatButton}`}
            buttonChildren="Chat"
            buttonType="primary"
            buttonSize="small"
            name="chat_btn"
            type="button"
            ariaLabel="Chat Button"
            autoFocus={false}
            disabled={false}
            onClick={() => setChats(true)}
          />
          <Button
            className={`${styles.button} ${styles.followButton}`}
            buttonChildren="Follow"
            buttonType="normal"
            buttonSize="small"
            name="follow_btn"
            type="button"
            ariaLabel="Follow Button"
            autoFocus={false}
            disabled={false}
          />
          <Button
            className={`${styles.button} ${styles.storeButton}`}
            buttonChildren="Shop"
            buttonType="normal"
            buttonSize="small"
            name="shop_btn"
            type="button"
            ariaLabel="Shop Button"
            autoFocus={false}
            disabled={false}
          />
        </div>

        <ul className={styles.socialMediaContainer}>
          {socialMediaLogos.map((app) => (
            <li key={app.id} className={styles.app}>
              <Button
                buttonChildren={
                  <Image
                    src={app.icon}
                    alt={`${app.app} Icon`}
                    width={16}
                    height={16}
                  />
                }
                buttonType="icon"
                buttonSize=""
                name={`${app.app.toLowerCase()}_icon`}
                type="button"
                ariaLabel={`${app.app} Icon`}
                autoFocus={false}
                disabled={false}
              />
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default SellerDetails;
