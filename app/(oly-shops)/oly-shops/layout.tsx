import styles from "../../global-styles/layout.module.scss";
import Outfit from "next/font/local";

import "@uploadthing/react/styles.css";
import "../../globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import ShopsLayoutWrapper from "./components/ShopsLayoutWrapper";
import { SanityLive } from "@/sanity/lib/live";
import { withAuth } from "@workos-inc/authkit-nextjs";

export const metadata = {
  title: "OLY Shops - Online Shopping Platform",
  description:
    "Discover amazing products and services on OLY Shops. Your one-stop destination for online shopping.",
  icons: {
    icon: "/favicon.ico",
  },
};

const outfit = Outfit({
  src: "../../fonts/Outfit-VariableFont_wght.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
  variable: "--font-outfit",
});

export default async function OlyShopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await withAuth();
  const { accessToken, ...initialAuth } = auth;

  return (
    <html lang="en" className={outfit.variable} data-scroll-behavior="smooth">
      <body className={`${styles.body} ${outfit.className}`}>
        <ShopsLayoutWrapper
          currentUser={auth.user}
          initialAuth={initialAuth}
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
              {/* <SanityLive /> */}
            </div>
          </div>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </ShopsLayoutWrapper>
      </body>
    </html>
  );
}
