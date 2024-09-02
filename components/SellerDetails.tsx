"use client";
import styles from "./SellerDetails.module.scss";
import Button from "./Buttons";
import ReportAd from "./ReportAd";
import Avatar from "@/components/Avatars";
import Link from "next/link";
import Image from "next/image";

const socialMediaLogos = [
  {
    id: 1,
    app: "Facebook",
    icon: "/icons/white-facebook-logo.png",
  },
  {
    id: 2,
    app: "Instagram",
    icon: "/icons/white-instagram-logo.png",
  },
  {
    id: 3,
    app: "X",
    icon: "/icons/white-x-logo.png",
  },
  {
    id: 4,
    app: "Share",
    icon: "/icons/white-share-icon.png",
  },
];

const SellerDetails = () => {
  const report = false;
  return (
    <div className={styles.container}>
      {!report ? (
        <>
          <Avatar
            className={styles.avatar}
            avatar="/profilePic.jpg"
            isOnline={true}
            avatarSize="large"
          />
          <div className={styles.details}>
            <h3 className={styles.name}>Mandisa Msebenzi</h3>
            <p className={styles.phoneNumber}>087 562 454 747</p>
            <p className={styles.email}>Show Email</p>
          </div>
          <div className={styles.buttons}>
            <Button
              className={`${styles.button} ${styles.chatButton}`}
              buttonChildren="Chat"
              buttonType="normal"
              buttonSize="small"
              name="chat_btn"
              type="button"
              ariaLabel="Chat Button"
              autoFocus={false}
              disabled={false}
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
          </div>

          <div className={styles.socialMediaContainer}>
            {socialMediaLogos.map((app) => (
              <Button
              key={app.id}
                className={styles.app}
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
            ))}
          </div>
          <div className={styles.bottom}>

          <Link href="#">
            <h4 className={styles.showAll}>Show All Ads</h4>
          </Link>
          <Link href="#">
            <p className={styles.report}>!Report Ad</p>
          </Link>
          </div>
        </>
      ) : (
        <section className={styles.reportAdContainer}>
          <ReportAd />
        </section>
      )}
    </div>
  );
};

export default SellerDetails;
