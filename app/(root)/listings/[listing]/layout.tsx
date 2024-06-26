import styles from "./layout.module.scss";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Outfit from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "",
  description: "",
};

const outfit = Outfit({
  src: "./outfit.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.className} ${styles.html}`}>
      <body className={styles.body}>
        {/* <nav className={styles.nav}>
          <Navbar />
        </nav> */}
        <main className={styles.main}>{children}</main>
        {/* <footer className={styles.footer}>
          <Footer />
        </footer> */}
      </body>
    </html>
  );
}