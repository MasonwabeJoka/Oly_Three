import Footer from "@/components/layouts/Footer";
import styles from "./../global-styles/layout.module.scss";

import localFont from "next/font/local";
import { Toaster } from "sonner";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Oly Dashboard",
  description: "Dashboard",
};

const outfit = localFont({
  src: "../../public/fonts/Outfit-VariableFont_wght.ttf",
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
        <LayoutWrapper>
          <div className={styles.wrapper}>
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
        </LayoutWrapper>
      </body>
    </html>
  );
}
