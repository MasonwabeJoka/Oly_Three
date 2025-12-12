'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./ExitButton.module.scss";
import Icon from "./Icon";

const BackButton = () => {
    const router = useRouter();

    useEffect(() => {
        const path = window.location.pathname;
        if (!path.includes('/login') && !path.includes('/signup')) {
            sessionStorage.setItem('lastNonAuthPage', path);
        }
    }, []);

    const handleBack = () => {
        const lastPage = sessionStorage.getItem('lastNonAuthPage');
        if (lastPage && lastPage !== window.location.pathname) {
            router.push(lastPage);
        } else {
            router.push('/');
        }
    };
    
  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      aria-label="Close chat"
      onClick={handleBack}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleBack();
        }
      }}
    >
      <Icon src="/icons/left-arrow.png" alt="Close chat icon" width={20} height={20} />
    </div>
  );
};

export default BackButton;