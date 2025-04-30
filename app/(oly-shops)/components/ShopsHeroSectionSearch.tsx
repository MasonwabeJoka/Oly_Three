"use client";
import React, { useState } from "react";
import styles from "./ShopsHeroSectionSearch.module.scss";
import Link from "next/link";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Image from "next/image";
import Form from "next/form";
import { useModalStore } from "@/store/modalStore";
import Button from "@/components/Buttons";

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

const ShopsHeroSectionSearch = () => {
  const [searchTermSuggestions, setSearchTermSuggestions] = useState(0);
  const [locationSuggestions, setLocationSuggestions] = useState(0);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

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
              buttonChildren={"Create Your Shop"}
              className={styles.createYourShopBtn}
              buttonType="primary"
              buttonSize="large"
              name="Create Your Shop"
              type="button"
              ariaLabel="Create Your Shop Button"
              autoFocus={false}
              disabled={false}
            />
          </Link>

  
          <Button
                buttonChildren={"See All Categories"}
                className={styles.categoriesBtn}
                buttonType="normal"
                buttonSize="large"
                name="Categories Button"
                type="button"
                ariaLabel="Categories Button"
                autoFocus={false}
                disabled={false}
                onClick={() => setShowCategoriesModal(true)}
              />
        </div>

        <div className={styles.searchFields}>
          <div className={styles.searchTerm}>
            <p className={styles.errorMessage}>
              {errors.searchTerm?.message || serverErrors.searchTerm}
            </p>
            <Input
              className={styles.searchTermInput}
              isSearchBar={true}
              suggestions={suggestions}
              inputType="text"
              inputSize="large"
              iconSrcRight="/icons/search.png"
              iconPosition="right"
              iconWidth={32}
              iconHeight={32}
              label="Search"
              placeholder="What are you looking for?"
              id="searchTerm"
              name="searchTerm" // Required for FormData
              ariaLabel="Search Term"
              autoComplete="off"
              required
              {...register("searchTerm")}
              onChange={(e) =>
                setValue("searchTerm", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              onSuggestionsChange={(count) => setSearchTermSuggestions(count)}
            />
          </div>

          {searchTermSuggestions === 0 && (
            <div className={styles.searchLocation}>
              <p className={styles.errorMessage}>
                {errors.locationSearch?.message || serverErrors.locationSearch}
              </p>
              <Input
                isSearchBar={true}
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
              buttonType="normal"
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

export default ShopsHeroSectionSearch;
