"use client";
import styles from "./SellerDetails.module.scss";
import Button from "./Button";
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
  // const { setChats } = useMessageStore();

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
            children="Chat"
            buttonVariant="primary"
            buttonSize="small"


            ariaLabel="Chat Button"


            onClick={() => {}} // setChats(true)
          />
          <Button
            className={`${styles.button} ${styles.followButton}`}
            children="Follow"
            buttonVariant="normal"
            buttonSize="small"


            ariaLabel="Follow Button"


          />
          <Button
            className={`${styles.button} ${styles.storeButton}`}
            children="Shop"
            buttonVariant="normal"
            buttonSize="small"


            ariaLabel="Shop Button"


          />
        </div>

        <ul className={styles.socialMediaContainer}>
          {socialMediaLogos.map((app) => (
            <li key={app.id} className={styles.app}>
              <Button
                children={
                  <Image
                    src={app.icon}
                    alt={`${app.app} Icon`}
                    width={16}
                    height={16}
                  />
                }
                buttonVariant="icon"

                name={`${app.app.toLowerCase()}_icon`}

                ariaLabel={`${app.app} Icon`}


              />
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default SellerDetails;
