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

const Breadcrumbs = (props: BreadcrumbsProps) => {
  // Create an array of the breadcrumb properties
  const filterBreadcrumbs = [
    props.homeBreadcrumb,
    props.firstBreadcrumb,
    props.secondBreadcrumb,
    props.thirdBreadcrumb,
    props.fourthBreadcrumb,
    props.fifthBreadcrumb,
    props.searchResult,
  ].filter(Boolean) as Breadcrumb[]; // Type assertion to ensure TypeScript knows these are Breadcrumb objects

  const breadcrumbs = [...filterBreadcrumbs];

  return (
    <ul className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => {
         const isLast = index === breadcrumbs.length - 1;
        return (
          <li key={index} className={isLast ? styles.lastBreadcrumb : ""}>
            <Link href={breadcrumb.href} className={styles.breadcrumb}>
              {breadcrumb.name}
            </Link>
            {index !== breadcrumbs.length - 1 && (
              <span style={{ margin: "0 1rem" }}>{` > `}</span>
              // <span style={{ margin: "0 1rem" }}>{` • `}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
