import styles from "./ReviewPromoteYourAd.module.scss";
import { SectionWrapper } from "./SectionWrapper";
import { useParams } from "next/navigation";

const ReviewPromoteYourAd = () => {
  const params = useParams();
  const site = params.site as string;
  return (
    <SectionWrapper title="Promote Your Ad" path={`/dashboard/create-listing/${site}/promote-your-ad`}>
      <div className={styles.container}>
        
      </div>
    </SectionWrapper>
  );
};

export default ReviewPromoteYourAd;
