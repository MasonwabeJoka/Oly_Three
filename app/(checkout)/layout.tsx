import LayoutWrapper from "@/components/LayoutWrapper";
import { withAuth } from "@workos-inc/authkit-nextjs";
import styles from "../global-styles/layout.module.scss";
import "../globals.css";
import Outfit from "next/font/local";
import { Toaster } from "sonner";

const outfit = Outfit({
  src: "../fonts/Outfit-VariableFont_wght.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
  variable: "--font-outfit",
});

export default async function CheckoutLayout({
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
      <body className={`${outfit.variable} ${styles.body}`}>
        <LayoutWrapper currentUser={user}>
          <div className={styles.wrapper}>
            <div className={styles.main}>
              <div className={styles.children}>
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
          </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}
