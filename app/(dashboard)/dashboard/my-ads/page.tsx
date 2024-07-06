"use client";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { listingsData } from "@/data/ListingsData";
import useArticlesStore from "@/store/articlesStore";
import MyAdsCard from "@/components/cards/MyAdsCard";

const MyAds = () => {
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.title}>My Ads</h4>
      </div>
      <div className={styles.cardsContainer}>
        {listingsData.map((listing, index) => {
          return (
            <div key={listing.id}>
              <MyAdsCard
                id={listing.id}
                key={listing.id}
                images={listing.images}
                userName={listing.userName}
                title={listing.title}
                price={listing.price}
                description={listing.description}
                suburb={listing.location.suburb}
                city={listing.location.city}
                likesCount={listing.likesCount}
                viewsCountToday={listing.viewsCountToday}
                viewsCount={listing.viewsCount}
                postAge={listing.postAge}
                expiryDate={listing.expiryDate}
                bidsCount={listing.bidsCount}
                adStatus={listing.adStatus}
                unreadMessages={listing.unreadMessages}
                avatar={avatars ? avatars[index] : ""}
              />

              {/* <div>
              <div>
                <Button
                  className={styles.statsIcon}
                  buttonChildren="Stats"
                  buttonType="icon"
                  buttonSize=""
                  name="stats-icon"
                  type="button"
                  ariaLabel="Stats Icon"
                  autoFocus={false}
                  disabled={false}
                />
                <Button
                  className={styles.editIcon}
                  buttonChildren="Edit"
                  buttonType="icon"
                  buttonSize=""
                  name="edit-icon"
                  type="button"
                  ariaLabel="Edit Icon"
                  autoFocus={false}
                  disabled={false}
                />
                <Button
                  className={styles.previewIcon}
                  buttonChildren="Preview"
                  buttonType="icon"
                  buttonSize=""
                  name="preview-icon"
                  type="button"
                  ariaLabel="Preview Icon"
                  autoFocus={false}
                  disabled={false}
                />

                <Button
                  className={styles.deleteIcon}
                  buttonChildren="Delete"
                  buttonType="icon"
                  buttonSize=""
                  name="delete-icon"
                  type="button"
                  ariaLabel="Delete Icon"
                  autoFocus={false}
                  disabled={false}
                />
              </div>
            </div> */}
              {/* Stats */}
              {/* <div className={styles.stats}>
              <div>
                <span>Ad Id</span>
                <span>{listing.id}</span>
              </div>
              <div>
                <span>Status</span>
                {listing.adStatus}
              </div>
              <div>
                <span>Last posted</span>
                <span>{`${listing.postAge} ago`}</span>
              </div>
              <div>
                <span>Expires</span>
                <span>{listing.expiryDate}</span>
              </div>
              <div>
                <span>Bids</span>
                <span>{listing.bidsCount}</span>
              </div>
              <div>
                <span>Likes</span>
                <span>{listing.likesCount}</span>
              </div>
              <div>
                <span>Today’s views</span>
                <span>{listing.viewsCountToday}</span>
              </div>
              <div>
                <span>Total views</span>
                <span>{listing.viewsCount}</span>
              </div>
              <div>
                <span>Unread messages</span>
                <span>{listing.unreadMessages}</span>
              </div>
            </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAds;
