import ReviewVehicleDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/ReviewVehicleDetails";
import VehicleCondition from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleCondition";
import VehicleDescription from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleDescription";
import VehicleListingIntro from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingIntro";
import VehicleListingsPublished from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingsPublished";
import VehiclePhotoUploads from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehiclePhotoUploads";
import VehicleSellerDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleSellerDetails";
import ListingCardSkeletons from "@/components/skeletons/ListingCardSkeletons";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";



const Page = () => {
  return (
    <div>
     <Button>Button</Button>
     <button>Button</button>
     <h1 className="text-3xl text-red-500">Hello World</h1>
      <VehicleListingIntro/>  
      {/* <VehicleCondition/> */}
      {/* <VehiclePhotoUploads/> */}
      {/* <VehicleDescription/> */}
      {/* <VehicleSellerDetails/> */}
      {/* <ReviewVehicleDetails/> */}
      {/* <VehicleListingsPublished/>  */}
    </div>
  );
};

export default Page;