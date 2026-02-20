type FilterMode = "single" | "multiple";

type FilterOption = { value: string; label: string };

type SearchFilterGroup = {
  groupId: string;      // unique for UI + keys
  title: string;        // what you show as the group heading
  fieldId: string;      // query key
  mode: FilterMode;     // single or multiple
  options: FilterOption[];
  visibility?: "always" | "singleTypeOnly";
};



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

type ModeKey = "buy" | "rent";

type SearchFiltersByType = {
  propertyType: PropertyTypeKey;
  groups: SearchFilterGroup[];
};



const G_PROVINCE: SearchFilterGroup = {
  groupId: "location_province",
  title: "Province",
  fieldId: "province",
  mode: "multiple",
  options: [
    { value: "eastern-cape", label: "Eastern Cape" },
    { value: "free-state", label: "Free State" },
    { value: "gauteng", label: "Gauteng" },
    { value: "kwazulu-natal", label: "KwaZulu-Natal" },
    { value: "limpopo", label: "Limpopo" },
    { value: "mpumalanga", label: "Mpumalanga" },
    { value: "north-west", label: "North West" },
    { value: "northern-cape", label: "Northern Cape" },
    { value: "western-cape", label: "Western Cape" },
  ],
};

const G_CITY: SearchFilterGroup = {
  groupId: "location_city",
  title: "City / Town",
  fieldId: "city",
  mode: "multiple",
  options: [
    { value: "cape-town", label: "Cape Town" },
    { value: "johannesburg", label: "Johannesburg" },
    { value: "pretoria", label: "Pretoria" },
    { value: "durban", label: "Durban" },
    { value: "gqeberha", label: "Gqeberha" },
    { value: "polokwane", label: "Polokwane" },
  ],
};

const G_AREA_TYPE: SearchFilterGroup = {
  groupId: "location_area_type",
  title: "Area type",
  fieldId: "area_type",
  mode: "multiple",
  options: [
    { value: "suburb", label: "Suburb" },
    { value: "city-centre", label: "City centre" },
    { value: "estate", label: "Estate" },
    { value: "smallholding", label: "Smallholding area" },
    { value: "coastal", label: "Coastal" },
  ],
};

const G_SELLER_TYPE: SearchFilterGroup = {
  groupId: "listing_seller_type",
  title: "Seller type",
  fieldId: "seller_type",
  mode: "single",
  // ✅ removed "Any" (no selection = any)
  options: [
    { value: "private", label: "Private seller" },
    { value: "agent", label: "Agent" },
    { value: "developer", label: "Developer" },
  ],
};

const G_MEDIA: SearchFilterGroup = {
  groupId: "listing_media",
  title: "Media",
  fieldId: "media",
  mode: "multiple",
  options: [
    { value: "photos", label: "Has photos" },
    { value: "video", label: "Has video" },
    { value: "floorplan", label: "Has floor plan" },
    { value: "virtual-tour", label: "Virtual tour" },
  ],
};

const G_SPECIALS: SearchFilterGroup = {
  groupId: "listing_specials",
  title: "Specials",
  fieldId: "specials",
  mode: "multiple",
  options: [
    { value: "new", label: "New listing" },
    { value: "price-reduced", label: "Price reduced" },
    { value: "featured", label: "Featured" },
    { value: "urgent", label: "Urgent" },
  ],
};


