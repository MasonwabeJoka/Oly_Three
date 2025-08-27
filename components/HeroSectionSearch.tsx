import styles from "./HeroSectionSearch.module.scss";
import Image from "next/image";
import Link from "next/link";
import HeroSectionSearchClient from "./HeroSectionSearchClient";
import Button from "./Buttons";
import Form from "next/form";


const HeroSectionSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm: string; locationSearch: string }>;
}) => {
  const searchTerm = (await searchParams)?.searchTerm;
  const locationSearch = (await searchParams)?.locationSearch;

  return (
    <div className={styles.container}>

      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <Form
            action="/listings"
            scroll={false}
            className={styles.buttonsAndSearch}
          >
            <div className={styles.logo}>
              <Image
                src="/logo.png"
                alt="logo"
                width={120}
                height={120}
                sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
              />
            </div>
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
              <HeroSectionSearchClient
                searchTerm={searchTerm}
                locationSearch={locationSearch}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSearch;
