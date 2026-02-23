export type FormDataFields =
  | "category.main"
  | "category.subcategory"
  | "details.condition"
  | "titleAndDescription.title"
  | "titleAndDescription.description"
  | "listingType"
  | "price.pricingOption"
  | "price.amount"
  | "price.startingPrice"
  | "price.buyNowPrice"
  | "price.startTime"
  | "price.auctionDuration"
  | "createAccount.bankName"
  | "createAccount.accountHolder"
  | "createAccount.accountNumber"
  | "uploadPhotos"
  | "uploadVideos"
  | "uploadAttachments"
  | "uploadMedia.uploadPhotos"
  | "uploadMedia.uploadVideos"
  | "uploadMedia.uploadAttachments"
  | "location.province"
  | "location.city"
  | "location.suburb"
  | "location.customLocation"
  | "promoteYourAd.promotionDuration"
  | "reviewYourAd";

export interface StepType {
  title: string;
  content: React.ReactNode;
  path: string;
  fields: FormDataFields[];
}

export type FormData = {
  category: { main: string; subcategory: string };
  details: { condition: string };
  listingType: "sale" | "auction";
  price: {
    pricingOption: string;
    amount: number;
    startingPrice?: number;
    buyNowPrice?: number;
    startTime?: string;
    auctionDuration?: string;
  };
  createAccount: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
  };
  titleAndDescription: {
    title: string;
    description: string;
  };
  uploadPhotos: boolean;
  uploadVideos: boolean;
  uploadAttachments: boolean;
  uploadMedia: {
    uploadPhotos: boolean;
    uploadVideos: boolean;
    uploadAttachments: boolean;
  };
  location: {
    province: string;
    city: string;
    suburb: string;
    customLocation?: string;
  };
  promoteYourAd: { promotionDuration: string };
  reviewYourAd?: string;
};

export type SiteType = "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services";

export interface CreateListingStepsProps {
  currentSite?: SiteType;
  currentStep?: string;
}
