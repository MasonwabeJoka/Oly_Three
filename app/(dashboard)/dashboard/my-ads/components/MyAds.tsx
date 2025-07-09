"use client";
import { useEffect } from "react";
import useArticlesStore from "@/store/articlesStore";
import MyAdsCard from "@/components/cards/MyAdsCard";
import styles from "./styles.module.scss";

const MyAds = ({ listingsData }) => {
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  return (
    <>
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
          </div>
        );
      })}
    </>
  );
};

export default MyAds;
