import styles from "./QrScanner.module.scss";
import  VerificationFormWrapper from "./VerificationFormWrapper";
import { QRCodeSVG } from "qrcode.react";

const QrScanner = () => {
  return (
    <VerificationFormWrapper title="QR Scanner">
      <div className={styles.container}>
        <p className={styles.description}>
          Open your phone's camera to scan the QR code below. You will be
          redirected to a secure verification page — follow the instructions on
          your phone to proceed.
        </p>
        <div className={styles.qrCodeContainer}>
          <QRCodeSVG value="https://www.google.com" />
        </div>
      </div>
    </VerificationFormWrapper>
  );
};

export default QrScanner;
