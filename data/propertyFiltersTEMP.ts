// Exhaustive filter lists grouped for UI rendering.
// 2 arrays: RENT + SALE. Each item is a filter “definition” you can map to UI + query params.

export type FilterMode = "single" | "multiple";

export type FilterGroup =
  | "Location"
  | "Listing"
  | "Type & Tenure"
  | "Price & Costs"
  | "Size & Rooms"
  | "Building & Unit"
  | "Estate & Security"
  | "Amenities"
  | "Utilities & Backup Power"
  | "Lifestyle & Rules"
  | "Proximity & Commute"
  | "Media & Trust"
  | "Seller & Source"
  | "Recency & Performance"
  | "Sorting";

export type FilterDef = {
  key: string; // stable query key (URL param / API key)
  label: string;
  group: FilterGroup;
  mode: FilterMode;

  // optional config
  options?: Array<{ value: string; label: string }>;
  unit?: string; // "ZAR", "sqm", "km", "min"
  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  dependsOn?: string[]; // conditional UI display e.g. ["listingType=rent"]
  notes?: string;
};

/* -----------------------
   Shared option sets
------------------------ */
export const PROVINCES = [
  { value: "eastern_cape", label: "Eastern Cape" },
  { value: "free_state", label: "Free State" },
  { value: "gauteng", label: "Gauteng" },
  { value: "kwaZulu_natal", label: "KwaZulu-Natal" },
  { value: "limpopo", label: "Limpopo" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "north_west", label: "North West" },
  { value: "northern_cape", label: "Northern Cape" },
  { value: "western_cape", label: "Western Cape" },
];

const PROPERTY_TYPES = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment / Flat" },
  { value: "townhouse", label: "Townhouse" },
  { value: "duplex", label: "Duplex" },
  { value: "studio", label: "Studio" },
  { value: "room", label: "Room / Shared" },
  { value: "student_accommodation", label: "Student accommodation" },
  { value: "vacant_land", label: "Vacant land" },
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail" },
  { value: "industrial", label: "Industrial" },
  { value: "farm", label: "Farm" },
  { value: "smallholding", label: "Smallholding" },
];

const TENURE_TYPES = [
  { value: "freehold", label: "Freehold" },
  { value: "sectional_title", label: "Sectional title" },
  { value: "share_block", label: "Share block" },
];

const CONDITION = [
  { value: "new", label: "New" },
  { value: "good", label: "Good" },
  { value: "needs_renovation", label: "Needs renovation" },
];

const FURNISHING = [
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi_furnished", label: "Semi-furnished" },
  { value: "furnished", label: "Furnished" },
];

const SELLER_TYPE = [
  { value: "private", label: "Private seller/landlord" },
  { value: "agent", label: "Agent" },
  { value: "developer", label: "Developer" },
];

const SORT_OPTIONS = [
  { value: "best_match", label: "Best match" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "closest", label: "Closest to me" },
  { value: "most_viewed", label: "Most viewed" },
  { value: "most_saved", label: "Most saved" },
  { value: "recently_updated", label: "Recently updated" },
];

