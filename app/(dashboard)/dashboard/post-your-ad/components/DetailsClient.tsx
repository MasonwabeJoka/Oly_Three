"use client";
import styles from "./DetailsClient.module.scss";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import SelectedDetail from "./SelectedDetail";
import { FormWrapper } from "./FormWrapper";
import DetailsList from "./DetailsList";
import SpecificationsList from "./SpecificationsList";
import Form from "next/form";

export interface DetailItem {
  selectDetail: string;
  value: string;
}

interface DetailsProps {
  conditions: string[];
  detailsTitles: string[];
  detailsData: any[];
}

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const DetailsClient = ({
  conditions,
  detailsTitles,
  detailsData,
}: DetailsProps) => {
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
  } = useFormContext();

  const selectDetailValue = watch("details.selectDetail");
  const formDetails = watch("details.list") || [];

  useEffect(() => {
    if (formDetails.length > 0 && details.length === 0) {
      setDetails(formDetails);
    }
  }, [formDetails]);

  useEffect(() => {
    if (selectDetailValue) {
      setMatchFound(true);
    }
  }, [selectDetailValue]);

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

  const updateDetail = (index: number, updatedValue: string) => {
    if (updatedValue.trim()) {
      const updatedDetails = [...details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        value: updatedValue.trim(),
      };

      updateDetailsInForm(updatedDetails);

      trigger("details.list").then((isValid: boolean) => {
        if (isValid) {
          setEditIndex(null);
        }
      });
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    updateDetailsInForm(updatedDetails);

    if (editIndex === index) {
      setEditIndex(null);
    }

    trigger("details.list");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger(name);
  };

  return (
    <FormWrapper
      error={errors.details?.message as string}
      selectOpen={isConditionsOpen || isDetailsOpen}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Product Details</h2>

        <Form
          className={styles.form}
          action={mockServerAction}
          // onSubmit={handleSubmit(onSubmitDetail)} // If you have a submit handler, add it here
        >
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
                dashboard
                showLabelOnSelection
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
                  dashboard
                  showLabelOnSelection
                  error={errors.details?.selectDetail?.message as string}
                  {...register("details.selectDetail")}
                  onOpenChange={(isOpen) => setIsDetailsOpen(isOpen)}
                />
              </div>
            )}

            {detailsData.map(
              (detail) =>
                matchFound &&
                selectDetailValue === detail.detail &&
                !isConditionsOpen &&
                !isDetailsOpen && (
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
                    trigger={trigger}
                    handleBlur={() => {}}
                    handleSubmit={() => {}}
                  />
                )
            )}
            {!isConditionsOpen && !isDetailsOpen && (
              <DetailsList
                details={details}
                editIndex={editIndex}
                editDetail={editDetail}
                handleDeleteItem={handleDeleteItem}
                editValue={editValue}
                setValue={setValue}
                updateDetail={updateDetail}
                cancelEdit={() => setEditIndex(null)}
                register={register}
                errors={errors}
                watch={watch}
              />
            )}

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
                  autoFocus={false}
                  disabled={false}
                  dashboard
                  onClick={() =>
                    setShowSpecificationForm(!showSpecificationForm)
                  }
                />
              </div>
            )}

            {showSpecificationForm && !isConditionsOpen && !isDetailsOpen && (
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
                  selectDetailValue="Product Specifications"
                  details={details}
                  setDetails={setDetails}
                  watch={watch}
                  setMatchFound={() => setShowSpecificationForm(false)}
                  trigger={trigger}
                  handleBlur={() => {}}
                  handleSubmit={() => {}}
                />
                <SpecificationsList
                  details={details}
                  editIndex={editIndex}
                  editDetail={editDetail}
                  handleDeleteItem={handleDeleteItem}
                  editValue={editValue}
                  setValue={setValue}
                  updateDetail={updateDetail}
                  cancelEdit={() => setEditIndex(null)}
                  register={register}
                  errors={errors}
                  watch={watch}
                />
              </>
            )}
          </div>
        </Form>
      </div>
    </FormWrapper>
  );
};

export default DetailsClient;
