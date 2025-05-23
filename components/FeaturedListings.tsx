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
import multipleImages from "@/data/multipleImages";

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
type FeaturedListingsProps = {
  category:
    | "all"
    | "property"
    | "vehicles"
    | "services"
    | "jobs"
    | "shops"
    | "shops";
};

const FeaturedListings = ({ category }: FeaturedListingsProps) => {
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

  const tempImages = (() => multipleImages.map((item) => item.images))();
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
    <>
      {category === "all" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <>
              <div className={styles.controlContainer}>
                <div className={styles.control}>
                  <Select
                    options={[
                      "All Categories",
                      "Properties",
                      "Vehicles",
                      "Jobs",
                      "Services",
                    ]}
                    initialValue="All Categories"
                    selectSize="large"
                    label="Categories"
                    id="categories"
                    name="categories"
                    ariaLabel="categories"
                    autoFocus={false}
                    required={true}
                  />
                </div>
              </div>
              <ListingsCollage
                category={category}
                images={tempImages}
                isDeletable={false}
                isDashboard={false}
                cardSize="standard"
                limit={4}
                page={1}
                sortBy="postedOn"
                sortOrder="desc"
              />
            </>
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
          </div>
        </div>
      )}
      {category === "property" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <>
              <div className={styles.controlContainer}>
                <div className={styles.control}>
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
                <div className={styles.control}>
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
                    name="locationSearch"
                    ariaLabel="Location"
                    autoFocus={false}
                    autoComplete="off"
                    required
                    onSuggestionsChange={(count) =>
                      setLocationSuggestions(count)
                    }
                  />
                </div>
              </div>
              <ListingsCollage
                category={category}
                images={tempImages}
                isDeletable={false}
                isDashboard={false}
                cardSize="standard"
                limit={4}
                page={1}
                sortBy="postedOn"
                sortOrder="desc"
              />
            </>
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren={"View All Properties"}
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
      {category === "shops" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <>
              <div className={styles.controlContainer}>
                <div className={styles.control}>
                  <Select
                    isMultiSelect={true}
                    className={styles.shopsTypeSelect}
                    options={[
                      "Solar Products",
                      "Fashion",
                      "Car Pars",
                      "Tops",
                      "Pets",
                      "Furniture",
                      "Electronics",
                      "Solar Products",
                      "Agricultural Products",
                      "Other Products",
                    ]}
                    initialValue="View All Categories"
                    selectSize="large"
                    label="Property Type"
                    id="propertyType"
                    name="propertyType"
                    ariaLabel="Property Type Selector"
                    autoFocus={false}
                    required={false}
                  />
                </div>
                <div className={styles.control}>
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
                    name="locationSearch"
                    ariaLabel="Location"
                    autoFocus={false}
                    autoComplete="off"
                    required
                    onSuggestionsChange={(count) =>
                      setLocationSuggestions(count)
                    }
                  />
                </div>
              </div>
              <ListingsCollage
                category={category}
                images={tempImages}
                isDeletable={false}
                isDashboard={false}
                cardSize="standard"
                limit={4}
                page={1}
                sortBy="postedOn"
                sortOrder="desc"
              />
            </>
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren={"View All Properties"}
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedListings;
