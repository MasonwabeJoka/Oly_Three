import styles from "./Avatar.module.scss";
import AvatarClient from "./AvatarClient";

interface AvatarProps {
  className?: string;
  avatar: any;
  imageAlt?: string;
  avatarSize: keyof typeof AVATAR_SIZE;
  isOnline?: boolean;
  outlineColour?: string;
  isVerified?: boolean;
}

const AVATAR_SIZE = {
  large: `${styles.large}`,
  regular: `${styles.regular}`,
  small: `${styles.small}`,
  tiny: `${styles.tiny}`,
};

const Avatar = ({
  className,
  avatar,
  imageAlt = "Avatar",
  avatarSize = "regular",
  isOnline = false,
  isVerified = false,
  outlineColour = "fff",
}: AvatarProps) => {
  return (
    <div
      className={`${avatarSize ? AVATAR_SIZE[avatarSize] : ""} ${className} ${styles.avatarsContainer}`}
      style={{ outline: `0.25rem solid ${outlineColour}` }}
    >
      <AvatarClient
        avatar={avatar}
        imageAlt={imageAlt}
        avatarSize={avatarSize}
        isOnline={isOnline}
        isVerified={isVerified}
      />
    </div>
  );
};

export default Avatar;