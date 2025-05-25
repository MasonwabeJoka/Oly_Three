"use client";
import styles from "./Details.module.scss";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import EditMode from "./EditMode";
import SelectedDetail from "./SelectedDetail";
import { FormWrapper } from "./FormWrapper";
import type { FormDataSchema } from "../validations/formDataSchema";

interface DetailItem {
  selectDetail: string;
  value: string;
}

const Details = () => {
  const [matchFound, setMatchFound] = useState(true);
  const [showSpecificationForm, setShowSpecificationForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [details, setDetails] = useState<DetailItem[]>([]);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const {
    register,
    formState: { errors, dirtyFields },
    setValue,
    watch,
    trigger,
    getValues,
  } = useFormContext();

  const selectDetailValue = watch("details.selectDetail");
  const formDetails = watch("details.list") || [];

  // Sync local state with form state
  useEffect(() => {
    if (formDetails.length > 0 && details.length === 0) {
      setDetails(formDetails);
    }
  }, [formDetails]);

  const updateDetailsInForm = (updatedDetails: DetailItem[]) => {
    setDetails(updatedDetails);
    setValue("details.list", updatedDetails, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const editDetail = (index: number) => {
    setEditIndex(index);
    setEditValue(details[index].value);
  };

  const updateDetail = async (index: number, updatedValue: string) => {
    if (updatedValue.trim()) {
      const updatedDetails = [...details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        value: updatedValue.trim(),
      };

      updateDetailsInForm(updatedDetails);

      const isValid = await trigger("details.list");
      if (isValid) {
        setEditIndex(null);
      }
    }
  };

  const handleDeleteItem = async (index: number) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    updateDetailsInForm(updatedDetails);

    if (editIndex === index) {
      setEditIndex(null);
    }

    await trigger("details.list");
  };

  const conditions = ConditionsData.map((detail) => detail.condition);
  const detailsTitles = DetailsData.map((detail) => detail.detail);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof FormDataSchema, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
    await trigger(name as keyof FormDataSchema);
  };

  const DetailsList = ({
    details,
    editIndex,
  }: {
    details: DetailItem[];
    editIndex: number | null;
  }) => (
    <ul className={styles.details}>
      {details.map((detail, index) =>
        editIndex !== index ? (
          <li key={index} className={styles.detail}>
            <div className={styles.detailButtons}>
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
                name="edit-btn"
                type="button"
                ariaLabel="Edit Button"
                onClick={() => editDetail(index)}
              />
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
                name="delete-btn"
                type="button"
                ariaLabel="Delete Button"
                onClick={() => handleDeleteItem(index)}
              />
            </div>
            <p className={styles.detailText}>
              <span style={{ fontWeight: "600" }}>{detail.selectDetail}:</span>{" "}
              <span>{detail.value}</span>
            </p>
          </li>
        ) : (
          <EditMode
            key={index}
            editValue={editValue}
            setValue={setValue}
            updateDetail={(value: string) => updateDetail(index, value)}
            cancelEdit={() => setEditIndex(null)}
            register={register}
            errors={errors}
            watch={watch}
          />
        )
      )}
    </ul>
  );

  return (
    <FormWrapper
      error={errors.details?.message as string}
      selectOpen={isConditionsOpen || isDetailsOpen}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Product Details</h2>

        <div className={styles.form}>
          <div className={styles.formElements}>
            <div className={styles.conditionsContainer}>
              <Select
                options={conditions}
                className={styles.conditions}
                initialValue="Choose a condition"
                selectSize="large"
                selectColourType="normal"
                label="Choose a condition"
                id="conditions"
                ariaLabel="Conditions"
                error={errors.details?.condition?.message as string}
                {...register("details.condition")}
                onOpenChange={(isOpen) => setIsConditionsOpen(isOpen)}
              />
            </div>

            {!isConditionsOpen && (
              <div className={styles.selectDetailContainer}>
                <Select
                  options={detailsTitles}
                  className={styles.selectDetail}
                  initialValue="Select a product detail"
                  selectSize="large"
                  selectColourType="normal"
                  label="Choose a detail"
                  id="choose-detail"
                  ariaLabel="Choose Detail Select"
                  autoComplete="off"
                  error={errors.details?.selectDetail?.message as string}
                  {...register("details.selectDetail")}
                  onOpenChange={(isOpen) => setIsDetailsOpen(isOpen)}
                />
              </div>
            )}

            {DetailsData.map(
              (detail) =>
                matchFound &&
                selectDetailValue === detail.detail && (
                  <SelectedDetail
                    key={detail.id}
                    id={detail.id}
                    initialValue="See a list of details you can include"
                    detail={detail.detail}
                    description={detail.description}
                    example={detail.example}
                    isFieldDirty={!!dirtyFields.details?.selectDetail}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    handleChange={handleChange}
                    selectDetailValue={selectDetailValue}
                    details={details}
                    setDetails={setDetails}
                    watch={watch}
                    setMatchFound={() => setMatchFound(false)}
                  />
                )
            )}

            <DetailsList details={details} editIndex={editIndex} />

            {!isConditionsOpen && !isDetailsOpen && (
              <div className={styles.addSpecificationsContainer}>
                <Button
                  className={styles.addSpecifications}
                  buttonChildren="Add product specifications"
                  buttonType="normal"
                  buttonSize="large"
                  name="addSpecification"
                  type="button"
                  ariaLabel="Add Product Specification Button"
                  onClick={() =>
                    setShowSpecificationForm(!showSpecificationForm)
                  }
                />
              </div>
            )}

            {showSpecificationForm && (
              <>
                <SelectedDetail
                  id="custom-spec"
                  initialValue="Select a product detail to add"
                  detail="Product Specifications"
                  description="Provide details such as dimensions, weight, or any other relevant technical specifications."
                  boldTextExample="Screen size"
                  normalTextExample="6.1 inches"
                  placeholder="Add product specification"
                  isFieldDirty={!!dirtyFields.details?.selectDetail}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  handleChange={handleChange}
                  selectDetailValue={selectDetailValue}
                  details={details}
                  setDetails={setDetails}
                  watch={watch}
                  setMatchFound={() => setShowSpecificationForm(false)}
                />
                <DetailsList details={details} editIndex={editIndex} />
              </>
            )}
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Details;
