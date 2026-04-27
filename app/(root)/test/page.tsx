import ReviewVehicleDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/ReviewVehicleDetails";
import VehicleCondition from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleCondition";
import VehicleDescription from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleDescription";
import VehicleListingIntro from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingIntro";
import VehicleListingsPublished from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingsPublished";
import VehiclePhotoUploads from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehiclePhotoUploads";
import VehicleSellerDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleSellerDetails";
import MakeModel from "@/app/(oly-auto)/auto/components/MakeModel";
import PropertiesFilters from "@/app/(oly-properties)/property/components/PropertiesFilters";
import Input from "@/components/Input";
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
 const locations = [
  
  {
    "suggestion": "Johannesburg",
    "label": "CITY",
    "pillText": "Gauteng"
  },
  {
    "suggestion": "Cape Town",
    "label": "CITY",
    "pillText": "Western Cape"
  },
  {
    "suggestion": "Durban",
    "label": "CITY",
    "pillText": "KwaZulu-Natal"
  },
  {
    "suggestion": "Pretoria",
    "label": "CITY",
    "pillText": "Gauteng"
  },
  {
    "suggestion": "Port Elizabeth",
    "label": "CITY",
    "pillText": "Eastern Cape"
  },
  {
    "suggestion": "Bloemfontein",
    "label": "CITY",
    "pillText": "Free State"
  },
   {
    "suggestion": "Gauteng",
    "label": "PROVINCE",
    "pillText": ""
  },
  {
    "suggestion": "Soweto",
    "label": "SUBURB",
    "pillText": "Johannesburg"
  },
  {
    "suggestion": "Sandton",
    "label": "SUBURB",
    "pillText": "Johannesburg"
  },
  {
    "suggestion": "Rondebosch",
    "label": "SUBURB",
    "pillText": "Cape Town"
  },
 
]

const vehicles = [
  {
    "suggestion": "Volkswagen",
    "label": "MAKE",
    "pillText": ""
  },
  {
    "suggestion": "Toyota Corolla Cross 1.8 Xi",
    "label": "VARIANT",
    "pillText": "Toyota Corolla"
  },
  {
    "suggestion": "Suzuki",
    "label": "MAKE",
    "pillText": ""
  },
  {
    "suggestion": "Toyota Hilux",
    "label": "MODEL",
    "pillText": ""
  },
  {
    "suggestion": "Chery Tiggo 4 Pro 1.5T Luxury",
    "label": "VARIANT",
    "pillText": "Chery Tiggo 4 Pro"
  },
  {
    "suggestion": "Volkswagen Polo",
    "label": "MODEL",
    "pillText": ""
  },
  {
    "suggestion": "Toyota",
    "label": "MAKE",
    "pillText": ""
  },
  {
    "suggestion": "Suzuki Swift 1.2 GLX",
    "label": "VARIANT",
    "pillText": "Suzuki Swift"
  },
  {
    "suggestion": "Ford",
    "label": "MAKE",
    "pillText": ""
  },
  {
    "suggestion": "Volkswagen Polo Vivo 1.4 Comfortline",
    "label": "VARIANT",
    "pillText": "Volkswagen Polo Vivo"
  },
  {
    "suggestion": "Toyota Corolla",
    "label": "MODEL",
    "pillText": ""
  },
  {
    "suggestion": "Chery",
    "label": "MAKE",
    "pillText": ""
  },
  {
    "suggestion": "Toyota Hilux 2.8 GD-6 Raider 4x4",
    "label": "VARIANT",
    "pillText": "Toyota Hilux"
  },
  {
    "suggestion": "Volkswagen Polo Vivo",
    "label": "MODEL",
    "pillText": ""
  },
  {
    "suggestion": "Chery Tiggo 4 Pro",
    "label": "MODEL",
    "pillText": ""
  },
  {
    "suggestion": "Suzuki Swift",
    "label": "MODEL",
    "pillText": ""
  },
  {
    "suggestion": "Toyota Corolla Cross",
    "label": "VARIANT",
    "pillText": "Toyota Corolla"
  }
]
  return (
    <div>

     {/* <PropertiesFilters isDashboard={false} listingType="rent" propertyTypes={[]} /> */}
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