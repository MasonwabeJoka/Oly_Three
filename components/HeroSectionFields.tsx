import styles from "./HeroSectionFields.module.scss";
import Image from "@/components/Image";
import HeroSectionFieldsClient from "./HeroSectionFieldsClient";
import Form from "next/form";



const HeroSectionFields = ({
  searchTerm,
  locationSearch,
}: {
  searchTerm?: string;
  locationSearch?: string;
} = {}) => {

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
