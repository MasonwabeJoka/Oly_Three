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
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import styles from "./styles.module.scss";
import Button from "@/components/Buttons";
import SelectACategory from "./components/SelectACategory";
import Details from "./components/Details";
import Location from "./components/Location";
import UploadPhotos from "./components/UploadPhotos";
import UploadVideos from "./components/UploadVideos";
import UploadMedia from "./components/UploadMedia";
import UploadAttachments from "./components/UploadAttachments";
import Features from "./components/Features";
import Price from "./components/Price";
import TitleAndDescription from "./components/TitleAndDescription";
import PromoteYourAd from "./components/PromoteYourAd";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import { useState } from "react";

type FormValues = z.infer<typeof multiStepFormSchema>;
type FormData = {
  condition: string;
  selectDetail: string;
  detail: string;
  selectFeature: string;
  feature: string;
  priceType: string;
  price: number;
  title: string;
  description: string;
  image: string;
  video: string;
  attachment: string;
  province: string;
  city: string;
  suburb: string;
  customLocation: string;
};

const initialData: FormData = {
  condition: "Condition",
  selectDetail: "See a list of details you can include",
  detail: "",
  selectFeature: "Choose features to include",
  feature: "",
  priceType: "",
  price: 0,
  title: "",
  description: "",
  image: "",
  video: "",
  attachment: "",
  province: "",
  city: "",
  suburb: "",
  customLocation: "",
};
type Step = {
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
    fields: ["priceType", "price"],
  },
  {
    id: "step 5",
    name: "Title and Description",
    fields: ["title", "description"],
  },

  {
    id: "step 6",
    name: "Upload Media",
    fields: [],
  },
  {
    id: "step 7",
    name: "Location",
    fields: ["province", "city", "suburb", "customLocation"],
  },
  {
    id: "step 8",
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
    id: "step 9",
    name: "Review and Submit",
    fields: [],
  },
  // {
  //   id: "step 10",
  //   name: "Upload Photos",
  //   fields: [],
  // },
  // {
  //   id: "step 11",
  //   name: "Upload Videos",
  //   fields: [],
  // },

  // {
  //   id: "step 12",
  //   name: "Upload Attachments",
  //   fields: [],
  // },
];

const Dashboard = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex !== 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const methods = useForm<FormValues>({
    resolver: zodResolver(multiStepFormSchema),
    defaultValues: initialData,
  });
  const [formStateValues, setFormStateValues] = useState(methods.getValues());

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("data", data);
    reset();
  };
  const next = async () => {
    // get fields for current step
    const fields = steps[currentStepIndex].fields;

    // trigger, to validate all fields for current step
    const output = await trigger(fields as FieldName<FormValues>[], {
      // focus on first field with error
      shouldFocus: true,
    });

    // output is true if all fields are valid
    if (!output) return;

    if (currentStepIndex < steps.length - 1) {
      if (currentStepIndex === steps.length - 2) {
        await handleSubmit(onSubmit)(); // if on the second last step, submit form
      }
      setCurrentStepIndex((index) => {
        if (index >= steps.length - 1) return index; // don't add 1 if on last step
        return index + 1;
      });
    }
  };

  // go to previous step function
  const back = () => {
    setCurrentStepIndex((index) => {
      if (index <= 0) return index; // don't subtract 1 if on first step
      return index - 1;
    });
  };

  // go to specific step function
  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <MaxWidthWrapper className={styles.MaxWidthWrapper}>
      <FormProvider {...methods}>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div
            className={styles.stepsCounter}
            style={{ position: "absolute", top: ".5rem", right: "3rem" }}
          >
            {currentStepIndex + 1}/{steps.length}
          </div>
          <div className={styles.form}>
            {currentStepIndex === 0 && <SelectACategory />}

            {currentStepIndex === 1 && (
              <Details
                condition={formStateValues.condition}
                setCondition={(value) => {
                  methods.setValue("condition", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, condition: value }));
                }}
                selectDetail={formStateValues.selectDetail}
                setSelectDetail={(value) => {
                  methods.setValue("selectDetail", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({
                    ...prev,
                    selectDetail: value,
                  }));
                }}
                detail={formStateValues.detail}
                setDetail={(value) => {
                  methods.setValue("detail", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, detail: value }));
                }}
              />
            )}

            {currentStepIndex === 2 && (
              <Features
                selectFeature={formStateValues.selectFeature}
                setSelectFeature={(value) => {
                  methods.setValue("selectFeature", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({
                    ...prev,
                    selectFeature: value,
                  }));
                }}
                feature={formStateValues.feature}
                setFeature={(value) => {
                  methods.setValue("feature", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, features: value }));
                }}
              />
            )}

            {currentStepIndex === 3 && (
              <Price
                priceValue={formStateValues.priceValue}
                setPriceValue={(value) => {
                  methods.setValue("price", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, priceValue: value }));
                }}
                priceType={formStateValues.priceType}
                setPriceType={(value) => {
                  methods.setValue("priceType", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, priceType: value }));
                }}
              />
            )}
            {currentStepIndex === 4 && (
              <TitleAndDescription
                title={formStateValues.title}
                setTitle={(value) => {
                  methods.setValue("title", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, title: value }));
                }}
                description={formStateValues.description}
                setDescription={(value) => {
                  methods.setValue("description", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({
                    ...prev,
                    description: value,
                  }));
                }}
              />
            )}

            {currentStepIndex === 5 && (
              <UploadMedia
                media={formStateValues.media}
                setMedia={(value) => {
                  methods.setValue("media", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, media: value }));
                }}
              />
            )}

            {currentStepIndex === 6 && (
              <Location
                province={formStateValues.province}
                setProvince={(value) => {
                  methods.setValue("province", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, province: value }));
                }}
                city={formStateValues.city}
                setCity={(value) => {
                  methods.setValue("city", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, city: value }));
                }}
                suburb={formStateValues.suburb}
                setSuburb={(value) => {
                  methods.setValue("suburb", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, suburb: value }));
                }}
                customLocation={formStateValues.customLocation}
                setCustomLocation={(value) => {
                  methods.setValue("customLocation", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({
                    ...prev,
                    customLocation: value,
                  }));
                }}
              />
            )}

            {currentStepIndex === 7 && (
              <PromoteYourAd
                promotionOptions={formStateValues.promotionOptions}
                setPromotionOptions={(value) => {
                  methods.setValue("promotionOptions", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({
                    ...prev,
                    promotionOptions: value,
                  }));
                }}
              />
            )}

            {currentStepIndex === 8 && (
              <ReviewAndSubmit formData={formState} onSubmit={handleSubmit} />
            )}

            {currentStepIndex === 4 && (
              <UploadVideos
                videos={formStateValues.videos}
                setVideos={(value) => {
                  methods.setValue("videos", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, videos: value }));
                }}
              />
            )}

            {currentStepIndex === 5 && (
              <UploadPhotos
                photos={formStateValues.photos}
                setPhotos={(value) => {
                  methods.setValue("photos", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({ ...prev, photos: value }));
                }}
              />
            )}

            {currentStepIndex === 6 && (
              <UploadAttachments
                attachments={formStateValues.attachments}
                setAttachments={(value) => {
                  methods.setValue("attachments", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setFormStateValues((prev) => ({
                    ...prev,
                    attachments: value,
                  }));
                }}
              />
            )}
          </div>

          <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren={isLastStep ? "Finish" : "Proceed"}
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
        </form>
      </FormProvider>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
