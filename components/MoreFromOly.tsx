import styles from "./MoreFromOly.module.scss";
import ClassifiedLink from "./cards/ClassifiedLink";
import { classifieds } from "../data/classifiedLinks";
import Link from "next/link";

const MoreFromOly = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.classifieds}>
        {classifieds.map((classified) => (
          <li key={classified.id}>
            <Link
              href={classified.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ClassifiedLink text={classified.text} image={classified.image} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoreFromOly;
