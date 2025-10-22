import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const PageHeader = ({ children, className }: PageHeaderProps) => {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <h1 className={styles.title}>{children}</h1>
    </header>
  );
};
