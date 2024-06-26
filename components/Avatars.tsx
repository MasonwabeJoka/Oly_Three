'use client'
import React, { useState } from "react";
import styles from "./Avatars.module.scss";
import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProps {
  className: string;
  avatar: any;
  avatarSize: keyof typeof AVATAR_SIZE;
}

const AVATAR_SIZE = {
  large: `${styles.large}`,
  regular: `${styles.regular}`,
  small: `${styles.small}`,
};

const Avatar: React.FC<AvatarProps> = ({
  className,
  avatar,
  avatarSize = "regular",
}) => {
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
    >
  
    </div>
  );

  return (
    <div
      className={`${avatarSize ? AVATAR_SIZE[avatarSize] : ""} ${className} ${styles.avatarsContainer}`}
    >
      {!hasError && avatar ? (
        <Image
          src={avatar}
          alt="Avatar"
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

      <span
      className={styles.isOnline}
      />
    </div>
  );
};

export default Avatar;
