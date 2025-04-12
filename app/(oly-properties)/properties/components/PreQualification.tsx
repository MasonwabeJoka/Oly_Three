import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./PreQualification.module.scss";
import Button from "@/components/Buttons";

const PreQualification = () => {
  const router = useRouter();

  const handleGetPreQualified = () => {
    // This will be updated to navigate to your pre-qualification form
    router.push("/properties/pre-qualification");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src="/houses/house12.jpg"
            alt="Property Valuation Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "2.5rem" }}
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Oly Home Loan</h2>
          <p className={styles.description}>
            We handle your home loan application by
            submitting it to all major banks on your behalf. Get pre-qualified
            and understand your buying power with our streamlined, hassle-free
            process — designed to boost your chances of approval.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src="/icons/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                />
              </div>
              <p>Free pre-qualification assessment</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src="/icons/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                />
              </div>
              <p>Submit to multiple banks simultaneously</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src="/icons/check-circle.svg"
                  alt="Check"
                  width={24}
                  height={24}
                />
              </div>
              <p>Compare offers and rates side by side</p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="button"
              name="getPreQualified"
              buttonType="primary"
              buttonSize="small"
              buttonChildren="Get Pre-Qualified Now"
              autoFocus={false}
              onClick={handleGetPreQualified}
              className={styles.preQualButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreQualification;
