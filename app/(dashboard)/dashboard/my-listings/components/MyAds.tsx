"use client";
import { useEffect } from "react";
import useArticlesStore from "@/store/articlesStore";
import MyAdsCard from "@/components/cards/MyAdsCard";
import { images } from "@/data/galleryImages";
import Listing from "@/app/(root)/listings/[slug]/components/Listing";
import ListingCardSkeleton from "@/components/skeletons/ListingCardSkeleton";
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
          return (
            <div key={listing.id}>
              <MyAdsCard
                id={listing.id}
                key={listing.id}
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
