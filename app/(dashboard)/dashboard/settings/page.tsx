import LinkCard from "@/components/cards/LinkCard";
import styles from "./styles.module.scss";
import Button from "@/components/Buttons";
import Link from "next/link";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Settings</h4>
      <div className={styles.cards}>
        <Link
          href="/dashboard/settings/profile-settings"
          className={styles.card}
        >
          <LinkCard
            image="/bear.jpg"
            label="Profile Settings"
            cardSize="large"
          />
        </Link>
        <Link
          href="/dashboard/settings/password-settings"
          className={styles.card}
        >
          <LinkCard
            image="/bear.jpg"
            label="Password Settings"
            cardSize="large"
          />
        </Link>

        <Link href="/dashboard/settings/preferences" className={styles.card}>
          <LinkCard image="/bear.jpg" label="My Preferences" cardSize="large" />
        </Link>

        <Link
          href="/dashboard/settings/account-verification"
          className={styles.card}
        >
          <LinkCard
            image="/bear.jpg"
            label="Account Verification"
            cardSize="large"
          />
        </Link>
      </div>

      <Button
        className={styles.deleteButton}
        buttonChildren="Delete Account"
        buttonType="link"
        buttonSize=""
        name="delete-btn"
        type="button"
        ariaLabel="Delete Button"
        autoFocus={false}
        disabled={false}
      />
    </div>
  );
};

export default Settings;
