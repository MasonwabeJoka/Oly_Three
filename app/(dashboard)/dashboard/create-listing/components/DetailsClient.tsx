"use client";
import styles from "./DetailsClient.module.scss";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import SelectedDetail from "./SelectedDetail";
import ProductSpecification from "./ProductSpecification";
import { FormWrapper } from "./FormWrapper";
import ItemsList from "./ItemsList";
import Form from "next/form";

export interface DetailItem {
  selectDetail: string;
  value: string;
}

export interface SpecificationItem {
  selectSpecification: string;
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
  const [specifications, setSpecifications] = useState<SpecificationItem[]>([]);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
      // Close specification form when a new detail is selected
      setShowSpecificationForm(false);
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

  const updateDetail = async (
    index: number,
    updatedValue: string
  ): Promise<void> => {
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

  const handleDeleteItem = async (index: number): Promise<void> => {
    const updatedDetails = details.filter((_, i) => i !== index);
    updateDetailsInForm(updatedDetails);

    if (editIndex === index) {
      setEditIndex(null);
    }

    await trigger("details.list");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger(name);
  };

  const editSpecification = (index: number) => {
    setEditIndex(index);
    setEditValue(specifications[index].value);
  };

  const updateSpecification = (index: number, updatedValue: string) => {
    if (updatedValue.trim()) {
      const updatedSpecifications = [...specifications];
      updatedSpecifications[index] = {
        ...updatedSpecifications[index],
        value: updatedValue.trim(),
      };

      setSpecifications(updatedSpecifications);
      setValue("specifications.list", updatedSpecifications, {
        shouldValidate: true,
        shouldDirty: true,
      });

      trigger("specifications.list").then((isValid: boolean) => {
        if (isValid) {
          setEditIndex(null);
        }
      });
    }
  };

  const handleDeleteSpecification = async (index: number): Promise<void> => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
    setValue("specifications.list", updatedSpecifications, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (editIndex === index) {
      setEditIndex(null);
    }

    await trigger("specifications.list");
  };

  return (
    <div>
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
                dashboard
                error={errors.details?.condition?.message as string}
                {...register("details.condition")}
                onDropdownOpenChange={(isOpen) => setIsConditionsOpen(isOpen)}
              />
            </div>

            {!isConditionsOpen && (
              <div className={styles.selectDetailContainer}>
                <Select
                  options={detailsTitles}
                  className={styles.selectDetail}
                  initialValue="Add all product details"
                   value="Add all product details" 
                  selectSize="large"
                  selectColourType="normal"
                  label="Choose a detail"
                  id="choose-detail"
                  ariaLabel="Choose Detail Select"
                  dashboard
                  error={errors.details?.selectDetail?.message as string}
                  {...register("details.selectDetail")}
                  onDropdownOpenChange={(isOpen) => setIsDetailsOpen(isOpen)}
                />
              </div>
            )}
            <ul>
              {detailsData.map(
                (detail) =>
                  matchFound &&
                  selectDetailValue === detail.detail &&
                  !isConditionsOpen &&
                  !isDetailsOpen && (
                    <li key={detail.id} className={styles.detail}>
                      <SelectedDetail
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
                    </li>
                  )
              )}
            </ul>
            {!isConditionsOpen && !isDetailsOpen && (
              <div className={styles.detailsListContainer}>
                <ItemsList
                  items={details}
                  editIndex={editIndex}
                  editItem={editDetail}
                  handleDeleteItem={handleDeleteItem}
                  editValue={editValue}
                  setValue={setValue}
                  updateItem={updateDetail}
                  cancelEdit={() => setEditIndex(null)}
                  register={register}
                  errors={errors}
                  watch={watch}
                  type="details"
                />
              </div>
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
                  onClick={() => {
                    setIsAnimating(true);
                    // Close any open SelectedDetail UI first
                    setMatchFound(false);
                    setValue("details.selectDetail", "");

                    // Add a small delay for smooth transition
                    setTimeout(() => {
                      setShowSpecificationForm(!showSpecificationForm);
                      setIsAnimating(false);
                    }, 150);
                  }}
                />
              </div>
            )}

            {showSpecificationForm && !isConditionsOpen && !isDetailsOpen && (
              <>
                <ProductSpecification
                  id="custom-spec"
                  initialValue="Select a product specification to add"
                  specification="Product Specifications"
                  description="Provide details such as dimensions, weight, or any other relevant technical specifications. Add a colon after details to make them bold."
                  boldTextExample="Screen size"
                  normalTextExample="6.1 inches"
                  placeholder="Add product specification"
                  isFieldDirty={
                    !!dirtyFields.specifications?.selectSpecification
                  }
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  handleChange={handleChange}
                  selectSpecificationValue="Product Specifications"
                  specifications={specifications}
                  setSpecifications={setSpecifications}
                  watch={watch}
                  setShowSpecificationForm={setShowSpecificationForm}
                  trigger={trigger}
                  handleBlur={() => {}}
                  handleSubmit={() => {}}
                />
              </>
            )}
            {!isConditionsOpen && !isDetailsOpen && (
              <div className={styles.productSpecificationContainer}>
                <ItemsList
                  items={specifications}
                  editIndex={editIndex}
                  editItem={editSpecification}
                  handleDeleteItem={handleDeleteSpecification}
                  editValue={editValue}
                  setValue={setValue}
                  updateItem={updateSpecification}
                  cancelEdit={() => setEditIndex(null)}
                  register={register}
                  errors={errors}
                  watch={watch}
                  type="specifications"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsClient;
