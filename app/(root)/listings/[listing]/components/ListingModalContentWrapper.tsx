import Form from "next/form";
import styles from "./ListingModalContentWrapper.module.scss";
import SellerDetails from "@/components/SellerDetails";

const ListingModalContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const myAction = () => {
    console.log();
  };

  return (
    <div className={styles.container}>
      <Form action={myAction} className={styles.form}>

      <div className={styles.sellerDetails}>
        <SellerDetails />
      </div>
      <div className={styles.content}>{children}</div>
      </Form>
    </div>
  );
};

export default ListingModalContentWrapper;
