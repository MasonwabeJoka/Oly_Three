import styles from './PromotionPaymentSummary.module.scss';

const PromotionPaymentSummary = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Payment Summary</h2>
      <div className={styles.promotionTotal}>
        <h4 className={styles.promotion}>Promotions</h4>
        <span className={styles.price}>R115</span>
      </div>
    </div>
  );
};

export default PromotionPaymentSummary;
