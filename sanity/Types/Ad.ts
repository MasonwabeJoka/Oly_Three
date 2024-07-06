import { PortableTextBlock } from "sanity";
import { Details } from "./Details";
import { User } from "./User";

type Image = {
    _key: string;
    url: string;
    aspectRatio?: number;
    width?: number;
    height?: number;
    alt: string;
}
export type Ad = {
    _id: string;
    slug: string;
    user: User;
    userId: string;
    title: string;
    description: PortableTextBlock[];
    price: number;
    pricingOption: 'Negotiable' | 'Free' | 'Auction' | 'Fixed Price' | 'Contact for Price';
    images: Image[];
    featuredImage: Image;
    postedOn: string;
    details: Details;
    features: string[];
    condition: 'new' | 'like-new' | 'gently-used' | 'used';
    quantity?: number;
    avatar: {
      _ref: string;
      _type: string;
    };
    location: {
      suburb: string;
      city: string;
    };
    city: string;
    suburb: string;
    attachment?: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    promotions: {
      platform: 'oly' | 'facebook' | 'google-ads' | 'instagram' | 'linkedin';
      duration: '1day' | '7days' | '2weeks' | '1month' | '3months';
      remainingDays: number;
    }[];
    bids: {
      _ref: string;
      _type: string;
    }[];
    likes?: number;
    todaysViews?: number;
    totalViews?: number;
    unreadMessages?: number;
    associatedAuction?: {
      _ref: string;
      _type: string;
    };
  };
  