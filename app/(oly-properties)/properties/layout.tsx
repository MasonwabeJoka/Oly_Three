import styles from "./../../global-styles/layout.module.scss";
import localFont from "next/font/local";

import "@uploadthing/react/styles.css";
import "../../globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";
import { withAuth } from "@workos-inc/authkit-nextjs";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await withAuth();
  return (
    <html
      lang="en"
      className={`${outfit.className} ${styles.html}`}
      data-scroll-behavior="smooth"
    >
      <body className={styles.body}>
        <LayoutWrapper currentUser={user}>
          <div className={styles.wrapper}>
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
        </LayoutWrapper>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
