import styles from "./layout.module.scss";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from 'next/font/local'

export const metadata = {
  title: "Access OLY: Sign In or Join Today",
  description:
    "Whether you're returning or new, access OLY Marketplace with ease. Discover deals, showcase items, and connect with a trusted community of members.",
};

const outfit = localFont({
  src: './outfit.ttf',
  display: 'swap',
  fallback: ['roboto', 'system-ui', 'arial'],
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={outfit.className}>
        <body className={styles.container}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
