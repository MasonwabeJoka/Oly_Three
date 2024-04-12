import styles from "./TransactionFeeModal.module.scss";
//TODO: Redo Modal component
const TransactionFee = () => {
  return (
    <div className={styles.container}>
      <p>
        Our platform handles all payments directly, enhancing both security and
        convenience. This approach allows us to streamline the buying and
        selling process, making it easier and safer for everyone involved. A fee
        is included in the item price, resulting in the total price displayed to
        potential buyers on the site.
      </p>
    </div>
  );
};
export default TransactionFee;
