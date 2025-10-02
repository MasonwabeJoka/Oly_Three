"use client";
import { useState, useEffect } from "react";
import { useActionState } from "react"; // For state/errors
import { useFormStatus } from "react-dom"; // Correct import for pending status
import styles from "./HeroSectionClient.module.scss";
import Button from "./Buttons";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { useModalStore } from "@/store/modalStore";

type FormValues = z.infer<typeof searchFormSchema>;

interface Props {
  searchTerm: string;
  locationSearch: string;
}

const HeroSectionSearchClient = ({ searchTerm, locationSearch }: Props) => {
  const [searchTermSuggestions, setSearchTermSuggestions] = useState(0);
  const [locationSuggestions, setLocationSuggestions] = useState(0);
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  const {
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { searchTerm, locationSearch },
  });

  // Get pending state from parent <Form>; fallback to isSubmitting if unavailable
  const { pending } = useFormStatus() || { pending: isSubmitting };

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
        {/* Display server errors from useActionState */}
        {errors && <p className={styles.errorMessage}>{errors?.message}</p>}

        <div className={styles.searchTerm}>
          <p className={styles.errorMessage}>{errors.searchTerm?.message}</p>
          <Controller
            name="searchTerm"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.searchTermInput}
                isSearchBar={true}
                suggestions={suggestions}
                inputType="text"
                inputSize="large"
                iconSrcRight="/icons/search.png"
                iconPosition="right"
                iconWidth={32}
                iconHeight={32}
                label="Search Term"
                placeholder="What are you looking for?"
                id="searchTerm"
                error={errors.searchTerm?.message}
                ariaLabel="Search Term"
                autoComplete="off"
                required={false}
                onSuggestionCountChange={(value) =>
                  setSearchTermSuggestions(value)
                }
              />
            )}
          />
        </div>
        {searchTermSuggestions === 0 && (
          <div className={styles.searchLocation}>
            <p className={styles.errorMessage}>
              {errors.locationSearch?.message}
            </p>
            <Controller
              name="locationSearch"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
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
                  error={errors.locationSearch?.message}
                  ariaLabel="Location"
                  autoComplete="off"
                  required
                  onSuggestionCountChange={(count) =>
                    setLocationSuggestions(count)
                  }
                />
              )}
            />
          </div>
        )}
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
              disabled={pending} // Disables during submission
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSectionSearchClient;
