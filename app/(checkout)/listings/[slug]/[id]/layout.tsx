import styles from "./../../../../global-styles/layout.module.scss";
import "@/app/globals.css";
import Outfit from "next/font/local";

import "@uploadthing/react/styles.css";
import { Toaster } from "sonner";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

import { withAuth } from "@workos-inc/authkit-nextjs";
import CheckoutLayoutWrapper from "../components/CheckoutLayoutWrapper";
import ExitButton from "@/components/ExitButton";

const outfit = Outfit({
  src: "./../../../../fonts/Outfit-VariableFont_wght.ttf",
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
    <div className={styles.container}>
      <CheckoutLayoutWrapper currentUser={user}>
        <div className={styles.main}>
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
      </CheckoutLayoutWrapper>
    </div>
  );
}
