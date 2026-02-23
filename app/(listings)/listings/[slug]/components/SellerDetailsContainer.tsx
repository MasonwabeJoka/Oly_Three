
import SellerDetails from "@/components/SellerDetails";
import styles from "./SellerDetailsContainer.module.scss";
import useReportStore from "../store/useReportStore";



const SellerDetailsContainer = () => {
  const { report, setReport } = useReportStore();

  return (
    <div className={styles.sellerDetails}>
      <SellerDetails />
      <p className={styles.report} onClick={() => setReport(true)}>
        Report Ad
      </p>
    </div>
  );
};

export default SellerDetailsContainer;