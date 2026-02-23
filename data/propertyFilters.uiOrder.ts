

type ModeKey = "buy" | "rent";
type PropertyTypeKey =
  | "House"
  | "Apartment"
  | "Townhouse"
  | "Vacant Land"
  | "Development"
  | "Office"
  | "Retail Property"
  | "Industrial Property"
  | "Agricultural Property";

export const PROPERTY_FILTER_UI_ORDER: Record<
  ModeKey,
  Record<PropertyTypeKey, string[]>
> = {
  buy: {
    House: [
    //   "location_province",
    //   "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "res_beds_min",
      "res_baths_min",
      "res_parking_min",
      "res_condition",
      "res_layout",

      "res_security",
      "res_outdoor_features",
      "res_pets",
      "res_backup_power",
      "res_water",

      "buy_transfer_duty",
      "buy_rates_taxes",
    ],
    Apartment: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "res_beds_min",
      "res_baths_min",
      "res_parking_min",
      "res_condition",
      "res_layout",

      "sectional_complex_amenities",
      "sectional_access",

      "res_security",
      "res_outdoor_features",
      "res_pets",
      "res_backup_power",
      "res_water",

      "buy_levies",
    ],
    Townhouse: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "res_beds_min",
      "res_baths_min",
      "res_parking_min",
      "res_condition",
      "res_layout",

      "sectional_complex_amenities",
      "sectional_access",

      "res_security",
      "res_outdoor_features",
      "res_pets",
      "res_backup_power",
      "res_water",

      "buy_levies",
    ],
    "Vacant Land": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "land_stand_size",
      "land_zoning",
      "land_services",
      "land_terrain",

      "buy_transfer_duty",
    ],
    Development: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "dev_stage_buy",
      "dev_no_transfer_duty",
    ],
    Office: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "comm_floor_size",
      "comm_zoning",
      "comm_power",
      "comm_access",
      "office_features",
    ],
    "Retail Property": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "comm_floor_size",
      "comm_zoning",
      "comm_power",
      "comm_access",
      "retail_features",
    ],
    "Industrial Property": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "comm_floor_size",
      "comm_zoning",
      "comm_power",
      "comm_access",
      "industrial_features",
    ],
    "Agricultural Property": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "land_stand_size",
      "land_zoning",
      "land_services",
      "land_terrain",

      "agri_features",
      "buy_transfer_duty",
    ],
  },

  rent: {
    House: [

        "res_beds_min",
        "res_baths_min",
        "res_condition",
        "res_parking_min",
        "res_layout",


        
      "rent_furnished",
      "rent_utilities",
      "rent_lease_term",

    //   "location_province",
    //   "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",


      "res_security",
      "res_outdoor_features",
      "res_pets",
      "res_backup_power",
      "res_water",

    ],
    Apartment: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "res_beds_min",
      "res_baths_min",
      "res_parking_min",
      "res_condition",
      "res_layout",

      "sectional_complex_amenities",
      "sectional_access",

      "res_security",
      "res_outdoor_features",
      "res_pets",
      "res_backup_power",
      "res_water",

      "rent_furnished",
      "rent_utilities",
      "rent_lease_term",
    ],
    Townhouse: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "res_beds_min",
      "res_baths_min",
      "res_parking_min",
      "res_condition",
      "res_layout",

      "sectional_complex_amenities",
      "sectional_access",

      "res_security",
      "res_outdoor_features",
      "res_pets",
      "res_backup_power",
      "res_water",

      "rent_furnished",
      "rent_utilities",
      "rent_lease_term",
    ],
    "Vacant Land": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "land_stand_size",
      "land_zoning",
      "land_services",
      "land_terrain",

      "rent_lease_term",
    ],
    Development: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "dev_stage_rent",
      "rent_furnished",
    ],
    Office: [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "comm_floor_size",
      "comm_zoning",
      "comm_power",
      "comm_access",
      "office_features",
    ],
    "Retail Property": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "comm_floor_size",
      "comm_zoning",
      "comm_power",
      "comm_access",
      "retail_features",
    ],
    "Industrial Property": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "comm_floor_size",
      "comm_zoning",
      "comm_power",
      "comm_access",
      "industrial_features",
    ],
    "Agricultural Property": [
      "location_province",
      "location_city",
      "location_area_type",
      "listing_seller_type",
      "listing_media",
      "listing_specials",

      "land_stand_size",
      "land_zoning",
      "land_services",
      "land_terrain",

      "agri_features_rent",
      "rent_lease_term",
    ],
  },
};

export const PROPERTY_FILTER_UI_ORDER_COMMON: Record<ModeKey, string[]> = {
  buy: [
    "location_province",
    "location_city",
    "location_area_type",
    "listing_seller_type",
    "listing_media",
    "listing_specials",

    "res_beds_min",
    "res_baths_min",
    "res_parking_min",
    "res_condition",
    "res_layout",

    "res_security",
    "res_outdoor_features",
    "res_pets",
    "res_backup_power",
    "res_water",

    "sectional_complex_amenities",
    "sectional_access",

    "land_stand_size",
    "land_zoning",
    "land_services",
    "land_terrain",

    "comm_floor_size",
    "comm_zoning",
    "comm_power",
    "comm_access",
    "office_features",
    "retail_features",
    "industrial_features",

    "buy_transfer_duty",
    "buy_rates_taxes",
    "buy_levies",

    "dev_stage_buy",
    "dev_no_transfer_duty",

    "agri_features",
  ],
  rent: [
    "location_province",
    "location_city",
    "location_area_type",
    "listing_seller_type",
    "listing_media",
    "listing_specials",

    "res_beds_min",
    "res_baths_min",
    "res_parking_min",
    "res_condition",
    "res_layout",

    "res_security",
    "res_outdoor_features",
    "res_pets",
    "res_backup_power",
    "res_water",

    "sectional_complex_amenities",
    "sectional_access",

    "land_stand_size",
    "land_zoning",
    "land_services",
    "land_terrain",

    "comm_floor_size",
    "comm_zoning",
    "comm_power",
    "comm_access",
    "office_features",
    "retail_features",
    "industrial_features",

    "rent_furnished",
    "rent_utilities",
    "rent_lease_term",

    "dev_stage_rent",
    "agri_features_rent",
  ],
};
