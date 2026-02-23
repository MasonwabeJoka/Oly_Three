import styles from "./AutoHeroSectionFields.module.scss";
import Image from "@/components/Image";
import Form from "next/form";
import AutoHeroSectionFieldsClient from "./AutoHeroSectionFieldsClient";
import AutoSearchHome from "./AutoSearchHome";
import AutoSearchByPrice from "./AutoSearchByPrice";
import MakeModel from "./MakeModel";
import MoreFilters from "./MoreFilters";
import Location from "./SearchByLocation";
import FinancialAssistance from "./FinancialAssistance";

const AutoHeroSectionFields = async ({
  searchParams,
}: {
  searchParams?: Promise<{ searchTerm: string; locationSearch: string }>;
}) => {
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
              <AutoSearchHome/>
              {/* <AutoSearchByPrice/> */}
              {/* <FinancialAssistance/> */}
              {/* <MakeModel/> */}
              {/* <MoreFilters/> */}
              {/* <Location/> */}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AutoHeroSectionFields;