const G_BEDS_MIN: SearchFilterGroup = {
  groupId: "res_beds_min",
  title: "Bedrooms",
  fieldId: "beds_min",
  mode: "single",
  options: [
    { value: "studio", label: "Studio" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ],
};

const G_BATHS_MIN: SearchFilterGroup = {
  groupId: "res_baths_min",
  title: "Bathrooms",
  fieldId: "baths_min",
  mode: "single",
  options: [
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ],
};

const G_PARKING_MIN: SearchFilterGroup = {
  groupId: "res_parking_min",
  title: "Parking",
  fieldId: "parking_min",
  mode: "single",
  options: [
    { value: "0", label: "No parking needed" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ],
};

const G_CONDITION: SearchFilterGroup = {
  groupId: "res_condition",
  title: "Condition",
  fieldId: "property_condition",
  mode: "single",
  // ✅ removed "Any"
  options: [
    { value: "new", label: "New" },
    { value: "good", label: "Good condition" },
    { value: "needs-tlc", label: "Needs TLC" },
    { value: "fixer-upper", label: "Fixer upper" },
  ],
};

const G_LAYOUT: SearchFilterGroup = {
  groupId: "res_layout",
  title: "Layout",
  fieldId: "layout",
  mode: "multiple",
  options: [
    { value: "open-plan", label: "Open plan" },
    { value: "study", label: "Study" },
    { value: "flatlet", label: "Flatlet / Cottage" },
    { value: "staff-quarters", label: "Staff quarters" },
  ],
};

const G_OUTDOOR_FEATURES: SearchFilterGroup = {
  groupId: "res_outdoor_features",
  title: "Outdoor features",
  fieldId: "outdoor_features",
  mode: "multiple",
  options: [
    { value: "garden", label: "Garden" },
    { value: "pool", label: "Pool" },
    { value: "braai", label: "Braai" },
    { value: "balcony", label: "Balcony" },
    { value: "patio", label: "Patio" },
    { value: "sea-view", label: "Sea view" },
    { value: "mountain-view", label: "Mountain view" },
  ],
};

const G_PETS: SearchFilterGroup = {
  groupId: "res_pets",
  title: "Pets",
  fieldId: "pet_policy",
  mode: "single",
  // ✅ removed "Any"
  options: [
    { value: "pet-friendly", label: "Pet friendly" },
    { value: "no-pets", label: "No pets" },
    { value: "approval", label: "By approval" },
  ],
};

const G_BACKUP_POWER: SearchFilterGroup = {
  groupId: "res_backup_power",
  title: "Backup power",
  fieldId: "backup_power",
  mode: "multiple",
  options: [
    { value: "solar", label: "Solar" },
    { value: "inverter", label: "Inverter" },
    { value: "generator", label: "Generator" },
  ],
};

const G_WATER: SearchFilterGroup = {
  groupId: "res_water",
  title: "Water",
  fieldId: "water",
  mode: "multiple",
  options: [
    { value: "borehole", label: "Borehole" },
    { value: "jojo", label: "JoJo tank" },
    { value: "filtration", label: "Water filtration" },
  ],
};

const G_SECURITY_FEATURES: SearchFilterGroup = {
  groupId: "res_security",
  title: "Security features",
  fieldId: "security_features",
  mode: "multiple",
  options: [
    { value: "estate", label: "Estate / Security complex" },
    { value: "access-control", label: "Access control" },
    { value: "guard", label: "Guard / Patrol" },
    { value: "cctv", label: "CCTV" },
    { value: "alarm", label: "Alarm" },
    { value: "electric-fence", label: "Electric fencing" },
  ],
};

const G_COMPLEX_AMENITIES: SearchFilterGroup = {
  groupId: "sectional_complex_amenities",
  title: "Complex amenities",
  fieldId: "complex_amenities",
  mode: "multiple",
  options: [
    { value: "communal-pool", label: "Communal pool" },
    { value: "gym", label: "Gym" },
    { value: "kids-play", label: "Kids play area" },
    { value: "visitor-parking", label: "Visitor parking" },
  ],
};

const G_ACCESS: SearchFilterGroup = {
  groupId: "sectional_access",
  title: "Access",
  fieldId: "access",
  mode: "multiple",
  options: [
    { value: "lift", label: "Lift access" },
    { value: "ground-floor", label: "Ground floor unit" },
  ],
};

const G_STAND_SIZE: SearchFilterGroup = {
  groupId: "land_stand_size",
  title: "Stand size",
  fieldId: "stand_size",
  mode: "single",
  options: [
    { value: "0-300", label: "0–300 m²" },
    { value: "301-600", label: "301–600 m²" },
    { value: "601-1000", label: "601–1000 m²" },
    { value: "1001-2000", label: "1001–2000 m²" },
    { value: "2000+", label: "2000+ m²" },
  ],
};

const G_ZONING_LAND: SearchFilterGroup = {
  groupId: "land_zoning",
  title: "Zoning",
  fieldId: "zoning_land",
  mode: "multiple",
  options: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "agricultural", label: "Agricultural" },
    { value: "mixed-use", label: "Mixed-use" },
  ],
};

const G_SERVICES: SearchFilterGroup = {
  groupId: "land_services",
  title: "On site / available",
  fieldId: "services",
  mode: "multiple",
  options: [
    { value: "water", label: "Water connection" },
    { value: "electricity", label: "Electricity connection" },
    { value: "sewer", label: "Sewer connection" },
    { value: "serviced-stand", label: "Serviced stand" },
    { value: "approved-plans", label: "Plans approved" },
  ],
};

