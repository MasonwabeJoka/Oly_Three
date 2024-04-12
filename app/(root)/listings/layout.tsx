import styles from "./layout.module.scss";
import Navbar from "@/components/layouts/NavbarAA";
export default function ListingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <nav className={styles.nav}>
          <Navbar />
        </nav> */}

      {children}
    </section>
  );
}
