import styles from "./MoreFromOly.module.scss";
import ClassifiedLink from "./cards/ClassifiedLink";
import { classifieds } from "../data/classifiedLinks";
import Link from "next/link";

const MoreFromOly = () => {
  return (
    <div className={styles.container}>
      <div className={styles.classifieds}>
        {classifieds.map((classified) => (
          <Link href={classified.link} key={classified.id} target="_blank" rel="noopener noreferrer">
            <ClassifiedLink text={classified.text} image={classified.image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreFromOly;
