"use client";
import useIsMobileStore from "@/store/useMobileStore";
import styles from "./HomeButton.module.scss";
import Image from "@/components/Image";
import Link from "next/link";

interface HomeButtonProps {
  path?: string;
}
const HomeButton = ({ path = "/" }: HomeButtonProps) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);

  return (
    <div className={styles.container}>
      {" "}
      <Link href={path} className={styles.logo}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={isMobile ? 61.372 : 70.14}
          height={isMobile ? 28 : 32}
          unoptimized
        />
      </Link>
    </div>
  );
};

export default HomeButton;
