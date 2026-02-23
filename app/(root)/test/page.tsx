import ReviewVehicleDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/ReviewVehicleDetails";
import VehicleCondition from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleCondition";
import VehicleDescription from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleDescription";
import VehicleListingIntro from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingIntro";
import VehicleListingsPublished from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingsPublished";
import VehiclePhotoUploads from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehiclePhotoUploads";
import VehicleSellerDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleSellerDetails";
import MakeModel from "@/app/(oly-auto)/auto/components/MakeModel";
import PropertiesFilters from "@/app/(oly-properties)/properties/components/PropertiesFilters";

import ListingCardSkeletons from "@/components/skeletons/ListingCardSkeletons";
import { Button } from "@/components/ui/button";
import VehicleBodyType from "@/components/VehicleBodyType";
import VehicleDriveTrainType from "@/components/VehicleDriveTrainType";
import VehicleFeatures from "@/components/VehicleFeatures";
import VehicleFuelType from "@/components/VehicleFuelType";
import VehicleMake from "@/components/VehicleMake";
import VehicleMileage from "@/components/VehicleMileage";
import VehiclePrice from "@/components/VehiclePrice";
import VehicleSortBy from "@/components/VehicleSortBy";
import VehicleTransmissionType from "@/components/VehicleTransmissionType";
import VehicleTrim from "@/components/VehicleTrim";
import { List } from "lucide-react";


const phoneOrderSummaryMock = {
    itemTitle: "Samsung Galaxy S21 (Excellent condition)",
    sellerName: "Thabo M",
    location: "Cape Town, Western Cape",
  
    lines: [
      {
        label: "Item price",
        value: { amount: 9200 },
      },
    ],
  
    total: { amount: 9320 },
  
    fulfilmentLabel: "Courier delivery",
    fulfilmentDetail: "2–3 business days",
    fulfilmentFee: { amount: 120 },
  
    notes: [
      "Payment is held until handover is confirmed.",
      "You will receive a handover code after payment.",
    ],
  };

const Page = () => {
  const { itemTitle, sellerName, location, lines, total, fulfilmentLabel, fulfilmentDetail, fulfilmentFee, notes } = phoneOrderSummaryMock;
 
  return (
    <div>
    
     <PropertiesFilters isDashboard={false} listingType="rent" propertyTypes={[]} />
      {/* <VehicleListingIntro/>   */}
      {/* <VehicleCondition/> */}
      {/* <VehiclePhotoUploads/> */}
      {/* <VehicleDescription/> */}
      {/* <VehicleSellerDetails/> */}
      {/* <ReviewVehicleDetails/> */}
      {/* <VehicleListingsPublished/>  */}

      {/*/////////////// */}
    {/* <VehicleMake/> */}
    {/* <VehicleBodyType/> */}
    {/* <VehicleDriveTrainType/> */}
    {/* <VehicleFeatures/> */}
    {/* <VehicleFuelType/> */}
    {/* <VehiclePrice/> */}
    {/* <VehicleSortBy/> */}
    {/* <VehicleTransmissionType/> */}
    {/* <VehicleTrim/> */}
    {/* <VehicleMileage/>  */}

    </div>
  );
};

export default Page;