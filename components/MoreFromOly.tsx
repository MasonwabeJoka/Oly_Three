import styles from "./MoreFromOly.module.scss";
import ClassifiedLink from "./cards/ClassifiedLink";
import Link from "next/link";
import { getMoreFromOly } from "@/server/sanity/lib/crud/moreFromOly/data";

// Types
interface SanityOlySite {
  _id: string;
  _type: string;
  path: string;
  imageUrl: string;
  title?: string;
  siteName: string;
}

const MoreFromOly = async () => {
  const data = await getMoreFromOly();

  const sites = data?.sites || [];

  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>More from Oly</h2>

      <div className={styles.classifiedsWrapper}>
        <ul className={styles.classifieds}>
        {sites.map((site, index: number) => (
          <li key={site?._id || `fallback-${index}`}>
            <Link
              href={site.path ?? "#"}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ClassifiedLink
                text={site?.siteName ?? undefined}
                image={site?.imageUrl ?? undefined}
              />
            </Link>
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
};

export default MoreFromOly;
