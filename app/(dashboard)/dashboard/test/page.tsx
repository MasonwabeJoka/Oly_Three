import styles from './styles.module.scss'
import ReviewVehicleDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/ReviewVehicleDetails";
import VehicleCondition from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleCondition";
import VehicleDescription from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleDescription";
import VehicleListingIntro from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingIntro";
import VehicleListingsPublished from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleListingsPublished";
import VehiclePhotoUploads from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehiclePhotoUploads";
import VehicleSellerDetails from "@/app/(dashboard)/dashboard/create-listing/components/auto/VehicleSellerDetails";
import styled from "styled-components";

const Page = () => {
  
  return (
    <div className={styles.container}>
     {/* <ReviewVehicleDetails /> */}

      {/* <VehicleCondition /> */}
      <VehiclePhotoUploads />
      
      
      {/* <VehicleDescription /> */}
      {/* <VehicleSellerDetails /> */}
      {/* <ReviewVehicleDetails /> */}
      {/* <VehicleListingsPublished /> */}
    </div>
  );
};

export default Page;
