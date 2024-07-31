"use client";
import styles from "./Details.module.scss";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import { featuresData } from "@/data/FeaturesData";
import { DevTool } from "@hookform/devtools";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import EditModeForm from "@/components/forms/EditModeForm";
import SelectedDetail from "@/components/forms/SelectedDetail";

type FormValues = z.infer<typeof multiStepFormSchema>;
// TODO: On edit mode the textarea should grow with text.
// TODO: Fix more input and submitDetail button so that submitDetailContainer button is displayed until the button is clicked
type DetailsProps = {
  condition: string;
  setCondition: (value: string) => void;
  selectDetail: string;
  setSelectDetail: (value: string) => void;
  detail: string;
  setDetail: (value: string) => void;
};
const Details = ({
  condition,
  setCondition,
  selectDetail,
  setSelectDetail,
  detail,
  setDetail,
}: DetailsProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    getValues,
    setValue,
    watch,
  } = useFormContext();

  const [detailId, setDetailId] = useState<string | number | null>(null);
  const conditionValue = getValues("condition");
  const selectDetailValue = watch("selectDetail");

  const isSelectDetailDirty = dirtyFields.selectDetailValue;

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
    setDetail(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.name as keyof FormValues, e.target.value, {
      shouldTouch: true,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <fieldset className={styles.titleContainer}>
          <legend className={styles.title}>Product Details</legend>
        </fieldset>
        <div className={styles.formElements}>
          <div className={styles.conditionsContainer}>
            <Select
              options={conditions}
              className={styles.conditions}
              currentValue={conditionValue}
              selectSize="large"
              selectColourType="normal"
              label="Choose a condition"
              id="conditions"
              ariaLabel="Conditions"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={false}
              multiple={false}
              error={errors.condition?.message as string}
              {...register("condition")}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          <div className={styles.selectDetailContainer}>
            <Select
              options={details}
              className={styles.selectDetail}
              currentValue="See a list of details you can include"
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
              {...register("selectDetail")}
              onChange={(e) => setSelectDetail(e.target.value)}
            />
          </div>

          {DetailsData.map((detail) => {
            if (!matchFound && selectDetailValue === detail.detail) {
              matchFound = true;
              return (
                <SelectedDetail
                  id={detail.id}
                  detail={detail.detail}
                  description={detail.description}
                  example={detail.example}
                  isFieldDirty={isSelectDetailDirty}
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
                            width={24}
                            height={24}
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
                    Earum, perspiciatis odio qui nihil nesciunt repellat ducimus
                    iste voluptatem quod recusandae.
                  </p>
                </li>
              ) : (
                <EditModeForm />
              )
            )}
          </ul>

          {/* <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren="Proceed"
              buttonType="primary"
              buttonSize="large"
              name="proceed-btn"
              type="submit"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />
            <div className={styles.backButtonContainer}>
              <Button
                className={styles.backButton}
                buttonChildren="Back"
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="submit"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
              />
            </div>
          </nav> */}
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Details;
