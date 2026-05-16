// Static reference data — used for seeding the DB and populating UI filters/selects.
// These are the source of truth until the data lives in the database.
// Once seeded, fetch from DB instead of importing these directly.

export { vehicleMakeData } from "@/data/vehicleMakeData";
export { vehicleBodyTypeData } from "@/data/vehicleBodyTypeData";
export { vehicleFeaturesData } from "@/data/vehicleFeatures";
export { categoryData } from "@/data/categoryData";

// Future seeds (create these files in data/ when ready):
// export { propertyTypes } from "@/data/propertyTypes";
// export { jobCategories } from "@/data/jobCategories";
// export { serviceCategories } from "@/data/serviceCategories";
