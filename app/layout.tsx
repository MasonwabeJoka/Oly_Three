import styles from "./global-styles/layout.module.scss";
import Outfit from "next/font/local";

const outfit = Outfit({
  // src: "./outfit.ttf",
  src: "./(root)/outfit.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.className} ${styles.html}`}>
      <body className={styles.body} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
