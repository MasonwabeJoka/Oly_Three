"use client";
//https://www.youtube.com/watch?v=FXWD_etMJWA&list=PLeO8M-2wYaaV5vh2lRWV7qt_-Io8agaf-&index=1
//https://www.youtube.com/watch?v=uDCBSnWkuH0
//https://www.youtube.com/watch?v=lW_0InDuejU
import {
  FormProvider,
  useForm,
  FieldName,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import styles from "./styles.module.scss";
import Button from "@/components/Buttons";
import SelectACategory from "./components/SelectACategory";
import Details from "./components/Details";
import Location from "./components/Location";
import UploadPhotos from "./components/UploadPhotos";
import UploadVideos from "./components/UploadVideos";
import UploadMedia from "./components/UploadMedia";
import ReorderPhotos from "./components/ReorderPhotos";
import UploadAttachments from "./components/UploadAttachments";
import Features from "./components/Features";
import Price from "./components/Price";
import TitleAndDescription from "./components/TitleAndDescription";
import PromoteYourAd from "./components/PromoteYourAd";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import { useState } from "react";
import CreateAccount from "./components/BankAccountDetails";
import FormProgressBar from "./components/FormProgressBar";

import { createAd } from "@/sanity/actions/createAd";
import { Ad } from "@/sanity/Types/Ad";

type FormValues = z.infer<typeof multiStepFormSchema>;
type FormData = {
  condition: "new" | "like-new" | "gently-used" | "used";
  selectDetail:
    | ""
    | "Reason for Selling"
    | "Accessories Included"
    | "Warranty Information"
    | "Ownership"
    | "Condition"
    | "History"
    | "Customizations"
    | "Maintenance History"
    | "Compatibility"
    | "Original Packaging"
    | "Usage History"
    | "Storage"
    | "Original Purchase Date"
    | "Upgrades"
    | "Additional Features"
    | "Service Records"
    | "User Manual Availability"
    | "Manufacturer Support"
    | "Compatibility with Accessories"
    | "Packaging Condition"
    | "Product History"
    | "Transferability"
    | "Pet/Smoke Exposure"
    | "Regulatory Compliance"
    | "Special Features"
    | "Certification"
    | "Age"
    | "Environmental Impact"
    | "Known Issues";
  detail: string;
  selectFeature: string;
  feature: string;
  pricingOption: string;
  price: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  title: string;
  description: string;
  image: string;
  video: string;
  attachment: string;
  province: string;
  city: string;
  suburb: string;
  customLocation: string;
  category: string;
};

const initialData: FormData = {
  condition: "used",
  selectDetail: "",
  detail: "",
  selectFeature: "Choose features to include",
  feature: "",
  pricingOption: "",
  price: 0,
  bankName: "",
  accountName: "",
  accountNumber: "",
  title: "",
  description: "",
  image: "",
  video: "",
  attachment: "",
  province: "",
  city: "",
  suburb: "",
  customLocation: "",
  category: "",
};
export type Step = {
  id: string;
  name: string;
  fields: string[];
};

const steps: Step[] = [
  {
    id: "step 1",
    name: "Select a category",
    fields: [],
  },
  {
    id: "step 2",
    name: "Details",
    fields: ["condition", "selectDetail", "moreDetails", "editDetail"],
  },
  {
    id: "step 3",
    name: "Features",
    fields: ["selectFeature", "feature"],
  },

  {
    id: "step 4",
    name: "Price",
    fields: ["pricingOption", "price"],
  },
  {
    id: "step 5",
    name: "Crate Account",
    fields: ["bankName", "accountName", "accountNumber"],
  },
  {
    id: "step 6",
    name: "Title and Description",
    fields: ["title", "description"],
  },

  {
    id: "step 7",
    name: "Upload Media",
    fields: [],
  },
  {
    id: "step 8",
    name: "Upload Photos",
    fields: ["image"],
  },
  {
    id: "step 9",
    name: "Upload Videos",
    fields: ["video"],
  },

  {
    id: "step 10",
    name: "Upload Attachments",
    fields: ["file"],
  },
  {
    id: "step 11",
    name: "Location",
    fields: ["province", "city", "suburb", "customLocation"],
  },
  {
    id: "step 12",
    name: "Promote Your Ad",
    fields: [
      "facebook",
      "instagram",
      "google",
      "linkedin",
      "oly",
      "allExternalPromotions",
      "allPromotions",
    ],
  },
  {
    id: "step 13",
    name: "Review and Submit",
    fields: [],
  },
  {
    id: "step 14",
    name: "Reorder Photos",
    fields: [],
  },
];

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex !== 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const methods = useForm<FormValues>({
    defaultValues: initialData,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data);
    try {
      const result = await createAd(data);
      reset(result);
      setMessage("Ad created successfully");
    } catch (error) {
      console.error("Error creating ad:", error);
      setMessage("Error creating ad");
    }
  };

  function transformAdData(data: Ad): FormData {
    return {
      user: data.user._id,
      condition: data.condition,
      selectDetail: "See a list of details you can include", // Placeholder
      detail: "", // Placeholder
      selectFeature: "Choose features to include", // Placeholder
      feature: data.features?.join(", ") || "", // Join features array to string
      pricingOption: data.pricingOption, // This assumes a direct mapping
      price: data.price,
      title: data.title,
      description: data.description
        ? data.description
            .map((block) => block.children.map((child) => child.text).join(" "))
            .join(" ")
        : "",
      image: data.images[0]?.url || "", // Example using the first image
      video: data.videos?.[0]?.url || "", // Example using the first video
      attachment: data.attachments?.[0]?.url || "", // Example using the first attachment
      province: "", // Placeholder
      city: data.city,
      suburb: data.suburb,
      customLocation: "", // Placeholder
      category: data.category,
    };
  }
  const next = async () => {
    // Get fields for the current step
    const fields = steps[currentStepIndex].fields;

    // Trigger validation for all fields in the current step
    const isItValid = await trigger(fields as FieldName<FormValues>[], {
      shouldFocus: true, // Focus on the first field with an error
    });

    // If validation fails, stop the function
    if (!isItValid) {
      console.log("Validation failed for fields:", fields);
      return;
    }

    // If on the second last step
    if (currentStepIndex === steps.length - 2) {
      try {
        // Handle form submission
        console.log("Submitting form...");
        await handleSubmit(onSubmit)();
      } catch (error) {
        console.error("Error during submission:", error);
      }

      // Move to the next step after successful submission
      setCurrentStepIndex((index) => index + 1);
      return; // Exit function to prevent further execution
    }

    // Move to the next step if not on the last step
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((index) => {
        if (index === 6 || index === 7 || index === 8 || index === 9) {
          return 10;
        }
        return index + 1;
      });
    }
  };

  // go to previous step function
  const back = () => {
    setCurrentStepIndex((index) => {
      if (index <= 0) return index; // don't subtract 1 if on first step
      if (index === 7 || index === 8 || index === 9 || index === 10) {
        return 6;
      }
      return index - 1;
    });
  };

  // go to specific step function
  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  const step = steps[currentStepIndex];

  const setCategory = (category: string) => {
    methods.setValue("category", category); // Update the 'category' in the form state
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.container}>
        <div className={styles.form}>
          {currentStepIndex === 0 && (
            <SelectACategory goTo={goTo} setCategory={setCategory} />
          )}

          {currentStepIndex === 1 && <Details />}

          {currentStepIndex === 2 && <Features />}

          {currentStepIndex === 3 && <Price />}

          {currentStepIndex === 4 && <CreateAccount />}

          {currentStepIndex === 5 && <TitleAndDescription />}

          {currentStepIndex === 6 && <UploadMedia goTo={goTo} />}

          {currentStepIndex === 7 && <UploadPhotos goTo={goTo} />}

          {currentStepIndex === 14 && <ReorderPhotos />}

          {currentStepIndex === 8 && <UploadVideos />}

          {currentStepIndex === 9 && <UploadAttachments />}

          {currentStepIndex === 10 && <Location />}

          {currentStepIndex === 11 && <PromoteYourAd />}

          {currentStepIndex === 12 && <ReviewAndSubmit />}
          <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren={
                isLastStep
                  ? "Finish"
                  : isEditMode
                    ? "Accept Changes"
                    : "Proceed"
              }
              buttonType="primary"
              buttonSize="large"
              name="proceed-btn"
              type="button"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={next}
            />

            {isFirstStep && (
              <Button
                className={styles.backButton}
                buttonChildren="Back"
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="button"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={back}
              />
            )}
          </nav>
        </div>
        <div className={styles.progressBar}>
          <FormProgressBar
            totalSteps={steps.length}
            currentStepIndex={currentStepIndex}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Dashboard;
