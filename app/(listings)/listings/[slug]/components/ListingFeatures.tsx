import styles from "./ListingDetails.module.scss";

interface FeaturesProps {
  details: string[];
}

const Features = ({ details }: FeaturesProps) => {
  return (
    <div className={styles.detailsContainer}>
      <h4 className={styles.title}>Features</h4>
      <div className={styles.details}>
        {/* {details?.map((detail, index) => (
          <div className={styles.detail} key={index}>
            <div className={styles.bulletContainer}>
              <div className={styles.bullet}></div>
            </div>
            <div className={styles.textContainer}>
              <p>{detail}</p>
            </div>
          </div>
        ))} */}
        <div className={styles.detail}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>1_Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>2_Lorem, ipsum.</p>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>3_Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>4_Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>
              5_Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              quidem qui assumenda necessitatibus rem nemo vel dignissimos, odio
              ducimus impedit saepe, nesciunt quis, possimus cupiditate
              veritatis soluta! Aliquid, neque delectus?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
