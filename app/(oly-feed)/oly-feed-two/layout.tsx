import styles from "./styles.module.scss";
// import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import OlyFeedHeader from "@/features/oly-feed/layouts/OlyFeedHeader";
import OlyFeedSidebar from "@/features/oly-feed/layouts/OlyFeedSidebar";
import OlyFeedMobileNavbar from "@/features/oly-feed/layouts/OlyFeedMobileNavbar";

export const metadata = {
  title: "Temp Title",
  description: "Temp Description",
};

const outfit = Outfit({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //  <ClerkProvider>
    <html lang="en" className={outfit.className}>
      <body className={styles.body}>
        <nav className={styles.header}>
          <OlyFeedHeader />
        </nav>
        <div className={styles.mainContainer}>
          <aside className={styles.sidebar}>
            <OlyFeedSidebar />
          </aside>
          <main className={styles.main}>{children}</main>
        </div>
        <footer className={styles.mobileNavigation}>
          <OlyFeedMobileNavbar />
        </footer>
      </body>
    </html>
    //  </ClerkProvider>
  );
}
