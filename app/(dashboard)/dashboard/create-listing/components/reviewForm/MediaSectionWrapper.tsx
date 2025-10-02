import styles from "./MediaSectionWrapper.module.scss";

type SectionWrapperProps = {
  title: string;
  children: React.ReactNode;
};
export const MediaSectionWrapper = ({
  title,
  children,
}: SectionWrapperProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.childrenContainer}>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
