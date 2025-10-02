import styles from "./ListingModalContentWrapper.module.scss";
import SellerDetails from "@/components/SellerDetails";

const ListingModalContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.sellerDetails}>
          <SellerDetails />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default ListingModalContentWrapper;
