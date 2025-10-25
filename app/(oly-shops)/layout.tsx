import styles from "../global-styles/layout.module.scss";
import Outfit from "next/font/local";

import "@uploadthing/react/styles.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export const metadata = {
  title: "OLY Shops - Online Shopping Platform",
  description:
    "Discover amazing products and services on OLY Shops. Your one-stop destination for online shopping.",
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

export default function OlyShopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable} data-scroll-behavior="smooth">
      <body className={`${styles.body} ${outfit.className}`}>
        <div className={styles.container}>
          <Navbar />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
