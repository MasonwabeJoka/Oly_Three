"use client";
import styles from "./Features.module.scss";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import { featuresData } from "@/data/FeaturesData";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import EditModeForm from "@/components/forms/EditModeForm";
import SelectedFeature from "@/components/forms/SelectedFeature";
import { FormWrapper } from "./FormWrapper";
import Form from "next/form";

export type FeaturesProps = {};

type FormValues = z.infer<typeof multiStepFormSchema>;

const FeaturesClient = (props: FeaturesProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useFormContext();

  const [detailId, setDetailId] = useState<string | number | null>(null);
  const selectFeatureValue = watch("selectFeature");

  const onSubmitDetail = (data: FormValues) => {
    console.log(data);
    setDetailId(null);
    // Perform any additional actions here
  };

  const editDetail = (id: string) => {
    setDetailId(id);
  };

  const conditions = ConditionsData.map((detail) => detail.condition);
  const details = DetailsData.map((detail) => detail.detail);

  let matchFound = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name as keyof FormValues, e.target.value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.name as keyof FormValues, e.target.value, {
      shouldTouch: true,
    });
  };

  // Mock server action for demonstration
  async function mockServerAction(formData: FormData): Promise<void> {
    // Simulate server-side processing
    await new Promise((resolve) => setTimeout(resolve, 500));
    // No return value needed
  }

  return (
    <FormWrapper title="Product Features">
      <div className={styles.container}>
        <Form
          className={styles.form}
          action={mockServerAction}
          onSubmit={handleSubmit(onSubmitDetail)}
        >
          <div className={styles.formElements}>
            <div className={styles.selecteDetailContainer}>
              <Select
                options={details}
                className={styles.selectDetail}
                initialValue={selectFeatureValue}
                selectSize="large"
                selectColourType="normal"
                label="Choose a detail"
                id="choose-detail"
                ariaLabel="Choose Detail Select"
                autoFocus={false}
                autoComplete="off"
                disabled={false}
                required={false}
                multiple={false}
                error={errors.selectDetail?.message as string}
                {...register("selectFeature")}
              />
            </div>

            {DetailsData.map((detail) => {
              if (!matchFound && selectFeatureValue === detail.detail) {
                matchFound = true;
                return (
                  <SelectedFeature
                    id={detail.id}
                    detail={detail.detail}
                    initialValue=""
                    description={detail.description}
                    example={detail.example}
                    key={detail.id}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                );
              } else {
                return null;
              }
            })}

            <ul className={styles.details}>
              {featuresData.map((detail) =>
                detailId !== detail.id ? (
                  <li key={detail.id} className={styles.detail}>
                    <div className={styles.detailButtons}>
                      <div className={styles.editButtonContainer}>
                        <Button
                          className={`${styles.editButton} ${styles.detailButton}`}
                          buttonChildren={
                            <Image
                              src="/icons/pencil.png"
                              alt="edit-icon"
                              width={18}
                              height={18}
                            />
                          }
                          buttonType="roundStandardFeed"
                          buttonSize=""
                          name="edit-btn"
                          type="button"
                          ariaLabel="Edit Button"
                          autoFocus={false}
                          disabled={false}
                          onClick={() => editDetail(detail.id)}
                        />
                      </div>
                      <div className={styles.deleteButtonContainer}>
                        <Button
                          className={`${styles.deleteButton} ${styles.detailButton}`}
                          buttonChildren={
                            <Image
                              src="/icons/trash.png"
                              alt="delete-icon"
                              width={18}
                              height={18}
                            />
                          }
                          buttonType="roundStandardFeed"
                          buttonSize=""
                          name="delete-btn"
                          type="button"
                          ariaLabel="Delete Button"
                          autoFocus={false}
                          disabled={false}
                        />
                      </div>
                    </div>
                    <p className={styles.detailText}>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Earum, perspiciatis odio qui nihil nesciunt repellat
                      ducimus iste voluptatem quod recusandae.
                    </p>
                  </li>
                ) : (
                  <EditModeForm />
                )
              )}
            </ul>
          </div>
        </Form>
      </div>
    </FormWrapper>
  );
};

export default FeaturesClient;
