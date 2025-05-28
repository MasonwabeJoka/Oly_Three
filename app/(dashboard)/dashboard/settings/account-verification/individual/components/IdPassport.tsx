import styles from "./IdPassport.module.scss";
import SettingsFormWrapper from "./SettingsFormWrapper";

import UploadButton from "@/components/UploadButton";

const IdPassport = () => {
  return (
    <SettingsFormWrapper title="Verify Your ID">
      <div className={styles.container}>
        <p className={styles.description}>
          Upload a clear image of your national ID, passport, or driver’s
          license. Make sure the document is fully visible (with no cropped
          edges), the text is clear and readable, and the document is not
          expired.
        </p>
        {/* <div className={styles.uploadContainer}>
          <UploadButton
            mediaType="photo"
            colour="primary"
            required={true}
            accept="image/*"
          />
        </div> */}
      </div>
    </SettingsFormWrapper>
  );
};

export default IdPassport;
