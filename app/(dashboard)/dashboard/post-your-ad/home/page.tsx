import Link from "next/link";
import styles from "./styles.module.scss";
import Button from "@/components/Buttons";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post Your Ad</h1>
      <Link
        href="/dashboard/post-your-ad/select-a-category"
        className={`${styles.selectACategoryContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.selectACategoryBtn} ${styles.button}`}
          buttonChildren="Select A Category"
          buttonType="normal"
          buttonSize="large"
          name="select-a-category-btn"
          type="button"
          ariaLabel="Post Your Ad Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/details"
        className={`${styles.detailsContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.details} ${styles.button}`}
          buttonChildren="Set Product Details"
          buttonType="normal"
          buttonSize="large"
          name="details-btn"
          type="button"
          ariaLabel=" Details Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/features"
        className={`${styles.featuresContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.features} ${styles.button}`}
          buttonChildren="Set Technical Specifications"
          buttonType="normal"
          buttonSize="large"
          name="features-btn"
          type="button"
          ariaLabel="Features Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/price"
        className={`${styles.setPriceContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.setPrice} ${styles.button}`}
          buttonChildren="Set Price"
          buttonType="normal"
          buttonSize="large"
          name="set-price-btn"
          type="button"
          ariaLabel="Set Price Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/ad-description"
        className={`${styles.adDescriptionContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.adDescription} ${styles.button}`}
          buttonChildren="Ad Description"
          buttonType="normal"
          buttonSize="large"
          name="ad-description-btn"
          type="button"
          ariaLabel="Ad Description Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/upload-media"
        className={`${styles.uploadMediaContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.uploadMedia} ${styles.button}`}
          buttonChildren="Upload Media"
          buttonType="normal"
          buttonSize="large"
          name="upload-media-btn"
          type="button"
          ariaLabel="Upload Media Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/location"
        className={`${styles.locationContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.location} ${styles.button}`}
          buttonChildren="Set Location"
          buttonType="normal"
          buttonSize="large"
          name="location-btn"
          type="button"
          ariaLabel="Location Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/my-ads/promote-your-ads"
        className={`${styles.promoteYourAdsContainer} ${styles.link}`}
      >
        <Button
          className={`${styles.promoteYourAds} ${styles.button}`}
          buttonChildren="Promote Your Ads"
          buttonType="normal"
          buttonSize="large"
          name="promote-your-ads-btn"
          type="button"
          ariaLabel="Promote Your Ads Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>
    </div>
  );
};

export default Home;
