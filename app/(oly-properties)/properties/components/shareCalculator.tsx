import Image from "next/image";
import styles from "./shareCalculator.module.scss";
import Link from "next/link";

const shareData = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com",
    icon: "/icons/social-media/facebook.png",
  },
  {
    id: "x",
    name: "X",
    url: "https://www.x.com",
    icon: "/icons/social-media/twitter.png",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com",
    icon: "/icons/social-media/instagram.png",
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    icon: "/icons/social-media/linkedin.png",
  },
  {
    id: "email",
    name: "Email",
    url: "https://www.youtube.com",
    icon: "/icons/email.png",
  },
];

const ShareCalculator = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Share this calculator</p>
        <div className={styles.icons}>
          {shareData.map((data) => (
            <Link
              key={data.id}
              href={data.url}
              className={`${styles.iconContainer} ${styles[data.id]}`}
            >
              <Image
                src={data.icon}
                alt={`${data.name} Icon`}
                width={16}
                height={16}
                className={styles.icon}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ShareCalculator;
