import Bottombar from "@/components/Bottombar";
import "../../globals.css";
import styles from "./layout.module.scss";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import Outfit from "next/font/local";
import Navbar from "@/components/layouts/Navbar";
import { currentUser } from "@/app/temp/tempForMessages";
import "@uploadthing/react/styles.css";
import QueryProvider from "@/app/(root)/queryProvider";

import { Toaster } from "sonner";

export const metadata = {
  title: "Oly Dashboard",
  description: "Dashboard",
};

const outfit = Outfit({
  src: "./outfit.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUser = await getCurrentUser();
  // const users = await getUsers();

  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.className} ${styles.html}`}>
        <body className={styles.body}>
          <QueryProvider>
            <div className={styles.wrapper}>
              <div className={styles.keepSidebarInPlace} />
              <nav className={styles.nav}>
                <Navbar />
              </nav>
              <aside className={styles.sidebar}>
                {/* The exclamation point means that the currentUser can be null also. */}
                <DashboardSidebar currentUser={currentUser!} />
                {/* <DashboardSidebar currentUser={currentUser!} user={users} /> */}
              </aside>

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
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
