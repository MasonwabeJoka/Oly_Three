import styles from "./MyAdsCard.module.scss";
import Button from "../Buttons";
import Image from "next/image";
import Avatar from "@/components/Avatars";
import Pill from "@/components/Pill";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface CardProps {
  id: number;
  images: string;
  title: string;
  userName?: string;
  description: string;
  suburb: string;
  city: string;
  likesCount: number;
  viewsCount: number;
  viewsCountToday: number;
  bidsCount: number;
  unreadMessages: number;
  postAge: string;
  adStatus: string;
  expiryDate: string;
  price: string;
  avatar?: string;
}

const MyAdsCard = ({
  id,
  images,
  title,
  userName,
  description,
  suburb,
  city,
  likesCount,
  viewsCount,
  viewsCountToday,
  bidsCount,
  unreadMessages,
  postAge,
  adStatus,
  expiryDate,
  price,
  avatar,
}: CardProps): JSX.Element => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const analyticsRef = useRef<HTMLDivElement | null>(null);
  const statsIconRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(analyticsRef, () => {
    if (!statsIconRef.current) {
      setShowAnalytics(false);
    }
  });

  console.log("DIV", statsIconRef.current);
  const detailsStyles = {
    borderRadius: showAnalytics ? "0 2rem 0 0" : "0 2rem 2rem 0",
    boxShadow: showAnalytics
      ? "none"
      : "0px 1px 3px 0px rgba(180, 191, 203, 0.2), 0px 5px 5px 0px rgba(180, 191, 203, 0.17), 0px 11px 7px 0px rgba(180, 191, 203, 0.1), 0px 20px 8px 0px rgba(180, 191, 203, 0.03), 0px 30px 9px 0px rgba(180, 191, 203, 0)",
  };
  const Analytics = () => {
    return (
      <>
        <div className={styles.analyticsItemsContainer}>
          <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
            <div>Ad Id</div>
            <div>{id}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
            <div>Status</div>
            <div>{adStatus}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
            <div>Last Posted</div>
            <div>{postAge}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
            <div>Expires</div>
            <div>{expiryDate}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
            <div>Bids</div>
            <div>{bidsCount}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
            <div>Likes</div>
            <div>{likesCount}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
            <div>Todays Views</div>
            <div>{viewsCountToday}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteTwo}`}>
            <div>Total Views</div>
            <div>{viewsCount}</div>
          </div>
          <div className={`${styles.analyticsItems} ${styles.whiteOne}`}>
            <div>Unread Messages</div>
            <div>{unreadMessages}</div>
          </div>
        </div>
      </>
    );
  };
  return (
    <article className={styles.adCard}>
      <div className={styles.adCardMainSection}>
        <div className={styles.imageContainer}>
          <div
            style={{
              height: "270px",
              backgroundColor: "#f3f7fa",
              marginTop: "9px",
              borderRadius: "2rem 0 0 2rem",
            }}
          >
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
        </div>

        <div className={styles.details} style={detailsStyles}>
          <Link
            href="/dashboard/my-ads/promote-your-ads"
            className={styles.pill}
          >
            <Pill child="Promote Ad" colour="#CCF6FF" />
          </Link>
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsTextContainer}>
              <Avatar
                className={styles.avatar}
                avatarSize="regular"
                avatar={avatar}
                isOnline={false}
              />

              <div className={styles.detailsText}>
                <div className={styles.titleWrapper}>
                  <h3
                    className={styles.title}
                    style={{
                      fontSize: title.length > 48 ? "20px" : "24px",
                    }}
                  >
                    {`${
                      title.length > 38
                        ? `${title.slice(0, 36)}...`
                        : title.slice(0, 36)
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
                  <p className={styles.price}>{price}</p>
                  <div className={styles.icons}>
                    <div ref={statsIconRef}>
                      <Button
                        className={`${styles.statsIconBtn} ${styles.icon}`}
                        buttonChildren={
                          <Icon
                            className={styles.statsIcon}
                            src="/icons/analytics.png"
                            alt="Edit Button"
                            width={18}
                            height={18}
                          />
                        }
                        buttonType="roundStandardFeed"
                        buttonSize=""
                        name="stats-icon"
                        type="button"
                        ariaLabel="Stats Icon"
                        autoFocus={false}
                        disabled={false}
                        onClick={() => setShowAnalytics((prev) => !prev)}
                      />
                    </div>
                    <Link href="/dashboard/post-your-ad/home">
                      <Button
                        className={`${styles.editIconBtn} ${styles.icon}`}
                        buttonChildren={
                          <Icon
                            className={styles.editIcon}
                            src="/icons/pencil.svg"
                            alt="Edit Button"
                            width={18}
                            height={18}
                          />
                        }
                        buttonType="roundStandardFeed"
                        buttonSize=""
                        name="edit-icon"
                        type="button"
                        ariaLabel="Edit Icon"
                        autoFocus={false}
                        disabled={false}
                      />
                    </Link>
                    <Link href="/dashboard/#">
                      <Button
                        className={`${styles.previewIconBtn} ${styles.icon}`}
                        buttonChildren={
                          <Icon
                            className={styles.previewIcon}
                            src="/icons/view.png"
                            alt="Edit Button"
                            width={18}
                            height={18}
                          />
                        }
                        buttonType="roundStandardFeed"
                        buttonSize=""
                        name="preview-icon"
                        type="button"
                        ariaLabel="Preview Icon"
                        autoFocus={false}
                        disabled={false}
                      />
                    </Link>

                    <Button
                      className={`${styles.deleteIconBtn} ${styles.icon}`}
                      buttonChildren={
                        <Icon
                          className={styles.deleteIcon}
                          src="/icons/delete.png"
                          alt="Edit Button"
                          width={18}
                          height={18}
                        />
                      }
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
        </div>
      </div>
      {showAnalytics && (
        <div className={styles.analyticsSection} ref={analyticsRef}>
          <Analytics />
        </div>
      )}
    </article>
  );
};

export default MyAdsCard;
