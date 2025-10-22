import Feed from "@/components/Feed";
import styles from "./layout.module.scss";
import localFont from "next/font/local";

import "@uploadthing/react/styles.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "OLY: Better than Gumtree and Olx",
  description:
    "OLY Redefines classifieds for the modern age. From seamless auctions to Instagram-inspired feeds, enjoy a platform designed for today's digital trading.",
  icons: {
    icon: "/favicon.ico",
  },
};

const outfit = localFont({
  src: "../../../public/fonts/Outfit-VariableFont_wght.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.className} ${styles.html}`}>
      <body className={styles.body}>
        <div className={styles.wrapper}>
          <aside className={styles.feed}>
            <Feed />
          </aside>
          <div className={styles.main}>
            <main className={styles.children}>
              {children}
              <Toaster
                richColors
                toastOptions={{
                  style: {
                    height: "60px",
                    padding: "32px 28px",
                  },
                  className: "class",
                }}
              />
            </main>
          </div>
        </div>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