const G_TERRAIN: SearchFilterGroup = {
  groupId: "land_terrain",
  title: "Terrain",
  fieldId: "terrain",
  mode: "multiple",
  options: [
    { value: "flat", label: "Flat" },
    { value: "sloped", label: "Sloped" },
    { value: "rocky", label: "Rocky" },
    { value: "wetland", label: "Wetland / waterlogged" },
  ],
};


const G_FLOOR_SIZE: SearchFilterGroup = {
  groupId: "comm_floor_size",
  title: "Floor size",
  fieldId: "floor_size",
  mode: "single",
  options: [
    { value: "0-50", label: "0–50 m²" },
    { value: "51-100", label: "51–100 m²" },
    { value: "101-200", label: "101–200 m²" },
    { value: "201-500", label: "201–500 m²" },
    { value: "500+", label: "500+ m²" },
  ],
};

const G_ZONING_COMMERCIAL: SearchFilterGroup = {
  groupId: "comm_zoning",
  title: "Zoning",
    fieldId: "zoning_commercial",
  mode: "multiple",
  options: [
    { value: "business", label: "Business" },
    { value: "industrial", label: "Industrial" },
    { value: "mixed-use", label: "Mixed-use" },
  ],
};

const G_POWER: SearchFilterGroup = {
  groupId: "comm_power",
  title: "Power",
  fieldId: "power",
  mode: "multiple",
  options: [
    { value: "3-phase", label: "3-phase power" },
    { value: "generator", label: "Generator" },
    { value: "inverter", label: "Inverter" },
  ],
};

const G_ACCESS_LOGISTICS: SearchFilterGroup = {
  groupId: "comm_access",
  title: "Access & Logistics",
  fieldId: "access_logistics", 
  mode: "multiple",
  options: [
    { value: "loading", label: "Loading access" },
    { value: "truck", label: "Truck access" },
    { value: "roller-doors", label: "Roller doors" },
    { value: "loading-docks", label: "Loading docks" },
  ],
};


const G_OFFICE_FEATURES: SearchFilterGroup = {
  groupId: "office_features",
  title: "Office features",
  fieldId: "office_features",
  mode: "multiple",
  options: [
    { value: "reception", label: "Reception" },
    { value: "boardroom", label: "Boardroom" },
    { value: "open-plan", label: "Open plan" },
    { value: "aircon", label: "Aircon" },
    { value: "lift", label: "Lift" },
  ],
};

const G_RETAIL_FEATURES: SearchFilterGroup = {
  groupId: "retail_features",
  title: "Retail features",
  fieldId: "retail_features",
  mode: "multiple",
  options: [
    { value: "high-foot-traffic", label: "High foot traffic" },
    { value: "frontage", label: "Good frontage" },
    { value: "signage", label: "Signage rights" },
    { value: "anchor-nearby", label: "Anchor tenants nearby" },
  ],
};

const G_INDUSTRIAL_FEATURES: SearchFilterGroup = {
  groupId: "industrial_features",
  title: "Industrial features",
  fieldId: "industrial_features",
  mode: "multiple",
  options: [
    { value: "yard", label: "Yard space" },
    { value: "sprinklers", label: "Sprinkler system" },
    { value: "height-clearance", label: "High clearance" },
    { value: "crane", label: "Crane" },
  ],
};

const G_FURNISHED: SearchFilterGroup = {
  groupId: "rent_furnished",
  title: "Furnished",
  fieldId: "furnished",
  mode: "single",
  options: [
    { value: "furnished", label: "Furnished" },
    { value: "semi", label: "Semi-furnished" },
    { value: "unfurnished", label: "Unfurnished" },
  ],
};

const G_UTILITIES_INCLUDED: SearchFilterGroup = {
  groupId: "rent_utilities",
  title: "Utilities included",
  fieldId: "utilities_included",
  mode: "multiple",
  options: [
    { value: "water", label: "Water" },
    { value: "electricity", label: "Electricity" },
    { value: "refuse", label: "Refuse" },
    { value: "internet", label: "Internet" },
  ],
};

const G_LEASE_TERM: SearchFilterGroup = {
  groupId: "rent_lease_term",
  title: "Lease term",
  fieldId: "lease_term",
  mode: "single",
  options: [
    { value: "6", label: "6 months" },
    { value: "12", label: "12 months" },
    { value: "24", label: "24 months" },
    { value: "36+", label: "36+ months" },
  ],
};

