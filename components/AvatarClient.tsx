"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Avatar.module.scss";

interface AvatarClientProps {
  avatar: any;
  imageAlt: string;
  avatarSize: keyof typeof AVATAR_SIZE;
  isOnline: boolean;
  isVerified: boolean;
  isBusiness?: boolean;
}

const AVATAR_SIZE = {
  large: `${styles.large}`,
  regular: `${styles.regular}`,
  small: `${styles.small}`,
  tiny: `${styles.tiny}`,
};

const AvatarClient = ({
  avatar,
  imageAlt,
  avatarSize,
  isOnline,
  isVerified,
  isBusiness,
}: AvatarClientProps) => {
  const [hasError, setHasError] = useState(false);

  // Placeholder component
  const Placeholder = () => (
    <div
      className={AVATAR_SIZE[avatarSize]}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.041)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.8rem",
        lineHeight: "0.8rem",
        textAlign: "center",
      }}
    ></div>
  );

  return (
    <>
      {!hasError && avatar ? (
        <Image
          src={avatar}
          alt={imageAlt}
          fill={true}
          sizes="(max-width: 768px) 100vw"
          style={{ width: "100%", objectFit: "cover", borderRadius: "50%" }}
          onError={() => setHasError(true)}
        />
      ) : !hasError && !avatar ? (
        <div></div>
      ) : (
        <Placeholder />
      )}

      {isOnline && <span className={styles.isOnline} />}
      {isVerified && (
        <div className={styles.isVerified}>
          <Image
            className={styles.isVerified}
            src="/verified.png"
            alt="Verified"
            width={22}
            height={22}
          />
        </div>
      )}
      {isVerified && isBusiness && (
        <div className={styles.isVerified}>
          <Image
            className={styles.isVerified}
            src="/business-verified.png"
            alt="Verified"
            width={22}
            height={22}
          />
        </div>
      )}
    </>
  );
};

export default AvatarClient;