/* =========================================================
   RENT FILTERS (EXHAUSTIVE)
========================================================= */
export const RENT_FILTERS: FilterDef[] = [
  // Location
  {
    key: "q",
    label: "Keyword search",
    group: "Location",
    mode: "single",
    placeholder: "Search suburb, street, complex, features…",
  },
  { key: "province", label: "Province", group: "Location", mode: "single", options: PROVINCES },
  { key: "city", label: "City / Town", group: "Location", mode: "single", placeholder: "e.g. Cape Town" },
  { key: "suburb", label: "Suburb / Area", group: "Location", mode: "single", placeholder: "e.g. Umhlanga" },
  { key: "neighbourhood", label: "Neighbourhood", group: "Location", mode: "single" },
  { key: "postalCode", label: "Postal code", group: "Location", mode: "single" },
  { key: "geoRadius", label: "Radius search", group: "Location", mode: "single", unit: "km" },
  { key: "geoBounds", label: "Map bounds", group: "Location", mode: "single" },

  // Listing
  {
    key: "listingType",
    label: "Listing type",
    group: "Listing",
    mode: "single",
    options: [{ value: "rent", label: "To rent" }],
  },
  {
    key: "rentalMode",
    label: "Rental mode",
    group: "Listing",
    mode: "single",
    options: [
      { value: "long_term", label: "Long-term" },
      { value: "short_term", label: "Short-term" },
      { value: "rent_to_buy", label: "Rent-to-buy" },
    ],
  },

  // Type & tenure
  { key: "propertyType", label: "Property type", group: "Type & Tenure", mode: "multiple", options: PROPERTY_TYPES },
  { key: "tenureType", label: "Tenure type", group: "Type & Tenure", mode: "multiple", options: TENURE_TYPES },
  { key: "isInEstate", label: "In estate", group: "Type & Tenure", mode: "single" },
  { key: "estateName", label: "Estate name", group: "Type & Tenure", mode: "single" },
  { key: "isInComplex", label: "In complex", group: "Type & Tenure", mode: "single" },
  { key: "complexName", label: "Complex name", group: "Type & Tenure", mode: "single" },

  // Price & costs
  { key: "rentMin", label: "Monthly rent (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "rentMax", label: "Monthly rent (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "priceNegotiable", label: "Price negotiable", group: "Price & Costs", mode: "single" },
  { key: "depositMin", label: "Deposit (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "depositMax", label: "Deposit (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "utilitiesIncluded", label: "Utilities included", group: "Price & Costs", mode: "single" },
  { key: "prepaidElectricity", label: "Prepaid electricity", group: "Price & Costs", mode: "single" },
  { key: "fibreIncluded", label: "Fibre included", group: "Price & Costs", mode: "single" },
  { key: "includeLeviesRates", label: "Include levies/rates (if shown)", group: "Price & Costs", mode: "single" },
  { key: "leviesMin", label: "Levies (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "leviesMax", label: "Levies (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },

  // Size & rooms
  { key: "bedroomsMin", label: "Bedrooms (min)", group: "Size & Rooms", mode: "single" },
  { key: "bedroomsMax", label: "Bedrooms (max)", group: "Size & Rooms", mode: "single" },
  { key: "bathroomsMin", label: "Bathrooms (min)", group: "Size & Rooms", mode: "single" },
  { key: "bathroomsMax", label: "Bathrooms (max)", group: "Size & Rooms", mode: "single" },
  { key: "parkingMin", label: "Parking spaces (min)", group: "Size & Rooms", mode: "single" },
  { key: "coveredParkingMin", label: "Covered parking (min)", group: "Size & Rooms", mode: "single" },
  { key: "garagesMin", label: "Garages (min)", group: "Size & Rooms", mode: "single" },
  { key: "carportsMin", label: "Carports (min)", group: "Size & Rooms", mode: "single" },
  { key: "floorSizeMin", label: "Floor size (min)", group: "Size & Rooms", mode: "single", unit: "sqm" },
  { key: "floorSizeMax", label: "Floor size (max)", group: "Size & Rooms", mode: "single", unit: "sqm" },
  { key: "landSizeMin", label: "Land size (min)", group: "Size & Rooms", mode: "single", unit: "sqm" },
  { key: "landSizeMax", label: "Land size (max)", group: "Size & Rooms", mode: "single", unit: "sqm" },

  // Building & unit
  { key: "condition", label: "Condition", group: "Building & Unit", mode: "multiple", options: CONDITION },
  { key: "yearBuiltMin", label: "Year built (min)", group: "Building & Unit", mode: "single" },
  { key: "yearBuiltMax", label: "Year built (max)", group: "Building & Unit", mode: "single" },
  { key: "storeysMin", label: "Storeys (min)", group: "Building & Unit", mode: "single" },
  { key: "floorLevelMin", label: "Floor level (min)", group: "Building & Unit", mode: "single" },
  { key: "floorLevelMax", label: "Floor level (max)", group: "Building & Unit", mode: "single" },
  {
    key: "unitPosition",
    label: "Unit position",
    group: "Building & Unit",
    mode: "multiple",
    options: [
      { value: "corner", label: "Corner unit" },
      { value: "top_floor", label: "Top floor" },
      { value: "ground_floor", label: "Ground floor" },
      { value: "middle", label: "Middle unit" },
    ],
  },

  // Estate & security
  { key: "security_24_7", label: "24/7 security", group: "Estate & Security", mode: "single" },
  { key: "security_guardHouse", label: "Guard house", group: "Estate & Security", mode: "single" },
  { key: "security_cctv", label: "CCTV", group: "Estate & Security", mode: "single" },
  { key: "security_electricFencing", label: "Electric fencing", group: "Estate & Security", mode: "single" },
  { key: "security_accessControl", label: "Access control", group: "Estate & Security", mode: "single" },

  // Amenities (property + estate)
  { key: "amen_pool", label: "Pool (private or communal)", group: "Amenities", mode: "single" },
  { key: "amen_garden", label: "Garden", group: "Amenities", mode: "single" },
  { key: "amen_balcony", label: "Balcony / Patio", group: "Amenities", mode: "single" },
  { key: "amen_braai", label: "Braai area", group: "Amenities", mode: "single" },
  { key: "amen_entertainment", label: "Entertainment area", group: "Amenities", mode: "single" },
  { key: "amen_grannyFlat", label: "Granny flat / Cottage", group: "Amenities", mode: "single" },
  { key: "amen_storage", label: "Storage room", group: "Amenities", mode: "single" },
  { key: "amen_clubhouse", label: "Clubhouse", group: "Amenities", mode: "single" },
  { key: "amen_gym", label: "Gym", group: "Amenities", mode: "single" },
  { key: "amen_playground", label: "Playground", group: "Amenities", mode: "single" },
  { key: "amen_trails", label: "Walking trails", group: "Amenities", mode: "single" },
  { key: "amen_tennis", label: "Tennis court", group: "Amenities", mode: "single" },
  { key: "amen_communalBraai", label: "Communal braai", group: "Amenities", mode: "single" },

  // Utilities & backup power
  { key: "util_fibreReady", label: "Fibre ready", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_solar", label: "Solar panels", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_inverter", label: "Inverter", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_generator", label: "Generator", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_borehole", label: "Borehole", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_jojo", label: "JoJo tank", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_waterFiltration", label: "Water filtration", group: "Utilities & Backup Power", mode: "single" },

  // Lifestyle & rules
  { key: "furnished", label: "Furnishing", group: "Lifestyle & Rules", mode: "multiple", options: FURNISHING },
  { key: "petFriendly", label: "Pet-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "pets_cats", label: "Cats allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "pets_dogs", label: "Dogs allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "pets_max", label: "Max pets", group: "Lifestyle & Rules", mode: "single" },
  {
    key: "pets_restrictions",
    label: "Pet restrictions",
    group: "Lifestyle & Rules",
    mode: "multiple",
    options: [
      { value: "small_only", label: "Small pets only" },
      { value: "no_large_breeds", label: "No large breeds" },
      { value: "none", label: "No restrictions" },
    ],
  },
  { key: "smokingAllowed", label: "Smoking allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "airbnbAllowed", label: "Airbnb / short-let allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "studentFriendly", label: "Student-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "roommateFriendly", label: "Roommate-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "familyFriendly", label: "Family-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "retirementFriendly", label: "Retirement-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "wheelchairAccessible", label: "Wheelchair accessible", group: "Lifestyle & Rules", mode: "single" },
  { key: "liftInBuilding", label: "Lift in building", group: "Lifestyle & Rules", mode: "single" },
  { key: "elderlyFriendly", label: "Elderly-friendly", group: "Lifestyle & Rules", mode: "single" },

  // Rental terms
  { key: "availableFrom", label: "Available from", group: "Listing", mode: "single" },
  { key: "leaseMonthsMin", label: "Lease duration (min)", group: "Listing", mode: "single", unit: "months" },
  { key: "leaseMonthsMax", label: "Lease duration (max)", group: "Listing", mode: "single", unit: "months" },
  { key: "shortTermAllowed", label: "Short-term allowed", group: "Listing", mode: "single" },

  // Proximity & commute
  { key: "nearSchools", label: "Near schools", group: "Proximity & Commute", mode: "single" },
  { key: "nearUniversities", label: "Near universities", group: "Proximity & Commute", mode: "single" },
  { key: "nearHospitals", label: "Near hospitals", group: "Proximity & Commute", mode: "single" },
  { key: "nearShopping", label: "Near shopping centres", group: "Proximity & Commute", mode: "single" },
  { key: "nearTransport", label: "Near public transport", group: "Proximity & Commute", mode: "single" },
  { key: "nearTaxiRank", label: "Near taxi rank", group: "Proximity & Commute", mode: "single" },
  { key: "nearGautrainBrt", label: "Near Gautrain / BRT", group: "Proximity & Commute", mode: "single" },
  { key: "nearBeach", label: "Near beach", group: "Proximity & Commute", mode: "single" },
  { key: "nearBusinessDistrict", label: "Near business district", group: "Proximity & Commute", mode: "single" },
  { key: "nearPolice", label: "Near police station", group: "Proximity & Commute", mode: "single" },
  { key: "maxCommuteMinutes", label: "Max commute time", group: "Proximity & Commute", mode: "single", unit: "min" },
  { key: "commuteToLatLng", label: "Commute to (point)", group: "Proximity & Commute", mode: "single", placeholder: "lat,lng or saved place id" },

  // Media & trust
  { key: "hasPhotos", label: "Has photos", group: "Media & Trust", mode: "single" },
  { key: "hasVideo", label: "Has video", group: "Media & Trust", mode: "single" },
  { key: "hasVirtualTour", label: "Has virtual tour", group: "Media & Trust", mode: "single" },
  { key: "hasFloorPlan", label: "Has floor plan", group: "Media & Trust", mode: "single" },
  { key: "verifiedSeller", label: "Verified seller", group: "Media & Trust", mode: "single" },
  { key: "verifiedLocation", label: "Verified location", group: "Media & Trust", mode: "single" },
  { key: "inspectionReport", label: "Inspection report available", group: "Media & Trust", mode: "single" },

  // Seller & source
  { key: "sellerType", label: "Seller type", group: "Seller & Source", mode: "multiple", options: SELLER_TYPE },
  { key: "agencyName", label: "Agency name", group: "Seller & Source", mode: "single" },
  { key: "verifiedAgent", label: "Verified agent", group: "Seller & Source", mode: "single" },
  { key: "blackOwnedBusiness", label: "Black-owned business", group: "Seller & Source", mode: "single" },

  // Recency & performance
  {
    key: "listedWithin",
    label: "Listed within",
    group: "Recency & Performance",
    mode: "single",
    options: [
      { value: "24h", label: "Last 24 hours" },
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "90d", label: "Last 90 days" },
    ],
  },
  { key: "recentlyUpdated", label: "Recently updated", group: "Recency & Performance", mode: "single" },
  { key: "priceDroppedRecently", label: "Price dropped recently", group: "Recency & Performance", mode: "single" },
  { key: "featuredOnly", label: "Featured only", group: "Recency & Performance", mode: "single" },
  { key: "promotedOnly", label: "Promoted only", group: "Recency & Performance", mode: "single" },

  // Sorting
  { key: "sort", label: "Sort by", group: "Sorting", mode: "single", options: SORT_OPTIONS },
];

/* =========================================================
   SALE FILTERS (EXHAUSTIVE)
========================================================= */
export const SALE_FILTERS: FilterDef[] = [
  // Location
  {
    key: "q",
    label: "Keyword search",
    group: "Location",
    mode: "single",
    placeholder: "Search suburb, street, estate, features…",
  },
  { key: "province", label: "Province", group: "Location", mode: "single", options: PROVINCES },
  { key: "city", label: "City / Town", group: "Location", mode: "single" },
  { key: "suburb", label: "Suburb / Area", group: "Location", mode: "single" },
  { key: "neighbourhood", label: "Neighbourhood", group: "Location", mode: "single" },
  { key: "postalCode", label: "Postal code", group: "Location", mode: "single" },
  { key: "geoRadius", label: "Radius search", group: "Location", mode: "single", unit: "km" },
  { key: "geoBounds", label: "Map bounds", group: "Location", mode: "single" },

  // Listing
  {
    key: "listingType",
    label: "Listing type",
    group: "Listing",
    mode: "single",
    options: [
      { value: "sale", label: "For sale" },
      { value: "auction", label: "Auction" },
      { value: "new_development", label: "New development" },
      { value: "off_plan", label: "Off-plan" },
    ],
  },

  // Type & tenure
  { key: "propertyType", label: "Property type", group: "Type & Tenure", mode: "multiple", options: PROPERTY_TYPES },
  { key: "tenureType", label: "Tenure type", group: "Type & Tenure", mode: "multiple", options: TENURE_TYPES },
  { key: "isInEstate", label: "In estate", group: "Type & Tenure", mode: "single" },
  { key: "estateName", label: "Estate name", group: "Type & Tenure", mode: "single" },
  { key: "isInComplex", label: "In complex", group: "Type & Tenure", mode: "single" },
  { key: "complexName", label: "Complex name", group: "Type & Tenure", mode: "single" },

  // Sale price & costs
  { key: "priceMin", label: "Price (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "priceMax", label: "Price (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "priceNegotiable", label: "Price negotiable", group: "Price & Costs", mode: "single" },
  { key: "includeLeviesRates", label: "Include levies/rates (if shown)", group: "Price & Costs", mode: "single" },
  { key: "leviesMin", label: "Levies (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "leviesMax", label: "Levies (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "ratesMin", label: "Rates & taxes (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "ratesMax", label: "Rates & taxes (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },

  // Sale terms
  { key: "priceReduced", label: "Price reduced", group: "Price & Costs", mode: "single" },
  { key: "urgentSale", label: "Urgent sale", group: "Price & Costs", mode: "single" },
  { key: "bankRepo", label: "Bank repossessed", group: "Price & Costs", mode: "single" },
  { key: "distressedSale", label: "Distressed sale", group: "Price & Costs", mode: "single" },
  { key: "vatIncluded", label: "VAT included", group: "Price & Costs", mode: "single" },
  { key: "transferDutyIncluded", label: "Transfer duty included", group: "Price & Costs", mode: "single" },
  { key: "developerSale", label: "Developer sale", group: "Price & Costs", mode: "single" },
  { key: "noTransferDuty", label: "No transfer duty", group: "Price & Costs", mode: "single" },

  // Finance
  { key: "bondAvailable", label: "Bond available", group: "Price & Costs", mode: "single" },
  { key: "hundredPercentBond", label: "100% bond eligible", group: "Price & Costs", mode: "single" },
  { key: "sellerAssistsBond", label: "Seller assists with bond", group: "Price & Costs", mode: "single" },
  { key: "flispEligible", label: "FLISP eligible", group: "Price & Costs", mode: "single" },

  // Auction (sale listing type)
  { key: "auctionEndsBefore", label: "Auction ends before", group: "Listing", mode: "single" },
  { key: "auctionEndsAfter", label: "Auction ends after", group: "Listing", mode: "single" },
  { key: "startingBidMin", label: "Starting bid (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "startingBidMax", label: "Starting bid (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "reservePriceMin", label: "Reserve price (min)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "reservePriceMax", label: "Reserve price (max)", group: "Price & Costs", mode: "single", unit: "ZAR" },
  { key: "auctionDepositRequired", label: "Auction deposit required", group: "Price & Costs", mode: "single" },

  // Size & rooms
  { key: "bedroomsMin", label: "Bedrooms (min)", group: "Size & Rooms", mode: "single" },
  { key: "bedroomsMax", label: "Bedrooms (max)", group: "Size & Rooms", mode: "single" },
  { key: "bathroomsMin", label: "Bathrooms (min)", group: "Size & Rooms", mode: "single" },
  { key: "bathroomsMax", label: "Bathrooms (max)", group: "Size & Rooms", mode: "single" },
  { key: "parkingMin", label: "Parking spaces (min)", group: "Size & Rooms", mode: "single" },
  { key: "coveredParkingMin", label: "Covered parking (min)", group: "Size & Rooms", mode: "single" },
  { key: "garagesMin", label: "Garages (min)", group: "Size & Rooms", mode: "single" },
  { key: "carportsMin", label: "Carports (min)", group: "Size & Rooms", mode: "single" },
  { key: "floorSizeMin", label: "Floor size (min)", group: "Size & Rooms", mode: "single", unit: "sqm" },
  { key: "floorSizeMax", label: "Floor size (max)", group: "Size & Rooms", mode: "single", unit: "sqm" },
  { key: "landSizeMin", label: "Land size (min)", group: "Size & Rooms", mode: "single", unit: "sqm" },
  { key: "landSizeMax", label: "Land size (max)", group: "Size & Rooms", mode: "single", unit: "sqm" },

  // Building & unit
  { key: "condition", label: "Condition", group: "Building & Unit", mode: "multiple", options: CONDITION },
  { key: "yearBuiltMin", label: "Year built (min)", group: "Building & Unit", mode: "single" },
  { key: "yearBuiltMax", label: "Year built (max)", group: "Building & Unit", mode: "single" },
  { key: "storeysMin", label: "Storeys (min)", group: "Building & Unit", mode: "single" },
  { key: "floorLevelMin", label: "Floor level (min)", group: "Building & Unit", mode: "single" },
  { key: "floorLevelMax", label: "Floor level (max)", group: "Building & Unit", mode: "single" },
  {
    key: "unitPosition",
    label: "Unit position",
    group: "Building & Unit",
    mode: "multiple",
    options: [
      { value: "corner", label: "Corner unit" },
      { value: "top_floor", label: "Top floor" },
      { value: "ground_floor", label: "Ground floor" },
      { value: "middle", label: "Middle unit" },
    ],
  },

  // Development filters
  { key: "isNewDevelopment", label: "New development", group: "Listing", mode: "single" },
  { key: "developmentName", label: "Development name", group: "Listing", mode: "single" },
  { key: "developmentPhase", label: "Development phase", group: "Listing", mode: "single" },
  { key: "completionBefore", label: "Completion before", group: "Listing", mode: "single" },
  { key: "completionAfter", label: "Completion after", group: "Listing", mode: "single" },
  { key: "offPlanOnly", label: "Off-plan only", group: "Listing", mode: "single" },
  { key: "unitTypes", label: "Unit types available", group: "Listing", mode: "single", placeholder: "comma-separated or tag-based" },

  // Estate & security
  { key: "security_24_7", label: "24/7 security", group: "Estate & Security", mode: "single" },
  { key: "security_guardHouse", label: "Guard house", group: "Estate & Security", mode: "single" },
  { key: "security_cctv", label: "CCTV", group: "Estate & Security", mode: "single" },
  { key: "security_electricFencing", label: "Electric fencing", group: "Estate & Security", mode: "single" },
  { key: "security_accessControl", label: "Access control", group: "Estate & Security", mode: "single" },

  // Amenities
  { key: "amen_pool", label: "Pool (private or communal)", group: "Amenities", mode: "single" },
  { key: "amen_garden", label: "Garden", group: "Amenities", mode: "single" },
  { key: "amen_balcony", label: "Balcony / Patio", group: "Amenities", mode: "single" },
  { key: "amen_braai", label: "Braai area", group: "Amenities", mode: "single" },
  { key: "amen_entertainment", label: "Entertainment area", group: "Amenities", mode: "single" },
  { key: "amen_grannyFlat", label: "Granny flat / Cottage", group: "Amenities", mode: "single" },
  { key: "amen_storage", label: "Storage room", group: "Amenities", mode: "single" },
  { key: "amen_clubhouse", label: "Clubhouse", group: "Amenities", mode: "single" },
  { key: "amen_gym", label: "Gym", group: "Amenities", mode: "single" },
  { key: "amen_playground", label: "Playground", group: "Amenities", mode: "single" },
  { key: "amen_trails", label: "Walking trails", group: "Amenities", mode: "single" },
  { key: "amen_tennis", label: "Tennis court", group: "Amenities", mode: "single" },
  { key: "amen_communalBraai", label: "Communal braai", group: "Amenities", mode: "single" },

  // Utilities & backup power
  { key: "util_fibreReady", label: "Fibre ready", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_solar", label: "Solar panels", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_inverter", label: "Inverter", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_generator", label: "Generator", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_borehole", label: "Borehole", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_jojo", label: "JoJo tank", group: "Utilities & Backup Power", mode: "single" },
  { key: "util_waterFiltration", label: "Water filtration", group: "Utilities & Backup Power", mode: "single" },

  // Lifestyle & rules
  { key: "furnished", label: "Furnishing", group: "Lifestyle & Rules", mode: "multiple", options: FURNISHING },
  { key: "petFriendly", label: "Pet-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "pets_cats", label: "Cats allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "pets_dogs", label: "Dogs allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "pets_max", label: "Max pets", group: "Lifestyle & Rules", mode: "single" },
  {
    key: "pets_restrictions",
    label: "Pet restrictions",
    group: "Lifestyle & Rules",
    mode: "multiple",
    options: [
      { value: "small_only", label: "Small pets only" },
      { value: "no_large_breeds", label: "No large breeds" },
      { value: "none", label: "No restrictions" },
    ],
  },
  { key: "smokingAllowed", label: "Smoking allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "airbnbAllowed", label: "Airbnb allowed", group: "Lifestyle & Rules", mode: "single" },
  { key: "familyFriendly", label: "Family-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "retirementFriendly", label: "Retirement-friendly", group: "Lifestyle & Rules", mode: "single" },
  { key: "wheelchairAccessible", label: "Wheelchair accessible", group: "Lifestyle & Rules", mode: "single" },
  { key: "liftInBuilding", label: "Lift in building", group: "Lifestyle & Rules", mode: "single" },
  { key: "elderlyFriendly", label: "Elderly-friendly", group: "Lifestyle & Rules", mode: "single" },

  // Proximity & commute
  { key: "nearSchools", label: "Near schools", group: "Proximity & Commute", mode: "single" },
  { key: "nearUniversities", label: "Near universities", group: "Proximity & Commute", mode: "single" },
  { key: "nearHospitals", label: "Near hospitals", group: "Proximity & Commute", mode: "single" },
  { key: "nearShopping", label: "Near shopping centres", group: "Proximity & Commute", mode: "single" },
  { key: "nearTransport", label: "Near public transport", group: "Proximity & Commute", mode: "single" },
  { key: "nearTaxiRank", label: "Near taxi rank", group: "Proximity & Commute", mode: "single" },
  { key: "nearGautrainBrt", label: "Near Gautrain / BRT", group: "Proximity & Commute", mode: "single" },
  { key: "nearBeach", label: "Near beach", group: "Proximity & Commute", mode: "single" },
  { key: "nearBusinessDistrict", label: "Near business district", group: "Proximity & Commute", mode: "single" },
  { key: "nearPolice", label: "Near police station", group: "Proximity & Commute", mode: "single" },
  { key: "maxCommuteMinutes", label: "Max commute time", group: "Proximity & Commute", mode: "single", unit: "min" },
  { key: "commuteToLatLng", label: "Commute to (point)", group: "Proximity & Commute", mode: "single" },

  // Media & trust
  { key: "hasPhotos", label: "Has photos", group: "Media & Trust", mode: "single" },
  { key: "hasVideo", label: "Has video", group: "Media & Trust", mode: "single" },
  { key: "hasVirtualTour", label: "Has virtual tour", group: "Media & Trust", mode: "single" },
  { key: "hasFloorPlan", label: "Has floor plan", group: "Media & Trust", mode: "single" },
  { key: "verifiedSeller", label: "Verified seller", group: "Media & Trust", mode: "single" },
  { key: "verifiedLocation", label: "Verified location", group: "Media & Trust", mode: "single" },
  { key: "verifiedTitleDeed", label: "Verified title deed", group: "Media & Trust", mode: "single" },
  { key: "inspectionReport", label: "Inspection report available", group: "Media & Trust", mode: "single" },

  // Seller & source
  { key: "sellerType", label: "Seller type", group: "Seller & Source", mode: "multiple", options: SELLER_TYPE },
  { key: "agencyName", label: "Agency name", group: "Seller & Source", mode: "single" },
  { key: "developerName", label: "Developer name", group: "Seller & Source", mode: "single" },
  { key: "verifiedAgent", label: "Verified agent", group: "Seller & Source", mode: "single" },
  { key: "blackOwnedBusiness", label: "Black-owned business", group: "Seller & Source", mode: "single" },

  // Recency & performance
  {
    key: "listedWithin",
    label: "Listed within",
    group: "Recency & Performance",
    mode: "single",
    options: [
      { value: "24h", label: "Last 24 hours" },
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "90d", label: "Last 90 days" },
    ],
  },
  { key: "recentlyUpdated", label: "Recently updated", group: "Recency & Performance", mode: "single" },
  { key: "priceDroppedRecently", label: "Price dropped recently", group: "Recency & Performance", mode: "single" },
  { key: "featuredOnly", label: "Featured only", group: "Recency & Performance", mode: "single" },
  { key: "promotedOnly", label: "Promoted only", group: "Recency & Performance", mode: "single" },

  // Sorting
  { key: "sort", label: "Sort by", group: "Sorting", mode: "single", options: SORT_OPTIONS },
];
