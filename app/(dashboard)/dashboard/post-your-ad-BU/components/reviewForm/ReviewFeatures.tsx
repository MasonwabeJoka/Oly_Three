import styles from "./ReviewFeatures.module.scss";
import { SectionWrapper } from "./SectionWrapper";
const ReviewFeatures = () => {
  return (
    <SectionWrapper title="Features" pageNumber={2}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Product Specifications</div>
            <div className={styles.contentItem}>
              <ul>
                <li>
                  <span style={{ fontWeight: "500" }}>
                    Reason for Selling:{" "}
                  </span>
                  Selling camera to.
                </li>
                {/* <li><span style={{fontWeight: "500"}}>Reason for Selling: </span>Selling camera to upgrade to a professional model for photography business.</li> */}
                {/* <li><span>Accessories Included: </span>Remote control, HDMI cable, Wall mounting bracket</li> */}
                {/* <li><span>Warranty Information: </span>Still under manufacturer warranty until June 2025.</li>
                <li><span>Ownership: </span>Single owner, purchased directly from authorized retailer.</li>
                <li><span>History: </span>Gaming console bought new, used only by adult owner in a pet-free home.</li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ReviewFeatures;
