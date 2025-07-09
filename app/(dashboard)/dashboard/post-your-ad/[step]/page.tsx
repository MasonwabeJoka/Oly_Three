import styles from "./styles.module.scss";
import BankAccountDetails from "../components/BankAccountDetails";
import Congratulations from "../components/Congratulations";
import Details from "../components/Details";
import Location from "../components/Location";
import PostYourAdClient from "../components/PostYourAdClient";
import Price from "../components/Price";
import PromoteYourAd from "../components/PromoteYourAd";
import ReviewAndSubmit from "../components/ReviewAndSubmit";
import SelectACategory from "../components/SelectACategory";
import SelectNewCategory from "../components/SelectNewCategory";
import TitleAndDescription from "../components/TitleAndDescription";
import UploadMedia from "../components/UploadMedia";


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
    <SelectNewCategory key="10" />, // Add the new step
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
