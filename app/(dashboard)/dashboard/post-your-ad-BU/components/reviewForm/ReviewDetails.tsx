import styles from "./ReviewDetails.module.scss";
import { SectionWrapper } from "./SectionWrapper";

const ReviewDetails = () => {
  return (
    <SectionWrapper title="Details" pageNumber={1}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentLabel}>Condition</div>
            <div className={styles.contentItem}>New</div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentLabel}>More Details</div>
            <ul className={styles.contentItem}>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "500" }}>Reason for Selling: </span>
                Selling camera to upgrade to a professional model for
                photography business.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "500" }}>
                  Accessories Included:{"  "}
                </span>
                Remote control, HDMI cable, Wall mounting bracket
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "500" }}>
                  Warranty Information:{"  "} 
                </span>
                Still under manufacturer warranty until June 2025.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "500" }}>Ownership:{"  "} </span>Single
                owner, purchased directly from authorized retailer.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "500" }}>History:{"  "} </span>Gaming
                console bought new, used only by adult owner in a pet-free home.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ReviewDetails;
