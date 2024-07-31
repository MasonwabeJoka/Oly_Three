import { ad } from "./documents/ad"
import { address } from "./documents/address"
import { auction } from "./documents/auction"
import { auctionLot } from "./documents/auctionLot"
import { auditEntry } from "./documents/auditEntry"
import { bid } from "./documents/bid"
import { bidderHistory } from "./documents/bidderHistory"
import { conversation } from "./documents/conversation"
import {group} from "./documents/group"
import {Home} from "./pages/Home"
import { location } from "./objects/location"
import { locationAlertSettings } from "./documents/locationAlertSettings"
import { locationBasedAdTargeting } from "./documents/locationBasedAdTargeting"
import {locationBasedSearch} from "./documents/locationBasedSearch"
import { locationHistory } from "./documents/locationHistory"
import { locationBasedRecommendationSettings } from "./documents/locationRecommendationSettings"
import { message } from "./documents/message"
import { messageFlag } from "./documents/messageFlag"
import {paymentMethod} from "./documents/paymentMethod"
import { regionalTrends } from "./documents/regionalTrends"
import { review } from "./documents/review"
import { subscription } from "./documents/subscription"
import { transaction } from "./documents/transaction"
import { trendData } from "./documents/trendData"
import { upload } from "./documents/upload"
import {user} from "./documents/user"
import { userLocationConsent } from "./documents/userLocationConsent"
import { userLocationPreference } from "./documents/userLocationPreference"
import { Footer } from "./globals/Footer"
import { socialMediaLink } from "./documents/socialMediaLink"
import { HeroSection } from "./objects/HeroSection"
import { Features } from "./objects/Features"
import { FeaturedListings } from "./objects/FeaturedListings"
import { FeaturedCategories } from "./objects/FeaturedCategories"
import { Blog } from "./objects/Blog"
import { SponsoredArticles } from "./objects/SponsoredArticles"
import { slide } from "./documents/slides"
import { page } from "./documents/page"
import { category } from "./documents/categories"
import { Details } from "./documents/details"
import {imageFile} from "./documents/imageFile"
import {videoFile} from "./documents/videoFile"
import {attachment} from "./documents/attachment"


export const schemas = [
    user,
    ad,
    auction,
    bid,
    bidderHistory,
    location,
    locationAlertSettings,
    locationBasedAdTargeting,
    locationBasedSearch,
    locationHistory,
    locationBasedRecommendationSettings,
    regionalTrends,
    userLocationConsent,
    userLocationPreference,
    auctionLot,
    paymentMethod,
    subscription,
    transaction,
    review,
    group,
    message,
    conversation,
    messageFlag,
    auditEntry,
    trendData,
   address,
   upload,
    Home,
    Footer,
    socialMediaLink,
    HeroSection,
    Features,
    FeaturedListings,
    FeaturedCategories,
    Blog,
    SponsoredArticles,
    slide,
    page,
    category,
    Details,
    imageFile,
    videoFile,
    attachment,
]
