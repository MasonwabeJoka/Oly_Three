import styles from "./PaymentMethodCardContent.module.scss";
import Icon from "@/components/Icon";
type Props = {
  title: string;
  subtitle: string;
  descriptions?: string[];
  icons?: string[];
  path: string;
};
const PaymentMethodCardContent = ({
  title,
  subtitle,
  descriptions,
  icons,
  path,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.paymentTypeContainer}>

     <div className={styles.text}>   <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p></div>

      <ul className={styles.icons}>
        {icons?.map((icon, index) => (
          <li key={index} className={styles.iconContainer}>
            <div className={styles.icon}><Icon src={icon} alt="icon" fill /></div>
          </li>
        ))}
      </ul>
        </div>
      <ul className={styles.descriptions}>
        {descriptions?.map((description, index) => (
          <li key={index}>{description}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default PaymentMethodCardContent;
