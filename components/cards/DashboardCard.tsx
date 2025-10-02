import Icon from "../Icon";
import styles from "./DashboardCard.module.scss";
import Image from "@/components/Image";

interface DashboardCardProps {
  title: string;
  subtitle?: string | number;
  value: string;
  icon?: string;
  stat?: string;
}
const DashboardCard = ({
  title,
  subtitle,
  value,
  icon,
  stat,
}: DashboardCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {icon && (
        <div className={styles.icon}>
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
      )}
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.value}>{value}</div>
      {stat && <div className={styles.stat}>{stat}</div>}
      <div className={styles.stat}>
        {" "}
        +18%
        <div className={styles.icon}>
          <Icon
            alt="chevron-up"
            src="/icons/up-arrow-green.png"
            width={13}
            height={13}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
