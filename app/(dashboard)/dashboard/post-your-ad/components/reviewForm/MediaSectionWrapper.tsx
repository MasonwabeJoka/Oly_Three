import styles from "./MediaSectionWrapper.module.scss";
import Button from "@/components/Buttons";
type SectionWrapperProps = {
  title: string;
  children: React.ReactNode;
};
export const MediaSectionWrapper = ({ title, children }: SectionWrapperProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.childrenContainer}>
        <div className={styles.children}>{children}</div>
        <Button
          className={styles.editButton}
          buttonChildren="Edit"
          buttonType="normal"
          buttonSize="medium"
          name="edit-btn"
          type="button"
          ariaLabel="Edit Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
};
