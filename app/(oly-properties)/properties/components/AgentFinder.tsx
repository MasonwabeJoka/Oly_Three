import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AgentFinder.module.scss";
import Button from "@/components/Buttons";
import Select from "@/components/Select";

const AgentFinder = () => {
  const router = useRouter();

  const handleFindAgent = () => {
    // This will be updated to navigate to your agent finder page
    router.push("/properties/find-agent");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Find Your Perfect Agent</h2>
          <p className={styles.description}>
            Connect with experienced real estate agents in your area who can
            help you buy, sell, or rent property. Our database includes verified
            professionals with proven track records.
          </p>
          <div className={styles.locationContainer}>
            <div className={styles.controls}>

            <div className={styles.control}>
              <Select
                options={[
                  "KwaZulu-Natal",
                  "Eastern Cape",
                  "Free State",
                  "Gauteng",
                  "Limpopo",
                  "Mpumalanga",
                  "North West",
                  "Northern Cape",
                  "Western Cape",
                ]}
                initialValue="Select your province"
                selectSize="medium"
                label="Provinces"
                id="provinces"
                name="provinces"
                ariaLabel="Provinces"
                autoFocus={false}
                required={false}
              />
            </div>
            <div className={styles.control}>
              <Select
                options={[
                  "KwaZulu-Natal",
                  "Eastern Cape",
                  "Free State",
                  "Gauteng",
                  "Limpopo",
                  "Mpumalanga",
                  "North West",
                  "Northern Cape",
                  "Western Cape",
                ]}
                initialValue="Select your province"
                selectSize="medium"
                label="Provinces"
                id="provinces"
                name="provinces"
                ariaLabel="Provinces"
                autoFocus={false}
                required={false}
              />
            </div>
            <div className={styles.control}>
              <Button
                type="button"
                name="findAgent"
                buttonType="primary"
                buttonSize="medium"
                buttonChildren="Find an Agent"
                autoFocus={false}
                onClick={handleFindAgent}
                className={styles.agentButton}
              />
            </div>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
        <Image
            src="/agent/7.jpg"
            alt="Property Valuation Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "2.5rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentFinder;
