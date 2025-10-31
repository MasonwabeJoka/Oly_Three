import styles from "./DashboardSidebar.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
type Data = {
  icon: string;
  active_icon: string;
  label: string;
  link: string;
  id: number;
  active?: boolean;
  onClick?: () => void;
};
type Props = {
  icon: string;
  active_icon: string;
  label: string;
  link: string;
  id: number;
  active?: boolean;
  onClick?: () => void;
  data: Data[];
};

export const MainMenuItem: React.FC<Props> = ({
  icon,
  active_icon,
  label,
  link,
  active,
  onClick,
  data,
}) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link href={link} className={styles.menu} onClick={() => handleClick}>
      <Icon
        className={styles.icon}
        src={active ? active_icon : icon}
        alt="Edit Icon"
        width={isMobile ? 32 : 40}
        height={isMobile ? 32 : 40}
      />
      {isMobile ? (
        <span className="sr-only">{label}</span>
      ) : (
        <h4
          className={styles.menuText}
          style={{ color: active ? "#ff3c14" : "#434b4d" }}
        >
          {label}
        </h4>
      )}
    </Link>
  );
};

export const LogoutMenuItem: React.FC<Props> = ({ data, onClick }) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  return (
    <div 
      className={`${styles.menu} ${styles.logout}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Icon
        className={`${styles.logoutIcon} ${styles.icon}`}
        src={data[data.length - 1].icon}
        alt={data[data.length - 1].label}
        width={isMobile ? 32 : 40}
        height={isMobile ? 32 : 40}
      />
      {isMobile ? (
        <span className="sr-only">{data[data.length - 1].label}</span>
      ) : (
        <h4 className={styles.menuText}>{data[data.length - 1].label}</h4>
      )}
    </div>
  );
};
