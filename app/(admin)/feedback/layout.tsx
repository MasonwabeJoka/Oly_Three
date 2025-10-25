import styles from "./../../global-styles/layout.module.scss";
import Outfit from "next/font/local";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import LayoutWrapper from "@/app/(dashboard)/dashboard/create-listing/components/LayoutWrapper";

export const metadata = {
  title: "OLY: Better than Gumtree and Olx",
  description:
    "OLY Redefines classifieds for the modern age. From seamless auctions to Instagram-inspired feeds, enjoy a platform designed for today's digital trading.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.className} ${styles.html}`} data-scroll-behavior="smooth">
      <body className={`${outfit.variable} ${styles.body}`}>
        <LayoutWrapper>
          <div className={styles.wrapper}>
            <div className={styles.main}>
              <nav className={styles.nav}>
                <Navbar />
              </nav>
              <main className={styles.children}>{children}</main>
            </div>
          </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}
