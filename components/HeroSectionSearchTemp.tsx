"use client";
import React, { useState } from "react";
import styles from "@/components/HeroSectionSearch.module.scss";
import Button from "@/components/Buttons";
import Link from "next/link";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useModalStore } from "@/store/modalStore";

type FormValues = {
  searchTerm: string;
  locationSearch: string;
};

const HeroSectionSearch = () => {
  const [searchTerm, setSearchTerm] = useState(false);
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors, isDirty, isValid } = formState
  console.log("Form State:", !isDirty);
  const onError = (errors: FieldErrors<FormValues>) => {
		console.log("Form errors", errors)
	}

  return (
    <>
       <form id="buttonsAndSearch" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className={styles.buttonsAndSearch}>
          <>
            <div className={styles.buttons}>
              <Link
                href="/dashboard/post-your-ad/select-a-category"
                className={styles.link}
              >
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

              <Button
                buttonChildren={"Categories"}
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
              <div
                className={styles.searchTerm}
                onClick={() => setSearchTerm(true)}
              >
                 <p className={styles.errorMessage}>{errors.searchTerm?.message}</p>
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
                  ariaLabel="Search Term"
                  autoComplete="off"
                  required
                  {...register("searchTerm", {
                    required: {
                      value: true,
                      message: "Search field cannot be empty.",
                    },
                    validate: {
                      lengthValidation: (searchTerm) => {
                        return searchTerm.length >= 3  || 'Search term must be at least 3 characters long.'
                      },
                      spacesOnlyValidation: (searchTerm) => {
                        // Check if searchTerm consists only of spaces
                        if (searchTerm.trim().length === 0) {
                          return "Search term cannot be only spaces."; // Validation fails
                        }
                        return false; // Validation passes
                      }
                    }
                    
                  })}
                  onChange={(e) => setValue("searchTerm", e.target.value)}
                />
              </div>
              <div
                className={styles.searchLocation}
                style={{ marginBottom: 0 }}
              >
                <Input
                  isSearchBar={true}
                  suggestions={suggestions}
                  className={styles.searchLocationInput}
                  inputType="text"
                  inputSize="large"
                  iconSrcLeft=""
                  iconSrcRight={"/icons/search.png"}
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  label="Location"
                  placeholder="Search by city, province, township..."
                  id="LocationSearch"
                  ariaLabel="Location"
                  autoFocus={false}
                  autoComplete="off"
                  required
                  {...register("locationSearch")}
                />
              </div>
            </div>
          </>
          {/* <button>SUBMIT</button> */}
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
              disabled={false}
            />
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default HeroSectionSearch;
