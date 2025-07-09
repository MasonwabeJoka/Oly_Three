import styles from "./HeroSectionSearch.module.scss";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import HeroSectionSearchClient from "./HeroSectionSearchClient";
import { searchAction } from "./../utils/FormServerActions/heroSectionSearchAction";
import Button from "./Buttons";

const HeroSectionSearch = () => {
  return (
    <div className={styles.container}>
      <p className={`${styles.text} ${styles.mobile}`}>Mobile</p>
      <p className={`${styles.text} ${styles.tablet}`}>Tablet</p>
      <p className={`${styles.text} ${styles.smallDesktop}`}>Small Desktop</p>
      <p className={`${styles.text} ${styles.largeDesktop}`}>Large Desktop</p>
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="logo"
          width={120}
          height={120}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
          // style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>
      <Form
        action={searchAction}
        className={styles.buttonsAndSearch}
        id="buttonsAndSearch"
        noValidate
      >
        <div className={styles.buttons}>
          <Link
            href="/dashboard/post-your-ad/select-category"
            className={styles.link}
          >
            <Button
              buttonChildren="Post Your Ad"
              className={styles.postYourAdBtn}
              buttonType="primary"
              buttonSize="large"
              name="Post Your Ad Button"
              type="button"
              ariaLabel="Post Your Ad Button"
              autoFocus={false}
              disabled={false}
            />
          </Link>
          <HeroSectionSearchClient />
        </div>
      </Form>
    </div>
  );
};

export default HeroSectionSearch;
