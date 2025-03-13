'use client';
import useIsMobileStore from "@/store/useMobileStore";
import styles from "./HomeButton.module.scss";
import Image from "next/image";
import Link from "next/link";
const HomeButton = () => {
    const isMobile = useIsMobileStore((state) => state.isMobile);

  return (
    <div className={styles.container}>
      {" "}
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={isMobile ? 61.372 : 70.14}
          height={isMobile ? 28 : 32}
        />
      </Link>
    </div>
  );
};

export default HomeButton;
