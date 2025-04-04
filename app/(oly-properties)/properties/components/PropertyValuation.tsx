import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./PropertyValuation.module.scss";
import Button from "@/components/Buttons";

const PropertyValuation = () => {
  const router = useRouter();

  const handleGetValuation = () => {
    // This will be updated to navigate to your valuation form when it's created
    router.push("/properties/valuation");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Property Valuation</h2>
          <p className={styles.description}>
            Get a valuation of your property in minutes. Whether
            you're looking to sell or rent, our advanced valuation tool provides
            reliable estimates based on current market data.
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
              <p>Market-based valuations</p>
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
              <p>Selling price recommendations</p>
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
              <p>Rental income estimates</p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="button"
              name="getValuation"
              buttonType="primary"
              buttonSize="small"
              buttonChildren="Go to Valuation"
              autoFocus={false}
              onClick={handleGetValuation}
              className={styles.valuationButton}
            />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/houses/house9.jpg"
            alt="Property Valuation Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "32px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyValuation;
