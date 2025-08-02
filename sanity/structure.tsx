// https://www.sanity.io/docs/studio/structure-builder-cheat-sheet
import React from "react";
import type { StructureResolver, ComponentTool } from "sanity";
import { Card, Text, Stack } from "@sanity/ui";
import {
  FaTachometerAlt,
  FaUsers,
  FaAd,
  FaGavel,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaFileAlt,
  FaGlobe,
  FaHome,
  FaBlog,
  FaFlag,
  FaChartLine,
  FaUpload,
} from "react-icons/fa";

// StructureResolver for OLY classifieds websites
export const structure: StructureResolver = (S, context) => {
  const isAdmin = context.currentUser.roles.some(
    (role) => role.name === "administrator"
  );

  const DashboardComponent: ComponentTool["component"] = () => (
    <Card padding={4}>
      <Stack space={3}>
        <Text size={2} weight="semibold">
          Classifieds Dashboard
        </Text>
        <Text>
          View trends, user engagement, and key metrics across OLY, Oly
          Properties, Oly Auto, and Oly Hiring.
        </Text>
      </Stack>
    </Card>
  );

  return S.list()
    .title("Classifieds Content")
    .items([
      // Admin Dashboard (visible to admins only)
      ...(isAdmin
        ? [
            S.listItem()
              .title("Dashboard")
              .icon(FaTachometerAlt)
              .child(
                S.component().title("Dashboard").component(DashboardComponent)
              ),
            S.divider(),
          ]
        : []),

      // User Management (shared across all sites)
      S.listItem()
        .title("Users")
        .icon(FaUsers)
        .child(
          S.list()
            .title("User Management")
            .items([
              S.documentTypeListItem("user").title("User Profiles"),
              S.documentTypeListItem("userLocationConsent").title(
                "Location Consent"
              ),
              S.documentTypeListItem("userLocationPreference").title(
                "Location Preferences"
              ),
              S.documentTypeListItem("storeOwner").title("Store Owners"),
              S.documentTypeListItem("dealerProfile").title("Dealer Profiles"),
              ...(isAdmin
                ? [S.documentTypeListItem("auditEntry").title("Audit Logs")]
                : []),
            ])
        ),

      // Ads & Categories - Simplified without templates in structure
      S.listItem()
        .title("Ads & Categories")
        .icon(FaAd)
        .child(
          S.list()
            .title("Ads & Categories")
            .items([
              S.listItem()
                .title("OLY Ads")
                .child(
                  S.documentList()
                    .title("OLY Ads")
                    .schemaType("ad")
                    .filter('_type == "ad" && site == "oly"')
                ),
              S.listItem()
                .title("Oly Properties Ads")
                .child(
                  S.documentList()
                    .title("Oly Properties Ads")
                    .schemaType("ad")
                    .filter('_type == "ad" && site == "oly-properties"')
                ),
              S.listItem()
                .title("Oly Auto Ads")
                .child(
                  S.documentList()
                    .title("Oly Auto Ads")
                    .schemaType("ad")
                    .filter('_type == "ad" && site == "oly-auto"')
                ),
              S.listItem()
                .title("Oly Hiring Ads")
                .child(
                  S.documentList()
                    .title("Oly Hiring Ads")
                    .schemaType("ad")
                    .filter('_type == "ad" && site == "oly-hiring"')
                ),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("listingPackage").title(
                "Listing Packages"
              ),
            ])
        ),

      // Auctions (shared across all sites)
      S.listItem()
        .title("Auctions")
        .icon(FaGavel)
        .child(
          S.list()
            .title("Auctions")
            .items([
              S.documentTypeListItem("auction").title("Auctions"),
              S.documentTypeListItem("auctionLot").title("Auction Lots"),
              S.documentTypeListItem("bid").title("Bids"),
              S.documentTypeListItem("bidderHistory").title("Bidder History"),
              S.documentTypeListItem("auctionTest").title("Auction Tests"),
            ])
        ),

      // Location-Based Features (shared)
      S.listItem()
        .title("Location Features")
        .icon(FaMapMarkerAlt)
        .child(
          S.list()
            .title("Location Features")
            .items([
              S.documentTypeListItem("location").title("Locations"),
              S.documentTypeListItem("address").title("Addresses"),
              S.documentTypeListItem("locationAlertSettings").title(
                "Alert Settings"
              ),
              S.documentTypeListItem("locationBasedAdTargeting").title(
                "Ad Targeting"
              ),
              S.documentTypeListItem("locationBasedSearch").title(
                "Search Settings"
              ),
              S.documentTypeListItem("locationHistory").title(
                "Location History"
              ),
              S.documentTypeListItem(
                "locationBasedRecommendationSettings"
              ).title("Recommendations"),
              S.documentTypeListItem("regionalTrends").title("Regional Trends"),
            ])
        ),

      // Payments & Subscriptions (shared, admin-only)
      ...(isAdmin
        ? [
            S.listItem()
              .title("Payments")
              .icon(FaMoneyBill)
              .child(
                S.list()
                  .title("Payments & Subscriptions")
                  .items([
                    S.documentTypeListItem("paymentMethod").title(
                      "Payment Methods"
                    ),
                    S.documentTypeListItem("subscription").title(
                      "Subscriptions"
                    ),
                    S.documentTypeListItem("transaction").title("Transactions"),
                    S.documentTypeListItem("bankDetails").title("Bank Details"),
                  ])
              ),
            S.divider(),
          ]
        : []),

      // Site-Specific Content
      S.listItem()
        .title("Site Content")
        .icon(FaGlobe)
        .child(
          S.list()
            .title("Site Content")
            .items([
              // Network-wide Site Content
              S.listItem()
                .title("Network-Wide Content")
                .child(
                  S.list()
                    .title("Network-Wide Content")
                    .items([
                      S.documentTypeListItem("siteLogo").title("Network Logos"),
                      S.documentTypeListItem("page").title("Network Pages"),
                      S.documentTypeListItem("Footer").title("Network Footer"),
                      S.documentTypeListItem("socialMediaLink").title(
                        "Network Social Media Links"
                      ),
                    ])
                ),

              // OLY Content
              S.listItem()
                .title("OLY")
                .child(
                  S.list()
                    .title("OLY Content")
                    .items([
                      S.documentTypeListItem("page").title("Pages"),
                      S.documentTypeListItem("olyHomepage").title("Homepage"),
                      S.documentTypeListItem("heroSection").title(
                        "Hero Section"
                      ),
                      S.documentTypeListItem("Features").title("Features"),
                      S.documentTypeListItem("FeaturedListings").title(
                        "Featured Listings"
                      ),
                      S.documentTypeListItem("FeaturedCategories").title(
                        "Featured Categories"
                      ),
                      S.listItem()
                        .title("Sections & Layouts")
                        .child(
                          S.list()
                            .title("Sections & Layouts")
                            .items([
                              S.documentTypeListItem("Footer").title("Footer"),
                              // Add Navbar or other section types if defined
                            ])
                        ),
                      S.documentTypeListItem("siteLogo").title("OLY Logo"),
                      S.documentTypeListItem("socialMediaLink").title(
                        "Social Media Links"
                      ),
                    ])
                ),

              // Oly Properties Content
              S.listItem()
                .title("Oly Properties")
                .child(
                  S.list()
                    .title("Oly Properties Content")
                    .items([
                      S.documentTypeListItem("page").title("Pages"),
                      S.documentTypeListItem("olyHomepage").title("Homepage"),
                      S.documentTypeListItem("propertyDetails").title(
                        "Property Details"
                      ),
                      S.documentTypeListItem("heroSection").title(
                        "Hero Section"
                      ),
                      S.listItem()
                        .title("Sections & Layouts")
                        .child(
                          S.list()
                            .title("Sections & Layouts")
                            .items([
                              S.documentTypeListItem("Footer").title("Footer"),
                              // Add Navbar or other section types if defined
                            ])
                        ),
                      S.documentTypeListItem("siteLogo").title(
                        "Oly Properties Logo"
                      ),
                    ])
                ),

              // Oly Auto Content
              S.listItem()
                .title("Oly Auto")
                .child(
                  S.list()
                    .title("Oly Auto Content")
                    .items([
                      S.documentTypeListItem("page").title("Pages"),
                      // S.documentTypeListItem("olyAutoHomepage").title("Homepage"),
                      S.documentTypeListItem("vehicleDetails").title(
                        "Vehicle Details"
                      ),
                      S.documentTypeListItem("makeModel").title(
                        "Makes & Models"
                      ),
                      S.documentTypeListItem("inspectionReport").title(
                        "Inspection Reports"
                      ),
                      S.documentTypeListItem("dealerProfile").title(
                        "Dealer Profiles"
                      ),
                      S.documentTypeListItem("heroSection").title(
                        "Hero Section"
                      ),
                      S.listItem()
                        .title("Sections & Layouts")
                        .child(
                          S.list()
                            .title("Sections & Layouts")
                            .items([
                              S.documentTypeListItem("Footer").title("Footer"),
                              // Add Navbar or other section types if defined
                            ])
                        ),
                      S.documentTypeListItem("siteLogo").title("Oly Auto Logo"),
                    ])
                ),

              // Oly Hiring Content
              S.listItem()
                .title("Oly Hiring")
                .child(
                  S.list()
                    .title("Oly Hiring Content")
                    .items([
                      S.documentTypeListItem("page").title("Pages"),
                      S.documentTypeListItem("olyHomepage").title("Homepage"),
                      S.documentTypeListItem("jobDetails").title("Job Details"),
                      S.documentTypeListItem("serviceDetails").title(
                        "Service Details"
                      ),
                      S.documentTypeListItem("professionalServiceProvider").title(
                        "Professional Service Providers"
                      ),
                      S.documentTypeListItem("heroSection").title(
                        "Hero Section"
                      ),
                      S.listItem()
                        .title("Sections & Layouts")
                        .child(
                          S.list()
                            .title("Sections & Layouts")
                            .items([
                              S.documentTypeListItem("Footer").title("Footer"),
                              // Add Navbar or other section types if defined
                            ])
                        ),
                      S.documentTypeListItem("siteLogo").title(
                        "Oly Hiring Logo"
                      ),
                    ])
                ),

              // OLY Services Content
              S.listItem()
                .title("OLY Services")
                .child(
                  S.list()
                    .title("OLY Services Content")
                    .items([
                      S.documentTypeListItem("page").title("Pages"),
                      S.documentTypeListItem("olyHomepage").title("Homepage"),
                      S.documentTypeListItem("heroSection").title(
                        "Hero Section"
                      ),
                      S.documentTypeListItem("Features").title("Features"),
                      S.documentTypeListItem("FeaturedListings").title(
                        "Featured Listings"
                      ),
                      S.documentTypeListItem("FeaturedCategories").title(
                        "Featured Categories"
                      ),
                      S.listItem()
                        .title("Sections & Layouts")
                        .child(
                          S.list()
                            .title("Sections & Layouts")
                            .items([
                              S.documentTypeListItem("Footer").title("Footer"),
                              // Add Navbar or other section types if defined
                            ])
                        ),
                      S.documentTypeListItem("siteLogo").title(
                        "OLY Services Logo"
                      ),
                      S.documentTypeListItem("socialMediaLink").title(
                        "Social Media Links"
                      ),
                    ])
                ),
            ])
        ),
      // Blog & Sponsored Content (shared)
      S.listItem()
        .title("Blog & Articles")
        .icon(FaBlog)
        .child(
          S.list()
            .title("Blog & Articles")
            .items([
              S.documentTypeListItem("Blog").title("Blog Posts"),
              S.documentTypeListItem("SponsoredArticles").title(
                "Sponsored Articles"
              ),
              S.documentTypeListItem("slide").title("Slides"),
            ])
        ),

      // Reviews & Community (shared)
      S.listItem()
        .title("Community")
        .icon(FaUsers)
        .child(
          S.list()
            .title("Community")
            .items([
              S.documentTypeListItem("review").title("Reviews"),
              S.documentTypeListItem("group").title("Groups"),
              S.documentTypeListItem("conversation").title("Conversations"),
              S.documentTypeListItem("message").title("Messages"),
              S.documentTypeListItem("messageFlag").title("Flagged Messages"),
            ])
        ),

      // Media Uploads (shared)
      S.listItem()
        .title("Media")
        .icon(FaUpload)
        .child(
          S.list()
            .title("Media Uploads")
            .items([
              S.documentTypeListItem("imageFile").title("Images"),
              S.documentTypeListItem("videoFile").title("Videos"),
              S.documentTypeListItem("attachment").title("Attachments"),
              S.documentTypeListItem("upload").title("Uploads"),
            ])
        ),

      // Analytics & Moderation (admin-only)
      ...(isAdmin
        ? [
            S.listItem()
              .title("Analytics & Moderation")
              .icon(FaChartLine)
              .child(
                S.list()
                  .title("Analytics & Moderation")
                  .items([
                    S.documentTypeListItem("trendData").title("Trend Data"),
                    S.documentTypeListItem("userEngagement").title(
                      "User Engagement"
                    ),
                    S.documentTypeListItem("adPerformance").title(
                      "Ad Performance"
                    ),
                    S.documentTypeListItem("moderationLog").title(
                      "Moderation Logs"
                    ),
                    S.documentTypeListItem("flaggedContent").title(
                      "Flagged Content"
                    ),
                    S.documentTypeListItem("moderationComment").title(
                      "Moderation Comments"
                    ),
                  ])
              ),
            S.divider(),
          ]
        : []),

      // SEO & Promotions (shared)
      S.listItem()
        .title("SEO & Promotions")
        .icon(FaFileAlt)
        .child(
          S.list()
            .title("SEO & Promotions")
            .items([
              S.documentTypeListItem("seoMetadata").title("SEO Metadata"),
              S.documentTypeListItem("promotion").title("Promotions"),
              S.documentTypeListItem("coupon").title("Coupons"),
            ])
        ),

      // Notifications (shared)
      S.listItem()
        .title("Notifications")
        .icon(FaFlag)
        .child(
          S.list()
            .title("Notifications")
            .items([
              S.documentTypeListItem("notification").title("Notifications"),
              S.documentTypeListItem("notificationSettings").title(
                "Notification Settings"
              ),
            ])
        ),
    ]);
};
