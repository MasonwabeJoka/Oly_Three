"use client";
import React, { useState } from "react";
import styles from "./HeroSectionClient.module.scss";
import Button from "./Buttons";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { useModalStore } from "@/store/modalStore";
import { searchAction } from "./../utils/FormServerActions/heroSectionSearchAction";

type FormValues = z.infer<typeof searchFormSchema>;

const HeroSectionSearchClient = () => {
  const [searchTermSuggestions, setSearchTermSuggestions] = useState(0);
  const [locationSuggestions, setLocationSuggestions] = useState(0);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
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
      console.log("Form submitted successfully:", data);
      setServerErrors({});
    }
  };

  return (
    <>
      <div className={styles.categoriesBtnContainer}>
        <Button
          buttonChildren="See All Categories"
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
            name="searchTerm"
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
            {errors && errors.locationSearch && (
              <p className={styles.errorMessage}>
                {errors.locationSearch?.message || serverErrors.locationSearch}
              </p>
            )}

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
              name="locationSearch"
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
            buttonChildren="Search"
            className={styles.search}
            buttonType="normal"
            buttonSize="large"
            name="Search Button"
            type="submit"
            ariaLabel="Search Button"
            autoFocus={false}
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      )}
    </>
  );
};

export default HeroSectionSearchClient;