const G_TRANSFER_DUTY: SearchFilterGroup = {
  groupId: "buy_transfer_duty",
  title: "Transfer duty",
  fieldId: "transfer_duty",
  mode: "single",
  options: [
    { value: "included", label: "Included" },
    { value: "excluded", label: "Excluded" },
    { value: "no-transfer-duty", label: "No transfer duty" },
  ],
};

const G_RATES_TAXES: SearchFilterGroup = {
  groupId: "buy_rates_taxes",
  title: "Rates & taxes",
  fieldId: "rates_taxes_band",
  mode: "single",
  options: [
    { value: "0-500", label: "R0–R500" },
    { value: "501-1500", label: "R501–R1,500" },
    { value: "1500+", label: "R1,500+" },
  ],
};

const G_LEVIES: SearchFilterGroup = {
  groupId: "buy_levies",
  title: "Levies",
  fieldId: "levies_band",
  mode: "single",
    visibility: "singleTypeOnly",
  options: [
    { value: "0-1000", label: "R0–R1,000" },
    { value: "1001-2500", label: "R1,001–R2,500" },
    { value: "2500+", label: "R2,500+" },
  ],
};

const G_DEVELOPMENT_STAGE_BUY: SearchFilterGroup = {
  groupId: "dev_stage_buy",
  title: "Development stage",
  fieldId: "development_stage",
  mode: "single",
  options: [
    { value: "off-plan", label: "Off-plan" },
    { value: "under-construction", label: "Under construction" },
    { value: "completed", label: "Completed" },
  ],
};

const G_NO_TRANSFER_DUTY: SearchFilterGroup = {
  groupId: "dev_no_transfer_duty",
  title: "No transfer duty",
  fieldId: "no_transfer_duty",
  mode: "single",
  options: [{ value: "yes", label: "Yes" }],
};

