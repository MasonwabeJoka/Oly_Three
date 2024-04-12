// import ToastContext from "@/features/messages/store/ToasterStore";
import styles from "./layout.module.scss";
import UsersList from "../../../../features/messages/components/UsersList";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = {};
  return (
    <div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
