import Image from "next/image";
import styles from "./ProductOffer.module.scss";
import Button from "@/components/Buttons";
import Link from "next/link";
import useFeatureInfo from "@/store/featuresInfo";

type Props = {
  layout: "textLeft" | "textRight";
  path: string;
  image: string;
  title: string;
  description: string;
  cta: string;
  features: {
    id: number;
    feature: string;
  }[];
};

const ProductOffer = ({
  layout,
  path,
  image,
  title,
  description,
  cta,
  features,
}: Props) => {
  const { setIsMoreInfo } = useFeatureInfo();
  return (
    <>
      {layout === "textLeft" && (
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <ul className={styles.features}>
              {features.map((feature) => {
                return (
                  <li
                    className={styles.feature}
                    key={`textRight ${feature.id}`}
                  >
                    <div className={styles.featureIcon}>
                      <Image
                        src="/icons/check-circle.svg"
                        alt="Check"
                        width={24}
                        height={24}
                      />
                    </div>
                    {feature && <p>{feature.feature}</p>}
                  </li>
                );
              })}
            </ul>

            <Button
              type="button"
              name="ctaButton"
              buttonType="primary"
              buttonSize="small"
              buttonChildren={cta}
              autoFocus={false}
              className={styles.ctaButton}
              onClick={() => setIsMoreInfo(true)}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt="Illustration"
              fill
              className={styles.image}
              style={{ objectFit: "cover", borderRadius: "2.5rem" }}
            />
          </div>
        </div>
      )}

      {layout === "textRight" && (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt="Illustration"
              fill
              className={styles.image}
              style={{ objectFit: "cover", borderRadius: "2.5rem" }}
            />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.features}>
              <ul className={styles.features}>
                {features.map((feature) => {
                  return (
                    <li
                      className={styles.feature}
                      key={`textRight ${feature.id}`}
                    >
                      <div className={styles.featureIcon}>
                        <Image
                          src="/icons/check-circle.svg"
                          alt="Check"
                          width={24}
                          height={24}
                        />
                      </div>
                      {feature && <p>{feature.feature}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button
              type="button"
              name="ctaButton"
              buttonType="primary"
              buttonSize="small"
              buttonChildren={cta}
              autoFocus={false}
              className={styles.ctaButton}
              onClick={() => setIsMoreInfo(true)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductOffer;
