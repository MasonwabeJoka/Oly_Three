import styles from './PageHeader.module.scss';
import { ReactNode } from "react";

export const PageHeader = ({children}: {children: ReactNode}) => {
    return <h1 className={styles.title}>{children}</h1>
}