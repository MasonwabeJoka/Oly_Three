import styles from "./HeroSectionFields.module.scss";
import Image from "@/components/Image";
import Link from "next/link";
import HeroSectionFieldsClient from "./HeroSectionFieldsClient";
import Button from "./Buttons";
import Form from "next/form";

const HeroSectionFields = async ({
  searchParams,
}: {
  searchParams?: Promise<{ searchTerm: string; locationSearch: string }>;
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
              <Link href="/dashboard/create-listing" className={styles.link}>
                <Button
                  buttonChildren="Create A Listing"
                  className={styles.createAListingBtn}
                  buttonType="danger"
                  buttonSize="large"
                  name="Create A Listing Button"
                  type="button"
                  ariaLabel="Create A Listing Button"
                  autoFocus={false}
                  disabled={false}
                />
              </Link>
              <HeroSectionFieldsClient
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

export default HeroSectionFields;