export const PROPERTY_SEARCH_FILTERS: Record<ModeKey, SearchFiltersByType[]> = {
  buy: [
    {
      propertyType: "House",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_BEDS_MIN,
        G_BATHS_MIN,
        G_PARKING_MIN,
        G_CONDITION,
        G_LAYOUT,

        G_SECURITY_FEATURES,
        G_OUTDOOR_FEATURES,
        G_PETS,
        G_BACKUP_POWER,
        G_WATER,

        G_TRANSFER_DUTY,
        G_RATES_TAXES,
      ],
    },
    {
      propertyType: "Apartment",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_BEDS_MIN,
        G_BATHS_MIN,
        G_PARKING_MIN,
        G_CONDITION,
        G_LAYOUT,

        G_SECURITY_FEATURES,
        G_OUTDOOR_FEATURES,
        G_PETS,
        G_BACKUP_POWER,
        G_WATER,

        G_COMPLEX_AMENITIES,
        G_ACCESS,

        G_LEVIES,
      ],
    },
    {
      propertyType: "Townhouse",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_BEDS_MIN,
        G_BATHS_MIN,
        G_PARKING_MIN,
        G_CONDITION,
        G_LAYOUT,

        G_SECURITY_FEATURES,
        G_OUTDOOR_FEATURES,
        G_PETS,
        G_BACKUP_POWER,
        G_WATER,

        G_COMPLEX_AMENITIES,
        G_ACCESS,

        G_LEVIES,
      ],
    },
    {
      propertyType: "Vacant Land",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_STAND_SIZE,
        G_ZONING_LAND,
        G_SERVICES,
        G_TERRAIN,

        G_TRANSFER_DUTY,
      ],
    },
    {
      propertyType: "Development",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_DEVELOPMENT_STAGE_BUY,
        G_NO_TRANSFER_DUTY,
      ],
    },
    {
      propertyType: "Office",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_FLOOR_SIZE,
        G_ZONING_COMMERCIAL,
        G_POWER,
        G_ACCESS_LOGISTICS,
        G_OFFICE_FEATURES,
      ],
    },
    {
      propertyType: "Retail Property",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_FLOOR_SIZE,
        G_ZONING_COMMERCIAL,
        G_POWER,
        G_ACCESS_LOGISTICS,
        G_RETAIL_FEATURES,
      ],
    },
    {
      propertyType: "Industrial Property",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_FLOOR_SIZE,
        G_ZONING_COMMERCIAL,
        G_POWER,
        G_ACCESS_LOGISTICS,
        G_INDUSTRIAL_FEATURES,
      ],
    },
    {
      propertyType: "Agricultural Property",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_STAND_SIZE,
        G_ZONING_LAND,
        G_SERVICES,
        G_TERRAIN,

        {
          groupId: "agri_features",
          title: "Farm features",
          fieldId: "agri_features",
          mode: "multiple",
          options: [
            { value: "water-rights", label: "Water rights" },
            { value: "irrigation", label: "Irrigation" },
            { value: "fencing", label: "Fenced" },
            { value: "dams", label: "Dams" },
            { value: "boreholes", label: "Boreholes" },
            { value: "staff-housing", label: "Staff housing" },
          ],
        },

        G_TRANSFER_DUTY,
      ],
    },
  ],

  rent: [
    {
      propertyType: "House",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_BEDS_MIN,
        G_BATHS_MIN,
        G_PARKING_MIN,
        G_CONDITION,
        G_LAYOUT,

        G_SECURITY_FEATURES,
        G_OUTDOOR_FEATURES,
        G_PETS,
        G_BACKUP_POWER,
        G_WATER,

        G_FURNISHED,
        G_UTILITIES_INCLUDED,
        // lease term without 36+ for normal house rentals, keep if you want:
        { ...G_LEASE_TERM, options: G_LEASE_TERM.options.filter(o => o.value !== "36+") },
      ],
    },
    {
      propertyType: "Apartment",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_BEDS_MIN,
        G_BATHS_MIN,
        G_PARKING_MIN,
        G_CONDITION,
        G_LAYOUT,

        G_SECURITY_FEATURES,
        G_OUTDOOR_FEATURES,
        G_PETS,
        G_BACKUP_POWER,
        G_WATER,

        G_COMPLEX_AMENITIES,
        G_ACCESS,

        G_FURNISHED,
        G_UTILITIES_INCLUDED,
        { ...G_LEASE_TERM, options: G_LEASE_TERM.options.filter(o => o.value !== "36+") },
      ],
    },
    {
      propertyType: "Townhouse",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_BEDS_MIN,
        G_BATHS_MIN,
        G_PARKING_MIN,
        G_CONDITION,
        G_LAYOUT,

        G_SECURITY_FEATURES,
        G_OUTDOOR_FEATURES,
        G_PETS,
        G_BACKUP_POWER,
        G_WATER,

        G_COMPLEX_AMENITIES,
        G_ACCESS,

        G_FURNISHED,
        G_UTILITIES_INCLUDED,
        { ...G_LEASE_TERM, options: G_LEASE_TERM.options.filter(o => o.value !== "36+") },
      ],
    },
    {
      propertyType: "Vacant Land",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_STAND_SIZE,
        G_ZONING_LAND,
        G_SERVICES,
        G_TERRAIN,

        // Vacant land leases can be longer
        G_LEASE_TERM,
      ],
    },
    {
      propertyType: "Development",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,
        {
          groupId: "dev_stage_rent",
          title: "Development stage",
          fieldId: "development_stage",
          mode: "single",
          options: [
            { value: "completed", label: "Completed" },
            { value: "newly-completed", label: "Newly completed" },
          ],
        },
        G_FURNISHED,
      ],
    },
    {
      propertyType: "Office",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_FLOOR_SIZE,
        G_ZONING_COMMERCIAL,
        G_POWER,
        G_ACCESS_LOGISTICS,
        G_OFFICE_FEATURES,
      ],
    },
    {
      propertyType: "Retail Property",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_FLOOR_SIZE,
        G_ZONING_COMMERCIAL,
        G_POWER,
        G_ACCESS_LOGISTICS,
        G_RETAIL_FEATURES,
      ],
    },
    {
      propertyType: "Industrial Property",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_FLOOR_SIZE,
        G_ZONING_COMMERCIAL,
        G_POWER,
        G_ACCESS_LOGISTICS,
        G_INDUSTRIAL_FEATURES,
      ],
    },
    {
      propertyType: "Agricultural Property",
      groups: [
        G_PROVINCE,
        G_CITY,
        G_AREA_TYPE,
        G_SELLER_TYPE,
        G_MEDIA,
        G_SPECIALS,

        G_STAND_SIZE,
        G_ZONING_LAND,
        G_SERVICES,
        G_TERRAIN,

        {
          groupId: "agri_features_rent",
          title: "Farm features",
          fieldId: "agri_features",
          mode: "multiple",
          options: [
            { value: "water-rights", label: "Water rights" },
            { value: "irrigation", label: "Irrigation" },
            { value: "fencing", label: "Fenced" },
            { value: "staff-housing", label: "Staff housing" },
          ],
        },

        G_LEASE_TERM,
      ],
    },
  ],
} as const;
