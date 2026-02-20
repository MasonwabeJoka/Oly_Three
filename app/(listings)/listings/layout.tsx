import styles from "./../../global-styles/layout.module.scss";
import "./../../../app/globals.css";
import Outfit from "next/font/local";

import "@uploadthing/react/styles.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

import { withAuth } from "@workos-inc/authkit-nextjs";
import ListingsLayoutWrapper from "./components/ListingsLayoutWrapper";



const outfit = Outfit({
  src: "./../../fonts/Outfit-VariableFont_wght.ttf",
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
        <ListingsLayoutWrapper
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
        </ListingsLayoutWrapper>
      </body>
    </html>
  );
}
