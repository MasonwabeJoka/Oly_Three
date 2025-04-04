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
  // "use server";
  const searchTerm = formData.get("searchTerm")?.toString();
  const locationSearch = formData.get("locationSearch")?.toString();

  // Simulate server-side validation or processing
  const schema = z.object({
    searchTerm: z.string().min(1, "Search term is required"),
    locationSearch: z.string().min(1, "Location is required"),
  });

  try {
    schema.parse({ searchTerm, locationSearch });
    console.log("Server received:", { searchTerm, locationSearch });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [{ message: "Server error" }] };
  }
}

type FormValues = z.infer<typeof searchFormSchema>;

const PropertiesHeroSectionSearch = () => {
  const [searchTermSuggestions, setSearchTermSuggestions] = useState(0);
  const [locationSuggestions, setLocationSuggestions] = useState(0);
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

  // Handle form submission with both client and server validation
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("searchTerm", data.searchTerm);
    formData.append("locationSearch", data.locationSearch);

    const result = await searchAction(formData);
    if (!result.success && result.errors) {
      // Map server errors to React Hook Form
      result.errors.forEach((err) => {
        const field = err.path?.[0];
        if (field) {
          setError(field as keyof FormValues, { message: err.message });
          setServerErrors((prev) => ({ ...prev, [field]: err.message }));
        }
      });
    } else {
      console.log("Form submitted successfully:", data);
      setServerErrors({}); // Clear server errors on success
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="logo" width={120} height={120} />
      </div>

      {/* Use next/form's Form component */}
      <Form
        action={searchAction} // Native server action for non-JS fallback
        onSubmit={handleSubmit(onSubmit)} // React Hook Form's enhanced submission
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
              initialValue="House / Apartment / Development"
              selectSize="large"
              label="Property Type"
              id="propertyType"
              name="propertyType"
              ariaLabel="Property Type Selector"
              autoFocus={false}
              required={false}
            />
          </div>
          <div className={styles.buyRentSelectContainer}>
            <Select
              isMultiSelect={true}
              className={styles.buyRentSelect}
              options={["For Sale", "To Let"]}
              initialValue="For Sale / To Let"
              selectSize="large"
              label="Buy or Rent"
              id="buyRent"
              name="buyRent"
              ariaLabel="Buy or Rent Selector"
              autoFocus={false}
              required={false}
            />
          </div>
          <div className={styles.priceRangeSelectContainer}>
            <Select
              isMultiSelect={true}
              className={styles.priceRangeSelect}
              options={[
                "Less than R100 000",
                `R100 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R200 000`,
                `R200 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R300 000`,
                `R300 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R400 000`,
                `R400 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R500 000`,
                `R500 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R600 000`,
                `R600 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R700 000`,
                `R700 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R800 000`,
                `R800 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R900 000`,
                `R900 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R1 000 000`,
                `R1 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R2 000 000`,
                `R2 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R3 000 000`,
                `R3 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R4 000 000`,
                `R4 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R5 000 000`,
                `R5 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R6 000 000`,
                `R6 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R7 000 000`,
                `R7 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R8 000 000`,
                `R8 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R9 000 000`,
                `R9 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R10 000 000`,
                `R10 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R12 000 000`,
                `R12 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R14 000 000`,
                `R14 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R16 000 000`,
                `R16 000 000${"\u00A0".repeat(7)}-${"\u00A0".repeat(7)}R20 000 000`,
                "More than R20 000 000",
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
        </div>

        <div className={styles.searchFields}>
          

          {searchTermSuggestions === 0 && (
            <div className={styles.searchLocation}>
              <p className={styles.errorMessage}>
                {errors.locationSearch?.message || serverErrors.locationSearch}
              </p>
              <Input
                isSearchBar={true}
                isMultiSelect={true}
                suggestions={suggestions}
                className={styles.searchLocationInput}
                inputType="text"
                inputSize="large"
                iconSrcRight="/icons/search.png"
                iconPosition="right"
                iconWidth={32}
                iconHeight={32}
                label="Location"
                placeholder="Search by city, province, township..."
                id="locationSearch"
                name="locationSearch" // Required for FormData
                ariaLabel="Location"
                autoFocus={false}
                autoComplete="off"
                required
                {...register("locationSearch")}
                onChange={(e) =>
                  setValue("locationSearch", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                onSuggestionsChange={(count) => setLocationSuggestions(count)}
              />
            </div>
          )}
        </div>

        {searchTermSuggestions === 0 && locationSuggestions === 0 && (
          <div className={styles.searchButton}>
            <Button
              buttonChildren={"Search"}
              className={styles.search}
              buttonType="primary"
              buttonSize="large"
              name="Search Button"
              type="submit"
              ariaLabel="Search Button"
              autoFocus={false}
              disabled={isSubmitting}
            />
          </div>
        )}
      </Form>
    </div>
  );
};

export default PropertiesHeroSectionSearch;
