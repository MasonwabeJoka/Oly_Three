"use client";
import styles from "./FeaturedListings.module.scss";
import { useState } from "react";
import Button from "@/components/Buttons";
import ListingsCollage from "@/components/ListingsCollage";
import Input from "@/components/Input";
import useTitleStore from "@/store/titleStore";
import { suggestions } from "@/data/SuggestionsData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Link from "next/link";
import Select from "./Select";
import Form from "next/form";

// Server action (ideally in a separate server file)
async function searchAction(formData: FormData) {
  // "use server";
  const searchTerm = formData.get("searchTerm")?.toString();
  const locationSearch = formData.get("locationSearch")?.toString();

  // Server-side validation or processing
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

const FeaturedListings = () => {
  const Title = useTitleStore((state) => state.Title);
  const [searchTermClicked, setSearchTermClicked] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [searchTermSuggestions, setSearchTermSuggestions] = useState(0);
  const [locationSuggestions, setLocationSuggestions] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
  });

  // Handle form submission with client-side validation and server action
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
    <div className={styles.listingsSection}>
      <div className={styles.collage}>
        <div className={styles.selectContainer}>
          <Select
            options={[
              "All Categories",
              "Properties",
              "Vehicles",
              "Jobs",
              "Services",
            ]}
            currentValue="All Categories"
            selectSize="large"
            label="Categories"
            id="categories"
            name="categories"
            ariaLabel="categories"
            autoFocus={false}
            required={true}
          />
        </div>
        <ListingsCollage
          isDeletable={false}
          isDashboard={false}
          cardSize="standard"
          limit={4}
          page={1}
          sortBy="postedOn"
          sortOrder="desc"
        />
      </div>

      <div className={styles.buttonsAndSearch}>
        <Link href="/listings" className={styles.buttons}>
          <Button
            className={styles.button}
            buttonChildren={"View all listings"}
            buttonType="primary"
            buttonSize="large"
            name="View All Listings Button"
            type="button"
            ariaLabel="View All Listings Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>

        {/* Use next/form's Form component */}
        <Form
          action={searchAction} // Native server action for non-JS fallback
          onSubmit={handleSubmit(onSubmit)} // React Hook Form's enhanced submission
          className={styles.searchFields}
          noValidate
        >
          <div
            className={styles.searchTermContainer}
            onClick={() => setSearchTermClicked(true)}
          >
            <p className={styles.errorMessage}>
              {errors.searchTerm?.message || serverErrors.searchTerm}
            </p>
            <Input
              className={`${styles.input} ${styles.searchTerm}`}
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
            <div className={styles.locationContainer}>
              <p className={styles.errorMessage}>
                {errors.locationSearch?.message || serverErrors.locationSearch}
              </p>
              <Input
                className={`${styles.input} ${styles.location}`}
                isSearchBar={true}
                suggestions={suggestions}
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
    </div>
  );
};

export default FeaturedListings;
