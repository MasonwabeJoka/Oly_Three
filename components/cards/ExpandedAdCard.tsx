import styles from "./ExpandedAdCard.module.scss";
import Button from "../Buttons";
import Image from "next/image";
import Avatar from "../Avatar";

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

const ExpandedAdCard = ({
  images,
  title,
  description,
  suburb,
  city,
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

        <div className={styles.likeIconContainer}>
          <div className={styles.likeIconBG}>
            <Button
              className={styles.likeIcon}
              buttonChildren="heart"
              buttonType="icon"
              buttonSize=""
              name="Like Icon"
              type="submit"
              ariaLabel="Like Icon"
              autoFocus={false}
              disabled={false}
            />
          </div>
        </div>
      </div>

      <div className={styles.details}>
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
                {`${title.length > 42 ? `${title.slice(0, 52)}...` : title.slice(0, 72)}`}
              </h3>

              <div className={styles.location}>
                <p className={styles.locationText}>
                  {suburb}, {city}
                </p>
              </div>
            </div>
            <p className={styles.description}>
              {" "}
              {description.length > 210
                ? `${description.slice(0, 230)}...`
                : description}
            </p>
            <div className={styles.cardBottom}>
              <h2 className={styles.price}>{price}</h2>
              <div className={styles.postMetrics}>
                {/* <div className={styles.postAge}>{`Posted ${postAge} ago`}</div> */}
                <div className={styles.postAge}>{postAge}</div>
                {/* <div className={styles.viewCount}>{`${viewsCount} views`}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ExpandedAdCard;
