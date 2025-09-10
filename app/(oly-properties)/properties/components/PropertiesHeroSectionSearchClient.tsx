"use client";
import React, { useState } from "react";
import styles from "./PropertiesHeroSectionSearch.module.scss";
import Link from "next/link";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Image from "next/image";
import Form from "next/form";
import Button from "@/components/Buttons";
import Select from "@/components/Select";

// Server action (ideally in a separate server file)
async function searchAction(formData: FormData) {
  const searchTerm = formData.get("searchTerm")?.toString();
  const locationSearch = formData.get("locationSearch")?.toString();
  const schema = z.object({
    searchTerm: z.string().min(1, "Search term is required"),
    locationSearch: z.string().min(1, "Location is required"),
  });
  try {
    schema.parse({ searchTerm, locationSearch });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [{ message: "Server error" }] };
  }
}

type FormValues = z.infer<typeof searchFormSchema>;

const PropertiesHeroSectionSearchClient = () => {
  const [isPropertyTypeSelect, setIsPropertyTypeSelect] = useState(false);
  const [isForSaleToLetOpen, setIsForSaleToLetOpen] = useState(false);
  const [isPriceRangeSelect, setIsPriceRangeSelect] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
  });
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("searchTerm", data.searchTerm);
    formData.append("locationSearch", data.locationSearch);
    const result = await searchAction(formData);
    if (!result.success && result.errors) {
      result.errors.forEach((err) => {
        const field = err.path?.[0];
        if (field) {
          setError(field as keyof FormValues, { message: err.message });
          setServerErrors((prev) => ({ ...prev, [field]: err.message }));
        }
      });
    } else {
      setServerErrors({});
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="logo" width={120} height={120} />
      </div>
      <Form
        action={searchAction}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.buttonsAndSearch}
        id="buttonsAndSearch"
        noValidate
      >
        <div className={styles.buttons}>
          <Link href="/dashboard/post-your-ad" className={styles.link}>
            <Button
              buttonChildren={"Post Your Ad"}
              className={styles.postYourAdBtn}
              buttonType="primary"
              buttonSize="large"
              name="Post Your Ad Button"
              type="button"
              ariaLabel="Post Your Ad Button"
              autoFocus={false}
              disabled={false}
            />
          </Link>
          <div className={styles.propertyTypeSelectContainer}>
            <Select
              isMultiSelect={true}
              className={styles.propertyTypeSelect}
              options={[
                "House",
                "Apartment",
                "Townhouse",
                "Vacant Land",
                "Development",
                "Commercial Property",
                "Industrial Property",
                "Agricultural Property",
                "Other Property",
              ]}
              initialValue={`House ${"\u00A0".repeat(3)}/${"\u00A0".repeat(3)} Apartment ${"\u00A0".repeat(3)}/ ${"\u00A0".repeat(3)}Development`}
              selectSize="large"
              label="Property Type"
              id="propertyType"
              name="propertyType"
              ariaLabel="Property Type Selector"
              autoFocus={false}
              required={false}
              onDropdownOpenChange={(isOpen) => {
                setIsPropertyTypeSelect(isOpen);
              }}
            />
          </div>
          {!isPropertyTypeSelect && (
            <div className={styles.forSaleToLetSelectContainer}>
              <Select
                isMultiSelect={true}
                className={styles.forSaleToLetSelect}
                options={["For Sale", "To Let"]}
                initialValue={`For Sale ${"\u00A0".repeat(3)}/${"\u00A0".repeat(3)} To Let`}
                selectSize="large"
                label="Buy or Rent"
                id="buyRent"
                name="buyRent"
                ariaLabel="Buy or Rent Selector"
                autoFocus={false}
                required={false}
                onDropdownOpenChange={(isOpen) => {
                  setIsForSaleToLetOpen(isOpen);
                }}
              />
            </div>
          )}
          {isPropertyTypeSelect ||
            (!isForSaleToLetOpen && (
              <div className={styles.priceRangeSelectContainer}>
                <Select
                  isMultiSelect={false}
                  className={styles.priceRangeSelect}
                  options={[
                    "Less than R 100 000",
                    `R 100 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R 200 000`,
                    `R 200 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R 300 000`,
                    `R 300 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R 400 000`,
                    `R 400 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R 500 000`,
                    `R 500 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R 600 000`,
                    `R 600 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R 700 000`,
                    `R 700 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R800 000`,
                    `R 800 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R900 000`,
                    `R 900 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R1 000 000`,
                    `R 1 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R2 000 000`,
                    `R 2 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R3 000 000`,
                    `R 3 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R4 000 000`,
                    `R 4 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R5 000 000`,
                    `R 5 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R6 000 000`,
                    `R 6 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R7 000 000`,
                    `R 7 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R8 000 000`,
                    `R 8 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R9 000 000`,
                    `R 9 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R10 000 000`,
                    `R 10 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R12 000 000`,
                    `R 12 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R14 000 000`,
                    `R 14 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R16 000 000`,
                    `R 16 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R20 000 000`,
                    "More than R 20 000 000",
                  ]}
                  initialValue="Price Range"
                  selectSize="large"
                  label="Price Range"
                  id="priceRange"
                  name="PriceRange"
                  ariaLabel="Price Range Selector"
                  autoFocus={false}
                  required={false}
                />
              </div>
            ))}
        </div>
      </Form>
    </div>
  );
};

export default PropertiesHeroSectionSearchClient;
