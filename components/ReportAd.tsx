import styles from "./ReportAd.module.scss";
import Button from "./Buttons";
import Input from "./Input";
import TextArea from "@/components/TextArea";
import { UIData } from "@/data/UIData";

const ReportAd = () => {
  const { normal, icon, medium, radio } = UIData;
  return (
    <form name="reportForm" className={styles.container}>
      <div className={styles.violations}>
        <Input
          className={styles.violation}
          inputType={radio}
          inputSize=""
          label=""
          placeholder=""
          id="violationOne"
          name="violation"
          ariaLabel="Violation radio button"
          autoFocus={false}
          required={false}
        />
        <label htmlFor="violationOne" className={styles.violationLabel}>
          This ad is illegal or fraudulent
        </label>
        <Input
          className={styles.violation}
          inputType={radio}
          inputSize=""
          label=""
          placeholder=""
          id="violationTwo"
          name="violation"
          ariaLabel="Violation radio button"
          autoFocus={false}
          required={false}
        />
        <label htmlFor="violationTwo" className={styles.violationLabel}>
          The post displays explicit or violent content
        </label>
        <Input
          className={styles.violation}
          inputType={radio}
          inputSize=""
          label=""
          placeholder=""
          id="violationThree"
          name="violation"
          ariaLabel="Violation radio button"
          autoFocus={false}
          required={false}
        />
        <label htmlFor="violationThree" className={styles.violationLabel}>
          The ad is spam
        </label>
        <Input
          className={styles.violation}
          inputType={radio}
          inputSize=""
          label=""
          placeholder=""
          id="violationFour"
          name="violation"
          ariaLabel="Violation radio button"
          autoFocus={false}
          required={false}
        />
        <label htmlFor="violationFour" className={styles.violationLabel}>
          The ad is in a wrong category
        </label>
        <Input
          className={styles.violation}
          inputType={radio}
          inputSize=""
          label=""
          placeholder=""
          id="violationFive"
          name="violation"
          ariaLabel="Violation radio button"
          autoFocus={false}
          required={false}
        />
        <label htmlFor="violationFive" className={styles.violationLabel}>
          The ad is against posting rules
        </label>
        <Input
          className={styles.violation}
          inputType={radio}
          inputSize=""
          label=""
          placeholder=""
          id="violationSix"
          name="violation"
          ariaLabel="Violation radio button"
          autoFocus={false}
          required={false}
        />
        <label htmlFor="violationSix" className={styles.violationLabel}>
          Other violations
        </label>
      </div>
      <div className={styles.moreInfoContainer}>
        <TextArea
          className={styles.moreInfo}
          placeholder="Please provide more information"
          label="More Information"
          id="more-info"
          name="more-info"
          rows={10}
          cols={50}
          required={false}
        />
        <div className={styles.exitBtn}>
          <Button
            buttonChildren="X"
            buttonType={icon}
            buttonSize=""
            name="exit_btn"
            type="button"
            ariaLabel="Exit Button"
            autoFocus={false}
            disabled={false}
          />
        </div>
        <div className={styles.submitReportBtn}>
          <Button
            buttonChildren="Submit"
            buttonType={normal}
            buttonSize={medium}
            name="submit_report_btn"
            type="button"
            ariaLabel="Submit Button"
            autoFocus={false}
            disabled={false}
          />
        </div>
      </div>
    </form>
  );
};

export default ReportAd;
