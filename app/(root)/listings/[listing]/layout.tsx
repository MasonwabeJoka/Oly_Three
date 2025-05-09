import styles from "./layout.module.scss";
// import styles from "../../../styles/layout.module.scss";
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
    // <html lang="en" className={`${outfit.className} ${styles.html}`}>
    //   <body className={styles.body}>
    //     <nav className={styles.nav}>
    //       {/* <Navbar /> */}
    //       <HomeButton />
    //     </nav>
    <>
      <nav className={styles.nav}>
        <HomeButton />
      </nav>
      <div className={styles.main}>{children}</div>
    </>
    //     <footer className={styles.footer}>
    //       <Footer />
    //     </footer>
    //   </body>
    // </html>
  );
}
