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
// import { multiStepFormSchema } from "@/lib/validations/formValidations";
import { detailsValidations } from "../validations/multiStepFormValidations";
import EditMode from "../../../dashboard/post-your-ad/components/EditMode";
import SelectedDetail from "./SelectedDetail";
import { FormWrapper } from "./FormWrapper";

type FormValues = z.infer<typeof detailsValidations>;
// TODO: On edit mode the textarea should grow with text.
// TODO: Fix more input and submitDetail button so that submitDetailContainer button is displayed until the button is clicked

const Details = () => {
  const [matchFound, setMatchFound] = useState(true);
  const [showSpecificationForm, setShowSpecificationForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    watch,
    trigger,
  } = useFormContext();

  const [editIndex, setEditIndex] = useState<string | number | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const [details, setDetails] = useState<
    { selectDetail: string; value: string }[]
  >([]);
  const selectDetailValue = watch("selectDetail");

  const isSelectDetailDirty = dirtyFields.selectDetailValue;

  const editDetail = (index: number) => {
    setEditIndex(index);
    setEditValue(details[index].value);
  };

  const updateDetail = (index: number, updatedValue: string) => {
    if (updatedValue.trim() !== "") {
      // Create a copy of the details array and update the edited detail
      const updatedDetails = [...details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        value: updatedValue,
      };

      // Update the list with the new value
      setDetails(updatedDetails);

      // Exit edit mode by setting editIndex to null
      setEditIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditIndex(null); // Exit edit mode without saving changes
  };

  // Handle deleting an item from the list
  const handleDeleteItem = (index: number) => {
    // Remove the item at the specified index
    const updatedDetails = details.filter((_, i) => i !== index);

    // Update the list with the remaining details
    setDetails(updatedDetails);

    // If the item being deleted is in edit mode, exit edit mode
    if (editIndex === index) {
      setEditIndex(null);
    }
  };
  const conditions = ConditionsData.map((detail) => detail.condition);
  const detailsTitles = DetailsData.map((detail) => detail.detail);

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

  return (
    <FormWrapper title="Product Details">
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.formElements}>
            <div className={styles.conditionsContainer}>
              <Select
                options={conditions}
                className={styles.conditions}
                currentValue="Choose a condition"
                selectSize="large"
                selectColourType="normal"
                label="Choose a condition"
                id="conditions"
                ariaLabel="Conditions"
                autoFocus={false}
                disabled={false}
                required={false}
                multiple={false}
                error={errors.condition?.message as string}
                {...register("condition")}
              />
            </div>

            <div className={styles.selectDetailContainer}>
              <Select
                options={detailsTitles}
                className={styles.selectDetail}
                currentValue="Select a product detail"
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
              />
            </div>
            {DetailsData.map((detail) => {
              if (matchFound === true && selectDetailValue === detail.detail) {
                return (
                  <SelectedDetail
                    id={detail.id}
                    initialValue="See a list of details you can include"
                    detail={detail.detail}
                    description={detail.description}
                    example={detail.example}
                    isFieldDirty={isSelectDetailDirty}
                    key={detail.id}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    trigger={trigger}
                    selectDetailValue={selectDetailValue}
                    details={details}
                    setDetails={setDetails}
                    watch={watch}
                    setMatchFound={() => setMatchFound(false)}
                  />
                );
              } else {
                return null;
              }
            })}
            <ul className={styles.details}>
              {details.map((detail: any, index) =>
                editIndex !== index ? (
                  <li key={index} className={styles.detail}>
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
                          onClick={() => editDetail(index)}
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
                          onClick={() => handleDeleteItem(index)}
                        />
                      </div>
                    </div>
                    <p className={styles.detailText}>
                      <span style={{ fontWeight: "600" }}>
                        {detail?.selectDetail}:
                      </span>
                      {"  "}
                      <span>{detail?.value}</span>
                    </p>
                  </li>
                ) : (
                  <EditMode
                    editValue={editValue}
                    setValue={setValue}
                    updateDetail={(updatedValue: string) =>
                      updateDetail(index, updatedValue)
                    } // Pass the function
                    cancelEdit={cancelEdit}
                    register={register}
                    errors={errors}
                    watch={watch}
                    key={index}
                  />
                )
              )}
            </ul>
            <div className={styles.addSpecificationsContainer}>
              <Button
                className={styles.addSpecifications}
                buttonChildren="Add product specifications"
                buttonType="normal"
                buttonSize="large"
                name="addSpecification"
                type="button"
                ariaLabel="Add Product Specification Button"
                autoFocus={false}
                disabled={false}
                onClick={() => setShowSpecificationForm(!showSpecificationForm)}
              />
            </div>
            {showSpecificationForm && (
              <>
                <SelectedDetail
                  id={"a"}
                  initialValue="Select a product detail to add"
                  detail={
                    "Provide details such as dimensions, weight, or any other relevant technical specifications."
                  }
                  description={
                    "If you use a colon (:) to separate the label from the value, the label will be displayed in bold to make key details stand out."
                  }
                  boldTextExample={"Screen size"}
                  normalTextExample={"6.1 inches"}
                  placeholder={"Add product specification"}
                  isFieldDirty={isSelectDetailDirty}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  trigger={trigger}
                  selectDetailValue={selectDetailValue}
                  details={details}
                  setDetails={setDetails}
                  watch={watch}
                  setMatchFound={() => setShowSpecificationForm(false)}
                />
                <ul className={styles.details}>
                  {details.map((detail: any, index) =>
                    editIndex !== index ? (
                      <li key={index} className={styles.detail}>
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
                              onClick={() => editDetail(index)}
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
                              onClick={() => handleDeleteItem(index)}
                            />
                          </div>
                        </div>
                        <p className={styles.detailText}>
                          <span style={{ fontWeight: "600" }}>
                            {detail?.selectDetail}:
                          </span>
                          {"  "}
                          <span>{detail?.value}</span>
                        </p>
                      </li>
                    ) : (
                      <EditMode
                        editValue={editValue}
                        setValue={setValue}
                        updateDetail={(updatedValue: string) =>
                          updateDetail(index, updatedValue)
                        }
                        cancelEdit={cancelEdit}
                        register={register}
                        errors={errors}
                        watch={watch}
                        key={index}
                      />
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Details;
