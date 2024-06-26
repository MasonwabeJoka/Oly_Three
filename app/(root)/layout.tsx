// import "../globals.css";
import Navbar from "@/components/layouts/Navbar";
import Feed from "@/components/Feed";
import Footer from "@/components/layouts/Footer";
import styles from "./layout.module.scss";
import Outfit from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import ErrorBoundary from "@/utils/ErrorBoundary";

export const metadata = {
  title: "OLY: Better than Gumtree and Olx",
  description:
    "OLY Redefines classifieds for the modern age. From seamless auctions to Instagram-inspired feeds, enjoy a platform designed for today's digital trading. Promote with ease on social channels, like Facebook and expand your reach.",
  icons: {
    icon: "/favicon.ico",
  },
};

const outfit = Outfit({
  src: "./outfit.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.className} ${styles.html}`}>
        <body className={styles.body}>
          <div className={styles.wrapper}>
            <aside className={styles.feed}>
              <Feed />
            </aside>
            <div className={styles.main}>
              <nav className={styles.nav}>
                <Navbar />
              </nav>
              <main className={styles.children}>{children}</main>
            </div>
          </div>

          <footer className={styles.footer}>
            <Footer />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
