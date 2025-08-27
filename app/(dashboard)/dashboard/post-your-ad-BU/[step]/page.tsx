import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner";

// Dynamically import client components with loading states
const PostYourAdClient = dynamic(
  () => import("../components/PostYourAdClient"),
  {
    loading: () => <LoadingSpinner />,
  }
);

const SelectACategory = dynamic(() => import("../components/SelectACategory"), {
  loading: () => <LoadingSpinner />,
});

const Details = dynamic(() => import("../components/Details"), {
  loading: () => <LoadingSpinner />,
});

const Price = dynamic(() => import("../components/Price"), {
  loading: () => <LoadingSpinner />,
});

const BankAccountDetails = dynamic(
  () => import("../components/BankAccountDetails"),
  {
    loading: () => <LoadingSpinner />,
  }
);

const TitleAndDescription = dynamic(
  () => import("../components/TitleAndDescription"),
  {
    loading: () => <LoadingSpinner />,
  }
);

const UploadMedia = dynamic(() => import("../components/UploadMedia"), {
  loading: () => <LoadingSpinner />,
});

const Location = dynamic(() => import("../components/Location"), {
  loading: () => <LoadingSpinner />,
});

const PromoteYourAd = dynamic(() => import("../components/PromoteYourAd"), {
  loading: () => <LoadingSpinner />,
});

const Congratulations = dynamic(() => import("../components/Congratulations"), {
  loading: () => <LoadingSpinner />,
});

const ReviewAndSubmit = dynamic(() => import("../components/ReviewAndSubmit"), {
  loading: () => <LoadingSpinner />,
});

const SelectNewCategory = dynamic(
  () => import("../components/SelectNewCategory"),
  {
    loading: () => <LoadingSpinner />,
  }
);

const PostYourAd = () => {
  const steps = [
    <SelectACategory key="0" />,
    <Details key="1" />,
    <Price key="2" />,
    <BankAccountDetails key="3" />,
    <TitleAndDescription key="4" />,
    <UploadMedia key="5" />,
    <Location key="6" />,
    <PromoteYourAd key="7" />,
    <Congratulations key="8" />,
    <ReviewAndSubmit key="9" />,
    <SelectNewCategory key="10" />,
  ];

  const initialFormData = {
    category: { main: "", subcategory: "" },
    details: { condition: "" },
    price: { pricingOption: "", price: 0 },
    createAccount: { bankName: "", accountHolder: "", accountNumber: "" },
    titleAndDescription: { title: "", description: "" },
    uploadMedia: {
      uploadPhotos: false,
      uploadVideos: false,
      uploadAttachments: false,
    },
    location: { province: "", city: "", suburb: "", customLocation: "" },
    promoteYourAd: { promotionDuration: "" },
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <PostYourAdClient initialFormData={initialFormData} steps={steps} />
      </div>
    </div>
  );
};

export default PostYourAd;
