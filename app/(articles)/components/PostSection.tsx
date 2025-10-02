import ExitButton from "@/components/ExitButton";
import styles from "./PostSection.module.scss";
import Comment from "@/components/Comment";
import ProfileSidebar from "./ProfileSidebar";

interface PostSectionProps {}

const sampleProfile = {
  avatarUrl: '/profilePic.jpg', 
  username: 'Tyler Shukert',
  handle: 'dshukertjr',
  bio: 'DevRel engineer @supabase.\nFollow for Supabase tips!',
  location: 'Tokyo, Japan',
  website: 'supabase.com',
  joinDate: 'November 2012',
  following: 99,
  followers: 16_000,
};

const PostSection = ({}: PostSectionProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.exitButton}>
        <ExitButton />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.profileSectionContainer}>
          <ProfileSidebar profile={sampleProfile} />
        </div>

        <div className={styles.postsSection}>
          <Comment isPostOpen />
        </div>
        <div className={styles.rightSideBar}>
        </div>
      </div>
    </div>
  );
};

export default PostSection;
