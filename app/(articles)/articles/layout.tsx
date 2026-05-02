import Footer from "@/components/layouts/Footer";
import styles from "./../../global-styles/layout.module.scss";

import localFont from "next/font/local";
import { Toaster } from "sonner";
import ArticleLayoutWrapper from "../components/ArticleLayoutWrapper";
import Navbar from "@/components/layouts/Navbar";

export const metadata = {
  title: "Oly Dashboard",
  description: "Dashboard",
};

const outfit = localFont({
  src: "../../../public/fonts/Outfit-VariableFont_wght.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.className} ${styles.html}`}
      data-scroll-behavior="smooth"
    >
      <body className={styles.body}>
        <ArticleLayoutWrapper>
          <div className={styles.wrapper}>
           <Navbar
              homeButton
              

           />
            <div className={styles.main}>
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
            </div>
          </div>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </ArticleLayoutWrapper>
      </body>
    </html>
  );
}
