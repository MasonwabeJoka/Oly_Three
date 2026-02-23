import Avatar from "@/components/Avatar";
import styles from "./ProfileSidebar.module.scss";

interface UserProfile {
  avatarUrl: string;
  username: string;
  handle: string;
  bio: string;
  location?: string;
  website?: string;
  joinDate: string;
  following: number;
  followers: number;
}
interface ProfileSidebarProps {
  profile: UserProfile;
}

const ProfileSidebar = ({ profile }: ProfileSidebarProps) => {
  const {
    username,
    handle,
    bio,
    location,
    website,
    joinDate,
    following,
    followers,
  } = profile;
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar avatar="/profilePic.jpg" avatarSize="large" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.nameSection}>
          <h1 className={styles.username}>{username}</h1>
          <span className={styles.handle}>@{handle}</span>
        </div>
        <p className={styles.bio}>{bio}</p>
        <div className={styles.locationSection}>
          {location && (
            <div className={styles.location}>
              <i className="fa-solid fa-location-dot"></i>
              <span>{location}</span>
            </div>
          )}
          {website && (
            <div className={styles.website}>
              <i className="fa-solid fa-link"></i>
              <span>{website}</span>
            </div>
          )}
        </div>
      <div className={styles.bottomSection}>
          <div className={styles.joinDate}>
          <i className="fa-solid fa-calendar-days"></i>
          <span>Joined {joinDate}</span>
        </div>
        <div className={styles.following}>
          <span>
            <span className={styles.followingCount}>{following}</span> Following
          </span>
          <span>
            <span className={styles.followersCount}>{followers}</span> Followers
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
