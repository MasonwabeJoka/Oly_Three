import styles from "./Features.module.scss";
import { Ad } from "@/sanity/Types/Ad";

interface FeaturesProps {
  ad: Ad | null;
}

const Features = ({ ad }: FeaturesProps) => {
  return (
    <div className={styles.featuresContainer}>
      <h4 className={styles.title}>Features</h4>
      <div className={styles.features}>
        {/* {ad?.features?.map((feature, index) => (
          <div className={styles.feature} key={index}>
            <div className={styles.bulletContainer}>
              <div className={styles.bullet}></div>
            </div>
            <div className={styles.infoItemContainer}>
              <p>{feature}</p>
            </div>
          </div>
        ))} */}
        <div className={styles.feature}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>Lorem.</p>
            {/* <p>1_Lorem ipsum dolor sit amet.</p> */}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>Lorem.</p>
            {/* <p>2_Lorem, ipsum.</p> */}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>Lorem.</p>
            {/* <p>
              3_Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p> */}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>Lorem.</p>
            {/* <p>4_Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.bulletContainer}>
            <div className={styles.bullet}></div>
          </div>
          <div className={styles.textContainer}>
            <p>Lorem.</p>
            {/* <p>5_Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quidem qui assumenda necessitatibus rem nemo vel dignissimos, odio ducimus impedit saepe, nesciunt quis, possimus cupiditate veritatis soluta! Aliquid, neque delectus?</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
