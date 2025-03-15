import styles from "./layout.module.scss";
import { ClerkProvider } from "@clerk/nextjs";
import { localFont } from "next/font/local";
import { Toaster } from "sonner";

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
    <ClerkProvider>
      <html lang="en" className={`${outfit.className} ${styles.html}`}>
        <body className={styles.body}>
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
        </body>
      </html>
    </ClerkProvider>
  );
}
