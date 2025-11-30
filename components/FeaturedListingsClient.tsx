"use client";
import { useState } from "react";
import styles from "./FeaturedListings.module.scss";
import Input from "@/components/Input";
import Select from "./Select";
import useTitleStore from "@/store/titleStore";
import { suggestions } from "@/data/SuggestionsData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Form from "next/form";
import { searchAction } from "./../utils/featuredListingSearchAction";

type FormValues = z.infer<typeof searchFormSchema>;

const FeaturedListingsClient = ({ category }: any) => {
  const Title = useTitleStore((state) => state.Title);
  const [searchTermClicked, setSearchTermClicked] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
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

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("searchTerm", data.searchTerm);
    formData.append("locationSearch", data.locationSearch);

    const result = await searchAction(formData);
    if (!result.success && result.errors) {
      result.errors.forEach((err) => {
        const field = err.path?.[0];
        if (field) {
          setError(field, { message: err.message });
          setServerErrors((prev) => ({ ...prev, [field]: err.message }));
        }
      });
    } else {
      console.log("Form submitted successfully:", data);
      setServerErrors({});
    }
  };

  return (
    <div className={styles.controlContainer}>
      {category === "all" && (
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
      )}
      {category === "property" && (
        <>
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
              placeholder="Search by city, province, town..."
              id="locationSearch"
              name="locationSearch"
              ariaLabel="Location"
              autoFocus={false}
              autoComplete="off"
              required
              onSuggestionCountChange={(count: any) =>
                setLocationSuggestions(count)
              }
            />
          </div>
        </>
      )}
      {category === "shops" && (
        <>
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
              placeholder="Search by city, province, town..."
              id="locationSearch"
              name="locationSearch"
              ariaLabel="Location"
              autoFocus={false}
              autoComplete="off"
              required
              onSuggestionCountChange={(count: any) =>
                setLocationSuggestions(count)
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedListingsClient;
