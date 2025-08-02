import { type SchemaTypeDefinition } from 'sanity'
import { ad } from "./documents/ad"
import { address } from "./documents/address"
import { auction } from "./documents/auction"
import { auctionLot } from "./documents/auctionLot"
import { auditEntry } from "./documents/auditEntry"
import { bid } from "./documents/bid"
import { bidderHistory } from "./documents/bidderHistory"
import { conversation } from "./documents/conversation"
import { dealerProfile } from './documents/dealerProfile'
import { group } from "./documents/group"
import { listingPackage } from "./documents/listingPackages"
import { location } from "./documents/location"
import { locationAlertSettings } from "./documents/locationAlertSettings"
import { locationBasedAdTargeting } from "./documents/locationBasedAdTargeting"
import { locationBasedSearch } from "./documents/locationBasedSearch"
import { locationHistory } from "./documents/locationHistory"
import { locationBasedRecommendationSettings } from "./documents/locationRecommendationSettings"
import { message } from "./documents/message"
import { messageFlag } from "./documents/messageFlag"
import { paymentMethod } from "./documents/paymentMethod"
import { regionalTrends } from "./documents/regionalTrends"
import { review } from "./documents/review"
import { slide } from "./documents/slides"
import { subscription } from "./documents/subscription"
import { transaction } from "./documents/transaction"
import { trendData } from "./documents/trendData"
import { upload } from "./documents/upload"
import { user } from "./documents/user"
import { userLocationConsent } from "./documents/userLocationConsent"
import { userLocationPreference } from "./documents/userLocationPreference"
import { Footer } from "./documents/footer"
import { socialMediaLink } from "./documents/socialMediaLink"
import { Features } from "./objects/Features"
import { FeaturedListings } from "./objects/FeaturedListings"
import { FeaturedCategories } from "./objects/FeaturedCategories"
import { Blog } from "./objects/Blog"
import { SponsoredArticles } from "./objects/SponsoredArticles"
import { page } from "./documents/page"
import { category } from "./documents/categories"
import { Details } from "./documents/details"
import { imageFile } from "./documents/imageFile"
import { videoFile } from "./documents/videoFile"
import { attachment } from "./documents/attachment"
import { auctionTest } from "./documents/auctionTest"
import { bankDetails } from "./documents/bankDetails"
import { propertyDetails } from "./documents/propertyDetails"
import { vehicleDetails } from "./documents/vehicleDetails"
import { jobDetails } from "./documents/jobDetails"
import { serviceDetails } from "./documents/serviceDetails"
import { userEngagement } from "./documents/userEngagement"
import { adPerformance } from "./documents/adPerformance"
import { moderationLog } from "./documents/moderationLog"
import { moderationComment } from "./documents/moderationComment"
import { storeOwner } from "./documents/storeOwner"
import { professionalServiceProvider } from "./documents/professionalServiceProvider"
import { flaggedContent } from "./documents/flaggedContent"
import { seoMetadata } from "./documents/seoMetadata"
import { promotion } from "./documents/promotion"
import { coupon } from "./documents/coupon"
import { makeModel } from "./documents/makeModel"
import { notification } from "./documents/notification"
import { notificationSettings } from "./documents/notificationSettings"
import { inspectionReport } from "./documents/inspectionReport"
import {siteLogo} from "./documents/siteLogo"
import { olyHomepage } from "./documents/layout/pages/olyHomepage/oly-homepage"
import {heroSection} from "./documents/layout/pages/olyHomepage/sections/hero-section"
import {moreFromOlySection} from "./documents/layout/pages/olyHomepage/sections/more-from-oly-section"
import {featuredServicesSection} from "./documents/layout/pages/olyHomepage/sections/featured-services-section"
import {featuredCategoriesSection} from "./documents/layout/pages/olyHomepage/sections/featured-categories-section"
import {featuredListingsSection} from "./documents/layout/pages/olyHomepage/sections/featured-listings-section"
import {olyArticlesSection} from "./documents/layout/pages/olyHomepage/sections/oly-articles-section"
import {sponsoredArticlesSection} from "./documents/layout/pages/olyHomepage/sections/sponsored-articles-section"
import {olyHiringHomepage} from "./documents/layout/pages/olyHiringHomepage/oly-hiring-homepage"
import {olyServicesHomepage} from "./documents/layout/pages/olyServicesHomepage/oly-services-homepage"
import {olyAutoHomepage} from "./documents/layout/pages/olyAutoHomepage/oly-auto-homepage"
import {adSection} from "./documents/layout/ad-section"
import { bottomAdSection } from "./documents/layout/pages/olyHomepage/sections/bottom-ad-section"
import {topAdSection} from "./documents/layout/pages/olyHomepage/sections/top-ad-section"
import {articleCard} from "./documents/layout/pages/article/article-card"
import {articleCategory} from "./documents/layout/pages/article/article-category"
import {articlePage} from "./documents/layout/pages/article/article-page"
import {author} from "./documents/layout/pages/article/author"
import {articleSidebar} from "./documents/layout/pages/article/sections/article-sidebar"
import {commentsSection} from "./documents/layout/pages/article/sections/comments-section"
import {sponsoredArticle} from "./documents/layout/temp/temp-sponsoredArticle"
import {sponsor} from "./documents/layout/temp/temp-sponsor"


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    user,
    ad,
    auction,
    bid,
    bidderHistory,
    listingPackage,
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
    Footer,
    socialMediaLink,
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
    inspectionReport,
    videoFile,
    attachment,
    auctionTest,
    bankDetails,
    propertyDetails,
    vehicleDetails,
    jobDetails,
    serviceDetails,
    userEngagement,
    adPerformance,
    makeModel,
    moderationLog,
    moderationComment,
    flaggedContent,
    seoMetadata,
    promotion,
    coupon,
    notification,
    notificationSettings,
    dealerProfile,
    storeOwner,
    professionalServiceProvider,
    siteLogo,
    olyHomepage,
    heroSection,
    moreFromOlySection,
    featuredServicesSection,
    featuredCategoriesSection,
    featuredListingsSection,
    olyArticlesSection,
    sponsoredArticlesSection,
    // olyHiringHomepage,
    // olyServicesHomepage,
    // olyAutoHomepage,
    adSection,
    bottomAdSection,
    topAdSection,
    articleCard,
    articleCategory,
    articlePage,
    author,
    articleSidebar,
    commentsSection,
    sponsoredArticle,
    sponsor,
  ],
};