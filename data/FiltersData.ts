export const olyAutoFilters = [
  {
    id: "01",
    filterLabel: "Make",
    filterValues: [
      "Toyota",
      "Ford",
      "Honda",
      "BMW",
      "Mercedes-Benz",
      "Volkswagen",
      "Chevrolet",
      "Hyundai",
      "Audi",
      "Nissan",
    ],
  },
  {
    id: "02",
    filterLabel: "Model",
    filterValues: {
      Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
      Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
      Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
      BMW: ["3 Series", "5 Series", "X3", "X5", "M4"],
      "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
      Volkswagen: ["Golf", "Passat", "Tiguan", "Jetta", "Atlas"],
      Chevrolet: ["Silverado", "Equinox", "Malibu", "Traverse", "Camaro"],
      Hyundai: ["Tucson", "Santa Fe", "Elantra", "Sonata", "Kona"],
      Audi: ["A3", "A4", "Q5", "Q7", "A6"],
      Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Maxima"],
    },
  },
  {
    id: "03",
    filterLabel: "Year",
    filterValues: {
      range: [2010, 2025],
      rangeValues: [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022, 2023, 2024, 2025,
      ],
    },
  },
  {
    id: "04",
    filterLabel: "Price",
    filterValues: {
      range: [5000, 100000],
      increments: 5000,
      rangeValues: [
        { min: 5000, max: 10000 },
        { min: 10000, max: 20000 },
        { min: 20000, max: 30000 },
        { min: 30000, max: 40000 },
        { min: 40000, max: 50000 },
        { min: 50000, max: 75000 },
        { min: 75000, max: 100000 },
      ],
    },
  },
  {
    id: "05",
    filterLabel: "Mileage",
    filterValues: {
      range: [0, 200000],
      increments: 10000,
      rangeValues: [
        { min: 0, max: 10000 },
        { min: 10000, max: 30000 },
        { min: 30000, max: 50000 },
        { min: 50000, max: 100000 },
        { min: 100000, max: 150000 },
        { min: 150000, max: 200000 },
      ],
    },
  },
  {
    id: "06",
    filterLabel: "FuelType",
    filterValues: ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-in Hybrid"],
  },
  {
    id: "07",
    filterLabel: "Transmission",
    filterValues: ["Automatic", "Manual", "CVT", "Dual-Clutch"],
  },
  {
    id: "08",
    filterLabel: "Condition",
    filterValues: ["New", "Used", "Certified Pre-Owned"],
  },
  {
    id: "09",
    filterLabel: "BodyType",
    filterValues: [
      "Sedan",
      "SUV",
      "Truck",
      "Coupe",
      "Hatchback",
      "Convertible",
      "Minivan",
      "Wagon",
    ],
  },
  {
    id: "10",
    filterLabel: "Color",
    filterValues: [
      "Black",
      "White",
      "Silver",
      "Blue",
      "Red",
      "Grey",
      "Green",
      "Yellow",
      "Brown",
      "Other",
    ],
  },
  {
    id: "11",
    filterLabel: "DriveType",
    filterValues: [
      "Front-Wheel Drive",
      "Rear-Wheel Drive",
      "All-Wheel Drive",
      "Four-Wheel Drive",
    ],
  },
  {
    id: "12",
    filterLabel: "Features",
    filterValues: [
      "Navigation System",
      "Backup Camera",
      "Bluetooth",
      "Sunroof",
      "Leather Seats",
      "Heated Seats",
      "Keyless Entry",
      "Adaptive Cruise Control",
      "Lane Departure Warning",
      "Parking Sensors",
    ],
  },
];

export const olyFilters = [
  {
    id: "01",
    filterLabel: "Category",
    filterValues: [
      "Electronics",
      "Furniture",
      "Clothing",
      "Appliances",
      "Books",
      "Sports Equipment",
      "Jewelry",
      "Toys",
      "Home Decor",
      "Other",
    ],
  },
  {
    id: "02",
    filterLabel: "Condition",
    filterValues: ["New", "Used", "Refurbished", "For Parts"],
  },
  {
    id: "03",
    filterLabel: "Price",
    filterValues: {
      range: [0, 5000],
      increments: 50,
      rangeValues: [
        { min: 0, max: 50 },
        { min: 50, max: 100 },
        { min: 100, max: 250 },
        { min: 250, max: 500 },
        { min: 500, max: 1000 },
        { min: 1000, max: 2500 },
        { min: 2500, max: 5000 },
      ],
    },
  },
  {
    id: "04",
    filterLabel: "Location",
    filterValues: [
      "Within 5 miles",
      "Within 10 miles",
      "Within 25 miles",
      "Within 50 miles",
      "Within 100 miles",
    ],
  },
  {
    id: "05",
    filterLabel: "DeliveryOptions",
    filterValues: ["Local Pickup", "Shipping Available", "Delivery Available"],
  },
];

