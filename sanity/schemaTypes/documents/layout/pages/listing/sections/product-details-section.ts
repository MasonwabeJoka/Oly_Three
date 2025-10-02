import { defineType, defineField } from "sanity"

export const productDetailsSection = defineType({
  name: "productDetailsSection",
  title: "Product Details Section",
  type: "document",
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Product Details Configuration Title",
      type: "string",
      initialValue: "Listing Product Details Section",
      description: "Internal title for this product details configuration.",
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this product details section is currently active.",
    }),

    defineField({
      name: "listingType",
      title: "Listing Type",
      type: "string",
      options: {
        list: [
          { title: "Fixed Price", value: "fixed-price" },
          { title: "Auction", value: "auction" },
        ],
      },
      initialValue: "fixed-price",
      validation: (Rule) => Rule.required(),
      description: "Type of listing - determines available fields and functionality.",
    }),

    defineField({
      name: "productInfo",
      title: "Product Information",
      type: "object",
      fields: [
        defineField({
          name: "productTitle",
          title: "Product Title",
          type: "string",
          validation: (Rule) => Rule.required().max(100),
          description: "Main product title displayed to users.",
        }),

        defineField({
          name: "productDescription",
          title: "Product Description",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required().max(1000),
          description: "Detailed product description.",
        }),

        defineField({
          name: "condition",
          title: "Product Condition",
          type: "string",
          options: {
            list: [
              { title: "New", value: "new" },
              { title: "Like New", value: "like-new" },
              { title: "Good", value: "good" },
              { title: "Fair", value: "fair" },
              { title: "Poor", value: "poor" },
            ],
          },
          description: "Condition of the product.",
        }),

        defineField({
          name: "location",
          title: "Location",
          type: "string",
          description: "Product location or shipping origin.",
        }),
      ],
      description: "Basic product information.",
    }),

    // Fixed Price Fields
    defineField({
      name: "fixedPriceSettings",
      title: "Fixed Price Settings",
      type: "object",
      hidden: ({ parent }) => parent?.listingType !== "fixed-price",
      fields: [
        defineField({
          name: "price",
          title: "Price",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
          description: "Fixed price for the product.",
        }),

        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          options: {
            list: [
              { title: "South African Rand (R)", value: "ZAR" },
              { title: "US Dollar ($)", value: "USD" },
              { title: "Euro (€)", value: "EUR" },
              { title: "British Pound (£)", value: "GBP" },
            ],
          },
          initialValue: "ZAR",
          description: "Currency for the price.",
        }),

        defineField({
          name: "showBuyNowButton",
          title: "Show Buy Now Button",
          type: "boolean",
          initialValue: true,
          description: "Display buy now button.",
        }),

        defineField({
          name: "buyNowButtonText",
          title: "Buy Now Button Text",
          type: "string",
          initialValue: "Buy Now",
          hidden: ({ parent }) => !parent?.showBuyNowButton,
          description: "Text for the buy now button.",
        }),

        defineField({
          name: "showContactSellerButton",
          title: "Show Contact Seller Button",
          type: "boolean",
          initialValue: true,
          description: "Display contact seller button.",
        }),

        defineField({
          name: "contactSellerButtonText",
          title: "Contact Seller Button Text",
          type: "string",
          initialValue: "Contact Seller",
          hidden: ({ parent }) => !parent?.showContactSellerButton,
          description: "Text for the contact seller button.",
        }),
      ],
      description: "Settings specific to fixed price listings.",
    }),

    // Auction Fields
    defineField({
      name: "auctionSettings",
      title: "Auction Settings",
      type: "object",
      hidden: ({ parent }) => parent?.listingType !== "auction",
      fields: [
        defineField({
          name: "currentPrice",
          title: "Current Price",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
          description: "Current highest bid amount.",
        }),

        defineField({
          name: "buyNowPrice",
          title: "Buy Now Price",
          type: "number",
          description: "Optional buy now price to end auction immediately.",
        }),

        defineField({
          name: "startingBid",
          title: "Starting Bid",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
          description: "Minimum starting bid amount.",
        }),

        defineField({
          name: "bidIncrement",
          title: "Bid Increment",
          type: "number",
          initialValue: 10,
          validation: (Rule) => Rule.required().min(1),
          description: "Minimum amount to increase bid.",
        }),

        defineField({
          name: "auctionEndTime",
          title: "Auction End Time",
          type: "datetime",
          validation: (Rule) => Rule.required(),
          description: "When the auction ends.",
        }),

        defineField({
          name: "showBidHistory",
          title: "Show Bid History",
          type: "boolean",
          initialValue: true,
          description: "Display bid history to users.",
        }),

        defineField({
          name: "showBidderCount",
          title: "Show Bidder Count",
          type: "boolean",
          initialValue: true,
          description: "Display number of unique bidders.",
        }),

        defineField({
          name: "showTimeRemaining",
          title: "Show Time Remaining",
          type: "boolean",
          initialValue: true,
          description: "Display countdown timer.",
        }),

        defineField({
          name: "placeBidButtonText",
          title: "Place Bid Button Text",
          type: "string",
          initialValue: "Place Bid",
          description: "Text for the place bid button.",
        }),

        defineField({
          name: "buyNowButtonText",
          title: "Buy Now Button Text",
          type: "string",
          initialValue: "Buy Now",
          hidden: ({ parent }) => !parent?.buyNowPrice,
          description: "Text for the buy now button.",
        }),
      ],
      description: "Settings specific to auction listings.",
    }),

    defineField({
      name: "actionButtons",
      title: "Action Buttons",
      type: "object",
      fields: [
        defineField({
          name: "buttonLayout",
          title: "Button Layout",
          type: "string",
          options: {
            list: [
              { title: "Stacked (Vertical)", value: "stacked" },
              { title: "Side by Side", value: "horizontal" },
              { title: "Full Width", value: "full-width" },
            ],
          },
          initialValue: "stacked",
          description: "Layout arrangement for action buttons.",
        }),

 

      ],
      description: "Configuration for action buttons.",
    }),

    defineField({
      name: "priceDisplay",
      title: "Price Display",
      type: "object",
      fields: [
        defineField({
          name: "showCurrencySymbol",
          title: "Show Currency Symbol",
          type: "boolean",
          initialValue: true,
          description: "Display currency symbol with price.",
        }),

      


      ],
      description: "Price display formatting options.",
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      description: "When this product details configuration was published.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      listingType: "listingType",
      productTitle: "productInfo.productTitle",
      price: "fixedPriceSettings.price",
      currentPrice: "auctionSettings.currentPrice",
    },
    prepare(selection) {
      const { title, isActive, listingType, productTitle, price, currentPrice } = selection
      const displayPrice = listingType === "auction" ? currentPrice : price

      return {
        title: title || "Product Details Configuration",
        subtitle: `${isActive ? "✅ Active" : "❌ Inactive"} - ${listingType} ${displayPrice ? `(R${displayPrice})` : ""}`,
        media: "💰",
      }
    },
  },
})
