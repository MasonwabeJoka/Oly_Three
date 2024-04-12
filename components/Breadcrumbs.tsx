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
  breadcrumbs?: Breadcrumb[];
}
const Breadcrumbs = (props: BreadcrumbsProps) => {
  return (
    <ul className={styles.breadcrumbs}>
      {props.breadcrumbs?.map((breadcrumb, index) => {
        return (
          <li key={index}>
            <Link href={breadcrumb.href} className={styles.breadcrumb}>
              {breadcrumb.name}
            </Link>
            {index !== (props.breadcrumbs?.length ?? 0) - 1 && (
              <span style={{ margin: "0 1rem" }}>{`  |  `}</span>
            )}
          </li>
        );
      })}
   
    </ul>
  );
};

export default Breadcrumbs;
