import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import MenuButton from "../MenuButton";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image src="/logo.png" alt="Logo" width={70.14} height={32} />
      </Link>
      <MenuButton />
    </div>
  );
};

export default Navbar;
