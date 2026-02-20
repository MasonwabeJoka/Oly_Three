"use client";
import styles from "./PropertiesHeroSectionFields.module.scss";
import Image from "@/components/Image";
import Form from "next/form";

import PropertiesHeroSectionFieldsClient from "./PropertiesHeroSectionFieldsClient";



const PropertiesHeroSectionFields = () => {


  
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <Form
             action="/listings"
            scroll={false}
            className={styles.buttonsAndSearch}
          >
            
            <div className={styles.buttons}>
              <PropertiesHeroSectionFieldsClient />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeroSectionFields;
