import styles from "./MainSection.module.scss";
import { Ad } from "@/sanity/Types/Ad";
import ListingOverview from "./ListingsOverview";
import ExitButton from "@/components/ExitButton";
import ReportAd from "@/components/ReportAd";
import useReportStore from "../store/useReportStore";
import AuctionModal from "./AuctionModal";
import PaymentProcessingModal from "./PaymentProcessingModal";

interface Props {
  ad: Ad | null;
}

const MainSection = ({ ad }: Props) => {
  const { report, setReport } = useReportStore();
  
  return (
    <div className={styles.container}>
      {!report ? (
        <>
          <ListingOverview ad={ad} />
          <AuctionModal />
          <PaymentProcessingModal />
        </>
      ) : (
        <>
          <div
            className={styles.exitButtonContainer}
            onClick={() => setReport(false)}
          >
            <ExitButton />
          </div>
          <div className={styles.reportAdContainer}>
            <ReportAd />
          </div>
        </>
      )}
    </div>
  );
};

export default MainSection;
