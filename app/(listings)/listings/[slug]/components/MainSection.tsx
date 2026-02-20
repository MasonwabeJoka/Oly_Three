import styles from "./MainSection.module.scss";
import { Ad } from "@/sanityTemp/Types/Ad";
import ListingOverview from "./ListingsOverview";
import ExitButton from "@/components/ExitButton";
import ReportAd from "@/components/ReportAd";
import useReportStore from "../store/useReportStore";
import AuctionModal from "./AuctionModal";
import { ListingQueryResult } from "@/sanity/types";
import ConfirmPurchaseModal from "./ConfirmPurchaseModal";


interface Props {
  listing: ListingQueryResult;
}

const MainSection = ({ listing }: Props) => {
  const { report, setReport } = useReportStore();

  return (
    <div className={styles.container}>
      {!report ? (
        <>
          <ListingOverview listing={listing} />
          <AuctionModal />
          <ConfirmPurchaseModal />
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
