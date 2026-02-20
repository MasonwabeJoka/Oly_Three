import styles from "../global-styles/layout.module.scss";
import "../globals.css";
import Outfit from "next/font/local";

import "@uploadthing/react/styles.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

import { withAuth } from "@workos-inc/authkit-nextjs";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "OLY: Better than Gumtree and Olx",
  description:
    "OLY Redefines classifieds for the modern age. From seamless auctions to Instagram-inspired feeds, enjoy a platform designed for today's digital trading.",
  icons: {
    icon: "/favicon.ico",
  },
};

const outfit = Outfit({
  src: "../fonts/Outfit-VariableFont_wght.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
  variable: "--font-outfit",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {user} = await withAuth()
  return (
    <html
      lang="en"
      className={`${outfit.className} ${styles.html}`}
      data-scroll-behavior="smooth"
    >
      <body className={`${outfit.variable} ${styles.body}`}>
        <LayoutWrapper
          currentUser={user}
        >
          <div className={styles.wrapper}>
            <div className={styles.main}>
              <nav className={styles.nav}>
                <Navbar />
              </nav>
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
        </LayoutWrapper>
      </body>
    </html>
  );
}
