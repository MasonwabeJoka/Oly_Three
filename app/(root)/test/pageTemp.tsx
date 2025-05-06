'use client';

import { useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

export default function Home() {


  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div id="mainContent" className={styles.mainContent}>
        <div className={`${styles.section} ${styles.red}`}>Section 1</div>
        <div className={`${styles.section} ${styles.blue}`}>Section 2</div>
        <div className={`${styles.section} ${styles.green}`}>Section 3</div>
      </div>

      {/* Sidebar */}
      <div id="sidebar" className={styles.sidebar}>
       Sticky Sidebar
      </div>
    </div>
  );
}
