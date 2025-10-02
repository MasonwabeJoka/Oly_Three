import React from 'react';
import styles from './ProfileSection.module.scss';
import Image from 'next/image';

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

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.background}>
        {/* Placeholder for background image; can be customized */}
        <div className={styles.backgroundOverlay}></div>
      </div>
      <div className={styles.profileContent}>
        <Image
          src={profile.avatarUrl}
          alt={`${profile.username}'s avatar`}
          width={120}
          height={120}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h1 className={styles.username}>{profile.username}</h1>
          <span className={styles.handle}>@{profile.handle}</span>
          <p className={styles.bio}>{profile.bio}</p>
          <div class={styles.details}>
            {profile.location && <span className={styles.detail}>{profile.location}</span>}
            {profile.website && <a href={profile.website} className={styles.detail}>{profile.website}</a>}
            <span className={styles.detail}>Joined {profile.joinDate}</span>
          </div>
          <div className={styles.stats}>
            <span className={styles.stat}><strong>Following</strong> {profile.following}</span>
            <span className={styles.stat}><strong>Followers</strong> {profile.followers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;