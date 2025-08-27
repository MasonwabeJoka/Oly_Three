import styles from "./FeaturedListings.module.scss";
import ListingsCollage from "@/components/ListingsCollage";
import Link from "next/link";
import Button from "@/components/Buttons";
import multipleImages from "@/data/multipleImages";
import FeaturedListingsClient from "./FeaturedListingsClient";

const tempImages = multipleImages.map((item) => item.images);

const FeaturedListings = ({ category }) => {
  return (
    <>
      {category === "all" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <ListingsCollage
              category={category}
              images={tempImages}
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
              limit={4}
              page={1}
              sortBy="postedOn"
              sortOrder="desc"
            />
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren="View all listings"
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
      {category === "property" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <ListingsCollage
              category={category}
              images={tempImages}
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
              limit={4}
              page={1}
              sortBy="postedOn"
              sortOrder="desc"
            />
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren="View All Properties"
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
      {category === "shops" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <ListingsCollage
              category={category}
              images={tempImages}
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
              limit={4}
              page={1}
              sortBy="postedOn"
              sortOrder="desc"
            />
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren="View All Properties"
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedListings;
