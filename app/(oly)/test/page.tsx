'use client';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './styles.module.scss';

const Home: NextPage = () => {

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sidebar = document.querySelector(`.${styles.sidebar}`);
    const section1 = document.querySelector(`.${styles.section1}`);
    const section2 = document.querySelector(`.${styles.section2}`);
    const section3 = document.querySelector(`.${styles.section3}`);

    if (sidebar && section1 && section3) {
      ScrollTrigger.create({
        trigger: sidebar,
        start: `top top+=${section1.clientHeight}`,
        end: `bottom bottom-=${section2?.clientHeight}`,
        pin: true,
        pinSpacing: false,
        markers: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section1}>Section 1</div>
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>Sticky Sidebar</div>
        <div className={styles.section2}>Section 2</div>
      </div>
      <div className={styles.section3}>Section 3</div>
    </div>
  );
};

export default Home;