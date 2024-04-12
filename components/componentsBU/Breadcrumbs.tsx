import styles from "./Breadcrumbs.module.scss";
import Link from "next/link";

interface Breadcrumb {
  id: number;
  name: string;
  href: string;
}
interface BreadcrumbsProps {
  homeBreadcrumb?: Breadcrumb;
  firstBreadcrumb?: Breadcrumb;
  secondBreadcrumb?: Breadcrumb;
  thirdBreadcrumb?: Breadcrumb;
  fourthBreadcrumb?: Breadcrumb;
  fifthBreadcrumb?: Breadcrumb;
  searchResult?: Breadcrumb;
}
const Breadcrumbs = (Props: BreadcrumbsProps) => {
  return (
    <ul className={styles.breadcrumbs}>
      {/* Don't include 'search result in the map */}
      {Object.keys(Props)
        .filter((key) => key !== "searchResult")
        .map((key, index) => {
          return (
            <li key={index}>
              <Link href="#" className={styles.breadcrumb}>{Props[key as keyof BreadcrumbsProps]}</Link>
            </li>
          );
        })}
      <li className={styles.searchResult}>{Props.searchResult}</li>
    </ul>
  );
};

export default Breadcrumbs;
