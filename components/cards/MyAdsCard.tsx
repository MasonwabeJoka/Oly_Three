import styles from "./MyAdsCard.module.scss";
import Button from "../Buttons";
import Image from "@/components/Image";
import Avatar from "@/components/Avatar";
import Pill from "@/components/Pill";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import ListingCard from "./ListingCard";
import { adAnalyticsData } from "@/data/adDataAnalytics";
import ListingCardAnalytics from "./ListingCardAnalytics";
import { images } from "@/data/galleryImages";

const adCardMockData = {
  category: "property",
  ad: null,
  index: 0,
  cardType: "expanded",
  id: "PROP789012",
  images: images,
  title: "Spacious 3-Bedroom Apartment in City Center",
  description: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "A beautiful and modern 3-bedroom apartment located in the heart of the city. Features include an open-plan living area, a fully equipped kitchen, and stunning city views.A beautiful and modern 3-bedroom apartment located in the heart of the city. Features include an open-plan living area, a fully equipped kitchen, and stunning city views.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        { _type: "span", text: "Close to public transport, shops, and parks." },
      ],
    },
  ],
  postAge: "",
  price: 350000,
  cardSize: "large",
  aspectRatios: [16, 9],
  width: 800,
  height: 600,
  isFeed: true,
  isDashboard: false,
  isDeletable: true,
  checkedColour: "#4CAF50",
  hoverColour: "#8BC34A",
  checkedHovered: "#388E3C",
  avatar: "https://via.placeholder.com/50x50/2196F3/FFFFFF?text=U",
  suburb: "Downtown",
  city: "Metropolis",
};

const adCardBoxMockData = {
  category: "vehicles",
  ad: [1, 2],
  index: 1,
  cardType: "box",
  id: "VEH345678",
  images: ["https://via.placeholder.com/600x400/FFC300/FFFFFF?text=Car+Image"],
  title: "Used Sedan - Low Mileage",
  description:
    "A well-maintained sedan with only 30,000 miles. Perfect for daily commuting.",
  postAge: "1 week ago",
  price: 18000,
  cardSize: "standard",
  aspectRatios: [3, 2],
  width: 600,
  height: 400,
  isFeed: true,
  isDashboard: false,
  isDeletable: false,
  checkedColour: "#FF9800",
  hoverColour: "#FFB74D",
  checkedHovered: "#F57C00",
  avatar: "https://via.placeholder.com/50x50/9C27B0/FFFFFF?text=A",
  suburb: "Suburbia",
  city: "Metropolis",
};
interface CardProps {
  id: number;
  images: string[];
  title: string;
  userName?: string;
  description: string;
  descriptionLength?: number;
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
  price: string | number;
  avatar?: string;
}

const MyAdsCard = (props: CardProps) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const analyticsRef = useRef<HTMLDivElement | null>(null);
  const statsIconRef = useRef<HTMLDivElement | null>(null);
  const {
    id,
    images,
    title,
    description,
    postAge,
    price,
    avatar,
    city,
    suburb,
    likesCount,
    viewsCount,
    viewsCountToday,
    bidsCount,
    unreadMessages,
    adStatus,
    expiryDate,
  } = props;

  useOnClickOutside([analyticsRef, statsIconRef] as any, () => {
    setShowAnalytics(false);
  });

  const detailsStyles = {
    borderRadius: showAnalytics ? "0 2rem 0 0" : "0 2rem 2rem 0",
    boxShadow: showAnalytics
      ? "none"
      : "0px 1px 3px 0px rgba(180, 191, 203, 0.2), 0px 5px 5px 0px rgba(180, 191, 203, 0.17), 0px 11px 7px 0px rgba(180, 191, 203, 0.1), 0px 20px 8px 0px rgba(180, 191, 203, 0.03), 0px 30px 9px 0px rgba(180, 191, 203, 0)",
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <ListingCard
          category="all"
          listing={adCardMockData as any}
          id={id}
          index={0}
          aspectRatios={[16, 9]}
          width={310}
          height={248}
          cardType="expanded"
          imageUrls={images}
          title={title}
          description={description}
          descriptionLength={200}
          postAge={postAge}
          price={typeof price === "string" ? parseInt(price) || 0 : price}
          cardSize="standard"
          isFeed={false}
          isDashboard={true}
          isDeletable={false}
          checkedColour="#fff"
          hoverColour="#fff"
          checkedHovered="#fff"
          avatar={avatar}
          city={city}
          suburb={suburb}
        />
        {likesCount > 0 && (
          <div className={styles.iconsContainer}>
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
              <Link href="/dashboard/create-listing/home">
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

              <Link
                href="/dashboard/my-listings/promote-your-ads"
                className={styles.pill}
              >
                <Pill
                  child="Promote Ad"
                  colour="#CCF6FF"
                  shadow={false}
                  boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
      {showAnalytics && (
        <div className={styles.analyticsSection} ref={analyticsRef}>
          <ListingCardAnalytics adAnalyticsData={adAnalyticsData} />
        </div>
      )}
      <article className={styles.adCard}>
        {/* <div className={styles.adCardMainSection}>
        

        <div className={styles.details} style={detailsStyles}>
        
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
                
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </article>
    </div>
  );
};

export default MyAdsCard;
