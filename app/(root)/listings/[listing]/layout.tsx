import styles from "./layout.module.scss";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import HomeButton from "@/components/HomeButton";
import localFont from "next/font/local";

export const metadata = {
  title: "",
  description: "",
};

const outfit = localFont({
  src: "../../../../public/fonts/Outfit-VariableFont_wght.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.body}>
      <nav className={styles.nav}>
        <HomeButton />
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