export const olyPropertiesFilters = [
  {
    id: "01",
    filterLabel: "PropertyType",
    filterValues: [
      "House",
      "Apartment",
      "Condo",
      "Townhouse",
      "Land",
      "Commercial",
    ],
  },
  {
    id: "02",
    filterLabel: "ListingType",
    filterValues: ["For Sale", "For Rent", "Short-Term Rental"],
  },
  {
    id: "03",
    filterLabel: "Price",
    filterValues: {
      range: [50000, 5000000],
      increments: 25000,
      rangeValues: [
        { min: 50000, max: 100000 },
        { min: 100000, max: 250000 },
        { min: 250000, max: 500000 },
        { min: 500000, max: 1000000 },
        { min: 1000000, max: 2000000 },
        { min: 2000000, max: 5000000 },
      ],
    },
  },
  {
    id: "04",
    filterLabel: "Bedrooms",
    filterValues: ["Studio", "1", "2", "3", "4", "5+"],
  },
  {
    id: "05",
    filterLabel: "Bathrooms",
    filterValues: ["1", "1.5", "2", "2.5", "3", "3+"],
  },
  {
    id: "06",
    filterLabel: "SquareFootage",
    filterValues: {
      range: [500, 10000],
      increments: 500,
      rangeValues: [
        { min: 500, max: 1000 },
        { min: 1000, max: 1500 },
        { min: 1500, max: 2000 },
        { min: 2000, max: 3000 },
        { min: 3000, max: 5000 },
        { min: 5000, max: 10000 },
      ],
    },
  },
  {
    id: "07",
    filterLabel: "Amenities",
    filterValues: [
      "Pool",
      "Garage",
      "Central Air",
      "Fireplace",
      "Backyard",
      "Elevator",
      "Gym",
      "Pet Friendly",
    ],
  },
];

export const olyHiringFilters = [
  {
    id: "01",
    filterLabel: "JobCategory",
    filterValues: [
      "Technology",
      "Healthcare",
      "Education",
      "Retail",
      "Construction",
      "Finance",
      "Hospitality",
      "Administrative",
      "Marketing",
      "Other",
    ],
  },
  {
    id: "02",
    filterLabel: "JobType",
    filterValues: [
      "Full-Time",
      "Part-Time",
      "Contract",
      "Temporary",
      "Internship",
      "Remote",
    ],
  },
  {
    id: "03",
    filterLabel: "ExperienceLevel",
    filterValues: ["Entry-Level", "Mid-Level", "Senior-Level", "Executive"],
  },
  {
    id: "04",
    filterLabel: "Salary",
    filterValues: {
      range: [20000, 200000],
      increments: 10000,
      rangeValues: [
        { min: 20000, max: 40000 },
        { min: 40000, max: 60000 },
        { min: 60000, max: 80000 },
        { min: 80000, max: 100000 },
        { min: 100000, max: 150000 },
        { min: 150000, max: 200000 },
      ],
    },
  },
  {
    id: "05",
    filterLabel: "Location",
    filterValues: [
      "On-Site",
      "Remote",
      "Hybrid",
      "Within 25 miles",
      "Within 50 miles",
    ],
  },
];

export const olyServicesFilters = [
  {
    id: "01",
    filterLabel: "ServiceCategory",
    filterValues: [
      "Home Repair",
      "Cleaning",
      "Landscaping",
      "Plumbing",
      "Electrical",
      "Tutoring",
      "Event Planning",
      "Pet Care",
      "Automotive Services",
      "Other",
    ],
  },
  {
    id: "02",
    filterLabel: "ServiceType",
    filterValues: ["One-Time", "Recurring", "Emergency"],
  },
  {
    id: "03",
    filterLabel: "Price",
    filterValues: {
      
      rangeValues: [
        { min: 20, max: 50 },
        { min: 50, max: 100 },
        { min: 100, max: 200 },
        { min: 200, max: 500 },
        { min: 500, max: 1000 },
      ],
    },
  },
  {
    id: "04",
    filterLabel: "Availability",
    filterValues: ["Weekdays", "Weekends", "Evenings", "24/7"],
  },
  {
    id: "05",
    filterLabel: "Location",
    filterValues: [
      "Within 5 miles",
      "Within 10 miles",
      "Within 25 miles",
      "Within 50 miles",
    ],
  },
];


