import Image from "@/components/Image";
import styles from "./BankLogos.module.scss";

const BankLogos = () => {
  return (
    <div className={styles.logos}>
      <div className={`${styles.wesbank} ${styles.logo}`}>
        <Image
          src="/vehicle-finance/wes.png"
          alt="WesBank"
          width={80}
          height={80}
        />
      </div>
      <div className={`${styles.standardBank} ${styles.logo}`}>
        <Image
          src="/vehicle-finance/standardbank.png"
          alt="Standard Bank"
          width={100}
          height={100}
        />
      </div>
      <div className={`${styles.absa} ${styles.logo}`}>
        <Image
          src="/vehicle-finance/absa.png"
          alt="Absa"
          width={50}
          height={50}
        />
      </div>
      <div className={`${styles.mfc} ${styles.logo}`}>
        <Image
          src="/vehicle-finance/mfc.png"
          alt="MFC"
          width={80}
          height={80}
        />
      </div>
      
    </div>
  );
};

export default BankLogos;
