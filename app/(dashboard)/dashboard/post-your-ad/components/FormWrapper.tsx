import styles from "./FormWrapper.module.scss";
type FormWrapperProps = {

  children: React.ReactNode;
};
export const FormWrapper = ({children }: FormWrapperProps) => {
  return (
    <div className={styles.container}>
   
      <div className={styles.children}>{children}</div>
    </div>
  );
};
