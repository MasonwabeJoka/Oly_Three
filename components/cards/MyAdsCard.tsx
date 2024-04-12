import styles from "./MyAdsCard.module.scss";
import Button from "../Buttons";
import Image from "next/image";
import Avatar from "../Avatars";
import Pill from "@/components/Pill";
import Link from "next/link";

interface CardProps {
  images: string;
  title: string;
  userName?: string;
  description: string;
  suburb: string;
  city: string;
  likesCount: number;
  viewsCount: number;
  postAge: string;
  price: string;
  avatar?: string;
}

const MyAdsCard = ({
  images,
  title,
  userName,
  description,
  suburb,
  city,
  likesCount,
  viewsCount,
  postAge,
  price,
  avatar,
}: CardProps): JSX.Element => {
 
  return (
    <article className={styles.adCard}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={images}
          fill={true}
          alt={title}
          style={{
            position: "absolute",
            right: "0",
            verticalAlign: "top",
            objectFit: "cover",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.details}>
        <Link href="/dashboard/my-ads/promote-your-ads" className={styles.pill}>
          <Pill child="Promote Ad" colour="#CCF6FF" />
        </Link>
        <div className={styles.detailsWrapper}>
          {avatar && (
            <Avatar
              className={styles.avatar}
              avatarSize="regular"
              avatar={avatar}
              imageAlt={title}
            />
          )}

          <div className={styles.detailsText}>
            <div className={styles.titleWrapper}>
              <h3
                className={styles.title}
                style={{
                  fontSize: title.length > 48 ? "20px" : "24px",
                }}
              >
                {`${
                  title.length > 42
                    ? `${title.slice(0, 52)}...`
                    : title.slice(0, 72)
                }`}
              </h3>

              <div className={styles.location}>
                <p className={styles.locationText}>
                  {suburb}, {city}
                </p>
              </div>
            </div>
            <p className={styles.description}>
              {" "}
              {description.length > 180
                ? `${description.slice(0, 180)}...`
                : description}
            </p>
            <div className={styles.cardBottom}>
              <h2 className={styles.price}>{price}</h2>
              <div className={styles.icons}>
                <Button
                  className={`${styles.statsIcon} ${styles.icon}`}
                  buttonChildren=""
                  buttonType="roundStandardFeed"
                  buttonSize=""
                  name="stats-icon"
                  type="button"
                  ariaLabel="Stats Icon"
                  autoFocus={false}
                  disabled={false}
                />
                <Button
                  className={`${styles.editIcon} ${styles.icon}`}
                  buttonChildren=""
                  buttonType="roundStandardFeed"
                  buttonSize=""
                  name="edit-icon"
                  type="button"
                  ariaLabel="Edit Icon"
                  autoFocus={false}
                  disabled={false}
                />
                <Button
                  className={`${styles.previewIcon} ${styles.icon}`}
                  buttonChildren=""
                  buttonType="roundStandardFeed"
                  buttonSize=""
                  name="preview-icon"
                  type="button"
                  ariaLabel="Preview Icon"
                  autoFocus={false}
                  disabled={false}
                />

                <Button
                  className={`${styles.deleteIcon} ${styles.icon}`}
                  buttonChildren=""
                  buttonType="roundStandardFeed"
                  buttonSize=""
                  name="delete-icon"
                  type="button"
                  ariaLabel="Delete Icon"
                  autoFocus={false}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyAdsCard;
