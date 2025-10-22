export const olyResultsToolbar = [
  {
    id: "01",
    label: "Sort By",
    values: [
      "Relevance",
      "Price: Low to High",
      "Price: High to Low",
      "Newest First",
      "Oldest First",
    ],
    default: "Relevance",
  },
  {
    id: "02",
    label: "Price",
    values: {
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
      default: { min: 0, max: 5000 },
    },
  },
  {
    id: "03",
    label: "View",
    values: ["Grid View", "Expanded View"],
    default: "Grid View",
  },
];

export const olyAutoResultsToolbar = [
  {
    id: "01",
    label: "Sort By",
    values: [
      "Relevance",
      "Price: Low to High",
      "Price: High to Low",
      "Mileage: Low to High",
      "Year: Newest First",
      "Newest First",
    ],
    default: "Relevance",
  },
  {
    id: "02",
    label: "Price",
    values: {
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
      default: { min: 5000, max: 100000 },
    },
  },
  {
    id: "03",
    label: "View",
    values: ["Grid View", "Expanded View"],
    default: "Grid View",
  },
];

export const olyHiringResultsToolbar = [
  {
    id: "01",
    label: "Sort By",
    values: [
      "Relevance",
      "Salary: High to Low",
      "Salary: Low to High",
      "Newest First",
      "Oldest First",
    ],
    default: "Relevance",
  },
  {
    id: "02",
    label: "Salary",
    values: {
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
      default: { min: 20000, max: 200000 },
    },
  },
  {
    id: "03",
    label: "View",
    values: ["Grid View", "Expanded View"],
    default: "Grid View",
  },
];

export const olyServicesResultsToolbar = [
  {
    id: "01",
    label: "Sort By",
    values: [
      "Relevance",
      "Price: Low to High",
      "Price: High to Low",
      "Newest First",
      "Oldest First",
    ],
    default: "Relevance",
  },
  {
    id: "02",
    label: "Price",
    values: {
      range: [20, 1000],
      increments: 20,
      rangeValues: [
        { min: 20, max: 50 },
        { min: 50, max: 100 },
        { min: 100, max: 200 },
        { min: 200, max: 500 },
        { min: 500, max: 1000 },
      ],
      default: { min: 20, max: 1000 },
    },
  },
  {
    id: "03",
    label: "View",
    values: ["Grid View", "Expanded View"],
    default: "Grid View",
  },
];

export const olyPropertiesResultsToolbar = [
  {
    id: "01",
    label: "Sort By",
    values: [
      "Relevance",
      "Price: Low to High",
      "Price: High to Low",
      "Square Footage: High to Low",
      "Newest First",
    ],
    default: "Relevance",
  },
  {
    id: "02",
    label: "Price",
    values: {
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
      default: { min: 50000, max: 5000000 },
    },
  },
  {
    id: "03",
    label: "Map",
    values: ["List View", "Map View"],
    default: "List View",
  },
  {
    id: "04",
    label: "View",
    values: ["Grid View", "Expanded View"],
    default: "Grid View",
  },
];