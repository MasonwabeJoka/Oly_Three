import styles from "./ReportAd.module.scss";
import Button from "./Buttons";
import Input from "./Input";
import TextArea from "@/components/TextArea";
import { UIData } from "@/data/UIData";
import RadioButton from "./RadioButton";
import { useState } from "react";
import Checkbox from "./Checkbox";
import Form from "next/form";

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const ReportAd = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Form
      name="reportForm"
      className={styles.container}
      action={mockServerAction}
    >
      <div className={styles.violations}>
        <div className={`${styles.violation} ${styles.violationOne}`}>
          <Checkbox
            id="violationOne"
            className=""
            checked={checked}
            onChange={() => {}}
          />
          <label htmlFor="violationOne" className={styles.violationLabel}>
            This ad is illegal or fraudulent
          </label>
        </div>
        <div className={`${styles.violation} ${styles.violationTwo}`}>
          <Checkbox
            id="violationTwo"
            className=""
            checked={checked}
            onChange={() => {}}
          />
          <label htmlFor="violationTwo" className={styles.violationLabel}>
            The post displays explicit or violent content
          </label>
        </div>
        <div className={`${styles.violation} ${styles.violationThree}`}>
          <Checkbox
            id="violationThree"
            className=""
            checked={checked}
            onChange={() => {}}
          />
          <label htmlFor="violationThree" className={styles.violationLabel}>
            The ad is spam
          </label>
        </div>
        <div className={`${styles.violation} ${styles.violationFour}`}>
          <Checkbox
            id="violationFour"
            className=""
            checked={checked}
            onChange={() => {}}
          />
          <label htmlFor="violationFour" className={styles.violationLabel}>
            The ad is in a wrong category
          </label>
        </div>
        <div className={`${styles.violation} ${styles.violationFive}`}>
          <Checkbox
            id="violationFive"
            className=""
            checked={checked}
            onChange={() => {}}
          />
          <label htmlFor="violationFive" className={styles.violationLabel}>
            The ad is against posting rules
          </label>
        </div>
        <div className={`${styles.violation} ${styles.violationSix}`}>
          <Checkbox
            id="violationSix"
            className=""
            checked={checked}
            onChange={() => {}}
          />
          <label htmlFor="violationSix" className={styles.violationLabel}>
            Other violations
          </label>
        </div>
      </div>
      <div className={styles.moreInfoContainer}>
        <TextArea
          className={styles.moreInfo}
          id="moreInfo"
          name="moreInfo"
          placeholder="Please provide more information."
          size="large"
          label="More Info"
          required={true}
          value=""
          style={{ minHeight: "24rem" }}
          onChange={() => {}}
          error={""}
        />
        <div className={styles.submitReportBtn}>
          <Button
            buttonChildren="Submit"
            buttonType="primary"
            buttonSize="medium"
            name="submit_report_btn"
            type="submit"
            ariaLabel="Submit Button"
            autoFocus={false}
            disabled={false}
          />
        </div>
      </div>
    </Form>
  );
};

export default ReportAd;
