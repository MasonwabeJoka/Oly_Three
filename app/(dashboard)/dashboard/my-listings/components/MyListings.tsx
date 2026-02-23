"use client";
import { useEffect } from "react";
import useArticlesStore from "@/store/articlesStore";
import MyListingsCard from "@/components/cards/MyListingsCard";
import { images } from "@/data/galleryImages";
import ListingCardSkeletons from "@/components/skeletons/ListingCardSkeletons";

interface MyAdsProps {
  listingsData: any[];
}

const MyAds = ({ listingsData }: MyAdsProps) => {
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  return (
    <>
      {!listingsData.length ? (
        <ListingCardSkeletons
          isDashboard
          orientation="expanded"
          skeletonCount={10}
        />
      ) : (
        listingsData.map((listing: any, index: number) => {
          const listingId = listing.id ?? listing._id ?? index;

          return (
            <div key={listingId}>
              <MyListingsCard
                id={listingId}
                images={images.map((img) => img.url)}
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
        })
      )}
    </>
  );
};

export default MyAds;
