import Navbar from "@/components/layouts/Navbar";
import Feed from "@/components/Feed";
import styles from "./layout.module.scss";
import Outfit from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import ErrorBoundary from "@/utils/ErrorBoundary";
import "@uploadthing/react/styles.css";
import { Toaster } from "sonner";
import QueryProvider from "./queryProvider";

export const metadata = {
  title: "OLY: Better than Gumtree and Olx",
  description:
    "OLY Redefines classifieds for the modern age. From seamless auctions to Instagram-inspired feeds, enjoy a platform designed for today's digital trading.",
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
          <QueryProvider>
            <div className={styles.wrapper}>
              <aside className={styles.feed}>
                <Feed />
              </aside>
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
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
